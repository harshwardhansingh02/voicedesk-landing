import Eyebrow from "@/components/ui/Eyebrow";
import type { PersonaConfig } from "@/personas/types";

// Lean hero. No CTA and no beta microcopy — those responsibilities now live
// on the sticky footer (mobile) and inside each demo's progression CTA.
// Keeping this section short is what buys us "Demo 1 is 60% visible in the
// first fold" from the IA revisit.

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
        padding: "calc(var(--section-pad-y) - 0.5rem) var(--section-pad-x) calc(var(--section-pad-y) - 1rem)",
        textAlign: "center",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
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
            margin: "18px auto 0",
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
