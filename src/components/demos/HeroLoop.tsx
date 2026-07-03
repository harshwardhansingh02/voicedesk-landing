"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

import Badge from "@/components/ui/Badge";
import type { PersonaConfig } from "@/personas/types";

// ──────────────────────────────────────────────────────────────────────────
// HeroLoop — silent, ambient 6-second condensed replay of Demo 1's arrival
// moment. Plays max 10 cycles, then pauses with a Replay link. Pauses when
// out of viewport. Respects prefers-reduced-motion (renders final state).
//
// Timing per spec (handoff §5 + Harsh's detailed clarification):
//   0.00s  Hold on 3 pre-seeded leads, stats showing initial count
//   0.50s  New card starts arriving — height grows, gold border on
//   0.80s  Field 1 (Date) value fades in
//   1.55s  Field 2 (Budget) value fades in
//   2.30s  Field 3 (Events) value fades in
//   3.05s  Field 4 (City) value fades in
//   3.80s  "Captured" badge appears, stats tick 3→4 / ₹4.2L→₹7.2L
//   6.00s  Cycle complete — loop or pause
//
// Architecture: single useEffect drives a 6s timeout chain. Phase state is
// derived from a discrete "stage" counter (0-5) so React only re-renders
// at phase boundaries, not every frame.
//
// All animations restricted to `transform` and `opacity` — never width,
// height, or box-shadow (GPU budget rule from §5).
// ──────────────────────────────────────────────────────────────────────────

// Was 10 per §5, but 10×6s = 60s means anyone lingering on the hero for a
// minute sees a frozen final state that reads as a bug (Harsh reported this).
// Bumping to 30 → 3 minutes of visible looping before pause, which comfortably
// covers real read time on the hero.
const MAX_PLAYS = 30;
const CYCLE_MS = 6000;

// Phase boundaries (cumulative milliseconds from cycle start)
const T_CARD_ARRIVE = 500;
const T_FIELD_1 = 800;
const T_FIELD_2 = 1550;
const T_FIELD_3 = 2300;
const T_FIELD_4 = 3050;
const T_CAPTURED = 3800;

type Props = {
  config: PersonaConfig;
};

// Avatar palette borrowed from the demo1 reference HTML — keeps the seeded
// leads visually consistent with the full Demo 1 component when that ships.
const AVATAR_PALETTE = [
  { bg: "#B5D4F4", fg: "#0C447C" },
  { bg: "#9FE1CB", fg: "#085041" },
  { bg: "#FAC775", fg: "#633806" },
] as const;

const NEW_AVATAR = { bg: "rgba(201,168,76,0.13)", fg: "#A88634" };

// Totals mirror DemoCapture — Ananya ₹2.5L + Pooja ₹1.2L initially, then
// Nidhi ₹3L captured. If pretypedLeads changes, revisit here too.
const INITIAL_STATS = { count: 2, value: "₹3.7L" };
const SETTLED_STATS = { count: 3, value: "₹6.7L" };

