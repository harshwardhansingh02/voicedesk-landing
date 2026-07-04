"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import type { LeadSeed, PersonaConfig } from "@/personas/types";

// Stage type covers idle → arriving → typing (4 steps) → captured → done.
// After `done` the demo persists in captured state; no reset available.

// ─────────────────────────────────────────────────────────────────────────
// Demo 1 — the interactive "capture" moment. Triggered by tap on the
// dashboard's caller toast. Includes:
//   • Toast notification when the call ends
//   • Character-by-character typing of each field
//   • Simultaneous "Captured" badge + stats tick at t=3.4s
//   • Provenance line elevated post-capture (the emotional beat)
//
// No board re-sort, no replay. Post-capture the demo stays in the settled
// state; the progression CTA below the dashboard advances to Demo 2.
// ─────────────────────────────────────────────────────────────────────────

type Stage =
  | "idle"
  | "arriving"
  | "typing-1"
  | "typing-2"
  | "typing-3"
  | "typing-4"
  | "captured"
  | "done";

const STAGE_ORDER: readonly Stage[] = [
  "idle",
  "arriving",
  "typing-1",
  "typing-2",
  "typing-3",
  "typing-4",
  "captured",
  "done",
] as const;

const stageAtLeast = (current: Stage, target: Stage): boolean =>
  STAGE_ORDER.indexOf(current) >= STAGE_ORDER.indexOf(target);

const T_FIELD_1 = 400;
const T_FIELD_2 = 1200;
const T_FIELD_3 = 2000;
const T_FIELD_4 = 2800;
const T_CAPTURED = 3400;
const T_DONE = 4400;

// Totals derived from photographer.pretypedLeads (Ananya ₹2.5L + Pooja ₹1.2L)
// + newLead Nidhi (₹3L). If the pre-typed list changes, revisit these.
const INITIAL_STATS = { count: "2", value: "₹3.7L" };
const SETTLED_STATS = { count: "3", value: "₹6.7L" };

// Avatar palette matches the demo reference HTML.
const AVATAR_PALETTE = [
  { bg: "#B5D4F4", fg: "#0C447C" },
  { bg: "#9FE1CB", fg: "#085041" },
  { bg: "#FAC775", fg: "#633806" },
] as const;

const NEW_AVATAR = { bg: "rgba(201,168,76,0.13)", fg: "#A88634" };

// ─── Typing hook ──────────────────────────────────────────────────────────
// Reveals a string character-by-character when `active` becomes true.
// Cleans up on unmount or reset (active → false). Charge ~26 chars/sec by
// default (~38ms/char), matching the reference demo's feel.

function useTypedText(text: string, active: boolean, msPerChar = 38): string {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    setCount(0);
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, msPerChar);
    return () => clearInterval(interval);
  }, [active, text, msPerChar]);
  return text.slice(0, count);
}

// ─── Main component ──────────────────────────────────────────────────────

type Props = { config: PersonaConfig };

