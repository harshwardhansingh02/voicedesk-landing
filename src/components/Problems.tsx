"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const problems = [
  {
    rank: "01",
    title: "Missed calls during peak hours",
    stat: "₹52,500 lost per month at 200 calls/month — before upsells",
    body: "Lunch and dinner service is when your phone rings most — and when your staff can least afford to answer it. Every unanswered call is a guest who called your competitor next.",
  },
  {
    rank: "02",
    title: "Reservations taken wrong",
    stat: "Wrong date. Wrong time. Wrong party size. All discovered at 8 PM on a Saturday.",
    body: "A hurried staff member, a noisy kitchen, a guest who mumbles — booking errors happen and they cost you a cover and a review.",
  },
  {
    rank: "03",
    title: "Returning guests treated like strangers",
    stat: 'A guest who’s visited 6 times gets asked: “Is this your first time with us?”',
    body: "You have the data in your POS. But no one checks it before picking up the phone. Personalisation that could build loyalty gets lost in the rush.",
  },
  {
    rank: "04",
    title: "Every inbound call is a sales opportunity your team never takes",
    stat: "A guest calls to book a table. Your staff confirms it and hangs up.",
    body: "No one mentioned the private dining room. No one asked about the occasion. No one offered the weekend tasting menu. The call ends — and so does the opportunity.",
  },
];

export default function Problems() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50" id="problems">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="max-w-2xl mb-16">
          <h2
            className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Restaurants lose revenue{" "}
            <span className="gradient-text">on every shift.</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Most of it comes through the phone.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <FadeIn key={p.rank} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 24px 60px -12px rgba(37,99,235,0.15)" }}
                transition={{ duration: 0.22 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 h-full cursor-default"
              >
                <div
                  className="text-5xl font-extrabold gradient-text opacity-30 mb-4 leading-none"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {p.rank}
                </div>
                <h3
                  className="text-xl font-bold text-slate-900 mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {p.title}
                </h3>
                <p className="text-sm font-semibold text-blue-600 mb-3 leading-snug">
                  {p.stat}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
