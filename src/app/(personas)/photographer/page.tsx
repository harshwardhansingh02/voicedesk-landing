import type { Metadata } from "next";

import Hero from "@/components/sections/Hero";
import TextBloc from "@/components/sections/TextBloc";
import Objections from "@/components/sections/Objections";
import FounderNote from "@/components/sections/FounderNote";
import Waitlist from "@/components/sections/Waitlist";
import Footer from "@/components/sections/Footer";
import DemoCapture from "@/components/demos/DemoCapture";
import DemoChannels from "@/components/demos/DemoChannels";
import DemoFollowup from "@/components/demos/DemoFollowup";
import StickyFooterCTA from "@/components/ui/StickyFooterCTA";
import { photographerConfig } from "@/personas/photographer";

// Persona page for wedding photographers. IA (v2 revisit):
//   Hero (lean, no CTA) →
//   TextBloc: Mirror →
//   Demo 1 (Capture) + progression CTA →
//   TextBloc: between 1 & 2 →
//   Demo 2 (Channels — static preview) + progression CTA →
//   TextBloc: between 2 & 3 →
//   Demo 3 (Follow-up — static preview) + form-redirect CTA →
//   TextBloc: closing pull quote →
//   Waitlist form →
//   Objections →
//   FounderNote →
//   Footer
// + StickyFooterCTA (mobile-only, form redirect)

export const metadata: Metadata = {
  title: "VoiceDesk for wedding photographers — Stop losing leads tonight",
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
        <TextBloc content={cfg.textBlocs.mirror} />
        <DemoCapture config={cfg} />
        <TextBloc content={cfg.textBlocs.betweenDemo1and2} />
        <DemoChannels config={cfg} />
        <TextBloc content={cfg.textBlocs.betweenDemo2and3} />
        <DemoFollowup config={cfg} />
        <TextBloc content={cfg.textBlocs.afterDemo3} tone="pullQuote" />
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