export default function DemoCapture({ config }: Props) {
  const [stage, setStage] = useState<Stage>("idle");
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const trigger = () => {
    if (stage !== "idle") return;
    setStage("arriving");
    const schedule = (ms: number, s: Stage) => {
      timeoutsRef.current.push(setTimeout(() => setStage(s), ms));
    };
    schedule(T_FIELD_1, "typing-1");
    schedule(T_FIELD_2, "typing-2");
    schedule(T_FIELD_3, "typing-3");
    schedule(T_FIELD_4, "typing-4");
    schedule(T_CAPTURED, "captured");
    schedule(T_DONE, "done");
  };

  useEffect(() => () => clearTimeouts(), []);

  const { pretypedLeads, newLead } = config.demo1;

  // Typing state per field, keyed to stage progression.
  const dateTyped = useTypedText(newLead.date, stageAtLeast(stage, "typing-1"));
  const budgetTyped = useTypedText(newLead.budget, stageAtLeast(stage, "typing-2"));
  const eventsTyped = useTypedText(newLead.events, stageAtLeast(stage, "typing-3"));
  const cityTyped = useTypedText(newLead.city, stageAtLeast(stage, "typing-4"));

  const captured = stageAtLeast(stage, "captured");
  const stats = captured ? SETTLED_STATS : INITIAL_STATS;
  const showToast = stage !== "idle" && stage !== "done";

  // Board ordering: pre-typed leads always render. Nidhi appears at the
  // bottom once tapped and STAYS there — no auto-sort. The takeaway is the
  // provenance line ("captured while you were shooting a sangeet"), not a
  // triage reveal. Sort behavior can return in a later cut if we want it.
  const orderedLeads = useMemo<Array<{ lead: LeadSeed; role: "pretyped" | "new" }>>(() => {
    const pre = pretypedLeads.map((lead) => ({ lead, role: "pretyped" as const }));
    if (stage === "idle") return pre;
    return [...pre, { lead: newLead, role: "new" as const }];
  }, [stage, pretypedLeads, newLead]);

  return (
    <section
      style={{
        padding: "0.5rem var(--section-pad-x) var(--section-pad-y)",
        background: "var(--color-linen)",
      }}
      id="demo-1"
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        {/* Demo description — the intro line that flows from the hero */}
        <p
          style={{
            marginTop: 0,
            marginBottom: 0,
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 14,
            lineHeight: 1.55,
            color: "var(--color-mocha)",
            textAlign: "center",
          }}
        >
          {config.demo1.intro}
        </p>

        {/* Mock dashboard */}
        <div
          style={{
            marginTop: 16,
            background: "var(--color-cream)",
            border: "0.5px solid var(--color-border)",
            borderRadius: "var(--radius-xl)",
            padding: 14,
          }}
        >
          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <StatCell label="Leads this week" value={stats.count} pulsed={captured} />
            <StatCell label="Potential value" value={stats.value} pulsed={captured} />
          </div>

          {/* Toast — appears at tap, hides at done */}
          <div
            style={{
              overflow: "hidden",
              marginBottom: showToast ? 10 : 0,
              transition: "margin-bottom 0.3s ease",
            }}
          >
            <div
              role="status"
              aria-live="polite"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                background: "var(--color-cream)",
                border: "0.5px solid var(--color-warm-accent)",
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: 12,
                color: "var(--color-ink)",
                opacity: showToast ? 1 : 0,
                transform: showToast ? "translateY(0)" : "translateY(-8px)",
                transition:
                  "opacity 0.35s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                pointerEvents: showToast ? "auto" : "none",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--color-warm-accent)",
                  animation: showToast ? "vd-toast-pulse 1.2s ease infinite" : "none",
                  flexShrink: 0,
                }}
              />
              <span>{config.demo1.callerName}</span>
            </div>
          </div>

          {/* Leads list — no sort. Nidhi always joins at the bottom. */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {orderedLeads.map(({ lead, role }, idx) =>
              role === "pretyped" ? (
                <LeadCard
                  key={lead.name}
                  lead={lead}
                  avatarColor={AVATAR_PALETTE[idx % AVATAR_PALETTE.length]}
                />
              ) : (
                <NewLeadCard
                  key={lead.name}
                  lead={lead}
                  arrived={stage !== "idle"}
                  captured={captured}
                  typed={{
                    date: dateTyped,
                    budget: budgetTyped,
                    events: eventsTyped,
                    city: cityTyped,
                  }}
                  provenance={config.demo1.provenance}
                />
              )
            )}
          </div>

          {/* Trigger — only visible until the demo has played once */}
          {stage === "idle" && (
            <div style={{ marginTop: 14 }}>
              <Button onClick={trigger} fullWidth>
                <Icon name="phone-off" size={16} strokeWidth={1.75} />
                {config.demo1.callerName}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Keyframes for the toast pulse */}
      <style>{`
        @keyframes vd-toast-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.55; transform: scale(0.75); }
        }
      `}</style>
    </section>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────

function StatCell({
  label,
  value,
  pulsed,
}: {
  label: string;
  value: string;
  pulsed: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--color-linen)",
        borderRadius: "var(--radius-sm)",
        padding: "10px 12px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
          fontSize: 10,
          color: "var(--color-mocha)",
          marginBottom: 3,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </div>
      <motion.div
        key={value}
        initial={{ opacity: 0.6, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
          fontSize: 22,
          fontWeight: 500,
          color: pulsed ? "var(--color-warm-accent)" : "var(--color-ink)",
          transition: "color 0.6s ease",
        }}
      >
        {value}
      </motion.div>
    </div>
  );
}

type AvatarColor = { bg: string; fg: string };

function LeadCard({
  lead,
  avatarColor,
}: {
  lead: LeadSeed;
  avatarColor: AvatarColor;
}) {
  return (
    <article
      style={{
        background: "var(--color-cream)",
        border: "0.5px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: "11px 13px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 6,
        }}
      >
        <Avatar initials={lead.initials} color={avatarColor} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--color-ink)",
            }}
          >
            {lead.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 10,
              color: "var(--color-sand-dark)",
              marginTop: 1,
            }}
          >
            via {lead.source} · {lead.timeAgo}
          </div>
        </div>
        <Badge variant={lead.badge.toLowerCase() as "hot" | "warm" | "cold"}>
          {lead.badge}
        </Badge>
      </div>
      <FieldGrid
        date={lead.date}
        budget={lead.budget}
        events={lead.events}
        city={lead.city}
      />
    </article>
  );
}

