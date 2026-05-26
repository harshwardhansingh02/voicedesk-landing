"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

// ─── Swap this URL in once you've deployed the Apps Script ───────────────────
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwV64prjkOhXwU7MVoJl16p7DNs7f5JhE3NqQozwkmMQmHPRdD63Q72XuGY4CJVv5BO6Q/exec";

// ─── Swap this src once you have the hosted video URL ───────────────────────
const VIDEO_SRC = "/demo-placeholder.mp4"; // replace with Cloudinary/S3 URL
const VIDEO_POSTER = ""; // optional: URL to a thumbnail image

export default function DemoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      // no-cors: request goes through even though we can't read the response
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-slate-50" id="demo">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-5">
              See it in action
            </span>
            <h2
              className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Watch VoiceDesk handle{" "}
              <span className="gradient-text">a real booking call.</span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
              Then tell us where you&apos;d like to integrate it.
            </p>
          </div>
        </FadeIn>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left — video player */}
          <FadeIn direction="left">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-2xl shadow-blue-100/40 aspect-video">
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                poster={VIDEO_POSTER}
                controls={playing}
                playsInline
                className="w-full h-full object-cover"
                onEnded={() => setPlaying(false)}
              />

              {/* Play overlay */}
              <AnimatePresence>
                {!playing && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handlePlay}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 group"
                    aria-label="Play demo video"
                  >
                    {/* Dim overlay */}
                    <div className="absolute inset-0 bg-slate-900/50" />

                    {/* Play button */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative z-10 w-20 h-20 rounded-full gradient-bg flex items-center justify-center shadow-xl shadow-blue-400/40"
                    >
                      {/* Triangle */}
                      <div className="w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[20px] border-l-white ml-1.5" />
                    </motion.div>

                    <span className="relative z-10 text-white/80 text-sm font-medium">
                      2 min · Full booking conversation
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Caption */}
            <p className="mt-4 text-slate-400 text-sm text-center">
              Recorded on a live call · English + Hindi · The Grand Spice demo restaurant
            </p>
          </FadeIn>

          {/* Right — lead form */}
          <FadeIn direction="right" delay={0.1}>
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-blue-50/50">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10"
                  >
                    <div className="text-5xl mb-5">🎉</div>
                    <h3
                      className="text-xl font-bold text-slate-900 mb-3"
                      style={{ fontFamily: "var(--font-sora)" }}
                    >
                      We&apos;ll reach out within 24 hours.
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Our team will contact you to walk through a personalised
                      demo and discuss integration options.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3
                        className="text-xl font-bold text-slate-900 mb-1"
                        style={{ fontFamily: "var(--font-sora)" }}
                      >
                        Request a demo
                      </h3>
                      <p className="text-slate-500 text-sm">
                        We&apos;ll set up a personalised walkthrough for your team.
                      </p>
                    </div>

                    {[
                      { id: "name",    label: "Your name",              type: "text",  placeholder: "Ravi Sharma" },
                      { id: "company", label: "Company / Restaurant",   type: "text",  placeholder: "Zomato, Petpooja, The Grand Spice…" },
                      { id: "phone",   label: "WhatsApp / Phone",       type: "tel",   placeholder: "+91 98765 43210" },
                      { id: "email",   label: "Work email",             type: "email", placeholder: "ravi@company.com" },
                    ].map((f) => (
                      <div key={f.id}>
                        <label
                          htmlFor={f.id}
                          className="block text-sm font-semibold text-slate-700 mb-1.5"
                        >
                          {f.label} <span className="text-blue-500">*</span>
                        </label>
                        <input
                          id={f.id}
                          type={f.type}
                          required
                          placeholder={f.placeholder}
                          value={form[f.id as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                        />
                      </div>
                    ))}

                    {error && (
                      <p className="text-red-500 text-sm">
                        Something went wrong — please email us directly at{" "}
                        <a href="mailto:harshwardhansingh02@gmail.com" className="underline">
                          harshwardhansingh02@gmail.com
                        </a>
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      className="w-full gradient-bg text-white font-semibold py-3.5 rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        "Request a Demo →"
                      )}
                    </motion.button>

                    <p className="text-xs text-slate-400 text-center">
                      No spam. We&apos;ll only reach out about your demo.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
