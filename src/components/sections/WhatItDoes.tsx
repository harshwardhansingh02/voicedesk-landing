import Icon from "@/components/ui/Icon";
import type { PersonaConfig } from "@/personas/types";

// Section 2 of the comprehension block: three plain-language bullets, then
// the "See it in action" bridge that hands the reader to Demo 1.
//
// Type + color are cloned from the existing sections — the h2 matches
// DemoFollowup's Fraunces italic 26, bodies match the Jakarta 14 body
// ramp, and the icon treatment reuses the mocha-on-sand chip already used
// by demo3's capability rows. Nothing new is introduced.

type Props = {
  config: PersonaConfig;
};

const SECTION_HEADING: React.CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: 26,
  lineHeight: 1.22,
  color: "var(--color-ink)",
  margin: 0,
  textAlign: "center",
  letterSpacing: "-0.005em",
};

export default function WhatItDoes({ config }: Props) {
  const { whatItDoes, seeItInAction } = config;

  return (
    <section
      id="what-it-does"
      style={{
        padding: "1.25rem var(--section-pad-x) 0",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <h2 style={SECTION_HEADING}>{whatItDoes.sectionHeading}</h2>

        {/* Three bullets. Icon chip left, copy right — the same row shape
            demo3 uses for its capability list, so the two read as one system. */}
        <ul
          style={{
            listStyle: "none",
            margin: "14px 0 0",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: 9,
          }}
        >
          {whatItDoes.features.map((feature) => (
            <li
              key={feature.title}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                background: "var(--color-cream)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                padding: "12px 14px",
              }}
            >
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: "var(--color-sand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={feature.icon} size={16} color="var(--color-mocha)" />
              </span>

              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 1.35,
                    color: "var(--color-ink)",
                    margin: 0,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: "var(--color-mocha)",
                    margin: "4px 0 0",
                  }}
                >
                  {feature.body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Bridge into the demos. Lives here rather than in DemoCapture so
            that component keeps its "dashboard flows straight in" contract. */}
        <div style={{ marginTop: 18 }}>
          <h2 style={SECTION_HEADING}>{seeItInAction.sectionHeading}</h2>
          <p
            style={{
              marginTop: 8,
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--color-mocha)",
              textAlign: "center",
            }}
          >
            {seeItInAction.intro}
          </p>
        </div>
      </div>
    </section>
  );
}
