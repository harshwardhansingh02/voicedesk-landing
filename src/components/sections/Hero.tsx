import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import HeroLoop from "@/components/demos/HeroLoop";
import type { PersonaConfig } from "@/personas/types";

// HeroLoop is a `"use client"` component — Next.js auto code-splits it into
// the client bundle. Its initial-state SSR output is the stage-0 frame
// (3 pre-seeded leads visible, new card collapsed), so first paint is
// already correct; hydration is invisible.

type Props = {
  config: PersonaConfig;
};

export default function Hero({ config }: Props) {
  // Pull the loss number out of the sub-line for visual emphasis. The
  // heroLossNumber is the exact substring we want to colorize / weight.
  const { heroSub, heroLossNumber } = config;
  const lossIdx = heroSub.indexOf(heroLossNumber);
  const subBefore = lossIdx >= 0 ? heroSub.slice(0, lossIdx) : heroSub;
  const subAfter = lossIdx >= 0 ? heroSub.slice(lossIdx + heroLossNumber.length) : "";

  return (
    <section
      style={{
        padding: "calc(var(--section-pad-y) + 1rem) var(--section-pad-x) var(--section-pad-y)",
        textAlign: "center",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <div style={{ marginBottom: 18 }}>
          <Eyebrow>{config.eyebrow}</Eyebrow>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 32,
            lineHeight: 1.18,
            color: "var(--color-ink)",
            margin: 0,
            letterSpacing: "-0.005em",
          }}
        >
          <span style={{ display: "block" }}>{config.warCry.line1}</span>
          <span style={{ display: "block" }}>{config.warCry.line2}</span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--color-mocha)",
            margin: "20px auto 0",
            maxWidth: 360,
          }}
        >
          {subBefore}
          {lossIdx >= 0 && (
            <span style={{ color: "var(--color-ink)", fontWeight: 500 }}>
              {heroLossNumber}
            </span>
          )}
          {subAfter}
        </p>

        <div style={{ marginTop: 26 }}>
          <Button href="#waitlist" fullWidth>
            Stop losing leads tonight
          </Button>
        </div>

        <p
          style={{
            marginTop: 12,
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 11,
            lineHeight: 1.5,
            color: "var(--color-sand-dark)",
            letterSpacing: "0.02em",
          }}
        >
          Beta is live · First 100 get the first month free
        </p>

        <div style={{ marginTop: 32 }}>
          <HeroLoop config={config} />
        </div>
      </div>
    </section>
  );
}