function NewLeadCard({
  lead,
  arrived,
  captured,
  typed,
  provenance,
}: {
  lead: LeadSeed;
  arrived: boolean;
  captured: boolean;
  typed: { date: string; budget: string; events: string; city: string };
  provenance: string;
}) {
  return (
    <article
      style={{
        background: "var(--color-cream)",
        border: "0.5px solid var(--color-warm-accent)",
        borderRadius: "var(--radius-md)",
        padding: "11px 13px",
        maxHeight: arrived ? 280 : 0,
        opacity: arrived ? 1 : 0,
        overflow: "hidden",
        transition:
          "max-height 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease, border-color 0.8s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 8,
        }}
      >
        <Avatar initials={lead.initials} color={NEW_AVATAR} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--color-ink)",
            }}
          >
            {lead.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 10,
              color: "var(--color-sand-dark)",
              marginTop: 1,
            }}
          >
            via {lead.source} · {lead.timeAgo}
          </div>
        </div>
        <span
          style={{
            opacity: captured ? 1 : 0,
            transform: captured ? "translateY(0)" : "translateY(-4px)",
            transition:
              "opacity 0.35s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <Badge variant="captured">✓ Captured</Badge>
        </span>
      </div>

      <TypingFieldGrid typed={typed} />

      {/* Provenance — the takeaway line. Elevated after capture: Fraunces
          italic, gold, subtle sand tint background. This is the "oh." moment. */}
      <div
        style={{
          marginTop: 10,
          padding: captured ? "9px 12px" : "8px 12px",
          background: captured ? "rgba(201,168,76,0.10)" : "transparent",
          borderRadius: "var(--radius-sm)",
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: captured ? 13 : 12,
          lineHeight: 1.45,
          color: captured ? "var(--color-warm-accent)" : "var(--color-sand-dark)",
          textAlign: "center",
          opacity: captured ? 1 : 0.7,
          transition:
            "background 0.6s ease, color 0.5s ease, font-size 0.4s ease, opacity 0.5s ease, padding 0.4s ease",
        }}
      >
        {provenance}
      </div>
    </article>
  );
}

function Avatar({ initials, color }: { initials: string; color: AvatarColor }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: color.bg,
        color: color.fg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-jakarta), system-ui, sans-serif",
        fontSize: 11,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function FieldGrid({
  date,
  budget,
  events,
  city,
}: {
  date: string;
  budget: string;
  events: string;
  city: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2px 12px",
        fontFamily: "var(--font-jakarta), system-ui, sans-serif",
        fontSize: 11,
      }}
    >
      <FieldRow label="Date" value={date} />
      <FieldRow label="Budget" value={budget} />
      <FieldRow label="Events" value={events} />
      <FieldRow label="City" value={city} />
    </div>
  );
}

function TypingFieldGrid({
  typed,
}: {
  typed: { date: string; budget: string; events: string; city: string };
}) {
  // Fixed-height rows so the card doesn't jitter as text types in.
  const rowStyle: React.CSSProperties = {
    display: "flex",
    gap: 6,
    fontSize: 11,
    minHeight: 17,
    lineHeight: "17px",
    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TypingRow label="Date" value={typed.date} style={rowStyle} />
      <TypingRow label="Budget" value={typed.budget} style={rowStyle} />
      <TypingRow label="Events" value={typed.events} style={rowStyle} />
      <TypingRow label="City" value={typed.city} style={rowStyle} />
    </div>
  );
}

function TypingRow({
  label,
  value,
  style,
}: {
  label: string;
  value: string;
  style: React.CSSProperties;
}) {
  return (
    <div style={style}>
      <span
        style={{
          color: "var(--color-sand-dark)",
          width: 60,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: "var(--color-ink)",
          fontWeight: 500,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          // Gold cursor that disappears once value is fully typed and settled
          borderRight: value ? "1.5px solid var(--color-warm-accent)" : "none",
          paddingRight: value ? 2 : 0,
        }}
      >
        {value || " "}
      </span>
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 5, minWidth: 0 }}>
      <span style={{ color: "var(--color-sand-dark)" }}>{label}</span>
      <span
        style={{
          color: "var(--color-ink)",
          fontWeight: 500,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    </div>
  );
}
