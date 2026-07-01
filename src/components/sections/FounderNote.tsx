import type { PersonaConfig } from "@/personas/types";

// Harsh's note. Copy verbatim from handoff §4 — the only variable slot is
// the profession word (photographer / makeup artist / etc.) so the note
// lands persona-specific without diluting the tone.

type Props = { config: PersonaConfig };

export default function FounderNote({ config }: Props) {
  const { professionalTitle } = config.scene;
  return (
    <section
      style={{
        padding: "calc(var(--section-pad-y) - 0.25rem) var(--section-pad-x)",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <div
          style={{
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
              fontSize: 17,
              lineHeight: 1.5,
              color: "var(--color-ink)",
              margin: 0,
            }}
          >
            &ldquo;I watched a friend — brilliant {professionalTitle} — lose
            bookings she never knew came in, while bigger studios with a front
            desk took them. That gap had nothing to do with talent. I built
            VoiceDesk so the best artist wins, not the one with the biggest
            team.&rdquo;
          </p>
          <p
            style={{
              marginTop: 14,
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--color-mocha)",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            — Harsh, founder
          </p>
        </div>
      </div>
    </section>
  );
}
