"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const steps = [
  {
    num: "1",
    title: "Customer calls your restaurant number",
    body: "VoiceDesk answers immediately — in the guest's language. It greets them by name if they've called before, and asks how it can help.",
    icon: "📞",
  },
  {
    num: "2",
    title: "VoiceDesk handles the conversation",
    body: 'It checks availability, confirms the booking, suggests an upgrade if relevant — "We have a private booth available for anniversaries, shall I reserve that instead?" — and reads everything back before the call ends.',
    icon: "🧠",
  },
  {
    num: "3",
    title: "Booking appears in your POS. Instantly.",
    body: "No manual entry. No follow-up call. The reservation lands in your POS the moment the guest hangs up. Your team sees it, the kitchen knows, and the guest gets a confirmation.",
    icon: "✅",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="max-w-2xl mb-16">
          <h2
            className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            From ring to reservation{" "}
            <span className="gradient-text">in under 60 seconds.</span>
          </h2>
          <p className="text-slate-500 text-lg">
            No app. No chatbot. A real voice conversation — handled end to end.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Connector line desktop */}
          <div className="hidden lg:block absolute top-12 left-[calc(16.66%-1px)] right-[calc(16.66%-1px)] h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
            {steps.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-start lg:items-center text-left lg:text-center"
                >
                  {/* Step circle */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center shadow-lg shadow-blue-200 text-3xl">
                      {s.icon}
                    </div>
                    <div
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center text-xs font-bold text-blue-600"
                      style={{ fontFamily: "var(--font-sora)" }}
                    >
                      {s.num}
                    </div>
                  </div>

                  <h3
                    className="text-lg font-bold text-slate-900 mb-3"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.body}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Reassurance line */}
        <FadeIn delay={0.3} className="mt-16">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl px-8 py-5 text-center max-w-2xl mx-auto">
            <p className="text-slate-600 text-sm leading-relaxed">
              <span className="font-semibold text-blue-700">Human handover, always ready.</span>{" "}
              If a guest ever asks to speak to someone, VoiceDesk transfers the call to your team — instantly, with full context already shared.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
