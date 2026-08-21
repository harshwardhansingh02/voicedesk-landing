import type { PersonaConfig } from "@/personas/types";

// Section 1 of the comprehension block that sits between the hero and the
// first demo. One calm paragraph answering "what is this?" for a
// photographer who arrives from a DM and will not tap a demo to find out.
//
// No eyebrow, no heading, no CTA — it reads as the hero's second breath,
// so it uses the hero's own type ramp (Jakarta 14/1.55, mocha) at a
// slightly larger measure. Tight top padding keeps it welded to the hero.

type Props = {
  config: PersonaConfig;
};

export default function ShortDescription({ config }: Props) {
  return (
    <section
      style={{
        padding: "0.75rem var(--section-pad-x) 0",
        textAlign: "center",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        {/* Hairline separator — the only ornament, borrowed from the
            existing border token so no new visual vocabulary appears. */}
        <div
          aria-hidden
          style={{
            width: 28,
            height: 1,
            background: "var(--color-border-strong)",
            margin: "0 auto 14px",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--color-mocha)",
            margin: "0 auto",
            maxWidth: 380,
          }}
        >
          {config.shortDescription}
        </p>
      </div>
    </section>
  );
}