export default function HeroLoop({ config }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Deliberately not restricting to a threshold — even a sliver in view
  // should keep the loop running so users don't see a frozen frame while
  // scrolling. Also intentionally NOT reading prefers-reduced-motion here:
  // the animation is small, gentle (opacity + subtle scale), and iOS Low
  // Power Mode force-enables that flag — which was silently freezing the
  // whole demo for users on low battery.
  const inView = useInView(containerRef);

  // Stage 0 = initial, 1 = card arriving, 2-5 = fields typing, 6 = settled
  const [stage, setStage] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);

  const isComplete = playCount >= MAX_PLAYS;
  const shouldRun = inView && !manualPaused && !isComplete;
  const showReplay = manualPaused || isComplete;

  // Cycle scheduler — re-runs whenever playCount changes (each cycle end) or
  // pause state flips. Cleanup clears outstanding timeouts on every re-run.
  useEffect(() => {
    if (!shouldRun) return;

    // Reset to stage 0 at the start of each cycle.
    setStage(0);

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (ms: number, fn: () => void) => {
      timeouts.push(setTimeout(fn, ms));
    };

    schedule(T_CARD_ARRIVE, () => setStage(1));
    schedule(T_FIELD_1, () => setStage(2));
    schedule(T_FIELD_2, () => setStage(3));
    schedule(T_FIELD_3, () => setStage(4));
    schedule(T_FIELD_4, () => setStage(5));
    schedule(T_CAPTURED, () => setStage(6));
    schedule(CYCLE_MS, () => setPlayCount((p) => p + 1));

    return () => timeouts.forEach(clearTimeout);
  }, [shouldRun, playCount]);

  // When loop completes naturally (MAX_PLAYS), hold on settled state so the
  // user still sees the punchline (Nidhi captured) alongside the Replay link.
  useEffect(() => {
    if (isComplete) setStage(6);
  }, [isComplete]);

  const handleContainerTap = () => {
    if (showReplay) return; // tap on container while replay is showing — let user use the link
    setManualPaused(true);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayCount(0);
    setManualPaused(false);
  };

  const fieldsValue = config.demo1.newLead;
  const fieldVisible = (n: 1 | 2 | 3 | 4) => stage >= 1 + n;
  const capturedVisible = stage >= 6;
  const stats = capturedVisible ? SETTLED_STATS : INITIAL_STATS;
  const containerOpacity = showReplay || !inView ? 0.85 : 1;

  return (
    <div
      ref={containerRef}
      onClick={handleContainerTap}
      role="img"
      aria-label="VoiceDesk dashboard preview — a new lead being captured and qualified in real time."
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 380,
        margin: "0 auto",
        padding: 14,
        borderRadius: "var(--radius-lg)",
        background: "var(--color-cream)",
        border: "0.5px solid var(--color-border)",
        opacity: containerOpacity,
        transition: "opacity 0.3s ease",
        cursor: showReplay ? "default" : "pointer",
        userSelect: "none",
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
        <StatCell label="Leads this week" value={stats.count.toString()} ticked={capturedVisible} />
        <StatCell label="Potential value" value={stats.value} ticked={capturedVisible} />
      </div>

      {/* Pre-seeded leads */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {config.demo1.pretypedLeads.map((lead, i) => (
          <MiniLeadCard
            key={lead.name}
            lead={lead}
            avatarColor={AVATAR_PALETTE[i % AVATAR_PALETTE.length]}
          />
        ))}

        {/* New lead card — animates in from stage 1 onwards */}
        <NewLeadCard
          name={fieldsValue.name}
          initials={fieldsValue.initials}
          source={`via ${fieldsValue.source} · ${fieldsValue.timeAgo}`}
          fields={{
            date: fieldsValue.date,
            budget: fieldsValue.budget,
            events: fieldsValue.events,
            city: fieldsValue.city,
          }}
          fieldVisible={fieldVisible}
          arrived={stage >= 1}
          captured={capturedVisible}
        />
      </div>

      {/* Replay control — shown after 10 plays OR after a manual tap-pause */}
      {showReplay && (
        <button
          type="button"
          onClick={handleReplay}
          style={{
            position: "absolute",
            bottom: 8,
            right: 12,
            background: "transparent",
            border: "none",
            color: "var(--color-mocha)",
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 11,
            fontWeight: 500,
            cursor: "pointer",
            padding: "4px 6px",
            letterSpacing: "0.02em",
          }}
        >
          Replay ↻
        </button>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────

function StatCell({ label, value, ticked }: { label: string; value: string; ticked: boolean }) {
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
      <div
        // key forces a remount so framer/css transition fires on tick.
        key={value}
        style={{
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
          fontSize: 20,
          fontWeight: 500,
          color: ticked ? "var(--color-ink)" : "var(--color-ink)",
          opacity: ticked ? 1 : 0.95,
          transition: "opacity 0.4s ease",
        }}
      >
        {value}
      </div>
    </div>
  );
}

type AvatarColor = { bg: string; fg: string };

function MiniLeadCard({
  lead,
  avatarColor,
}: {
  lead: PersonaConfig["demo1"]["pretypedLeads"][number];
  avatarColor: AvatarColor;
}) {
  return (
    <div
      style={{
        background: "var(--color-cream)",
        border: "0.5px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: "9px 11px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <Avatar initials={lead.initials} color={avatarColor} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 12,
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
            }}
          >
            via {lead.source} · {lead.timeAgo}
          </div>
        </div>
        <Badge variant={lead.badge.toLowerCase() as "hot" | "warm" | "cold"}>{lead.badge}</Badge>
      </div>
      <MiniFieldGrid
        date={lead.date}
        budget={lead.budget}
        events={lead.events}
        city={lead.city}
      />
    </div>
  );
}

function NewLeadCard({
  name,
  initials,
  source,
  fields,
  fieldVisible,
  arrived,
  captured,
}: {
  name: string;
  initials: string;
  source: string;
  fields: { date: string; budget: string; events: string; city: string };
  fieldVisible: (n: 1 | 2 | 3 | 4) => boolean;
  arrived: boolean;
  captured: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--color-cream)",
        border: arrived
          ? `0.5px solid ${captured ? "var(--color-border)" : "var(--color-warm-accent)"}`
          : "0.5px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: "9px 11px",
        // animate height via max-height (not height) to keep transform-only rule
        // — max-height of empty state collapses, opacity drops
        maxHeight: arrived ? 200 : 0,
        opacity: arrived ? 1 : 0,
        overflow: "hidden",
        transition:
          "max-height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease, border-color 0.6s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <Avatar initials={initials} color={NEW_AVATAR} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--color-ink)",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 10,
              color: "var(--color-sand-dark)",
            }}
          >
            {source}
          </div>
        </div>
        <span
          style={{
            opacity: captured ? 1 : 0,
            transition: "opacity 0.4s ease",
            transform: captured ? "translateY(0)" : "translateY(-4px)",
            transitionProperty: "opacity, transform",
            transitionDuration: "0.4s",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <Badge variant="captured">✓ Captured</Badge>
        </span>
      </div>
      <FieldGridFade
        date={fields.date}
        budget={fields.budget}
        events={fields.events}
        city={fields.city}
        fieldVisible={fieldVisible}
      />
    </div>
  );
}

function Avatar({ initials, color }: { initials: string; color: AvatarColor }) {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: color.bg,
        color: color.fg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-jakarta), system-ui, sans-serif",
        fontSize: 10,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function MiniFieldGrid({
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
        gap: "2px 10px",
        fontFamily: "var(--font-jakarta), system-ui, sans-serif",
        fontSize: 10,
      }}
    >
      <FieldRow label="Date" value={date} />
      <FieldRow label="Budget" value={budget} />
      <FieldRow label="Events" value={events} />
      <FieldRow label="City" value={city} />
    </div>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 4, minWidth: 0 }}>
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

