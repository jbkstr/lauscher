package de.jbkstr.lauscher;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.media.AudioDeviceInfo;
import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioRecord;
import android.media.MediaRecorder;
import android.os.Build;
import android.os.Process;
import android.util.Base64;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import java.util.ArrayList;
import java.util.List;

/**
 * Lauscher • Natives Android-Rohmikrofon-Plugin für den chromatischen Tuner.
 *
 * Öffnet AudioRecord gezielt mit MediaRecorder.AudioSource.UNPROCESSED (ab API 24),
 * damit Android weder Noise Suppression noch Echo Cancellation oder AGC anwendet.
 * Fällt auf älteren oder eingeschränkten Geräten sauber auf VOICE_RECOGNITION → MIC zurück.
 */
@CapacitorPlugin(
    name = "RawAudioTuner",
    permissions = {
        @Permission(alias = "microphone", strings = { Manifest.permission.RECORD_AUDIO })
    }
)
public class RawAudioTunerPlugin extends Plugin {

    private static final int RING_SIZE = 8192;
    private static final int[] SAMPLE_RATES = new int[] { 48000, 44100 };
    private static final double HP_HZ = 25.0;
    private static final double LP_HZ = 4200.0;
    private static final double BW4_Q1 = 0.5411961;
    private static final double BW4_Q2 = 1.3065630;

    private static final class Biquad {
        final double b0, b1, b2, a1, a2;
        double x1 = 0, x2 = 0, y1 = 0, y2 = 0;

        Biquad(boolean highpass, double fc, double q, double sr) {
            double clamped = Math.max(5.0, Math.min(sr * 0.45, fc));
            double w0 = (2.0 * Math.PI * clamped) / sr;
            double cosW = Math.cos(w0);
            double alpha = Math.sin(w0) / (2.0 * q);
            double nb0, nb1, nb2;
            if (highpass) {
                nb0 = (1.0 + cosW) * 0.5;
                nb1 = -(1.0 + cosW);
                nb2 = (1.0 + cosW) * 0.5;
            } else {
                nb0 = (1.0 - cosW) * 0.5;
                nb1 = 1.0 - cosW;
                nb2 = (1.0 - cosW) * 0.5;
            }
            double a0 = 1.0 + alpha;
            this.b0 = nb0 / a0;
            this.b1 = nb1 / a0;
            this.b2 = nb2 / a0;
            this.a1 = (-2.0 * cosW) / a0;
            this.a2 = (1.0 - alpha) / a0;
        }

        double process(double x0) {
            double y0 = b0 * x0 + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
            x2 = x1;
            x1 = x0;
            y2 = y1;
            y1 = y0;
            return y0;
        }
    }

    private final Object ringLock = new Object();
    private final short[] ringBuffer = new short[RING_SIZE];
    private final byte[] readBytes = new byte[RING_SIZE * 2];
    private int ringWritePos = 0;
    private long totalSamples = 0;

    private volatile boolean running = false;
    private AudioRecord audioRecord = null;
    private Thread captureThread = null;
    private int activeSampleRate = 48000;
    private String activeSourceName = "unprocessed";
    private boolean activeBluetoothMic = false;
    private String activeDeviceName = "";

    @PluginMethod
    public void start(PluginCall call) {
        if (getPermissionState("microphone") != PermissionState.GRANTED) {
            requestPermissionForAlias("microphone", call, "handleMicPermissionResult");
            return;
        }
        startCaptureInternal(call);
    }

    @PermissionCallback
    private void handleMicPermissionResult(PluginCall call) {
        if (getPermissionState("microphone") == PermissionState.GRANTED) {
            startCaptureInternal(call);
        } else {
            call.reject("Microphone permission denied", "PERMISSION_DENIED");
        }
    }

