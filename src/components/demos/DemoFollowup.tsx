"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import type { PersonaConfig } from "@/personas/types";

// Demo 3 — Follow-up. Section heading (Fraunces italic) bridges from D2.
// Before/after presented as a segmented toggle: "Without VoiceDesk" vs
// "With VoiceDesk". Single frame swaps content on toggle — no vertical
// stacking of before + after cards. CTA below (the only form-redirect
// CTA on the page besides the sticky footer).

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

        {/* Context text */}
        <p
          style={{
            marginTop: 14,
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--color-mocha)",
            textAlign: "center",
          }}
        >
          {demo3.intro}
        </p>

        {/* Toggle — segmented control */}
        <Toggle view={view} onChange={setView} />

        {/* Frame — content swaps on toggle */}
        <div
          style={{
            marginTop: 14,
            position: "relative",
            minHeight: 300,
          }}
        >
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

        {/* CTA — the sole form-redirect CTA on the page (besides sticky footer) */}
        <div style={{ marginTop: 24 }}>
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
        marginTop: 22,
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        padding: 4,
        background: "var(--color-sand)",
        borderRadius: 999,
      }}
    >
      {/* Sliding indicator */}
      <motion.div
        aria-hidden
        layout
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
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

// ─── Frames ──────────────────────────────────────────────────────────────

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
      <FrameLabel>Saturday · that same evening</FrameLabel>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
        {demo3.beforeMissedItems.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "9px 11px",
              background: "var(--color-linen)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <div
              style={{
                color: "var(--color-mocha)",
                marginTop: 1,
                flexShrink: 0,
              }}
            >
              <Icon name={item.icon} size={13} strokeWidth={1.75} />
            </div>
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
                  marginTop: 1,
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

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
        {demo3.afterTimeline.slice(0, 4).map((node, i) => (
          <div
            key={i}
            style={{
              padding: "9px 11px",
              background: "var(--color-linen)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: 10,
                color: "var(--color-sand-dark)",
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
