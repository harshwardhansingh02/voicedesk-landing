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

export type TimelineKind =
  | "message-out"              // outbound message from VoiceDesk
  | "reply"                    // customer reply (with optional follow-up message)
  | "notification"             // smart nudge to the operator
  | "success";                 // booking confirmed

export type TimelineNodeSeed = {
  time: string;                // "Sat · 9:12 PM · Missed call detected"
  title: string;
  kind: TimelineKind;
  body: string;
  followup?: string;           // optional second-message bubble (used on `reply`)
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

  // Demo 3 — Follow-up. Same heading pattern as Demo 2, plus the sole
  // form-redirect CTA on the page (besides the sticky footer).
  demo3: {
    sectionHeading: string;    // Fraunces italic
    intro: string;             // concise + impactful, Jakarta body
    beforeMissedItems: MissedItem[];
    beforeLossAmount: string;
    afterTimeline: TimelineNodeSeed[];
    afterBookingValue: string;
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
