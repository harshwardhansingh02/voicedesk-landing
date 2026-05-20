import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "VoiceDesk — AI Voice Concierge for Restaurants",
  description:
    "VoiceDesk answers every call your restaurant misses — books the table, recognises the returning guest, and upsells the occasion. No staff. No missed revenue.",
  keywords: "AI voice agent, restaurant reservations, voice AI India, automated booking, VoiceDesk",
  openGraph: {
    title: "VoiceDesk — From Ring to Reservation in Under 60 Seconds",
    description:
      "Your restaurant misses 3 in every 10 calls during dinner service. VoiceDesk picks up every one.",
    url: "https://thevoicedesk.com",
    siteName: "VoiceDesk",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoiceDesk — AI Voice Concierge for Restaurants",
    description:
      "VoiceDesk picks up every missed call — books the table, recognises the guest, upsells the occasion.",
  },
  metadataBase: new URL("https://thevoicedesk.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${dmSans.variable} scroll-smooth`}
    >
      <body
        className="min-h-screen bg-white text-slate-900"
        style={{ fontFamily: "var(--font-dm), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
