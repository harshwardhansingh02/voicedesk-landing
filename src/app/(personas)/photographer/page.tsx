import type { Metadata } from "next";

import Hero from "@/components/sections/Hero";
import { photographerConfig } from "@/personas/photographer";

// Persona page for wedding photographers. Currently only Hero is wired;
// Mirror, Demos, Waitlist, Founder, Footer land in subsequent build steps.
// In step 11, all sections move behind a shared `PersonaPage` template fed
// by the config — this file becomes a one-liner at that point.

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
    <main>
      <Hero config={photographerConfig} />
    </main>
  );
}