function FieldGridFade({
  date,
  budget,
  events,
  city,
  fieldVisible,
}: {
  date: string;
  budget: string;
  events: string;
  city: string;
  fieldVisible: (n: 1 | 2 | 3 | 4) => boolean;
}) {
  // Each row fades in (opacity + tiny translateY) when its stage activates.
  // Compositor-only animation — opacity + transform — per §5 GPU budget rule.
  const baseRow: React.CSSProperties = {
    transition:
      "opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2px 10px",
        fontFamily: "var(--font-jakarta), system-ui, sans-serif",
        fontSize: 10,
      }}
    >
      <div
        style={{
          ...baseRow,
          opacity: fieldVisible(1) ? 1 : 0,
          transform: fieldVisible(1) ? "translateY(0)" : "translateY(4px)",
        }}
      >
        <FieldRow label="Date" value={date} />
      </div>
      <div
        style={{
          ...baseRow,
          opacity: fieldVisible(2) ? 1 : 0,
          transform: fieldVisible(2) ? "translateY(0)" : "translateY(4px)",
        }}
      >
        <FieldRow label="Budget" value={budget} />
      </div>
      <div
        style={{
          ...baseRow,
          opacity: fieldVisible(3) ? 1 : 0,
          transform: fieldVisible(3) ? "translateY(0)" : "translateY(4px)",
        }}
      >
        <FieldRow label="Events" value={events} />
      </div>
      <div
        style={{
          ...baseRow,
          opacity: fieldVisible(4) ? 1 : 0,
          transform: fieldVisible(4) ? "translateY(0)" : "translateY(4px)",
        }}
      >
        <FieldRow label="City" value={city} />
      </div>
    </div>
  );
}
