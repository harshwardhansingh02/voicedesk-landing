"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const WS_BASE =
  (process.env.NEXT_PUBLIC_DEMO_WS_URL || "ws://localhost:8081").replace(/\/$/, "");
const HTTP_BASE = WS_BASE.replace("wss://", "https://").replace("ws://", "http://");

const VAD_MS      = 1500;
const THRESH      = 0.015;
const BARGE_IN_MS = 300;
const TTS_RATE    = 22050;

type Persona = { id: string; name: string; gender: string; style: string[] };
type CallState = "idle" | "listening" | "thinking" | "speaking";
type Message = { role: string; text: string };
type BookingProgress = {
  name: boolean; date: boolean; time: boolean;
  guests: boolean; preference: boolean; confirmed: boolean;
};

const BOOKING_STEPS = [
  { id: "name",       label: "Name"       },
  { id: "date",       label: "Date"       },
  { id: "time",       label: "Time"       },
  { id: "guests",     label: "Pax"        },
  { id: "preference", label: "Seating"    },
  { id: "confirmed",  label: "Confirmed"  },
] as const;

const EMPTY_PROGRESS: BookingProgress = {
  name: false, date: false, time: false,
  guests: false, preference: false, confirmed: false,
};

const ANIM_CSS = `
@keyframes voiceBar   { 0%,100%{height:4px}  50%{height:16px} }
@keyframes idlePulse  { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.04);opacity:.7} }
@keyframes orbListen  { 0%,100%{transform:scale(1)} 25%{transform:scale(1.06)} 75%{transform:scale(.97)} }
@keyframes orbSpeak   { 0%,100%{transform:scale(1)} 20%{transform:scale(1.12)} 60%{transform:scale(.94)} 80%{transform:scale(1.08)} }
@keyframes thinkSpin  { to{transform:rotate(360deg)} }
@keyframes rippleOut  { 0%{transform:scale(1);opacity:.55} 100%{transform:scale(2.4);opacity:0} }
@keyframes barListen  { 0%,100%{height:4px;opacity:.4}  50%{height:22px;opacity:1} }
@keyframes barSpeak   { 0%,100%{height:6px;opacity:.6}  50%{height:28px;opacity:1} }
`;

const ORB_STYLE: Record<CallState, React.CSSProperties> = {
  idle:      { border: "2px solid #378ADD", animation: "idlePulse 3s ease-in-out infinite" },
  listening: { border: "2px solid #4a9eff", boxShadow: "0 0 0 3px rgba(74,158,255,0.15)", animation: "orbListen 1.8s ease-in-out infinite" },
  thinking:  { border: "2px solid #f59e0b", boxShadow: "0 0 0 3px rgba(245,158,11,0.12)",  animation: "idlePulse 2.5s ease-in-out infinite" },
  speaking:  { border: "2px solid #10b981", boxShadow: "0 0 0 3px rgba(16,185,129,0.15)", animation: "orbSpeak 0.9s ease-in-out infinite" },
};

const STATE_LABEL: Record<CallState, { text: string; color: string }> = {
  idle:      { text: "",             color: "#4a9eff" },
  listening: { text: "Listening...", color: "#4a9eff" },
  thinking:  { text: "Thinking...",  color: "#f59e0b" },
  speaking:  { text: "Speaking",     color: "#10b981" },
};

function getRippleStyle(callState: CallState, delay: string): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute", width: 140, height: 140,
    borderRadius: "50%", pointerEvents: "none",
  };
  if (callState === "listening")
    return { ...base, background: "rgba(74,158,255,0.35)", animation: `rippleOut 1.6s ease-out ${delay} infinite` };
  if (callState === "speaking")
    return { ...base, background: "rgba(16,185,129,0.35)", animation: `rippleOut 1.2s ease-out ${delay} infinite` };
  return { ...base, opacity: 0 };
}

function getBarStyle(callState: CallState, i: number): React.CSSProperties {
  const base: React.CSSProperties = { width: 3, borderRadius: 2, alignSelf: "center" };
  if (callState === "listening")
    return { ...base, height: 4, background: "#93c5fd", animation: `barListen ${0.7 + i * 0.08}s ease-in-out ${i * 0.12}s infinite` };
  if (callState === "speaking")
    return { ...base, height: 6, background: "#6ee7b7", animation: `barSpeak ${0.45 + i * 0.06}s ease-in-out ${i * 0.08}s infinite` };
  return { ...base, height: 4, opacity: 0 };
}

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  return `${m}:${(s % 60).toString().padStart(2, "0")}`;
}

