import type { Metadata } from "next";

import Hero from "@/components/sections/Hero";
import Objections from "@/components/sections/Objections";
import FounderNote from "@/components/sections/FounderNote";
import Waitlist from "@/components/sections/Waitlist";
import Footer from "@/components/sections/Footer";
import DemoCapture from "@/components/demos/DemoCapture";
import DemoChannels from "@/components/demos/DemoChannels";
import DemoFollowup from "@/components/demos/DemoFollowup";
import StickyFooterCTA from "@/components/ui/StickyFooterCTA";
import { photographerConfig } from "@/personas/photographer";

// Persona page for wedding photographers. IA (post-revisit):
//   Hero (pre-header + war cry + subheading — lean)
//   Demo 1 (Capture) — demo description flows straight from hero
//   Section heading → Demo 2 (Channels)
//   Section heading → Demo 3 (Follow-up, toggled before/after) + CTA
//   Waitlist (2-step wizard)
//   Objections → FounderNote → Footer
// + StickyFooterCTA (mobile-only, always visible, auto-hides in Waitlist)
//
// Story-carrying prose lives inside components, not in standalone text
// blocs — the mirror vignette is retired here and moved to IG story.

export const metadata: Metadata = {
  title: "VoiceDesk for wedding photographers — Never lose another lead",
  description: photographerConfig.heroSub,
  openGraph: {
    title: `${photographerConfig.warCry.line1} ${photographerConfig.warCry.line2}`,
    description: photographerConfig.heroSub,
    url: "https://thevoicedesk.com/photographer",
    siteName: "VoiceDesk",
    locale: "en_IN",
    type: "website",
  },
};

export default function PhotographerPage() {
  const cfg = photographerConfig;
  return (
    <>
      <main>
        <Hero config={cfg} />
        <DemoCapture config={cfg} />
        <DemoChannels config={cfg} />
        <DemoFollowup config={cfg} />
        <Waitlist config={cfg} />
        <Objections config={cfg} />
        <FounderNote config={cfg} />
      </main>
      <Footer config={cfg} />
      <StickyFooterCTA
        label={cfg.stickyCta.label}
        href={cfg.stickyCta.href}
        hideWhenInView="waitlist"
      />
    </>
  );
}
