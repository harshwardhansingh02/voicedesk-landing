import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import type { PersonaConfig, Touchpoint } from "@/personas/types";

// Demo 2 — Channels. Placeholder implementation: static preview of the
// "unified lead" card with 3 touchpoints (IG / WA / call), rendered from
// config. Interactive chat threads + merge animation land in build step 8.

type Props = { config: PersonaConfig };

const CHANNEL_META: Record<
  Touchpoint["channel"],
  { icon: string; bg: string; fg: string; label: string }
> = {
  ig: { icon: "brand-instagram", bg: "var(--color-ig-bg)", fg: "var(--color-ig)", label: "Instagram" },
  wa: { icon: "brand-whatsapp", bg: "var(--color-wa-bg)", fg: "var(--color-wa)", label: "WhatsApp" },
  call: { icon: "phone-off", bg: "var(--color-sand)", fg: "var(--color-mocha)", label: "Missed call" },
};

export default function DemoChannels({ config }: Props) {
  const { demo2 } = config;

  return (
    <section
      id="demo-2"
      style={{
        padding: "var(--section-pad-y) var(--section-pad-x)",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <Eyebrow>Demo 2 · Channels</Eyebrow>
        <p
          style={{
            marginTop: 12,
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--color-ink)",
          }}
        >
          {demo2.intro}
        </p>

        {/* Unified lead card */}
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
              marginBottom: 8,
              textTransform: "uppercase",
            }}
          >
            One lead · three channels
          </div>
          <div
            style={{
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 17,
              fontWeight: 500,
              color: "var(--color-ink)",
              marginBottom: 14,
            }}
          >
            {demo2.unifiedLeadName}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {demo2.unifiedTouchpoints.map((tp, i) => {
              const meta = CHANNEL_META[tp.channel];
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    background: "var(--color-linen)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: meta.bg,
                      color: meta.fg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={meta.icon} size={15} strokeWidth={1.75} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                        fontSize: 13,
                        color: "var(--color-ink)",
                      }}
                    >
                      {tp.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                        fontSize: 10,
                        color: "var(--color-sand-dark)",
                        marginTop: 1,
                      }}
                    >
                      {tp.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progression CTA */}
        <div style={{ marginTop: 22 }}>
          <Button href={demo2.ctaHref} fullWidth>
            {demo2.ctaLabel}
            <span aria-hidden style={{ fontSize: 14, marginLeft: 2 }}>→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
