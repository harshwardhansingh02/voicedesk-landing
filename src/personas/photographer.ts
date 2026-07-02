import type { PersonaConfig } from "./types";

// Gold-standard persona config. Every other persona mirrors this shape exactly.
// Copy here is verbatim from the v2 build handoff §4 — do not paraphrase without
// flagging back. The persona names and dates are intentional dummy data.

export const photographerConfig: PersonaConfig = {
  slug: "photographer",
  navLabel: "For wedding photographers",

  // Hero
  eyebrow: "VoiceDesk for wedding photographers",
  warCry: {
    line1: "You were shooting.",
    line2: "VoiceDesk was closing.",
  },
  heroSub:
    "The average wedding photographer loses ₹4–6L a year to calls and DMs they never saw.",
  heroLossNumber: "₹4–6L a year",

  // Mirror
  mirrorScene:
    "It's 9 PM. You're three hours into a sangeet, hands full, lenses everywhere. Your phone buzzes — a bride, ready to book, asking if you're free for December. You'll see it at 1 AM. By then she's messaged four other photographers. By Sunday, she's booked one of them. You never even knew she came.",
  mirrorThesis:
    "It's not that you're losing clients. It's that you never knew they were trying to reach you.",

  // Demo 1 — Capture
  demo1: {
    intro:
      "Catching every lead is where it starts. Every call, every DM, every message — captured, qualified, and sorted by urgency before you finish your shoot.",
    outro:
      "Catching the lead is the easy part. What happens when she reaches out three different ways — and you're still shooting?",
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
    intro:
      "Brides don't reach out in one place. They DM, they WhatsApp, they call — sometimes all three. VoiceDesk catches all of it. As one lead.",
    outro:
      "Now you know who wants you. But a lead you never follow up on is the same as a lead you never caught.",
    igThread: [
      {
        from: "in",
        text: "Hi! Saw your work on reels 😍 I'm looking for a photographer for my December wedding in Jaipur. Are you available?",
        time: "9:14 PM",
      },
      {
        from: "out",
        text: "Hi Ritika! Sneha's assistant here — she's currently at a shoot. Let me capture your details so she can follow up personally!",
        time: "9:14 PM",
      },
      {
        from: "in",
        text: "December 18th! It's a 3-day function — mehendi, sangeet, and the wedding",
        time: "9:16 PM",
      },
      {
        from: "out",
        text: "Lovely! And roughly what's your photography budget?",
        time: "9:16 PM",
      },
      {
        from: "in",
        text: "Around ₹2–2.5 lakhs. Is Sneha free that weekend?",
        time: "9:17 PM",
      },
      {
        from: "out",
        text: "Got everything! Sneha will personally follow up with you by tomorrow morning ✨",
        time: "9:18 PM",
      },
    ],
    waThread: [
      {
        from: "in",
        text: "Hello, I got your number from a friend. Are you free Feb 14 for a Goa wedding?",
        time: "11:02 PM",
      },
      {
        from: "out",
        text: "Hi Meera! This is Sneha's assistant — she's unavailable right now but I can collect details so she calls you first thing tomorrow!",
        time: "11:02 PM",
      },
      {
        from: "in",
        text: "Yes please! Feb 14, Goa, around 200 guests",
        time: "11:03 PM",
      },
      {
        from: "out",
        text: "A Valentine's wedding in Goa — gorgeous! What's your rough budget?",
        time: "11:03 PM",
      },
      {
        from: "in",
        text: "Flexible — maybe ₹4–5L for the right person",
        time: "11:04 PM",
      },
      {
        from: "out",
        text: "Perfect — I've noted everything. Sneha will reach out by 9 AM tomorrow ✨",
        time: "11:05 PM",
      },
    ],
    unifiedLeadName: "Ritika Sharma",
    unifiedTouchpoints: [
      { channel: "ig", label: "Ritika DM'd on Instagram", time: "9:14 PM" },
      { channel: "wa", label: "Ritika followed up on WhatsApp", time: "9:41 PM" },
      { channel: "call", label: "Missed call from Ritika", time: "10:02 PM" },
    ],
  },

  // Demo 3 — Follow-up
  demo3: {
    intro:
      "Following up is where deals are won. While you're at the wedding, VoiceDesk is nudging, reminding, qualifying — so when you finally pick up the phone, the lead is warm and ready.",
    outro:
      "Three fears, three fixes. Caught it. Connected it. Closed it. That's the front desk that used to need a team of three.",
    beforeMissedItems: [
      {
        icon: "phone-off",
        text: "Called your number — went to voicemail",
        time: "Sat, 9:12 PM",
      },
      {
        icon: "brand-instagram",
        text: "DM'd on Instagram — no reply",
        time: "Sat, 9:14 PM",
      },
      {
        icon: "brand-whatsapp",
        text: '"Hi, is anyone available?" — seen at 1 AM, unanswered',
        time: "Sat, 9:41 PM",
      },
      {
        icon: "calendar-x",
        text: "Booked another photographer by Sunday morning",
        time: "Sun, 10:30 AM",
      },
    ],
    beforeLossAmount: "₹2.5L booking · gone.",
    afterTimeline: [
      {
        time: "Sat · 9:12 PM · Missed call detected",
        title: "VoiceDesk sent an instant WhatsApp",
        kind: "message-out",
        body: "Hi Ritika! 👋 Sneha's with a client right now but I'm her assistant. Can I grab your wedding details so she can follow up personally?",
      },
      {
        time: "Sat · 9:16 PM · Ritika replied",
        title: "Qualification complete — lead captured",
        kind: "reply",
        body: "Dec 18 wedding in Jaipur, 3-day function, budget around ₹2–2.5L. Is Sneha available?",
        followup:
          "Perfect! I've noted everything. Sneha will personally call you first thing tomorrow morning ✨",
      },
      {
        time: "Sat · 10:00 PM · You're still shooting",
        title: "Sneha gets a smart nudge notification",
        kind: "notification",
        body: "Hot lead: Ritika Sharma. Dec 18 wedding · Jaipur · ₹2–2.5L budget. She's qualified and waiting for your call.",
      },
      {
        time: "Sun · 9:00 AM · Next morning reminder",
        title: "VoiceDesk follows up with Ritika",
        kind: "message-out",
        body: "Good morning Ritika! 🌸 Sneha will be calling you shortly. She's excited to hear about your December wedding!",
      },
      {
        time: "Sun · 10:30 AM · Booking confirmed",
        title: "Ritika booked Sneha's full package",
        kind: "success",
        body: "₹2.4L · Dec 18 Jaipur · 3-day full coverage",
      },
    ],
    afterBookingValue: "₹2.4L",
  },

  // Beyond — roadmap teaser
  beyondPoints: [
    {
      icon: "message-circle-heart",
      title: "Speaks Hindi, Tamil, Gujarati & more",
      body: "Your bride from a Tier-3 town gets answered warmly in her own language — not a clunky English bot.",
    },
    {
      icon: "sparkles",
      title: "Remembers every bride",
      body: "She enquired last December? VoiceDesk remembers her name, her venue, her budget. You sound like a luxury concierge.",
    },
    {
      icon: "trending-up",
      title: "Wakes up your dead leads",
      body: "January looking light? VoiceDesk re-engages the 14 brides who ghosted you last quarter, while you sleep.",
    },
  ],

  // Objections — 3 fears, 3 reassurances
  objections: [
    {
      fear: "Will it sound like a robot and embarrass me?",
      answer:
        "It answers in your name, warmly, in your client's language. Most callers never realize they're talking to AI.",
    },
    {
      fear: "Is this hard to set up? I'm not technical.",
      answer:
        "Forward your number. Connect your Instagram. You're live in ten minutes. No apps, no integrations, nothing to learn.",
    },
    {
      fear: "What will it cost me?",
      answer:
        "Less than what a part-time receptionist costs in a single day. We'll share early-access pricing with you on the call.",
    },
  ],

  // Persona-specific flavor used elsewhere in copy
  scene: {
    busyMoment: "shooting a sangeet",
    professionalTitle: "photographer",
    clientType: "bride",
    deliverable: "wedding shoot",
    averageTicket: "₹2.5L",
  },
};