    @SuppressLint("MissingPermission")
    private void startCaptureInternal(PluginCall call) {
        stopCaptureInternal();

        int[] candidateSources = buildSourceFallbackOrder();
        int[] candidateRates = buildSampleRateOrder();
        AudioDeviceInfo builtInMic = findBuiltInMic();
        AudioRecord created = null;
        int chosenRate = 48000;
        String chosenSource = "mic";
        int readChunk = 960;

        for (int source : candidateSources) {
            for (int rate : candidateRates) {
                int minBuf = AudioRecord.getMinBufferSize(
                    rate,
                    AudioFormat.CHANNEL_IN_MONO,
                    AudioFormat.ENCODING_PCM_16BIT
                );
                if (minBuf == AudioRecord.ERROR || minBuf == AudioRecord.ERROR_BAD_VALUE || minBuf <= 0) {
                    continue;
                }
                int bufBytes = Math.max(minBuf * 2, 4096 * 2);
                AudioRecord candidate = null;
                try {
                    candidate = new AudioRecord(
                        source,
                        rate,
                        AudioFormat.CHANNEL_IN_MONO,
                        AudioFormat.ENCODING_PCM_16BIT,
                        bufBytes
                    );
                    if (candidate.getState() == AudioRecord.STATE_INITIALIZED) {
                        if (builtInMic != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                            try {
                                candidate.setPreferredDevice(builtInMic);
                            } catch (Exception ignored) {}
                        }
                        candidate.startRecording();
                        if (candidate.getRecordingState() == AudioRecord.RECORDSTATE_RECORDING) {
                            created = candidate;
                            chosenRate = rate;
                            chosenSource = sourceName(source);
                            // ~20 ms Hop-Fortschritt im Ringpuffer für flüssige 20–30 ms Auswertung
                            int targetChunk = (int) Math.round(rate * 0.020);
                            readChunk = Math.max(512, Math.min(2048, targetChunk));
                            break;
                        }
                    }
                } catch (Exception ignored) {
                    // Nächste Kombination probieren
                }
                if (candidate != null) {
                    try {
                        candidate.release();
                    } catch (Exception ignored) {}
                }
            }
            if (created != null) break;
        }

        if (created == null) {
            call.reject("Could not initialize AudioRecord", "INIT_FAILED");
            return;
        }

        synchronized (ringLock) {
            for (int i = 0; i < RING_SIZE; i++) ringBuffer[i] = 0;
            ringWritePos = 0;
            totalSamples = 0;
        }

        audioRecord = created;
        activeSampleRate = chosenRate;
        activeSourceName = chosenSource;
        activeBluetoothMic = isBluetoothInputActive(created);
        activeDeviceName = getRoutedDeviceLabel(created);
        running = true;

        final AudioRecord rec = created;
        final int chunkLen = readChunk;
        final double sr = chosenRate;
        final Biquad[] bandpass = new Biquad[] {
            new Biquad(true, HP_HZ, BW4_Q1, sr),
            new Biquad(true, HP_HZ, BW4_Q2, sr),
            new Biquad(false, LP_HZ, BW4_Q1, sr),
            new Biquad(false, LP_HZ, BW4_Q2, sr)
        };
        captureThread = new Thread(() -> {
            try {
                Process.setThreadPriority(Process.THREAD_PRIORITY_AUDIO);
            } catch (Exception ignored) {}
            short[] local = new short[chunkLen];
            while (running) {
                int read;
                try {
                    read = rec.read(local, 0, local.length);
                } catch (Exception e) {
                    break;
                }
                if (read > 0) {
                    // Kontinuierlicher 4.-Ordnung-Butterworth-Bandpass (25 Hz – 4,2 kHz) im laufenden Stream
                    for (int i = 0; i < read; i++) {
                        double v = local[i] / 32768.0;
                        v = bandpass[0].process(v);
                        v = bandpass[1].process(v);
                        v = bandpass[2].process(v);
                        v = bandpass[3].process(v);
                        int q = (int) Math.round(Math.max(-1.0, Math.min(1.0, v)) * 32767.0);
                        local[i] = (short) q;
                    }
                    synchronized (ringLock) {
                        for (int i = 0; i < read; i++) {
                            ringBuffer[ringWritePos] = local[i];
                            ringWritePos = (ringWritePos + 1) % RING_SIZE;
                        }
                        totalSamples += read;
                    }
                } else if (read < 0) {
                    break;
                }
            }
        }, "lauscher-tuner-raw-audio");
        captureThread.start();

        JSObject res = new JSObject();
        res.put("sampleRate", activeSampleRate);
        res.put("source", activeSourceName);
        res.put("bufferSize", RING_SIZE);
        res.put("bandpassApplied", true);
        res.put("bluetoothMic", activeBluetoothMic);
        res.put("deviceName", activeDeviceName);
        call.resolve(res);
    }

    @PluginMethod
    public void readBuffer(PluginCall call) {
        if (!running) {
            JSObject res = new JSObject();
            res.put("running", false);
            call.resolve(res);
            return;
        }

        long lastSeq = call.getLong("lastSeq", -1L);
        long seq;
        String encoded;

        synchronized (ringLock) {
            seq = totalSamples;
            if (seq < 1024 || seq == lastSeq) {
                JSObject res = new JSObject();
                res.put("running", true);
                res.put("unchanged", true);
                res.put("seq", seq);
                res.put("sampleRate", activeSampleRate);
                call.resolve(res);
                return;
            }
            int idx = ringWritePos;
            for (int i = 0; i < RING_SIZE; i++) {
                short s = ringBuffer[idx];
                readBytes[2 * i] = (byte) (s & 0xff);
                readBytes[2 * i + 1] = (byte) ((s >>> 8) & 0xff);
                idx++;
                if (idx == RING_SIZE) idx = 0;
            }
            encoded = Base64.encodeToString(readBytes, Base64.NO_WRAP);
        }

        JSObject res = new JSObject();
        res.put("running", true);
        res.put("unchanged", false);
        res.put("seq", seq);
        res.put("sampleRate", activeSampleRate);
        res.put("source", activeSourceName);
        res.put("bandpassApplied", true);
        res.put("pcm16Base64", encoded);
        call.resolve(res);
    }

