import type { PersonaConfig } from "@/personas/types";

// "This is the front desk you couldn't afford." Dark inverse surface — the
// visual shift signals emphasis, not fatigue. Setup in Jakarta body, punchline
// in Fraunces italic with the price phrase gold-accented.
//
// Shared copy across personas per handoff §4, with `scene.deliverable`
// slotted into the punchline so the price framing lands persona-specific.

type Props = { config: PersonaConfig };

export default function TheTurn({ config }: Props) {
  return (
    <section
      style={{
        padding: "calc(var(--section-pad-y) + 0.5rem) var(--section-pad-x)",
        background: "var(--color-ink-hero)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--color-cream-on-dark)",
            margin: 0,
            opacity: 0.8,
          }}
        >
          Big studios have a front-desk team answering every call, chasing every
          lead, never missing a soul.
        </p>

        <p
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 22,
            lineHeight: 1.3,
            color: "var(--color-cream-on-dark)",
            margin: "22px 0 0",
            letterSpacing: "-0.005em",
          }}
        >
          Now you have one too —{" "}
          <span style={{ color: "var(--color-warm-accent)" }}>
            for the price of a single {config.scene.deliverable.replace(/^wedding /, "")}.
          </span>
        </p>
      </div>
    </section>
  );
}
