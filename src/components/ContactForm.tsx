"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

type RadioType = "restaurant" | "partner";

export default function ContactForm({ preselect }: { preselect?: RadioType }) {
  const [type, setType] = useState<RadioType>(preselect ?? "restaurant");
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900)); // Simulated submission
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="py-24 lg:py-32 bg-slate-50" id="contact">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <FadeIn direction="left">
            <h2
              className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Interested?{" "}
              <span className="gradient-text">Let&apos;s talk.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Whether you&apos;re a restaurant owner or a platform looking to
              integrate — fill in your details and our team will reach out
              within 24–72 hours.
            </p>
          </FadeIn>

          {/* Right — form */}
          <FadeIn direction="right" delay={0.1}>
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-blue-50/50">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    <div className="text-5xl mb-5">✅</div>
                    <h3
                      className="text-xl font-bold text-slate-900 mb-3"
                      style={{ fontFamily: "var(--font-sora)" }}
                    >
                      Thanks — we&apos;ll be in touch within 24–72 hours.
                    </h3>
                    <p className="text-slate-500 text-sm mb-6">
                      In the meantime, you can call our demo line to hear
                      VoiceDesk in action:
                    </p>
                    <a
                      href="tel:+1XXXXXXXXXX"
                      className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-6 py-3 rounded-full"
                    >
                      📞 +1-XXX-XXX-XXXX
                    </a>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Radio */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
                        I am a…
                      </label>
                      <div className="flex gap-3">
                        {(
                          [
                            ["restaurant", "🍽️ Restaurant"],
                            ["partner", "🔌 POS / Integration Partner"],
                          ] as [RadioType, string][]
                        ).map(([val, label]) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setType(val)}
                            className={`flex-1 text-sm font-semibold py-3 px-4 rounded-xl border-2 transition-all ${
                              type === val
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-slate-200 text-slate-600 hover:border-blue-200"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Fields */}
                    {[
                      { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                      { id: "phone", label: "Contact Number", type: "tel", placeholder: "+91 98765 43210" },
                      { id: "email", label: "Email ID", type: "email", placeholder: "you@yourrestaurant.com" },
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
                          onChange={(e) =>
                            setForm({ ...form, [f.id]: e.target.value })
                          }
                          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
                        />
                      </div>
                    ))}

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
                        "Submit →"
                      )}
                    </motion.button>
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
