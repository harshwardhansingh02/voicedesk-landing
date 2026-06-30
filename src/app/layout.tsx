import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Sora, DM_Sans } from "next/font/google";
import "./globals.css";

// v2 fonts — Warm Nude design system
// `display: swap` is non-negotiable: IG/WhatsApp in-app browsers render
// text in fallback first then swap, preventing the "invisible 4s wait" failure.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Legacy fonts — preserved so /legacy/restaurant renders identically to its
// previous prod state. Not used by any v2 component.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VoiceDesk — AI front office for solo creators and wedding pros",
  description:
    "Catch every call, every DM, every WhatsApp — even mid-shoot, mid-fitting, mid-set. VoiceDesk is the front desk you couldn't afford, for the price of a single booking.",
  metadataBase: new URL("https://thevoicedesk.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} ${sora.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body>{children}</body>
    </html>
  );
}
