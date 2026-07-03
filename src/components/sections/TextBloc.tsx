import type { TextBlocContent } from "@/personas/types";

// Narrative bloc that sits between demos and speaks to the persona's inner
// monologue. Body paragraphs render in Jakarta (mocha). Emphasis, when
// present, is a Fraunces italic thesis line. If body is empty and only
// emphasis is set, the bloc collapses into a centered pull-quote — used
// for the closing beat after Demo 3.

type Props = {
  content: TextBlocContent;
  tone?: "default" | "pullQuote";
};

export default function TextBloc({ content, tone }: Props) {
  const { body, emphasis } = content;
  const isPullQuote = tone === "pullQuote" || (!body?.length && !!emphasis);

  if (isPullQuote) {
    return (
      <section
        style={{
          padding: "calc(var(--section-pad-y) - 0.5rem) var(--section-pad-x)",
          background: "var(--color-linen)",
        }}
      >
        <div style={{ maxWidth: 440, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 26,
              lineHeight: 1.25,
              color: "var(--color-ink)",
              margin: 0,
              letterSpacing: "-0.005em",
            }}
          >
            {emphasis}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        padding: "calc(var(--section-pad-y) - 0.5rem) var(--section-pad-x)",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        {body?.map((line, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 15,
              lineHeight: 1.65,
              color: "var(--color-ink)",
              margin: i === 0 ? 0 : "12px 0 0",
            }}
          >
            {line}
          </p>
        ))}

        {emphasis && (
          <div
            style={{
              marginTop: body?.length ? 22 : 0,
              padding: "20px 22px",
              background: "var(--color-sand)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 19,
                lineHeight: 1.32,
                color: "var(--color-ink)",
                margin: 0,
                letterSpacing: "-0.003em",
              }}
            >
              {emphasis}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
