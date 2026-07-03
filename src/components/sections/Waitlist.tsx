"use client";

import { useState } from "react";

import Eyebrow from "@/components/ui/Eyebrow";
import type { PersonaConfig } from "@/personas/types";

// Waitlist section — the one form-redirect target on the page. Placeholder
// implementation: captures name + phone locally and shows a confirmation.
// Wire-up to a real backend (Fly endpoint, Sheets, Airtable, whatever)
// lands in step 10 of the build handoff.

type Props = { config: PersonaConfig };

export default function Waitlist({ config }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const { waitlist } = config;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="waitlist"
      style={{
        padding: "var(--section-pad-y) var(--section-pad-x)",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <Eyebrow>{waitlist.eyebrow}</Eyebrow>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 26,
            lineHeight: 1.25,
            color: "var(--color-ink)",
            margin: 0,
            textAlign: "center",
            letterSpacing: "-0.005em",
          }}
        >
          {waitlist.headline}
        </h2>

        <p
          style={{
            marginTop: 14,
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 14,
            lineHeight: 1.55,
            color: "var(--color-mocha)",
            textAlign: "center",
          }}
        >
          {waitlist.sub}
        </p>

        {submitted ? (
          <div
            style={{
              marginTop: 26,
              padding: "22px 20px",
              background: "var(--color-sand)",
              borderRadius: "var(--radius-lg)",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontStyle: "italic",
                fontSize: 18,
                color: "var(--color-ink)",
                margin: 0,
              }}
            >
              You're in.
            </p>
            <p
              style={{
                marginTop: 8,
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: 13,
                color: "var(--color-mocha)",
              }}
            >
              We'll reach out within 24 hours from a Mumbai number.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: 26,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <input
              required
              name="name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              style={inputStyle}
            />
            <input
              required
              name="phone"
              type="tel"
              placeholder="Phone number"
              autoComplete="tel"
              style={inputStyle}
            />
            <button
              type="submit"
              className="vd-btn vd-btn-primary"
              style={{
                marginTop: 4,
                padding: "14px 20px",
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: 13,
                fontWeight: 500,
                borderRadius: "var(--radius-md)",
                border: "0.5px solid transparent",
                background: "var(--color-ink)",
                color: "var(--color-cream-on-dark)",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {waitlist.ctaLabel}
            </button>

            {waitlist.microcopy && (
              <p
                style={{
                  marginTop: 6,
                  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                  fontSize: 11,
                  lineHeight: 1.5,
                  color: "var(--color-sand-dark)",
                  textAlign: "center",
                  letterSpacing: "0.02em",
                }}
              >
                {waitlist.microcopy}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
  fontSize: 14,
  color: "var(--color-ink)",
  background: "var(--color-cream)",
  border: "0.5px solid var(--color-border-strong)",
  borderRadius: "var(--radius-md)",
  outline: "none",
  WebkitAppearance: "none",
};
