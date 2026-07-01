import type { Metadata } from "next";

import Hero from "@/components/sections/Hero";
import Mirror from "@/components/sections/Mirror";
import TheTurn from "@/components/sections/TheTurn";
import Beyond from "@/components/sections/Beyond";
import Objections from "@/components/sections/Objections";
import FounderNote from "@/components/sections/FounderNote";
import Footer from "@/components/sections/Footer";
import DemoCapture from "@/components/demos/DemoCapture";
import { photographerConfig } from "@/personas/photographer";

// Persona page for wedding photographers.
// Sections currently wired: Hero, Mirror, TheTurn, Beyond, Objections,
// FounderNote, Footer.
// Missing (build steps 7-10): DemoCapture, DemoChannels, DemoFollowup, Waitlist.
// Ordering follows handoff §2 architecture map. Step 11 wraps everything
// into a shared `PersonaPage` template so this file collapses to a one-liner.

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
  return (
    <>
      <main>
        <Hero config={photographerConfig} />
        <Mirror config={photographerConfig} />
        <DemoCapture config={photographerConfig} />
        {/* Demos remaining (steps 8-9): DemoChannels, DemoFollowup */}
        <TheTurn config={photographerConfig} />
        <Beyond config={photographerConfig} />
        <Objections config={photographerConfig} />
        {/* Waitlist form lands in step 10 */}
        <FounderNote config={photographerConfig} />
      </main>
      <Footer config={photographerConfig} />
    </>
  );
}
