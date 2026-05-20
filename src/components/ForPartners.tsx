"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const pillars = [
  {
    icon: "🔌",
    title: "Minimal integration lift",
    body: "Booking creation, customer lookup, availability checks — all through standard API calls. Your engineering team certifies us once. Every restaurant on your platform can activate from there.",
  },
  {
    icon: "📊",
    title: "Data your platform couldn't capture before",
    body: "Pre-visit intent, call volume, language preference, guest sentiment — VoiceDesk surfaces it all and feeds it back into your ecosystem.",
  },
  {
    icon: "🤝",
    title: "Built to complement, not compete",
    body: "Your CRM captures what happens after the visit. VoiceDesk captures the conversation that started it. Every record we create lands in your platform — no parallel system, no data silo.",
  },
];

export default function ForPartners() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="partners">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <div>
            <FadeIn direction="left">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-6">
                For POS &amp; Platform Partners
              </span>
              <h2
                className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-6"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                The voice layer{" "}
                <span className="gradient-text">your platform is missing.</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Every POS, reservation system, and restaurant platform manages
                what happens after the guest walks in. VoiceDesk manages what
                happens before — the call, the booking, the first impression.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                We&apos;re built API-first. Every booking VoiceDesk creates flows
                into your platform. Every guest interaction enriches the data
                your restaurants already rely on. Your restaurants get a better
                product. You get a stronger platform.
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-blue-200 hover:opacity-90"
              >
                Get in Touch →
              </motion.a>
            </FadeIn>
          </div>

          {/* Right — pillars */}
          <div className="flex flex-col gap-5">
            {pillars.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1} direction="right">
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex gap-4 cursor-default"
                >
                  <div className="text-2xl flex-shrink-0 mt-0.5">{p.icon}</div>
                  <div>
                    <h3
                      className="text-base font-bold text-slate-900 mb-1.5"
                      style={{ fontFamily: "var(--font-sora)" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{p.body}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
