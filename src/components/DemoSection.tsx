"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwV64prjkOhXwU7MVoJl16p7DNs7f5JhE3NqQozwkmMQmHPRdD63Q72XuGY4CJVv5BO6Q/exec";

export default function DemoSection() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

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
              Get in touch
            </span>
            <h2
              className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Get your{" "}
              <span className="gradient-text">personalised walkthrough.</span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
              Or{" "}
              <a href="#live-demo" className="text-blue-600 font-semibold hover:underline">
                try the live demo ↑
              </a>{" "}
              right now — no sign-up needed.
            </p>
          </div>
        </FadeIn>

        {/* Centered form */}
        <div className="max-w-lg mx-auto">
          <FadeIn>
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
                        <a href="mailto:harshwardhan@thevoicedesk.com" className="underline">
                          harshwardhan@thevoicedesk.com
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
