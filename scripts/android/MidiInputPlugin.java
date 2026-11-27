package de.jbkstr.lauscher;

import android.Manifest;
import android.annotation.SuppressLint;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.le.BluetoothLeScanner;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanFilter;
import android.bluetooth.le.ScanResult;
import android.bluetooth.le.ScanSettings;
import android.content.Context;
import android.content.pm.PackageManager;
import android.media.midi.MidiDevice;
import android.media.midi.MidiDeviceInfo;
import android.media.midi.MidiInputPort;
import android.media.midi.MidiManager;
import android.media.midi.MidiOutputPort;
import android.media.midi.MidiReceiver;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.ParcelUuid;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

/**
 * Lauscher • Natives Android-MIDI-Plugin (USB-MIDI & Bluetooth-LE-MIDI).
 *
 * Nutzt Androids offizielles android.media.midi.MidiManager (ab API 23):
 * - Erkennt angeschlossene USB-MIDI- und gekoppelte BLE-MIDI-Geräte automatisch (Hot-Plug).
 * - Kann gezielt nach Bluetooth-LE-MIDI-Instrumenten (Service UUID 03B80E5A-...) scannen
 *   und diese direkt über MidiManager.openBluetoothDevice() verbinden.
 * - Öffnet sowohl den Ausgang des Geräts (Empfang von Note-On/Off, Sustain CC 64) als auch
 *   dessen Eingang (Senden von Local Control Off CC 122 = 0 / On CC 122 = 127).
 */
@CapacitorPlugin(
    name = "MidiInput",
    permissions = {
        @Permission(
            alias = "bluetooth",
            strings = {
                Manifest.permission.BLUETOOTH_SCAN,
                Manifest.permission.BLUETOOTH_CONNECT
            }
        ),
        @Permission(
            alias = "bluetoothLegacy",
            strings = {
                Manifest.permission.ACCESS_FINE_LOCATION
            }
        )
    }
)
public class MidiInputPlugin extends Plugin {

    // Offizielle MIDI-over-BLE GATT-Service-UUID (MIDI Manufacturers Association)
    private static final UUID BLE_MIDI_SERVICE_UUID =
        UUID.fromString("03B80E5A-EDE8-4B33-A751-6CE34EC4C700");

    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private final Object lock = new Object();

    private MidiManager midiManager = null;
    private MidiManager.DeviceCallback deviceCallback = null;
    private boolean started = false;

    private static final class OpenMidiConn {
        final String id;
        final String name;
        final String manufacturer;
        final String type;
        final MidiDeviceInfo info;
        MidiDevice device;
        // Zusätzlicher Geräte-Handle aus openBluetoothDevice(), falls dasselbe Gerät parallel schon
        // über onDeviceAdded geöffnet wurde: hält die BLE-Verbindung offen, Ports laufen über "device".
        MidiDevice keepAliveDevice;
        final List<MidiOutputPort> outputPorts = new ArrayList<>(); // Gerät -> App (Empfang)
        final List<MidiInputPort> inputPorts = new ArrayList<>();   // App -> Gerät (Senden, z. B. CC 122)
        int runningStatus = 0;

        OpenMidiConn(String id, String name, String manufacturer, String type, MidiDeviceInfo info) {
            this.id = id;
            this.name = name;
            this.manufacturer = manufacturer;
            this.type = type;
            this.info = info;
        }
    }

    private final Map<String, OpenMidiConn> connections = new HashMap<>();
    private final Map<String, BluetoothDevice> discoveredBleDevices = new HashMap<>();
    private BluetoothLeScanner activeBleScanner = null;
    private ScanCallback activeBleCallback = null;
    private boolean bleScanning = false;
    private Runnable bleScanStopRunnable = null;

    @PluginMethod
    public void isSupported(PluginCall call) {
        JSObject ret = new JSObject();
        boolean supported = hasMidiSupport();
        boolean bleSupported = hasBleSupport();
        ret.put("supported", supported);
        ret.put("bluetoothSupported", supported && bleSupported);
        call.resolve(ret);
    }

