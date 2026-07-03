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

// Narrative text bloc between/around demos. `body` renders as Jakarta
// paragraphs (mocha), `emphasis` renders as Fraunces italic (ink).
// Both optional so we can express pure-body or pure-pull-quote variants.
export type TextBlocContent = {
  body?: string[];
  emphasis?: string;
};

export type PersonaConfig = {
  // Identity
  slug: string;                // 'photographer'
  navLabel: string;            // 'For wedding photographers'

  // Hero
  eyebrow: string;             // 'VoiceDesk for wedding photographers'
  warCry: WarCry;              // line1 / line2 — the two-beat war cry
  heroSub: string;             // one-line agitator with the loss number
  heroLossNumber: string;      // "₹4–6L a year" — pulled out for emphasis

  // Narrative text blocs between demos — the psychological glue.
  // Each speaks directly to the persona's inner monologue so the demo
  // that follows lands as "that's exactly the solution to what I just felt".
  textBlocs: {
    mirror: TextBlocContent;             // between hero and demo 1
    betweenDemo1and2: TextBlocContent;   // after demo 1, before demo 2
    betweenDemo2and3: TextBlocContent;   // after demo 2, before demo 3
    afterDemo3: TextBlocContent;         // the closing pull-quote before waitlist
  };

  // Demo 1 — Capture
  demo1: {
    intro: string;             // copy above the demo
    pretypedLeads: LeadSeed[]; // pre-seeded board leads
    newLead: LeadSeed;         // the animated-in lead
    provenance: string;        // "Captured at 11:47 PM while you were..."
    callerName: string;        // "Nidhi just called — tap to see what happened"
    ctaLabel: string;          // progression CTA — advances to next demo
    ctaHref: string;           // usually "#demo-2"
  };

  // Demo 2 — Channels
  demo2: {
    intro: string;
    igThread: ChatMessage[];
    waThread: ChatMessage[];
    unifiedLeadName: string;
    unifiedTouchpoints: Touchpoint[];
    ctaLabel: string;
    ctaHref: string;           // usually "#demo-3"
  };

  // Demo 3 — Follow-up
  demo3: {
    intro: string;
    beforeMissedItems: MissedItem[];
    beforeLossAmount: string;          // "₹2.5L booking · gone."
    afterTimeline: TimelineNodeSeed[];
    afterBookingValue: string;         // "₹2.4L"
    ctaLabel: string;
    ctaHref: string;                   // usually "#waitlist"
  };

  // Waitlist / form section — the single form-redirect target.
  waitlist: {
    eyebrow: string;
    headline: string;
    sub: string;
    ctaLabel: string;
    microcopy?: string;
  };

  // Sticky footer CTA — mobile-only, always visible, redirects to form.
  stickyCta: {
    label: string;
    href: string;
  };

  // Objections — 3 quiet doubts + reassuring answers
  objections: Objection[];

  // Persona-specific flavor used by copy + scene descriptions
  scene: SceneFlavor;
};
