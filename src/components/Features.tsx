"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const features = [
  {
    icon: "🗣️",
    title: "Speaks your guest's language",
    body: "Hindi, Tamil, Gujarati, English — VoiceDesk detects and responds in the caller's language automatically. No configuration per call.",
  },
  {
    icon: "📅",
    title: "Zero-error reservations",
    body: "Date, time, party size, dietary needs — confirmed back to the guest before the call ends. Discrepancies caught before they become an 8 PM crisis.",
  },
  {
    icon: "🧠",
    title: "Guest memory, built in",
    body: '"Welcome back, Priya. Last time you booked for 4 at 8 PM — shall I do the same?" Every returning caller is recognised. Every interaction builds the relationship.',
  },
  {
    icon: "💰",
    title: "Upsell on every call — naturally",
    body: "VoiceDesk knows your occasions, packages, and private spaces. It suggests the right upgrade at the right moment — not as a script, as a conversation.",
  },
  {
    icon: "🔁",
    title: "Works with your existing POS",
    body: "Every booking flows directly into whatever POS you use. No double entry, no delay, no gap between what the guest heard and what your team sees.",
  },
  {
    icon: "👤",
    title: "Graceful human handover",
    body: 'Complex requests, upset guests, or someone who simply prefers a human — VoiceDesk transfers with full context, so your staff never has to ask "what did they want?" again.',
  },
  {
    icon: "🕐",
    title: "Always on. Never on leave.",
    body: "Sunday brunch rush. 11 PM last-minute booking. A public holiday. VoiceDesk answers every time your phone rings, regardless of who's on shift.",
  },
];

export default function Features() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50" id="features">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="max-w-xl mb-16">
          <h2
            className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Built for how{" "}
            <span className="gradient-text">Indian restaurants</span>{" "}
            actually operate.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 20px 50px -10px rgba(37,99,235,0.13)" }}
                transition={{ duration: 0.2 }}
                className={`bg-white rounded-3xl p-7 border border-slate-100 h-full cursor-default ${
                  i === 6 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3
                  className="text-base font-bold text-slate-900 mb-2"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {f.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.body}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