    @PluginMethod
    public void start(PluginCall call) {
        if (!hasMidiSupport()) {
            call.reject("MIDI not supported on this device", "UNSUPPORTED");
            return;
        }
        MidiManager mgr = getMidiManager();
        if (mgr == null) {
            call.reject("MidiManager unavailable", "UNSUPPORTED");
            return;
        }

        synchronized (lock) {
            if (!started) {
                started = true;
                registerDeviceCallback(mgr);
            }
        }

        openAllKnownDevices(mgr);

        JSObject ret = new JSObject();
        ret.put("started", true);
        ret.put("devices", buildDeviceListJson());
        call.resolve(ret);
    }

    @PluginMethod
    public void stop(PluginCall call) {
        stopBleScanInternal();
        closeAllDevices(true);
        synchronized (lock) {
            if (started && midiManager != null && deviceCallback != null) {
                try {
                    midiManager.unregisterDeviceCallback(deviceCallback);
                } catch (Exception ignored) {}
            }
            deviceCallback = null;
            started = false;
        }
        JSObject ret = new JSObject();
        ret.put("stopped", true);
        call.resolve(ret);
    }

    @PluginMethod
    public void getDevices(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("devices", buildDeviceListJson());
        call.resolve(ret);
    }

    @PluginMethod
    public void sendMessage(PluginCall call) {
        JSArray arr = call.getArray("data");
        if (arr == null || arr.length() == 0) {
            call.reject("Missing MIDI data bytes", "INVALID_ARGS");
            return;
        }
        String targetDeviceId = call.getString("deviceId", "all");
        byte[] bytes = new byte[arr.length()];
        try {
            for (int i = 0; i < arr.length(); i++) {
                bytes[i] = (byte) (arr.getInt(i) & 0xFF);
            }
        } catch (Exception e) {
            call.reject("Invalid MIDI byte array", "INVALID_ARGS");
            return;
        }

        int sentCount = sendBytesToDevices(targetDeviceId, bytes);
        JSObject ret = new JSObject();
        ret.put("sent", sentCount);
        call.resolve(ret);
    }

    @PluginMethod
    public void scanBluetoothDevices(PluginCall call) {
        if (!hasMidiSupport() || !hasBleSupport()) {
            call.reject("Bluetooth MIDI not supported on this device", "UNSUPPORTED");
            return;
        }
        if (!hasBluetoothScanPermission()) {
            String alias = Build.VERSION.SDK_INT >= Build.VERSION_CODES.S ? "bluetooth" : "bluetoothLegacy";
            requestPermissionForAlias(alias, call, "handleBleScanPermission");
            return;
        }
        startBleScanInternal(call);
    }

    @PermissionCallback
    private void handleBleScanPermission(PluginCall call) {
        if (hasBluetoothScanPermission()) {
            startBleScanInternal(call);
        } else {
            call.reject("Bluetooth permission denied", "PERMISSION_DENIED");
        }
    }

    @PluginMethod
    public void stopBluetoothScan(PluginCall call) {
        stopBleScanInternal();
        JSObject ret = new JSObject();
        ret.put("scanning", false);
        call.resolve(ret);
    }

    @PluginMethod
    public void connectBluetoothDevice(PluginCall call) {
        String address = call.getString("address", "");
        if (address == null || address.isEmpty()) {
            call.reject("Missing Bluetooth device address", "INVALID_ARGS");
            return;
        }
        if (!hasBluetoothScanPermission()) {
            String alias = Build.VERSION.SDK_INT >= Build.VERSION_CODES.S ? "bluetooth" : "bluetoothLegacy";
            requestPermissionForAlias(alias, call, "handleBleConnectPermission");
            return;
        }
        connectBluetoothDeviceInternal(address, call);
    }

    @PermissionCallback
    private void handleBleConnectPermission(PluginCall call) {
        if (hasBluetoothScanPermission()) {
            String address = call.getString("address", "");
            connectBluetoothDeviceInternal(address, call);
        } else {
            call.reject("Bluetooth permission denied", "PERMISSION_DENIED");
        }
    }

