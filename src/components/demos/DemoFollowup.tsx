import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import type { PersonaConfig } from "@/personas/types";

// Demo 3 — Follow-up. Placeholder implementation: static side-by-side
// "before / after" contrast rendered from config. The full animated timeline
// with message bubbles + nudge notification lands in build step 9.

type Props = { config: PersonaConfig };

export default function DemoFollowup({ config }: Props) {
  const { demo3 } = config;

  return (
    <section
      id="demo-3"
      style={{
        padding: "var(--section-pad-y) var(--section-pad-x)",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <Eyebrow>Demo 3 · Follow-up</Eyebrow>
        <p
          style={{
            marginTop: 12,
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--color-ink)",
          }}
        >
          {demo3.intro}
        </p>

        {/* Before card */}
        <div
          style={{
            marginTop: 22,
            background: "var(--color-cream)",
            border: "0.5px solid var(--color-border)",
            borderRadius: "var(--radius-xl)",
            padding: 16,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 10,
              color: "var(--color-mocha)",
              letterSpacing: "0.02em",
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            Without VoiceDesk · that Saturday
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {demo3.beforeMissedItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "8px 10px",
                  background: "var(--color-linen)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <div
                  style={{
                    color: "var(--color-mocha)",
                    marginTop: 1,
                    flexShrink: 0,
                  }}
                >
                  <Icon name={item.icon} size={13} strokeWidth={1.75} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                      fontSize: 12,
                      color: "var(--color-ink)",
                    }}
                  >
                    {item.text}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                      fontSize: 10,
                      color: "var(--color-sand-dark)",
                      marginTop: 1,
                    }}
                  >
                    {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 12,
              padding: "10px 12px",
              background: "var(--color-danger-bg)",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--color-danger-text)",
              textAlign: "center",
            }}
          >
            {demo3.beforeLossAmount}
          </div>
        </div>

        {/* After card */}
        <div
          style={{
            marginTop: 14,
            background: "var(--color-cream)",
            border: "0.5px solid var(--color-warm-accent)",
            borderRadius: "var(--radius-xl)",
            padding: 16,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 10,
              color: "var(--color-warm-accent)",
              letterSpacing: "0.02em",
              marginBottom: 10,
              textTransform: "uppercase",
            }}
          >
            With VoiceDesk · same Saturday
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {demo3.afterTimeline.slice(0, 3).map((node, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 10px",
                  background: "var(--color-linen)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: 10,
                    color: "var(--color-sand-dark)",
                  }}
                >
                  {node.time}
                </div>
                <div
                  style={{
                    marginTop: 2,
                    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    fontSize: 12,
                    color: "var(--color-ink)",
                  }}
                >
                  {node.title}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 12,
              padding: "10px 12px",
              background: "var(--color-success-bg)",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--color-success-text)",
              textAlign: "center",
            }}
          >
            Booking confirmed · {demo3.afterBookingValue}
          </div>
        </div>

        {/* Progression CTA — the sole form-redirect CTA on the page (besides sticky footer). */}
        <div style={{ marginTop: 22 }}>
          <Button href={demo3.ctaHref} fullWidth>
            {demo3.ctaLabel}
            <span aria-hidden style={{ fontSize: 14, marginLeft: 2 }}>→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
