import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import type { PersonaConfig } from "@/personas/types";

// Roadmap teaser — bold direction, light touch. Per handoff §8:
// - Small italic Fraunces caption above section (not eyebrow)
// - Section headline
// - 3 cards in a horizontal snap-scroll row on mobile
// - Each card: icon, headline (Fraunces italic), 2-line body
// - No CTA. Teaser mode only.

type Props = { config: PersonaConfig };

export default function Beyond({ config }: Props) {
  return (
    <section
      style={{
        padding: "var(--section-pad-y) 0",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ padding: "0 var(--section-pad-x)" }}>
        <div style={{ maxWidth: 440, margin: "0 auto" }}>
          <Eyebrow>Coming soon to your dashboard</Eyebrow>
          <h2
            style={{
              marginTop: 12,
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 26,
              lineHeight: 1.22,
              color: "var(--color-ink)",
              letterSpacing: "-0.003em",
              margin: "12px 0 0",
            }}
          >
            Today, it catches and closes your leads. Soon, it grows your business.
          </h2>
        </div>
      </div>

      {/* Snap-scroll rail — extends full-bleed so cards can peek past the edge */}
      <div
        style={{
          marginTop: 22,
          display: "flex",
          gap: 12,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          padding: "4px var(--section-pad-x)",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {config.beyondPoints.map((point) => (
          <BeyondCard key={point.title} point={point} />
        ))}
      </div>
    </section>
  );
}

type BeyondCardProps = {
  point: PersonaConfig["beyondPoints"][number];
};

function BeyondCard({ point }: BeyondCardProps) {
  return (
    <article
      style={{
        flex: "0 0 auto",
        width: 260,
        scrollSnapAlign: "start",
        background: "var(--color-cream)",
        border: "0.5px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "18px 18px 20px",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "var(--color-sand)",
          color: "var(--color-mocha)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
        }}
      >
        <Icon name={point.icon} size={18} strokeWidth={1.75} />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 16,
          lineHeight: 1.3,
          color: "var(--color-ink)",
          margin: 0,
        }}
      >
        {point.title}
      </h3>
      <p
        style={{
          marginTop: 8,
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
          fontSize: 12,
          lineHeight: 1.55,
          color: "var(--color-mocha)",
        }}
      >
        {point.body}
      </p>
    </article>
  );
}
