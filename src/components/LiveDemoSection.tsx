"use client";

import dynamic from "next/dynamic";
import FadeIn from "./FadeIn";

const VoiceDemoWidget = dynamic(() => import("./VoiceDemoWidget"), { ssr: false });

export default function LiveDemoSection() {
  return (
    <section className="py-24 lg:py-32 bg-slate-950" id="live-demo">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <FadeIn>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 bg-blue-950/60 border border-blue-900 px-4 py-1.5 rounded-full mb-5">
              Try it live
            </span>
            <h2
              className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Talk to VoiceDesk.{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Right now.
              </span>
            </h2>
            <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
              Pick a persona, hit call, and experience the full booking
              conversation — Hindi, English, or both.
            </p>
          </div>
        </FadeIn>

        {/* Widget card */}
        <FadeIn delay={0.1}>
          <div className="mx-auto max-w-lg bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl shadow-blue-950/40 p-8">
            <VoiceDemoWidget />
          </div>
        </FadeIn>

        {/* Footnote */}
        <FadeIn delay={0.2}>
          <p className="mt-8 text-center text-slate-600 text-xs">
            Live call · Sarvam AI voices · Saagar Ratna demo restaurant · No account needed
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
