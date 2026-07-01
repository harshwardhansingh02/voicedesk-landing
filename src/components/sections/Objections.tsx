import Eyebrow from "@/components/ui/Eyebrow";
import type { PersonaConfig } from "@/personas/types";

// "3 quiet doubts" — fear/answer pairs sitting between the demo and the
// waitlist. Simple stacked layout, subtle sand divider between rows.
// Fear reads as a small question headline; answer reads as body text.

type Props = { config: PersonaConfig };

export default function Objections({ config }: Props) {
  return (
    <section
      style={{
        padding: "var(--section-pad-y) var(--section-pad-x)",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <Eyebrow>A few things you might be wondering</Eyebrow>

        <div
          style={{
            marginTop: 22,
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {config.objections.map((obj, i) => (
            <ObjectionRow
              key={obj.fear}
              fear={obj.fear}
              answer={obj.answer}
              isLast={i === config.objections.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ObjectionRow({
  fear,
  answer,
  isLast,
}: {
  fear: string;
  answer: string;
  isLast: boolean;
}) {
  return (
    <div
      style={{
        padding: "20px 0",
        borderBottom: isLast ? "none" : "0.5px solid var(--color-border)",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 17,
          lineHeight: 1.35,
          color: "var(--color-ink)",
          margin: 0,
        }}
      >
        {fear}
      </h3>
      <p
        style={{
          marginTop: 8,
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
          fontSize: 13,
          lineHeight: 1.6,
          color: "var(--color-mocha)",
          margin: "8px 0 0",
        }}
      >
        {answer}
      </p>
    </div>
  );
}
