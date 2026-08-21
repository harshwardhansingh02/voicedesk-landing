"use client";

import { useState, useId } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";

import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import type { PersonaConfig } from "@/personas/types";

// FAQ accordion. Five fear/answer pairs sitting between the waitlist and
// the founder note. One row open at a time — opening a row closes the
// previous one, so the block never grows into a wall of text.
//
// First row starts open: it shows the reader what a tap does without
// making them guess, and guarantees the section never reads as five
// inert headlines.
//
// Motion: height auto→content with a soft ease, answer fades slightly
// behind the height so text never appears to stretch. Chevron rotates
// 180°. Both respect prefers-reduced-motion via `useReducedMotion`-free
// CSS fallback — framer honors the OS setting on transform/opacity.

type Props = { config: PersonaConfig };

// Shared easing — matches the spring-ish feel of the demo transitions
// without the overshoot, which would read as bouncy on a text block.
const EASE: Transition = { duration: 0.32, ease: [0.4, 0.0, 0.2, 1] };

export default function Objections({ config }: Props) {
  // Index of the open row. First row open on load.
  const [openIndex, setOpenIndex] = useState<number>(0);
  const baseId = useId();

  return (
    <section
      style={{
        // Extra top+bottom breathing room so the FAQ block sits apart
        // from the waitlist form above and the founder note below.
        padding: "calc(var(--section-pad-y) + 1.25rem) var(--section-pad-x)",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <Eyebrow>A few things you might be wondering</Eyebrow>

        {/* Navigation cue — tells the reader the rows are interactive
            before they have to discover it by tapping. */}
        <p
          style={{
            marginTop: 6,
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 11,
            lineHeight: 1.5,
            color: "var(--color-sand-dark)",
            textAlign: "center",
          }}
        >
          Tap a question to read the answer
        </p>

        <div style={{ marginTop: 18 }}>
          {config.objections.map((obj, i) => (
            <FaqRow
              key={obj.fear}
              id={`${baseId}-${i}`}
              fear={obj.fear}
              answer={obj.answer}
              isOpen={openIndex === i}
              isLast={i === config.objections.length - 1}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqRow({
  id,
  fear,
  answer,
  isOpen,
  isLast,
  onToggle,
}: {
  id: string;
  fear: string;
  answer: string;
  isOpen: boolean;
  isLast: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: isLast ? "none" : "0.5px solid var(--color-border)",
      }}
    >
      {/* Real <button> so the row is keyboard-reachable and screen readers
          announce expanded state. aria-controls ties it to the panel. */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 14,
          padding: "18px 0",
          background: "none",
          border: "none",
          textAlign: "left",
          cursor: "pointer",
          font: "inherit",
          color: "inherit",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 17,
            lineHeight: 1.35,
            // Open row sits at full ink; closed rows step back to mocha so
            // the active question is obvious at a glance.
            color: isOpen ? "var(--color-ink)" : "var(--color-mocha)",
            margin: 0,
            transition: "color 0.28s ease",
          }}
        >
          {fear}
        </h3>

        {/* Chevron in a sand chip — same chip treatment as the feature
            bullets, so the affordance reads as part of the same system. */}
        <motion.span
          aria-hidden
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={EASE}
          style={{
            flexShrink: 0,
            width: 26,
            height: 26,
            marginTop: 1,
            borderRadius: 7,
            background: isOpen ? "var(--color-sand)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="chevron-down" size={15} color="var(--color-mocha)" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${id}-panel`}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: EASE,
                // Opacity trails the height slightly so the text fades in
                // once there is room for it, instead of appearing stretched.
                opacity: { duration: 0.26, delay: 0.06 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: EASE,
                // Fade leads the collapse on the way out.
                opacity: { duration: 0.14 },
              },
            }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: 13,
                lineHeight: 1.65,
                color: "var(--color-mocha)",
                margin: 0,
                // Bottom padding lives on the text, not the wrapper, so the
                // collapse animates all the way to zero with no residual gap.
                padding: "0 40px 20px 0",
              }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
