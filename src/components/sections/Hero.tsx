import Eyebrow from "@/components/ui/Eyebrow";
import type { PersonaConfig } from "@/personas/types";

// Lean hero. Pre-header + header + subheading only — no CTA, no HeroLoop,
// no vignette. Tight vertical rhythm so Demo 1 is at least 50% visible
// on landing (mobile portrait). The sticky footer CTA carries the
// "act now" job.

type Props = {
  config: PersonaConfig;
};

export default function Hero({ config }: Props) {
  const { heroSub, heroLossNumber } = config;
  const lossIdx = heroSub.indexOf(heroLossNumber);
  const subBefore = lossIdx >= 0 ? heroSub.slice(0, lossIdx) : heroSub;
  const subAfter = lossIdx >= 0 ? heroSub.slice(lossIdx + heroLossNumber.length) : "";

  return (
    <section
      style={{
        padding: "1.25rem var(--section-pad-x) 0.75rem",
        textAlign: "center",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <div style={{ marginBottom: 12 }}>
          <Eyebrow>{config.eyebrow}</Eyebrow>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 30,
            lineHeight: 1.16,
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
            fontSize: 14,
            lineHeight: 1.55,
            color: "var(--color-mocha)",
            margin: "14px auto 0",
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
      </div>
    </section>
  );
}
