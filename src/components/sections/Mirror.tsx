import type { PersonaConfig } from "@/personas/types";

// "That's literally my Saturday" — the vignette that mirrors the reader's
// specific reality, followed by a magazine-style pull-quote thesis. Locked
// per handoff §7: vignette in body-lg (15px Jakarta), thesis in display-md
// (20px Fraunces italic) sitting inside a sand tinted block.

type Props = { config: PersonaConfig };

export default function Mirror({ config }: Props) {
  return (
    <section
      style={{
        padding: "var(--section-pad-y) var(--section-pad-x)",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--color-ink)",
            margin: 0,
          }}
        >
          {config.mirrorScene}
        </p>

        <div
          style={{
            marginTop: 28,
            padding: "22px 22px",
            background: "var(--color-sand)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 20,
              lineHeight: 1.32,
              color: "var(--color-ink)",
              margin: 0,
              letterSpacing: "-0.003em",
            }}
          >
            {config.mirrorThesis}
          </p>
        </div>
      </div>
    </section>
  );
}