    @Override
    protected void handleOnDestroy() {
        stopBleScanInternal();
        closeAllDevices(true);
        synchronized (lock) {
            if (started && midiManager != null && deviceCallback != null) {
                try {
                    midiManager.unregisterDeviceCallback(deviceCallback);
                } catch (Exception ignored) {}
            }
            deviceCallback = null;
            started = false;
        }
        super.handleOnDestroy();
    }

    // ---------- Interne Helfer ----------

    private boolean hasMidiSupport() {
        Context ctx = getContext();
        if (ctx == null || Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return false;
        PackageManager pm = ctx.getPackageManager();
        return pm != null && pm.hasSystemFeature(PackageManager.FEATURE_MIDI);
    }

    private boolean hasBleSupport() {
        Context ctx = getContext();
        if (ctx == null) return false;
        PackageManager pm = ctx.getPackageManager();
        return pm != null && pm.hasSystemFeature(PackageManager.FEATURE_BLUETOOTH_LE);
    }

    private boolean hasBluetoothScanPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            return getPermissionState("bluetooth") == PermissionState.GRANTED;
        }
        return getPermissionState("bluetoothLegacy") == PermissionState.GRANTED;
    }

    private MidiManager getMidiManager() {
        if (midiManager != null) return midiManager;
        Context ctx = getContext();
        if (ctx == null) return null;
        midiManager = (MidiManager) ctx.getSystemService(Context.MIDI_SERVICE);
        return midiManager;
    }

    private void registerDeviceCallback(MidiManager mgr) {
        deviceCallback = new MidiManager.DeviceCallback() {
            @Override
            public void onDeviceAdded(MidiDeviceInfo device) {
                if (device != null) {
                    openMidiDeviceInfo(mgr, device);
                }
            }

            @Override
            public void onDeviceRemoved(MidiDeviceInfo device) {
                if (device != null) {
                    String id = String.valueOf(device.getId());
                    closeSingleDevice(id, false);
                    emitDevicesChanged();
                }
            }
        };
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            mgr.registerDeviceCallback(
                MidiManager.TRANSPORT_MIDI_BYTE_STREAM,
                mainHandler::post,
                deviceCallback
            );
        } else {
            registerDeviceCallbackLegacy(mgr, deviceCallback);
        }
    }

    @SuppressWarnings("deprecation")
    private void registerDeviceCallbackLegacy(MidiManager mgr, MidiManager.DeviceCallback cb) {
        mgr.registerDeviceCallback(cb, mainHandler);
    }

    private void openAllKnownDevices(MidiManager mgr) {
        Collection<MidiDeviceInfo> infos = getKnownMidiDevices(mgr);
        for (MidiDeviceInfo info : infos) {
            if (info != null) {
                openMidiDeviceInfo(mgr, info);
            }
        }
    }

    @SuppressWarnings("deprecation")
    private Collection<MidiDeviceInfo> getKnownMidiDevices(MidiManager mgr) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            Set<MidiDeviceInfo> set = mgr.getDevicesForTransport(MidiManager.TRANSPORT_MIDI_BYTE_STREAM);
            return set != null ? set : Collections.emptyList();
        }
        MidiDeviceInfo[] arr = mgr.getDevices();
        if (arr == null) return Collections.emptyList();
        List<MidiDeviceInfo> list = new ArrayList<>();
        Collections.addAll(list, arr);
        return list;
    }

    private void openMidiDeviceInfo(MidiManager mgr, MidiDeviceInfo info) {
        if (info.getOutputPortCount() <= 0 && info.getInputPortCount() <= 0) return;
        final String id = String.valueOf(info.getId());
        synchronized (lock) {
            if (connections.containsKey(id)) return;
        }

        Bundle props = info.getProperties();
        String name = props != null ? props.getString(MidiDeviceInfo.PROPERTY_NAME) : null;
        String product = props != null ? props.getString(MidiDeviceInfo.PROPERTY_PRODUCT) : null;
        String manufacturer = props != null ? props.getString(MidiDeviceInfo.PROPERTY_MANUFACTURER) : "";
        String displayName = (name != null && !name.trim().isEmpty())
            ? name.trim()
            : ((product != null && !product.trim().isEmpty()) ? product.trim() : ("MIDI #" + id));
        String typeStr = midiDeviceTypeToString(info.getType());

        final OpenMidiConn conn = new OpenMidiConn(id, displayName, manufacturer != null ? manufacturer : "", typeStr, info);
        synchronized (lock) {
            connections.put(id, conn);
        }

        mgr.openDevice(info, device -> {
            if (device == null) {
                synchronized (lock) {
                    connections.remove(id);
                }
                emitDevicesChanged();
                return;
            }
            attachOpenedDevice(conn, device);
        }, mainHandler);
    }

    private void attachOpenedDevice(OpenMidiConn conn, MidiDevice device) {
        synchronized (lock) {
            if (!started || connections.get(conn.id) != conn) {
                try {
                    device.close();
                } catch (IOException ignored) {}
                return;
            }
            conn.device = device;
            MidiDeviceInfo info = device.getInfo();
            int outCount = info.getOutputPortCount();
            for (int i = 0; i < outCount; i++) {
                MidiOutputPort outPort = device.openOutputPort(i);
                if (outPort != null) {
                    outPort.connect(new MidiReceiver() {
                        @Override
                        public void onSend(byte[] msg, int offset, int count, long timestamp) {
                            handleIncomingMidiPacket(conn, msg, offset, count, timestamp);
                        }
                    });
                    conn.outputPorts.add(outPort);
                }
            }
            int inCount = info.getInputPortCount();
            for (int i = 0; i < inCount; i++) {
                MidiInputPort inPort = device.openInputPort(i);
                if (inPort != null) {
                    conn.inputPorts.add(inPort);
                }
            }
        }
        emitDevicesChanged();
    }

    /**
     * Zerlegt eingehende MIDI-Byte-Pakete (inkl. Running Status & mehrere Events pro Paket)
     * in saubere Kurznachrichten und reicht Note-On/Off sowie CC-Events an JavaScript weiter.
     */
    private void handleIncomingMidiPacket(OpenMidiConn conn, byte[] msg, int offset, int count, long timestamp) {
        if (msg == null || count <= 0) return;
        int end = Math.min(msg.length, offset + count);
        int i = offset;

        while (i < end) {
            int b = msg[i] & 0xFF;

            // Echtzeit-Nachrichten (0xF8..0xFF: Clock, Active Sensing etc.) überspringen
            if (b >= 0xF8) {
                i++;
                continue;
            }

            // SysEx (0xF0 ... 0xF7) überspringen
            if (b == 0xF0) {
                conn.runningStatus = 0;
                i++;
                while (i < end && (msg[i] & 0xFF) != 0xF7) {
                    i++;
                }
                if (i < end) i++;
                continue;
            }

            // System-Common-Nachrichten (0xF1..0xF7)
            if (b >= 0xF1) {
                conn.runningStatus = 0;
                if (b == 0xF1 || b == 0xF3) i += 2;
                else if (b == 0xF2) i += 3;
                else i += 1;
                continue;
            }

            int status;
            if ((b & 0x80) != 0) {
                status = b;
                conn.runningStatus = status;
                i++;
            } else {
                status = conn.runningStatus;
                if (status == 0) {
                    i++;
                    continue;
                }
            }

            int high = status & 0xF0;
            int dataLen = (high == 0xC0 || high == 0xD0) ? 1 : 2;
            if (i + dataLen > end) break;

            int d1 = msg[i] & 0x7F;
            int d2 = (dataLen == 2) ? (msg[i + 1] & 0x7F) : 0;
            i += dataLen;

            // Nur Kanal-Nachrichten weiterleiten, die Lauscher nutzt (Note-Off, Note-On, CC)
            if (high == 0x80 || high == 0x90 || high == 0xB0) {
                JSObject payload = new JSObject();
                payload.put("status", status);
                payload.put("data1", d1);
                payload.put("data2", d2);
                payload.put("deviceId", conn.id);
                payload.put("deviceName", conn.name);
                payload.put("timestamp", timestamp);
                notifyListeners("midiMessage", payload);
            }
        }
    }

    private int sendBytesToDevices(String targetDeviceId, byte[] bytes) {
        int sent = 0;
        List<OpenMidiConn> snapshot;
        synchronized (lock) {
            snapshot = new ArrayList<>(connections.values());
        }
        for (OpenMidiConn conn : snapshot) {
            if (!"all".equals(targetDeviceId) && !conn.id.equals(targetDeviceId)) continue;
            for (MidiInputPort inPort : conn.inputPorts) {
                try {
                    inPort.send(bytes, 0, bytes.length);
                    sent++;
                } catch (IOException ignored) {}
            }
        }
        return sent;
    }

    // Wartezeit zwischen dem Senden von Local Control On und dem Schließen: Der Treiber bzw. der
    // Bluetooth-MIDI-Dienst verschickt die Bytes asynchron. Schließen wir Ports/Gerät sofort, kann
    // CC 122 = 127 verloren gehen und das Instrument bleibt stumm. BLE braucht mehrere
    // Verbindungsintervalle (48 Bytes ≈ 3–5 BLE-Pakete), USB nur einen kurzen Moment.
    private static final long LOCAL_CONTROL_RESTORE_WAIT_USB_MS = 40;
    private static final long LOCAL_CONTROL_RESTORE_WAIT_BLE_MS = 300;

    private void closeSingleDevice(String id, boolean restoreLocalControl) {
        OpenMidiConn conn;
        synchronized (lock) {
            conn = connections.remove(id);
        }
        if (conn == null) return;
        List<OpenMidiConn> single = new ArrayList<>();
        single.add(conn);
        closeConnections(single, restoreLocalControl);
    }

    private void closeAllDevices(boolean restoreLocalControl) {
        List<OpenMidiConn> snapshot;
        synchronized (lock) {
            snapshot = new ArrayList<>(connections.values());
            connections.clear();
        }
        closeConnections(snapshot, restoreLocalControl);
    }

    /**
     * Schickt (falls gewünscht) Local Control On an alle Verbindungen, wartet einmal gemeinsam,
     * bis die Bytes draußen sind, und schließt erst dann Ports und Geräte.
     */
    private void closeConnections(List<OpenMidiConn> conns, boolean restoreLocalControl) {
        if (conns.isEmpty()) return;
        long waitMs = 0;
        if (restoreLocalControl) {
            for (OpenMidiConn conn : conns) {
                if (sendLocalControlRestore(conn)) {
                    long connWait = "bluetooth".equals(conn.type)
                        ? LOCAL_CONTROL_RESTORE_WAIT_BLE_MS
                        : LOCAL_CONTROL_RESTORE_WAIT_USB_MS;
                    waitMs = Math.max(waitMs, connWait);
                }
            }
        }
        if (waitMs > 0) {
            try {
                Thread.sleep(waitMs);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        for (OpenMidiConn conn : conns) {
            closeConnectionResources(conn);
        }
    }

    /** Local Control On (CC 122 = 127) wie in js/midi.js auf allen 16 Kanälen. true = mindestens ein Port hat gesendet. */
    private boolean sendLocalControlRestore(OpenMidiConn conn) {
        if (conn.inputPorts.isEmpty()) return false;
        byte[] restore = new byte[48];
        for (int ch = 0; ch < 16; ch++) {
            restore[ch * 3] = (byte) (0xB0 | ch);
            restore[ch * 3 + 1] = 122;
            restore[ch * 3 + 2] = 127;
        }
        boolean sent = false;
        for (MidiInputPort inPort : conn.inputPorts) {
            try {
                inPort.send(restore, 0, restore.length);
                sent = true;
            } catch (IOException ignored) {}
        }
        return sent;
    }

    private void closeConnectionResources(OpenMidiConn conn) {
        for (MidiOutputPort p : conn.outputPorts) {
            try { p.close(); } catch (IOException ignored) {}
        }
        conn.outputPorts.clear();
        for (MidiInputPort p : conn.inputPorts) {
            try { p.close(); } catch (IOException ignored) {}
        }
        conn.inputPorts.clear();
        if (conn.device != null) {
            try { conn.device.close(); } catch (IOException ignored) {}
            conn.device = null;
        }
        if (conn.keepAliveDevice != null) {
            try { conn.keepAliveDevice.close(); } catch (IOException ignored) {}
            conn.keepAliveDevice = null;
        }
    }

    private JSArray buildDeviceListJson() {
        JSArray list = new JSArray();
        synchronized (lock) {
            for (OpenMidiConn conn : connections.values()) {
                if (conn.device == null) continue;
                JSObject obj = new JSObject();
                obj.put("id", conn.id);
                obj.put("name", conn.name);
                obj.put("manufacturer", conn.manufacturer);
                obj.put("type", conn.type);
                obj.put("hasInput", !conn.outputPorts.isEmpty());
                obj.put("hasOutput", !conn.inputPorts.isEmpty());
                list.put(obj);
            }
        }
        return list;
    }

    private void emitDevicesChanged() {
        JSObject payload = new JSObject();
        payload.put("devices", buildDeviceListJson());
        notifyListeners("midiDevicesChanged", payload);
    }

    private String midiDeviceTypeToString(int type) {
        if (type == MidiDeviceInfo.TYPE_USB) return "usb";
        if (type == MidiDeviceInfo.TYPE_BLUETOOTH) return "bluetooth";
        return "virtual";
    }

    // ---------- Bluetooth-LE-MIDI-Suche & Verbindung ----------

    @SuppressLint("MissingPermission")
    private void startBleScanInternal(PluginCall call) {
        Context ctx = getContext();
        if (ctx == null) {
            call.reject("Context unavailable", "UNSUPPORTED");
            return;
        }
        BluetoothManager btMgr = (BluetoothManager) ctx.getSystemService(Context.BLUETOOTH_SERVICE);
        BluetoothAdapter adapter = btMgr != null ? btMgr.getAdapter() : null;
        if (adapter == null || !adapter.isEnabled()) {
            call.reject("Bluetooth is disabled", "BLUETOOTH_OFF");
            return;
        }
        BluetoothLeScanner scanner = adapter.getBluetoothLeScanner();
        if (scanner == null) {
            call.reject("BLE scanner unavailable", "BLUETOOTH_OFF");
            return;
        }

        stopBleScanInternal();
        discoveredBleDevices.clear();

        // Bereits gekoppelte Bluetooth-Geräte als schnelle Kandidaten nicht blind hinzufügen,
        // sondern gezielt nach dem offiziellen BLE-MIDI-GATT-Service filtern.
        ScanFilter filter = new ScanFilter.Builder()
            .setServiceUuid(new ParcelUuid(BLE_MIDI_SERVICE_UUID))
            .build();
        ScanSettings settings = new ScanSettings.Builder()
            .setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
            .build();

        final Set<String> seen = new HashSet<>();
        activeBleCallback = new ScanCallback() {
            @Override
            public void onScanResult(int callbackType, ScanResult result) {
                if (result == null || result.getDevice() == null) return;
                BluetoothDevice dev = result.getDevice();
                String addr = dev.getAddress();
                if (addr == null || addr.isEmpty() || seen.contains(addr)) return;
                seen.add(addr);
                discoveredBleDevices.put(addr, dev);
                String name = dev.getName();
                if (name == null || name.trim().isEmpty()) {
                    name = result.getScanRecord() != null ? result.getScanRecord().getDeviceName() : null;
                }
                if (name == null || name.trim().isEmpty()) {
                    name = "Bluetooth MIDI (" + addr + ")";
                }
                JSObject payload = new JSObject();
                payload.put("address", addr);
                payload.put("name", name.trim());
                notifyListeners("bleDeviceFound", payload);
            }

            @Override
            public void onScanFailed(int errorCode) {
                bleScanning = false;
                JSObject payload = new JSObject();
                payload.put("scanning", false);
                payload.put("errorCode", errorCode);
                notifyListeners("bleScanState", payload);
            }
        };

        activeBleScanner = scanner;
        bleScanning = true;
        scanner.startScan(Collections.singletonList(filter), settings, activeBleCallback);

        // Suche nach 12 Sekunden automatisch beenden (spart Akku)
        bleScanStopRunnable = () -> stopBleScanInternal();
        mainHandler.postDelayed(bleScanStopRunnable, 12000);

        JSObject ret = new JSObject();
        ret.put("scanning", true);
        call.resolve(ret);
    }

    @SuppressLint("MissingPermission")
    private void stopBleScanInternal() {
        if (bleScanStopRunnable != null) {
            mainHandler.removeCallbacks(bleScanStopRunnable);
            bleScanStopRunnable = null;
        }
        if (bleScanning && activeBleScanner != null && activeBleCallback != null) {
            try {
                activeBleScanner.stopScan(activeBleCallback);
            } catch (Exception ignored) {}
        }
        bleScanning = false;
        activeBleCallback = null;
        activeBleScanner = null;

        JSObject payload = new JSObject();
        payload.put("scanning", false);
        notifyListeners("bleScanState", payload);
    }

    @SuppressLint("MissingPermission")
    private void connectBluetoothDeviceInternal(String address, PluginCall call) {
        MidiManager mgr = getMidiManager();
        if (mgr == null) {
            call.reject("MidiManager unavailable", "UNSUPPORTED");
            return;
        }
        stopBleScanInternal();

        BluetoothDevice btDev = discoveredBleDevices.get(address);
        if (btDev == null) {
            Context ctx = getContext();
            BluetoothManager btMgr = ctx != null ? (BluetoothManager) ctx.getSystemService(Context.BLUETOOTH_SERVICE) : null;
            BluetoothAdapter adapter = btMgr != null ? btMgr.getAdapter() : null;
            if (adapter != null) {
                try {
                    btDev = adapter.getRemoteDevice(address);
                } catch (IllegalArgumentException ignored) {}
            }
        }
        if (btDev == null) {
            call.reject("Bluetooth device not found", "NOT_FOUND");
            return;
        }

        final String btName = (btDev.getName() != null && !btDev.getName().trim().isEmpty())
            ? btDev.getName().trim()
            : ("Bluetooth MIDI (" + address + ")");

        synchronized (lock) {
            if (!started) {
                started = true;
                registerDeviceCallback(mgr);
            }
        }

        mgr.openBluetoothDevice(btDev, device -> {
            if (device == null) {
                call.reject("Could not connect Bluetooth MIDI device", "CONNECT_FAILED");
                return;
            }
            MidiDeviceInfo info = device.getInfo();
            String id = String.valueOf(info.getId());
            // MidiManager meldet das neue BLE-Gerät zusätzlich über onDeviceAdded. Je nach Reihenfolge
            // ist es dort schon (fertig oder gerade) geöffnet worden – dann nicht doppelt öffnen.
            boolean attachNew;
            OpenMidiConn conn;
            synchronized (lock) {
                OpenMidiConn existing = connections.get(id);
                if (existing != null && existing.device != null) {
                    // Schon über onDeviceAdded verbunden: diesen Handle nur als Verbindungshalter behalten
                    if (existing.keepAliveDevice == null) {
                        existing.keepAliveDevice = device;
                    } else {
                        try { device.close(); } catch (IOException ignored) {}
                    }
                    conn = existing;
                    attachNew = false;
                } else {
                    // Noch nicht (fertig) geöffnet: dieser Handle übernimmt; ein parallel laufendes
                    // openDevice() erkennt in attachOpenedDevice die ersetzte Verbindung und schließt sich.
                    conn = new OpenMidiConn(id, btName, "", "bluetooth", info);
                    connections.put(id, conn);
                    attachNew = true;
                }
            }
            if (attachNew) {
                attachOpenedDevice(conn, device);
            } else {
                emitDevicesChanged();
            }
            JSObject ret = new JSObject();
            ret.put("connected", true);
            ret.put("deviceId", id);
            ret.put("name", btName);
            ret.put("devices", buildDeviceListJson());
            call.resolve(ret);
        }, mainHandler);
    }
}
