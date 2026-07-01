import Link from "next/link";

import type { PersonaConfig } from "@/personas/types";

// Cross-persona discoverability bridge + base footer. Small text, low-contrast
// per handoff §12 decision 12. `?ref=footer` query param on every link so
// cross-persona sharing shows up in analytics later.
//
// The other 7 persona routes don't exist yet (they land in step 13). Links
// will 404 on the preview until then — intentional so the layout is complete.

type Props = { config: PersonaConfig };

// Slug + label for every persona we intend to ship. Hardcoded here rather
// than derived from `personas/index.ts` because the registry only contains
// photographer today; the labels for the other 7 are already locked (§4).
const ALL_PERSONAS: Array<{ slug: string; label: string }> = [
  { slug: "photographer", label: "For wedding photographers" },
  { slug: "mua", label: "For makeup artists" },
  { slug: "mehendi", label: "For mehendi artists" },
  { slug: "cake", label: "For cake makers" },
  { slug: "coach", label: "For fitness coaches" },
  { slug: "designer", label: "For designers" },
  { slug: "dj", label: "For DJs" },
  { slug: "architect", label: "For architects" },
];

function currentPersonaQuestion(config: PersonaConfig): string {
  // navLabel: "For wedding photographers" → "wedding photographer" (drop
  // leading "For ", drop trailing "s" for singular).
  const stripped = config.navLabel.replace(/^For\s+/, "").replace(/s$/, "");
  return `Not a ${stripped}?`;
}

export default function Footer({ config }: Props) {
  const others = ALL_PERSONAS.filter((p) => p.slug !== config.slug);

  return (
    <footer
      style={{
        background: "var(--color-linen)",
        borderTop: "0.5px solid var(--color-border)",
      }}
    >
      {/* Cross-persona bridge */}
      <div
        style={{
          padding: "var(--section-pad-y) var(--section-pad-x)",
          borderBottom: "0.5px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: 440, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 12,
              color: "var(--color-mocha)",
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            {currentPersonaQuestion(config)}
          </p>
          <ul
            style={{
              marginTop: 12,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 14px",
            }}
          >
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}?ref=footer`}
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: 12,
                    color: "var(--color-ink)",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                    textDecorationColor: "var(--color-border-strong)",
                  }}
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Base footer */}
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
