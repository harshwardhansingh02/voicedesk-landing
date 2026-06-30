// Placeholder root page during v2 build. Will be replaced with a 307 redirect
// to /photographer in step 12 of the build sequence once that route exists.

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "VoiceDesk — Building v2",
  robots: { index: false, follow: false },
};

export default function HoldingPage() {
  return (
    <main
      style={{
        background: "var(--color-linen)",
        color: "var(--color-ink)",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--section-pad-y) var(--section-pad-x)",
        textAlign: "center",
        fontFamily: "var(--font-jakarta), system-ui, sans-serif",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
          fontSize: 10,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "var(--color-mocha)",
          marginBottom: 16,
        }}
      >
        In progress · Preview
      </span>

      <h1
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 32,
          lineHeight: 1.18,
          color: "var(--color-ink)",
          margin: 0,
          maxWidth: 440,
        }}
      >
        VoiceDesk is being rebuilt for solo creators and wedding pros.
      </h1>

      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--color-mocha)",
          marginTop: 18,
          maxWidth: 380,
        }}
      >
        Live soon. The old restaurant landing is preserved while we ship.
      </p>

      <div
        style={{
          marginTop: 28,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Link
          href="/photographer"
          style={{
            fontSize: 13,
            color: "var(--color-ink)",
            textDecoration: "underline",
            textUnderlineOffset: 4,
            fontWeight: 500,
          }}
        >
          Preview the photographer page →
        </Link>
        <Link
          href="/legacy/restaurant"
          style={{
            fontSize: 12,
            color: "var(--color-sand-dark)",
            textDecoration: "underline",
            textUnderlineOffset: 4,
          }}
        >
          View the archived restaurant page
        </Link>
      </div>
    </main>
  );
}
