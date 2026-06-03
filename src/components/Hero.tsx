"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stats = [
  { value: "3 in 10", label: "Calls missed at peak hours" },
  { value: "< 60s", label: "Ring to reservation" },
  { value: "24/7", label: "Always available" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white pt-20">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(to right, #2563eb 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Blue orb glow top-right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-100 blur-[120px] opacity-50 pointer-events-none" />
      {/* Softer orb bottom-left */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sky-100 blur-[100px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full">
        {/* Two-column grid on xl: text left, stat cards right */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_220px] gap-12 xl:gap-16 items-center">

          {/* Left — copy */}
          <motion.div variants={container} initial="hidden" animate="show">
            {/* Eyebrow */}
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">
                AI Voice Concierge for Restaurants · Hindi, English, Tamil, Marathi + 7 Indian languages
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              From Ring to
              <br />
              <span className="gradient-text">Reservation</span>
              <br />
              in Under 60 Seconds.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed mb-10"
            >
              Your restaurant misses 3 in every 10 calls during dinner service.
              VoiceDesk picks up every one — books the table, recognises the
              returning guest, and upsells the occasion.{" "}
              <span className="font-semibold text-slate-800">No staff. No missed revenue.</span>
            </motion.p>

            {/* CTA row */}
            <motion.div variants={item} className="flex flex-wrap gap-4 mb-12">
              <motion.a
                href="#live-demo"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 gradient-bg text-white font-semibold text-base px-7 py-3.5 rounded-full shadow-lg shadow-blue-200 hover:opacity-95 transition-opacity"
              >
                <span className="text-lg">🎙️</span>
                Talk to VoiceDesk — Live, Right Now
              </motion.a>
              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 text-blue-700 font-semibold text-base border-2 border-blue-200 hover:border-blue-400 px-7 py-3.5 rounded-full transition-colors"
              >
                See How It Works ↓
              </motion.a>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500"
            >
              {["Integrates directly with your POS", "24/7 Availability", "Live in under 48 hours"].map(
                (t, i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                    {t}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Right — stat cards (own column, never overlaps) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
            className="hidden xl:flex flex-col gap-4 self-center"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xl shadow-blue-50/80 text-center"
              >
                <div
                  className="text-2xl font-extrabold gradient-text mb-1"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-slate-500 leading-snug">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
