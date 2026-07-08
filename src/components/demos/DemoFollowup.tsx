"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import type { PersonaConfig } from "@/personas/types";

// Merged demo — Without vs With VoiceDesk. The Without frame keeps the
// four fragmented cross-channel misses story ending in a lost booking.
// The With frame is a three-row capability grid (trigger → response),
// with a title strip on top that names the lead and calls out that all
// channels resolve into one lead. The compound icon key
// "brand-instagram+brand-whatsapp" stacks two icons side-by-side; any
// other string flows through the single-icon renderer.

type View = "without" | "with";

type Props = { config: PersonaConfig };

export default function DemoFollowup({ config }: Props) {
  const [view, setView] = useState<View>("without");
  const { demo3 } = config;

  return (
    <section
      id="demo-3"
      style={{
        padding: "var(--section-pad-y) var(--section-pad-x)",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
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

        <Toggle view={view} onChange={setView} />

        <div style={{ marginTop: 14, position: "relative", minHeight: 340 }}>
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
                <WithCard demo3={demo3} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
      <FrameLabel>Saturday · Nidhi reached out</FrameLabel>

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

// ─── With frame — title strip + 3 capability rows + booking banner ───────

function WithCard({ demo3 }: { demo3: PersonaConfig["demo3"] }) {
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

      {/* Title strip — one line naming the lead + channel unification. */}
      <div
        style={{
          marginTop: 10,
          padding: "12px 14px",
          background: "var(--color-linen)",
          borderRadius: "var(--radius-md)",
          border: "0.5px dashed rgba(201,168,76,0.35)",
          textAlign: "center",
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: "var(--color-ink)",
        }}
      >
        {demo3.withTitle}
      </div>

      {/* Capability rows — trigger → response */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {demo3.withCapabilities.map((cap, i) => (
          <CapabilityRow key={i} capability={cap} />
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

function CapabilityRow({
  capability,
}: {
  capability: PersonaConfig["demo3"]["withCapabilities"][number];
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "36px 1fr",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        background: "var(--color-linen)",
        borderRadius: "var(--radius-sm)",
      }}
    >
      <CapabilityIcon iconKey={capability.icon} />
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: "var(--color-ink)",
            lineHeight: 1.35,
          }}
        >
          {capability.trigger}
        </div>
        <div
          style={{
            marginTop: 2,
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 11,
            color: "var(--color-mocha)",
            lineHeight: 1.4,
          }}
        >
          <span
            aria-hidden
            style={{
              color: "var(--color-warm-accent)",
              fontWeight: 500,
              marginRight: 4,
            }}
          >
            →
          </span>
          {capability.response}
        </div>
      </div>
    </div>
  );
}

// ─── Icon helpers ────────────────────────────────────────────────────────

// Renders 1 or 2 icons stacked, driven by the icon key. The "+"-joined
// form (e.g. "brand-instagram+brand-whatsapp") stacks the two circles
// side-by-side. Otherwise single circle.
function CapabilityIcon({ iconKey }: { iconKey: string }) {
  const names = iconKey.split("+");
  if (names.length === 1) {
    return (
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "rgba(201,168,76,0.15)",
          color: "var(--color-warm-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={names[0]} size={14} strokeWidth={1.75} />
      </div>
    );
  }
  return (
    <div style={{ display: "flex", position: "relative", height: 30 }}>
      {names.map((n, i) => {
        const meta = miniChipMeta(n);
        return (
          <div
            key={i}
            style={{
              position: i === 0 ? "relative" : "absolute",
              left: i === 0 ? 0 : 14,
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: meta.bg,
              color: meta.fg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid var(--color-linen)",
              alignSelf: "center",
            }}
          >
            <Icon name={n} size={11} strokeWidth={1.75} />
          </div>
        );
      })}
    </div>
  );
}

function miniChipMeta(name: string): { bg: string; fg: string } {
  if (name === "brand-instagram")
    return { bg: "var(--color-ig-bg)", fg: "var(--color-ig)" };
  if (name === "brand-whatsapp")
    return { bg: "var(--color-wa-bg)", fg: "var(--color-wa)" };
  return { bg: "var(--color-sand)", fg: "var(--color-mocha)" };
}

function ChannelIcon({ iconName }: { iconName: string }) {
  const meta = miniChipMeta(iconName);
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