    @PluginMethod
    public void stop(PluginCall call) {
        stopCaptureInternal();
        call.resolve();
    }

    @Override
    protected void handleOnPause() {
        stopCaptureInternal();
        super.handleOnPause();
    }

    @Override
    protected void handleOnDestroy() {
        stopCaptureInternal();
        super.handleOnDestroy();
    }

    private void stopCaptureInternal() {
        running = false;
        AudioRecord rec = audioRecord;
        audioRecord = null;
        if (rec != null) {
            try {
                rec.stop();
            } catch (Exception ignored) {}
        }
        Thread t = captureThread;
        captureThread = null;
        if (t != null) {
            try {
                t.join(250);
            } catch (InterruptedException ignored) {
                Thread.currentThread().interrupt();
            }
        }
        if (rec != null) {
            try {
                rec.release();
            } catch (Exception ignored) {}
        }
    }

    private int[] buildSourceFallbackOrder() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            boolean supportsUnprocessed = false;
            try {
                AudioManager am = (AudioManager) getContext().getSystemService(Context.AUDIO_SERVICE);
                if (am != null) {
                    String prop = am.getProperty(AudioManager.PROPERTY_SUPPORT_AUDIO_SOURCE_UNPROCESSED);
                    supportsUnprocessed = "true".equalsIgnoreCase(prop);
                }
            } catch (Exception ignored) {}
            if (supportsUnprocessed) {
                return new int[] {
                    MediaRecorder.AudioSource.UNPROCESSED,
                    MediaRecorder.AudioSource.VOICE_RECOGNITION,
                    MediaRecorder.AudioSource.MIC
                };
            }
            // Auch ohne PROPERTY-Flag zuerst UNPROCESSED versuchen (einige Geräte liefern es dennoch sauber)
            return new int[] {
                MediaRecorder.AudioSource.UNPROCESSED,
                MediaRecorder.AudioSource.VOICE_RECOGNITION,
                MediaRecorder.AudioSource.MIC
            };
        }
        return new int[] {
            MediaRecorder.AudioSource.VOICE_RECOGNITION,
            MediaRecorder.AudioSource.MIC
        };
    }

    private int[] buildSampleRateOrder() {
        List<Integer> rates = new ArrayList<>();
        try {
            AudioManager am = (AudioManager) getContext().getSystemService(Context.AUDIO_SERVICE);
            if (am != null) {
                String prop = am.getProperty(AudioManager.PROPERTY_OUTPUT_SAMPLE_RATE);
                if (prop != null) {
                    int nativeRate = Integer.parseInt(prop.trim());
                    if (nativeRate >= 22050 && nativeRate <= 96000) {
                        rates.add(nativeRate);
                    }
                }
            }
        } catch (Exception ignored) {}
        for (int r : SAMPLE_RATES) {
            if (!rates.contains(r)) rates.add(r);
        }
        int[] out = new int[rates.size()];
        for (int i = 0; i < rates.size(); i++) out[i] = rates.get(i);
        return out;
    }

    private AudioDeviceInfo findBuiltInMic() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return null;
        try {
            AudioManager am = (AudioManager) getContext().getSystemService(Context.AUDIO_SERVICE);
            if (am == null) return null;
            AudioDeviceInfo[] inputs = am.getDevices(AudioManager.GET_DEVICES_INPUTS);
            for (AudioDeviceInfo dev : inputs) {
                if (dev != null && dev.getType() == AudioDeviceInfo.TYPE_BUILTIN_MIC) {
                    return dev;
                }
            }
        } catch (Exception ignored) {}
        return null;
    }

    private boolean isBluetoothInputActive(AudioRecord rec) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N && rec != null) {
                AudioDeviceInfo routed = rec.getRoutedDevice();
                if (routed != null) {
                    int type = routed.getType();
                    if (type == AudioDeviceInfo.TYPE_BLUETOOTH_SCO) return true;
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && type == AudioDeviceInfo.TYPE_BLE_HEADSET) {
                        return true;
                    }
                    return false;
                }
            }
            AudioManager am = (AudioManager) getContext().getSystemService(Context.AUDIO_SERVICE);
            if (am != null && am.isBluetoothScoOn()) return true;
        } catch (Exception ignored) {}
        return false;
    }

    private String getRoutedDeviceLabel(AudioRecord rec) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N && rec != null) {
                AudioDeviceInfo routed = rec.getRoutedDevice();
                if (routed != null && routed.getProductName() != null) {
                    return routed.getProductName().toString();
                }
            }
        } catch (Exception ignored) {}
        return "";
    }

    private String sourceName(int source) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N && source == MediaRecorder.AudioSource.UNPROCESSED) {
            return "unprocessed";
        }
        if (source == MediaRecorder.AudioSource.VOICE_RECOGNITION) {
            return "voice_recognition";
        }
        return "mic";
    }
}
