// Single source of truth for the data shape that drives every persona page.
// Build a new persona = author one config matching this type, register it in
// `src/personas/index.ts`, add the route file. Five minutes.

export type LeadBadge = "Hot" | "Warm" | "Cold";

export type LeadSeed = {
  name: string;
  initials: string;            // 2-char avatar fallback
  source: string;              // "Instagram DM" | "WhatsApp" | "Missed call" etc.
  timeAgo: string;             // "2 days ago", "just now"
  date: string;                // "14 Feb 2027" — the booking/event date
  budget: string;              // "₹2.5L"
  events: string;              // "Full 4-day", "Wedding + reception" etc.
  city: string;
  badge: LeadBadge;
};

export type ChatMessage = {
  from: "in" | "out";          // in = customer, out = VoiceDesk assistant
  text: string;
  time: string;                // "9:14 PM"
};

export type Touchpoint = {
  channel: "ig" | "wa" | "call";
  label: string;               // "Ritika DM'd on Instagram"
  time: string;                // "9:14 PM"
};

export type MissedItem = {
  icon: string;                // lucide icon name, e.g. "phone-off"
  text: string;
  time: string;                // "Sat, 9:12 PM"
};

// One capability row on the "With VoiceDesk" side of the merged demo.
// Reads as: <trigger> → <response>.
export type WithCapability = {
  icon: string;                // key into components/ui/Icon.tsx
  trigger: string;             // e.g. "Nidhi called"
  response: string;            // e.g. "VoiceDesk picks up and updates your dashboard"
};

// One bullet in the "What VoiceDesk does" section — three of these sit
// between the hero and the first demo, giving a skimmer the whole product
// in plain language before any interactive demo asks for their attention.
export type WhatItDoesFeature = {
  icon: string;                // key into components/ui/Icon.tsx
  title: string;               // "Answers every call and DM"
  body: string;                // one plain-language sentence
};

export type Objection = {
  fear: string;
  answer: string;
};

export type WarCry = {
  line1: string;
  line2: string;
};

export type SceneFlavor = {
  busyMoment: string;          // "shooting a sangeet"
  professionalTitle: string;   // "photographer"
  clientType: string;          // "bride", "client", "customer"
  deliverable: string;         // "wedding shoot"
  averageTicket: string;       // "₹2.5L"
};

export type PersonaConfig = {
  // Identity
  slug: string;                // 'photographer'
  navLabel: string;            // 'For wedding photographers'

  // Hero
  eyebrow: string;             // pre-header: 'VOICEDESK FOR WEDDING PHOTOGRAPHERS'
  warCry: WarCry;              // header — line1 / line2
  heroSub: string;             // subheading with the loss number
  heroLossNumber: string;      // "₹4–6L a year" — pulled out for emphasis

  // Short description — one calm paragraph under the hero loss line, before
  // any demo. Answers "what is this?" for someone who will not tap a demo.
  shortDescription: string;

  // "What VoiceDesk does" — 3 plain-language bullets. Skimmer's summary.
  whatItDoes: {
    sectionHeading: string;    // Fraunces italic
    features: WhatItDoesFeature[];
  };

  // "See it in action" — the bridge that hands the reader over to the demos.
  seeItInAction: {
    sectionHeading: string;    // Fraunces italic
    intro: string;             // Jakarta body, one line
  };

  // Demo 1 — Capture
  demo1: {
    intro: string;             // demo description above the mock dashboard
    pretypedLeads: LeadSeed[];
    newLead: LeadSeed;
    provenance: string;        // "Captured at 11:47 PM while you were..."
    callerName: string;        // "Nidhi just called — tap to see what happened"
  };

  // Demo 2 — Channels. `sectionHeading` sits above the demo as the
  // narrative bridge from Demo 1. `intro` reads as context under it.
  demo2: {
    sectionHeading: string;    // Fraunces italic — "See what happens when she also DMs"
    intro: string;             // Jakarta body — the context/description
    igThread: ChatMessage[];
    waThread: ChatMessage[];
    unifiedLeadName: string;
    unifiedTouchpoints: Touchpoint[];
  };

  // Demo 3 — merged channel-unification + follow-up. Toggle contrasts
  // "Without VoiceDesk" (fragmented cross-channel misses story) with
  // "With VoiceDesk" (title strip + 3 capability rows + booking banner).
  demo3: {
    sectionHeading: string;    // Fraunces italic
    intro: string;             // concise + impactful, Jakarta body
    beforeMissedItems: MissedItem[];
    beforeLossAmount: string;
    withTitle: string;         // header line on the With frame, e.g. "Nidhi (caught across 3 channels, one lead)"
    withCapabilities: WithCapability[];
    afterBookingValue: string; // banner value on the With frame
    ctaLabel: string;
    ctaHref: string;           // "#waitlist"
  };

  // Waitlist / form section — multi-step wizard, communicates progress.
  waitlist: {
    eyebrow: string;
    headline: string;
    sub: string;
    ctaLabel: string;          // primary submit label on the final step
    microcopy?: string;        // trust line under the submit button
    successHeadline: string;   // "You're in."
    successBody: string;       // what happens next
  };

  // Sticky footer CTA — mobile-only, always visible.
  stickyCta: {
    label: string;
    href: string;
  };

  // Objections — 3 quiet doubts + reassuring answers
  objections: Objection[];

  // Persona-specific flavor used by copy + scene descriptions
  scene: SceneFlavor;
};
