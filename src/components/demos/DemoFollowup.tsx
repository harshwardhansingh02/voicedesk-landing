"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import type { PersonaConfig, Touchpoint } from "@/personas/types";

// Merged demo — combines the channel-unification story (former Demo 2) with
// the follow-up close (former Demo 3). Same "Without / With VoiceDesk"
// toggle. The With frame gains a unified-lead card on top that visualizes
// the multi-channel capture, followed by the timeline of VoiceDesk's
// responses. The Without frame keeps channel icons prominent so the
// fragmentation reads immediately.
//
// Full interactive chat threads (former Demo 2) + click-through timeline
// animations land in build steps 8-9.

type View = "without" | "with";

type Props = { config: PersonaConfig };

const CHANNEL_META: Record<
  Touchpoint["channel"],
  { icon: string; bg: string; fg: string }
> = {
  ig: { icon: "brand-instagram", bg: "var(--color-ig-bg)", fg: "var(--color-ig)" },
  wa: { icon: "brand-whatsapp", bg: "var(--color-wa-bg)", fg: "var(--color-wa)" },
  call: { icon: "phone-off", bg: "var(--color-sand)", fg: "var(--color-mocha)" },
};

export default function DemoFollowup({ config }: Props) {
  const [view, setView] = useState<View>("without");
  const { demo2, demo3 } = config;

  return (
    <section
      id="demo-3"
      style={{
        padding: "var(--section-pad-y) var(--section-pad-x)",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        {/* Section heading */}
        <h2
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 26,
            lineHeight: 1.22,
            color: "var(--color-ink)",
            margin: 0,
            textAlign: "center",
            letterSpacing: "-0.005em",
          }}
        >
          {demo3.sectionHeading}
        </h2>

        {/* Context */}
        <p
          style={{
            marginTop: 12,
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--color-mocha)",
            textAlign: "center",
          }}
        >
          {demo3.intro}
        </p>

        {/* Toggle */}
        <Toggle view={view} onChange={setView} />

        {/* Frame */}
        <div style={{ marginTop: 14, position: "relative", minHeight: 320 }}>
          <AnimatePresence mode="wait" initial={false}>
            {view === "without" ? (
              <motion.div
                key="without"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <WithoutCard demo3={demo3} />
              </motion.div>
            ) : (
              <motion.div
                key="with"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <WithCard demo2={demo2} demo3={demo3} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA — sole form-redirect on the page (besides sticky footer) */}
        <div style={{ marginTop: 22 }}>
          <Button href={demo3.ctaHref} fullWidth>
            {demo3.ctaLabel}
            <span aria-hidden style={{ fontSize: 14, marginLeft: 2 }}>→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── Toggle ──────────────────────────────────────────────────────────────

function Toggle({
  view,
  onChange,
}: {
  view: View;
  onChange: (v: View) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Compare with and without VoiceDesk"
      style={{
        marginTop: 20,
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        padding: 4,
        background: "var(--color-sand)",
        borderRadius: 999,
      }}
    >
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: view === "without" ? 4 : "50%",
          width: "calc(50% - 4px)",
          borderRadius: 999,
          background: view === "without" ? "var(--color-cream)" : "var(--color-warm-accent)",
          boxShadow: "0 2px 8px -2px rgba(26,18,8,0.15)",
          transition: "left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease",
        }}
      />

      <ToggleButton active={view === "without"} onClick={() => onChange("without")}>
        Without VoiceDesk
      </ToggleButton>
      <ToggleButton
        active={view === "with"}
        onClick={() => onChange("with")}
        emphasis
      >
        With VoiceDesk
      </ToggleButton>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  emphasis,
  children,
}: {
  active: boolean;
  onClick: () => void;
  emphasis?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      style={{
        position: "relative",
        zIndex: 1,
        padding: "10px 12px",
        fontFamily: "var(--font-jakarta), system-ui, sans-serif",
        fontSize: 12,
        fontWeight: 500,
        color: active
          ? emphasis
            ? "var(--color-cream-on-dark)"
            : "var(--color-ink)"
          : "var(--color-mocha)",
        background: "transparent",
        border: "none",
        borderRadius: 999,
        cursor: "pointer",
        transition: "color 0.25s ease",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {children}
    </button>
  );
}

// ─── Without frame ───────────────────────────────────────────────────────

function WithoutCard({ demo3 }: { demo3: PersonaConfig["demo3"] }) {
  return (
    <div
      style={{
        background: "var(--color-cream)",
        border: "0.5px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
        padding: 16,
      }}
    >
      <FrameLabel>Saturday · Ritika reached out</FrameLabel>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
        {demo3.beforeMissedItems.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "10px 12px",
              background: "var(--color-linen)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <ChannelIcon iconName={item.icon} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: 12,
                  color: "var(--color-ink)",
                  lineHeight: 1.4,
                }}
              >
                {item.text}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: 10,
                  color: "var(--color-sand-dark)",
                  marginTop: 2,
                }}
              >
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 12,
          padding: "10px 12px",
          background: "var(--color-danger-bg)",
          borderRadius: "var(--radius-sm)",
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: "var(--color-danger-text)",
          textAlign: "center",
        }}
      >
        {demo3.beforeLossAmount}
      </div>
    </div>
  );
}

