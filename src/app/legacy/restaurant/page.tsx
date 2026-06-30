// Archived restaurant landing — preserved intact for sales-call demos and
// historical reference. Not linked from anywhere in v2.
// `noindex` keeps it out of search results so the v2 site is the authoritative one.

import type { Metadata } from "next";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import ForPartners from "@/components/ForPartners";
import LiveDemoSection from "@/components/LiveDemoSection";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "VoiceDesk for Restaurants — Archive",
  robots: { index: false, follow: false },
};

export default function LegacyRestaurantPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problems />
        <HowItWorks />
        <Features />
        <Testimonials />
        <ForPartners />
        <LiveDemoSection />
        <DemoSection />
      </main>
      <Footer />
    </>
  );
}
