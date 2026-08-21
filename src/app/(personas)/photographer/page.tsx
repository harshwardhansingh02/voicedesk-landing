import type { Metadata } from "next";

import Hero from "@/components/sections/Hero";
import ShortDescription from "@/components/sections/ShortDescription";
import WhatItDoes from "@/components/sections/WhatItDoes";
import Objections from "@/components/sections/Objections";
import FounderNote from "@/components/sections/FounderNote";
import Waitlist from "@/components/sections/Waitlist";
import Footer from "@/components/sections/Footer";
import DemoCapture from "@/components/demos/DemoCapture";
import DemoFollowup from "@/components/demos/DemoFollowup";
import StickyFooterCTA from "@/components/ui/StickyFooterCTA";
import { photographerConfig } from "@/personas/photographer";

// Persona page for wedding photographers. IA (post-merge):
//   Hero (lean, no CTA)
//   Short description (one-breath "what is this?")
//   What VoiceDesk does (3 plain-language bullets) + "See it in action" bridge
//   Demo 1 (Capture)
//   Demo Merged (Channels + Follow-up, toggled Without/With, CTA to form)
//   #after-demos marker — sticky footer wakes up once this scrolls past
//   Waitlist wizard
//   Objections → FounderNote → Footer
// Sticky footer CTA is mobile-only; hidden until scrolled past #after-demos
// and hidden while #waitlist is in view.

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
        <ShortDescription config={cfg} />
        <WhatItDoes config={cfg} />
        <DemoCapture config={cfg} />
        <DemoFollowup config={cfg} />
        {/* Marker: sticky footer wakes up once this scrolls above viewport */}
        <div id="after-demos" aria-hidden style={{ height: 0 }} />
        <Waitlist config={cfg} />
        <Objections config={cfg} />
        <FounderNote config={cfg} />
      </main>
      <Footer config={cfg} />
      <StickyFooterCTA
        label={cfg.stickyCta.label}
        href={cfg.stickyCta.href}
        showWhenPastId="after-demos"
        hideWhenInView="waitlist"
      />
    </>
  );
}