// ─── With frame — unified card on top, timeline below ────────────────────

function WithCard({
  demo2,
  demo3,
}: {
  demo2: PersonaConfig["demo2"];
  demo3: PersonaConfig["demo3"];
}) {
  // afterTimeline: last item is the success beat — pulled out into its
  // own banner; first N-1 items form the timeline preview.
  const timelineItems = demo3.afterTimeline.slice(0, -1);

  return (
    <div
      style={{
        background: "var(--color-cream)",
        border: "0.5px solid var(--color-warm-accent)",
        borderRadius: "var(--radius-xl)",
        padding: 16,
      }}
    >
      <FrameLabel emphasis>Same Saturday · VoiceDesk was on</FrameLabel>

      {/* Unified lead card — the channel-unification beat */}
      <div
        style={{
          marginTop: 10,
          padding: "12px 14px",
          background: "var(--color-linen)",
          borderRadius: "var(--radius-md)",
          border: "0.5px dashed rgba(201,168,76,0.35)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--color-ink)",
            }}
          >
            {demo2.unifiedLeadName}
          </div>
          <ChannelChips touchpoints={demo2.unifiedTouchpoints} />
        </div>
        <div
          style={{
            marginTop: 4,
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 10,
            color: "var(--color-warm-accent)",
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          Caught across {demo2.unifiedTouchpoints.length} channels · one lead
        </div>
      </div>

      {/* Timeline */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {timelineItems.map((node, i) => (
          <div
            key={i}
            style={{
              padding: "9px 12px",
              background: "var(--color-linen)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: 10,
                color: "var(--color-sand-dark)",
                letterSpacing: "0.01em",
              }}
            >
              {node.time}
            </div>
            <div
              style={{
                marginTop: 2,
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: 12,
                color: "var(--color-ink)",
                lineHeight: 1.4,
              }}
            >
              {node.title}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 12,
          padding: "10px 12px",
          background: "var(--color-success-bg)",
          borderRadius: "var(--radius-sm)",
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: "var(--color-success-text)",
          textAlign: "center",
        }}
      >
        Booking confirmed · {demo3.afterBookingValue}
      </div>
    </div>
  );
}

// ─── Small parts ─────────────────────────────────────────────────────────

function ChannelChips({ touchpoints }: { touchpoints: Touchpoint[] }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {touchpoints.map((tp, i) => {
        const meta = CHANNEL_META[tp.channel];
        return (
          <div
            key={i}
            title={tp.label}
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: meta.bg,
              color: meta.fg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name={meta.icon} size={11} strokeWidth={1.75} />
          </div>
        );
      })}
    </div>
  );
}

function ChannelIcon({ iconName }: { iconName: string }) {
  // Colored chip that matches the channel identity where relevant so the
  // multi-channel misses in the Without frame read at a glance.
  const meta = ((): { bg: string; fg: string } => {
    if (iconName === "brand-instagram")
      return { bg: "var(--color-ig-bg)", fg: "var(--color-ig)" };
    if (iconName === "brand-whatsapp")
      return { bg: "var(--color-wa-bg)", fg: "var(--color-wa)" };
    return { bg: "var(--color-sand)", fg: "var(--color-mocha)" };
  })();

  return (
    <div
      aria-hidden
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: meta.bg,
        color: meta.fg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 1,
      }}
    >
      <Icon name={iconName} size={12} strokeWidth={1.75} />
    </div>
  );
}

function FrameLabel({
  children,
  emphasis,
}: {
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      style={{
        fontFamily: "var(--font-jakarta), system-ui, sans-serif",
        fontSize: 10,
        color: emphasis ? "var(--color-warm-accent)" : "var(--color-mocha)",
        letterSpacing: "0.02em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}