export default function VoiceDemoWidget() {
  const [personas, setPersonas]         = useState<Persona[]>([]);
  const [selectedId, setSelectedId]     = useState<string | null>(null);
  const [callActive, setCallActive]     = useState(false);
  const [callState, setCallState]       = useState<CallState>("idle");
  const [transcript, setTranscript]     = useState<Message[]>([]);
  const [error, setError]               = useState<string | null>(null);
  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const [muted, setMuted]               = useState(false);
  const [elapsed, setElapsed]           = useState(0);
  const [bookingProgress, setBookingProgress] = useState<BookingProgress>(EMPTY_PROGRESS);

  const wsRef          = useRef<WebSocket | null>(null);
  const captureCtxRef  = useRef<AudioContext | null>(null);
  const playCtxRef     = useRef<AudioContext | null>(null);
  const processorRef   = useRef<ScriptProcessorNode | null>(null);
  const sourceRef      = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef      = useRef<MediaStream | null>(null);
  const nextPlayAtRef  = useRef(0);
  const botSpeakingRef = useRef(false);
  const bargeInRef     = useRef<number | null>(null);
  const callActiveRef  = useRef(false);
  const callStateRef   = useRef<CallState>("idle");
  const mutedRef       = useRef(false);
  const previewRef     = useRef<HTMLAudioElement | null>(null);
  const transcriptRef  = useRef<HTMLDivElement>(null);
  const timerRef       = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { callActiveRef.current = callActive; }, [callActive]);
  useEffect(() => { callStateRef.current  = callState;  }, [callState]);
  useEffect(() => { mutedRef.current      = muted;      }, [muted]);

  useEffect(() => {
    fetch(`${HTTP_BASE}/personas`)
      .then(r => r.json())
      .then((data: Persona[]) => {
        setPersonas(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(() => setError("Could not load personas. Is the demo server running?"));
  }, []);

  useEffect(() => {
    if (transcriptRef.current)
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
  }, [transcript]);

  const setState = useCallback((s: CallState) => {
    setCallState(s);
    callStateRef.current = s;
  }, []);

  const enqueuePCM = useCallback((buffer: ArrayBuffer) => {
    if (!playCtxRef.current) return;
    const int16   = new Int16Array(buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768;
    const ab  = playCtxRef.current.createBuffer(1, float32.length, TTS_RATE);
    ab.copyToChannel(float32, 0);
    const src = playCtxRef.current.createBufferSource();
    src.buffer = ab;
    src.connect(playCtxRef.current.destination);
    const now     = playCtxRef.current.currentTime;
    const startAt = Math.max(nextPlayAtRef.current, now + 0.02);
    src.start(startAt);
    nextPlayAtRef.current = startAt + ab.duration;
  }, []);

  const stopMic = useCallback(() => {
    processorRef.current?.disconnect();  processorRef.current = null;
    sourceRef.current?.disconnect();     sourceRef.current    = null;
    streamRef.current?.getTracks().forEach(t => t.stop()); streamRef.current = null;
    captureCtxRef.current?.close();      captureCtxRef.current = null;
    playCtxRef.current?.close();         playCtxRef.current    = null;
  }, []);

  const endCall = useCallback(() => {
    callActiveRef.current = false;
    setCallActive(false);
    if (wsRef.current) { wsRef.current.close(); wsRef.current = null; }
    stopMic();
    setState("idle");
    nextPlayAtRef.current  = 0;
    botSpeakingRef.current = false;
    setMuted(false);
    setElapsed(0);
    setTranscript([]);
    setBookingProgress(EMPTY_PROGRESS);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, [stopMic, setState]);

  const handleMessage = useCallback((evt: MessageEvent) => {
    if (evt.data instanceof ArrayBuffer) {
      if (evt.data.byteLength > 0) enqueuePCM(evt.data);
      return;
    }
    const msg = JSON.parse(evt.data);
    if (msg.type === "state") {
      setState(msg.state as CallState);
      botSpeakingRef.current = msg.state === "speaking";
      if (msg.state === "listening") nextPlayAtRef.current = 0;
    } else if (msg.type === "transcript") {
      setTranscript(prev => [...prev, { role: msg.role, text: msg.text }]);
    } else if (msg.type === "audio_done") {
      botSpeakingRef.current = false;
    } else if (msg.type === "booking") {
      setBookingProgress(prev => ({ ...prev, [msg.field]: msg.value }));
    } else if (msg.type === "call_ended") {
      endCall();
    }
  }, [enqueuePCM, setState, endCall]);

  const startCall = useCallback(async () => {
    if (!selectedId) return;
    setError(null);
    setTranscript([]);
    setCallActive(true);
    callActiveRef.current = true;
    setState("listening");
    setBookingProgress(EMPTY_PROGRESS);
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed(prev => prev + 1), 1000);

    // Safari requires real audio output synchronously in the gesture handler — silent buffer unlocks context
    const AudioCtx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    playCtxRef.current = new AudioCtx({ sampleRate: TTS_RATE });
    const silentBuf = playCtxRef.current.createBuffer(1, 1, TTS_RATE);
    const silentSrc = playCtxRef.current.createBufferSource();
    silentSrc.buffer = silentBuf;
    silentSrc.connect(playCtxRef.current.destination);
    silentSrc.start(0);

    const ws = new WebSocket(`${WS_BASE}/ws?persona=${selectedId}`);
    ws.binaryType = "arraybuffer";
    ws.onmessage  = handleMessage;
    ws.onclose    = () => { if (callActiveRef.current) endCall(); };
    ws.onerror    = () => setError("Connection lost. Please try again.");
    wsRef.current = ws;

    try {
      const s = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        video: false,
      });
      streamRef.current     = s;
      captureCtxRef.current = new AudioContext({ sampleRate: 16000 });

      const source    = captureCtxRef.current.createMediaStreamSource(s);
      const processor = captureCtxRef.current.createScriptProcessor(512, 1, 1);
      source.connect(processor);
      processor.connect(captureCtxRef.current.destination);
      sourceRef.current    = source;
      processorRef.current = processor;

      let silenceStart: number | null = null;
      let userSpeaking = false;

      processor.onaudioprocess = (e) => {
        if (!callActiveRef.current || callStateRef.current === "thinking") return;
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        if (mutedRef.current) return;

        const pcm    = e.inputBuffer.getChannelData(0);
        const rms    = Math.sqrt(pcm.reduce((s, v) => s + v * v, 0) / pcm.length);
        const speech = rms > THRESH;

        if (botSpeakingRef.current) {
          if (speech) {
            bargeInRef.current = bargeInRef.current ?? Date.now();
            if (Date.now() - bargeInRef.current! >= BARGE_IN_MS) {
              wsRef.current!.send(JSON.stringify({ type: "barge_in" }));
              botSpeakingRef.current = false;
              bargeInRef.current     = null;
            }
          } else { bargeInRef.current = null; }
        }

        if (callStateRef.current !== "listening" && callStateRef.current !== "speaking") return;
        const int16 = new Int16Array(pcm.length);
        for (let i = 0; i < pcm.length; i++)
          int16[i] = Math.max(-32768, Math.min(32767, pcm[i] * 32768));
        wsRef.current!.send(int16.buffer);

        if (speech) { silenceStart = null; userSpeaking = true; }
        else if (userSpeaking) {
          silenceStart = silenceStart ?? Date.now();
          if (Date.now() - silenceStart! >= VAD_MS) {
            wsRef.current!.send(JSON.stringify({ type: "end_of_speech" }));
            userSpeaking = false; silenceStart = null;
          }
        }
      };
    } catch (err: any) {
      endCall();
      setError(
        err.name === "NotAllowedError"
          ? "⚠ Mic access needed — please allow microphone access and try again."
          : "Could not start call. Please check your microphone."
      );
    }
  }, [selectedId, handleMessage, endCall, setState]);

  const previewVoice = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (previewRef.current) { previewRef.current.pause(); previewRef.current = null; }
    if (previewingId === id) { setPreviewingId(null); return; }
    setPreviewingId(id);
    const audio = new Audio(`${HTTP_BASE}/preview/${id}`);
    previewRef.current = audio;
    audio.onended = audio.onerror = () => setPreviewingId(null);
    audio.play();
  }, [previewingId]);

  useEffect(() => () => { endCall(); }, []);

  useEffect(() => {
    (window as any).__voicedesk = {
      setCallState: setState,
      addMessage: (role: string, text: string) =>
        setTranscript(prev => [...prev, { role, text }]),
      setBookingProgress,
    };
  }, [setState]);

  const selectedPersona = personas.find(p => p.id === selectedId);
  const showWaveform    = callState === "listening" || callState === "speaking";
  const showThinkRing   = callState === "thinking";
  const showInitial     = callState === "idle" || callState === "thinking";

  return (
    <>
      <style>{ANIM_CSS}</style>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {!callActive ? (

          /* ── Pre-call screen ─────────────────────────────────── */
          <div style={{ width: "100%", maxWidth: 420 }}>

            {/* Pill */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <span style={{
                background: "#1a2a3a", color: "#4a9eff", fontSize: 11,
                fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                borderRadius: 20, padding: "4px 12px",
              }}>
                LIVE DEMO
              </span>
            </div>

            {/* Headline */}
            <h3 style={{ color: "white", fontSize: 24, fontWeight: 600, textAlign: "center", lineHeight: 1.2, margin: "0 0 6px" }}>
              Book a table at Madras Cafe
            </h3>
            <p style={{ color: "#8b949e", fontSize: 14, textAlign: "center", margin: "0 0 20px" }}>
              Talk to our AI concierge. Hindi, English, or both.
            </p>

            {/* Persona picker card */}
            <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 11, color: "#8b949e", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
                CHOOSE YOUR CONCIERGE
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                {personas.map(p => {
                  const isSelected = p.id === selectedId;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedId(p.id)}
                      style={{
                        background: isSelected ? "#0d1e30" : "#0d1117",
                        border: isSelected ? "1.5px solid #4a9eff" : "1px solid #30363d",
                        borderRadius: 10, padding: "12px 14px",
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ color: "white", fontSize: 14, fontWeight: 500 }}>{p.name}</div>
                        <div style={{ color: "#8b949e", fontSize: 12, marginTop: 2 }}>{p.style.join(" · ")}</div>
                      </div>

                      {isSelected ? (
                        /* Animated waveform for selected persona */
                        <div style={{ display: "flex", alignItems: "center", gap: 3, height: 24 }}>
                          {[0, 0.1, 0.2, 0.1, 0].map((delay, i) => (
                            <div key={i} style={{
                              width: 3, height: 4, background: "#4a9eff", borderRadius: 2,
                              animation: `voiceBar 1s ease-in-out ${delay}s infinite`,
                              alignSelf: "center",
                            }} />
                          ))}
                        </div>
                      ) : (
                        <button
                          onClick={(e) => previewVoice(e, p.id)}
                          style={{
                            fontSize: 11, color: "#4a9eff", background: "transparent",
                            border: "1px solid #1e3a5a", borderRadius: 6, padding: "4px 10px",
                            cursor: "pointer", flexShrink: 0,
                          }}
                        >
                          {previewingId === p.id ? "■ Stop" : "▶ Preview"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={startCall}
                disabled={!selectedId}
                style={{
                  width: "100%", height: 48, background: selectedId ? "#2563eb" : "#1a2a3a",
                  borderRadius: 12, color: "white", fontSize: 15, fontWeight: 500,
                  border: "none", cursor: selectedId ? "pointer" : "not-allowed",
                }}
              >
                {selectedPersona ? `Start call with ${selectedPersona.name} →` : "Choose a concierge"}
              </button>
            </div>

            {error && (
              <div style={{ marginTop: 16, fontSize: 13, color: "#f87171", background: "rgba(239,68,68,0.08)", borderRadius: 10, padding: "10px 14px" }}>
                {error}
              </div>
            )}
          </div>

        ) : (

          /* ── In-call screen ──────────────────────────────────── */
          <div style={{ width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>

            {/* Timer */}
            <div style={{ color: "#8b949e", fontSize: 13, fontFamily: "monospace" }}>
              {formatTime(elapsed)}
            </div>

            {/* Orb */}
            <div style={{ position: "relative", width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={getRippleStyle(callState, "0s")} />
              <div style={getRippleStyle(callState, callState === "listening" ? "0.8s" : "0.55s")} />

              <div style={{
                width: 84, height: 84, borderRadius: "50%", background: "#1a2a3a",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", transition: "border-color 0.35s ease, box-shadow 0.35s ease",
                ...ORB_STYLE[callState],
              }}>
                {showThinkRing && (
                  <div style={{
                    position: "absolute", inset: -6, borderRadius: "50%",
                    border: "2px solid transparent", borderTopColor: "#f59e0b",
                    animation: "thinkSpin 1.1s linear infinite",
                  }} />
                )}

                {showWaveform && (
                  <div style={{ display: "flex", alignItems: "center", gap: 3, height: 32 }}>
                    {[0, 1, 2, 3, 4].map(i => (
                      <div key={i} style={getBarStyle(callState, i)} />
                    ))}
                  </div>
                )}

                {showInitial && (
                  <span style={{ color: "white", fontSize: 18, fontWeight: 500, opacity: showThinkRing ? 0.4 : 1 }}>
                    {selectedPersona?.name[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Persona label + state */}
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "white", fontSize: 15, fontWeight: 500, marginBottom: 2 }}>
                {selectedPersona?.name}
              </div>
              <div style={{ color: "#8b949e", fontSize: 12, marginBottom: 6 }}>
                AI Concierge · Madras Cafe
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, color: STATE_LABEL[callState].color, minHeight: 18 }}>
                {STATE_LABEL[callState].text}
              </div>
            </div>

            {/* Transcript */}
            <div
              ref={transcriptRef}
              style={{
                width: "100%", background: "#161b22", border: "1px solid #30363d",
                borderRadius: 12, padding: 16, maxHeight: 160, overflowY: "auto",
              }}
            >
              {transcript.length === 0 && (
                <p style={{ color: "#8b949e", fontSize: 12, textAlign: "center", paddingTop: 16 }}>
                  Connecting…
                </p>
              )}
              {transcript.map((m, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: 8,
                }}>
                  <div style={{
                    background: m.role === "user" ? "#1e3a1e" : "#1a2a3a",
                    color: "#c9d1d9", fontSize: 13, padding: "8px 12px",
                    borderRadius: m.role === "user" ? "8px 8px 2px 8px" : "8px 8px 8px 2px",
                    maxWidth: "85%",
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Booking progress — order-agnostic, ticks light up as details are captured */}
            <div style={{
              width: "100%",
              display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6,
            }}>
              {BOOKING_STEPS.map(step => {
                const done = bookingProgress[step.id as keyof BookingProgress];
                return (
                  <div key={step.id} style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "5px 10px", borderRadius: 999,
                    fontSize: 11, fontWeight: 500,
                    background: done ? "rgba(16,185,129,0.10)" : "#161b22",
                    border: `1px solid ${done ? "#10b981" : "#30363d"}`,
                    color: done ? "#10b981" : "#8b949e",
                    transition: "all 0.25s ease",
                  }}>
                    <span style={{
                      width: 14, height: 14, borderRadius: "50%",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      background: done ? "#10b981" : "transparent",
                      border: done ? "none" : "1px solid #30363d",
                      color: "white", fontSize: 9, fontWeight: 700,
                    }}>
                      {done ? "✓" : ""}
                    </span>
                    {step.label}
                  </div>
                );
              })}
            </div>

            {/* Call controls */}
            <div style={{ width: "100%", display: "flex", gap: 8 }}>
              <button
                onClick={() => setMuted(m => !m)}
                style={{
                  flex: 1, padding: "10px 0",
                  background: muted ? "#2a1a1a" : "#161b22",
                  border: `1px solid ${muted ? "#6b3a3a" : "#30363d"}`,
                  borderRadius: 8, color: muted ? "#f87171" : "#c9d1d9",
                  fontSize: 13, cursor: "pointer",
                }}
              >
                {muted ? "Unmute" : "Mute"}
              </button>
              <button
                onClick={endCall}
                style={{
                  flex: 1, padding: "10px 0",
                  background: "#2a1010", border: "1px solid #6b2a2a",
                  borderRadius: 8, color: "#f87171",
                  fontSize: 13, cursor: "pointer",
                }}
              >
                End call
              </button>
            </div>

            {error && (
              <div style={{ fontSize: 13, color: "#f87171", background: "rgba(239,68,68,0.08)", borderRadius: 10, padding: "10px 14px", width: "100%" }}>
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
