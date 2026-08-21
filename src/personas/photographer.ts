import type { PersonaConfig } from "./types";

// Gold-standard persona config. Every other persona mirrors this shape exactly.
// Copy is intentionally sparse — the landing page carries story through demos,
// not paragraphs. Section headings between demos are the connective tissue.
// Names and dates are dummy data.

export const photographerConfig: PersonaConfig = {
  slug: "photographer",
  navLabel: "For wedding photographers",

  // Hero
  eyebrow: "VOICEDESK FOR WEDDING PHOTOGRAPHERS",
  warCry: {
    line1: "You were shooting.",
    line2: "VoiceDesk was closing.",
  },
  heroSub:
    "The average wedding photographer loses ₹15–20L a year to calls and DMs they miss.",
  heroLossNumber: "₹15–20L a year",

  // Three plain-language bullets. Mirrors the three demos below.
  whatItDoes: {
    sectionHeading: "What VoiceDesk does",
    features: [
      {
        icon: "phone",
        title: "Answers every call and DM",
        body: "Picks up in your name, warmly, in her language — at 11 PM, mid-shoot, on a Sunday. Nobody hears a ring-out.",
      },
      {
        icon: "message-circle-heart",
        title: "Asks the right questions",
        body: "Date, city, which events, guest count, budget — captured in one lead card, whether she called, DM'd, or WhatsApped.",
      },
      {
        icon: "sparkles",
        title: "Tells you who to call back",
        body: "Every lead lands in one dashboard, sorted hottest first, so your first free hour goes to the booking worth the most.",
      },
    ],
  },

  // Bridge into the demos.
  seeItInAction: {
    sectionHeading: "See it in action",
    intro: "Tap to see how VoiceDesk makes lead tracking effortless.",
  },

  // Demo 1 — Capture. No standalone description; the demo speaks for itself.
  demo1: {
    intro: "",
    pretypedLeads: [
      {
        name: "Ananya Rao",
        initials: "AR",
        source: "Instagram DM",
        timeAgo: "2 days ago",
        date: "14 Feb 2027",
        budget: "₹2.5L",
        events: "Full 4-day",
        city: "Mumbai",
        badge: "Hot",
      },
      {
        name: "Pooja Kapoor",
        initials: "PK",
        source: "WhatsApp",
        timeAgo: "3 days ago",
        date: "22 Mar 2027",
        budget: "₹1.2L",
        events: "Wedding + reception",
        city: "Pune",
        badge: "Warm",
      },
    ],
    newLead: {
      name: "Nidhi Sharma",
      initials: "NS",
      source: "Missed call",
      timeAgo: "just now",
      date: "6 Dec 2026",
      budget: "₹3L",
      events: "Haldi, Mehendi, Sangeet, Wedding",
      city: "Delhi",
      badge: "Hot",
    },
    provenance: "Captured at 11:47 PM while you were busy shooting a sangeet",
    callerName: "Nidhi just called — tap to see what happened",
  },

  // Demo 2 — Channels
  demo2: {
    sectionHeading: "See what happens when she also DMs",
    intro:
      "Brides don't reach out in one place. They DM, they WhatsApp, they call — sometimes all three. VoiceDesk catches all of it. As one lead.",
    igThread: [
      { from: "in", text: "Hi! Saw your work on reels 😍 I'm looking for a photographer for my December wedding in Jaipur. Are you available?", time: "9:14 PM" },
      { from: "out", text: "Hi Ritika! Sneha's assistant here — she's currently at a shoot. Let me capture your details so she can follow up personally!", time: "9:14 PM" },
      { from: "in", text: "December 18th! It's a 3-day function — mehendi, sangeet, and the wedding", time: "9:16 PM" },
      { from: "out", text: "Lovely! And roughly what's your photography budget?", time: "9:16 PM" },
      { from: "in", text: "Around ₹2–2.5 lakhs. Is Sneha free that weekend?", time: "9:17 PM" },
      { from: "out", text: "Got everything! Sneha will personally follow up with you by tomorrow morning ✨", time: "9:18 PM" },
    ],
    waThread: [
      { from: "in", text: "Hello, I got your number from a friend. Are you free Feb 14 for a Goa wedding?", time: "11:02 PM" },
      { from: "out", text: "Hi Meera! This is Sneha's assistant — she's unavailable right now but I can collect details so she calls you first thing tomorrow!", time: "11:02 PM" },
      { from: "in", text: "Yes please! Feb 14, Goa, around 200 guests", time: "11:03 PM" },
      { from: "out", text: "A Valentine's wedding in Goa — gorgeous! What's your rough budget?", time: "11:03 PM" },
      { from: "in", text: "Flexible — maybe ₹4–5L for the right person", time: "11:04 PM" },
      { from: "out", text: "Perfect — I've noted everything. Sneha will reach out by 9 AM tomorrow ✨", time: "11:05 PM" },
    ],
    unifiedLeadName: "Nidhi Sharma",
    unifiedTouchpoints: [
      { channel: "ig", label: "Nidhi DM'd on Instagram", time: "9:14 PM" },
      { channel: "wa", label: "Nidhi followed up on WhatsApp", time: "9:41 PM" },
      { channel: "call", label: "Missed call from Nidhi", time: "10:02 PM" },
    ],
  },

  // Demo 3 — merged channels + follow-up story. Toggle contrasts
  // "Without VoiceDesk" (fragmented cross-channel misses story) with
  // "With VoiceDesk" (title strip + 3 capability rows + booking banner).
  // Deliberately generic on the channels — VoiceDesk does not have
  // WhatsApp Business API access yet, so "VoiceDesk responds" is left
  // ambiguous about the exact wire path.
  demo3: {
    sectionHeading: "See how VoiceDesk closes across every channel",
    intro:
      "Brides don't reach out in one place — they DM, they WhatsApp, they call. VoiceDesk catches all of it as one lead, keeps her warm while you shoot, and closes when you finally call.",
    beforeMissedItems: [
      { icon: "phone-off", text: "Called your number — went to voicemail", time: "Sat, 9:12 PM" },
      { icon: "brand-instagram", text: "DM'd on Instagram — no reply", time: "Sat, 9:14 PM" },
      { icon: "brand-whatsapp", text: '"Hi, is anyone available?" — seen at 1 AM, unanswered', time: "Sat, 9:41 PM" },
      { icon: "calendar-x", text: "Booked another photographer by Sunday morning", time: "Sun, 10:30 AM" },
    ],
    beforeLossAmount: "₹3.5L booking gone",
    withTitle: "Nidhi (captured across 3 channels, 1 lead)",
    withCapabilities: [
      {
        icon: "phone",
        trigger: "Nidhi called",
        response: "VoiceDesk picks up and updates your dashboard with lead details",
      },
      {
        icon: "brand-instagram+brand-whatsapp",
        trigger: "DM'd on Insta/WhatsApp",
        response: "VoiceDesk responds",
      },
      {
        icon: "sparkles",
        trigger: "You're still shooting",
        response: "Get a smart notification to call Nidhi",
      },
    ],
    afterBookingValue: "₹3.5L",
    ctaLabel: "Never lose another lead",
    ctaHref: "#waitlist",
  },

  // Waitlist / form section
  waitlist: {
    eyebrow: "BETA ACCESS",
    headline: "Get VoiceDesk running before your next shoot.",
    sub: "Takes 30 seconds. First 100 photographers get their first month free.",
    ctaLabel: "Join the beta",
    microcopy: "We'll reach out on WhatsApp within 24 hours.",
    successHeadline: "You're in.",
    successBody: "We'll reach out on WhatsApp within 24 hours to walk you through setup.",
  },

  // Sticky footer CTA — mobile-only, always visible
  stickyCta: {
    label: "Never lose another lead",
    href: "#waitlist",
  },

  // FAQ — 5 entries, rendered as an accordion (see components/sections/
  // Objections.tsx). Order matters: the three mechanical "how does it
  // actually work" questions come first, then the two emotional ones.
  // Pricing stays off the page so it lands on the sales call.
  objections: [
    {
      fear: "How will VoiceDesk capture leads who call?",
      answer:
        "We give you an agent contact number to add to your Instagram bio, Google listing, website — wherever you get inbound leads. Whenever anyone calls it, VoiceDesk answers, captures their details, and passes them to your dashboard.",
    },
    {
      fear: "How will VoiceDesk capture leads who DM?",
      answer:
        "Anyone who DMs you on Instagram or WhatsApp gets a VoiceDesk link as an auto-generated response. It captures their details and passes them to your dashboard.",
    },
    {
      fear: "Can VoiceDesk share my leads with anyone?",
      answer:
        "Your leads data is 100% secure and will never be shared with anyone else. For more details, you can read our data protection and privacy policy.",
    },
    {
      fear: "Will it sound like a robot and embarrass me?",
      answer:
        "It answers in your name, warmly, in your client's language. Most callers never realize they're talking to AI.",
    },
    {
      fear: "How to set this up? I'm not technical.",
      answer:
        "It's very easy — we connect your primary contact number to our AI agent, and give you a dashboard to track every lead's journey.",
    },
  ],

  // Persona-specific flavor
  scene: {
    busyMoment: "shooting a sangeet",
    professionalTitle: "photographer",
    clientType: "bride",
    deliverable: "wedding shoot",
    averageTicket: "₹2.5L",
  },
};
