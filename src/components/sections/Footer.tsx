import type { PersonaConfig } from "@/personas/types";

// Base footer. The cross-persona bridge block ("Not a photographer?" with
// links to the other 7 personas) was removed for launch — those pages
// don't exist yet and shipping links to 404s reads worse than shipping
// no links at all. When the other personas ship, re-introduce the block
// above the base footer (`git log -- src/components/sections/Footer.tsx`
// has the prior implementation).

type Props = { config: PersonaConfig };

export default function Footer({ config }: Props) {
  // config isn't referenced in the trimmed footer, but the prop shape stays
  // stable so PersonaPage doesn't need to change when we re-introduce the
  // bridge block.
  void config;

  return (
    <footer
      style={{
        background: "var(--color-linen)",
        borderTop: "0.5px solid var(--color-border)",
      }}
    >
      <div
        style={{
          padding: "22px var(--section-pad-x) 28px",
        }}
      >
        <div style={{ maxWidth: 440, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--color-ink)",
              margin: 0,
            }}
          >
            VoiceDesk · Built in India for India&apos;s solo creators
          </p>
          <p
            style={{
              marginTop: 6,
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 11,
              color: "var(--color-sand-dark)",
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span>Privacy</span>
            <span aria-hidden>·</span>
            <span>Terms</span>
            <span aria-hidden>·</span>
            <a
              href="mailto:hello@thevoicedesk.com"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              hello@thevoicedesk.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
