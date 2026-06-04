"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "For Partners", href: "#partners" },
  { label: "Contact Us", href: "mailto:sales@thevoicedesk.com" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-28">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2
              className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Your next missed call{" "}
              <span className="gradient-text-light">is 4 minutes away.</span>
              <br />
              VoiceDesk can answer it.
            </h2>
            <p className="text-slate-400 text-lg mt-4">
              Setup takes 48 hours. No lock-in to start.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="#live-demo"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 bg-white text-blue-700 font-semibold px-8 py-3.5 rounded-full hover:bg-blue-50 transition-colors"
            >
              <span className="text-xl">🎙️</span> Try Live Demo
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 border-2 border-slate-600 hover:border-blue-400 text-slate-200 hover:text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              Get in Touch →
            </motion.a>
          </div>
        </FadeIn>
      </div>

      {/* Footer base */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="font-bold text-lg gradient-text-light"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            VoiceDesk
          </span>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <p className="text-sm text-slate-500">
            © 2026 VoiceDesk. Built in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
