"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

export default function LiveDemo() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="demo">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-4xl gradient-bg px-8 py-16 lg:px-20 lg:py-20 text-center shadow-2xl shadow-blue-300/30">
            {/* Background orbs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-200 mb-4">
                Live Demo
              </span>
              <h2
                className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Don&apos;t take our word for it.{" "}
                <span className="text-sky-300">Call us.</span>
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                VoiceDesk is live right now, answering calls for{" "}
                <strong className="text-white">The Grand Spice</strong> — a demo
                restaurant we use to showcase the product. Dial the number below
                and try booking a table, in whichever language you prefer.
              </p>

              <motion.a
                href="tel:+1XXXXXXXXXX"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 bg-white text-blue-700 font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="text-2xl">📞</span>
                +1-XXX-XXX-XXXX &nbsp;·&nbsp; Call Now
              </motion.a>

              <p className="mt-6 text-sm text-blue-200">
                Available 24/7 · Hindi, English, Tamil, Marathi + 7 Indian languages · Takes about 2 minutes
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
