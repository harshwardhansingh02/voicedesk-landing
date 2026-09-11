import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// OG image for anywhere the site link gets shared (WhatsApp, iMessage, IG,
// Slack, Twitter/X). 1200×630 is the canonical Open Graph aspect. This
// same image serves as the Twitter card fallback via the `twitter-image`
// convention if we ever add differentiated copy for X.
//
// Composed at build time via next/og — the square icon is inlined as
// base64 (recolored to sit on dark) and the headline is a plain sans-serif
// (Fraunces isn't loadable inside Edge Runtime without a font-fetch hop,
// and this headline is a bold system sans rather than the italic war-cry).

export const runtime = "nodejs";
export const alt = "VoiceDesk — Stop Losing Leads, Try VoiceDesk";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const iconBytes = readFileSync(
    join(process.cwd(), "public", "voicedesk-icon-512.png")
  );
  const iconBase64 = `data:image/png;base64,${iconBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1208",
          padding: "80px 120px",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconBase64}
          width={120}
          height={120}
          alt="VoiceDesk"
          style={{ objectFit: "contain", borderRadius: 28 }}
        />

        <div
          style={{
            marginTop: 48,
            fontFamily: "sans-serif",
            fontWeight: 700,
            fontSize: 72,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            color: "#FAF7F2",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Stop Losing Leads,</span>
          <span style={{ display: "flex" }}>
            Try&nbsp;<span style={{ color: "#C9A84C" }}>VoiceDesk</span>
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 42,
            fontFamily: "sans-serif",
            fontSize: 20,
            letterSpacing: "0.14em",
            color: "#C9A87C",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          AI front office · for solo creators & wedding pros
        </div>
      </div>
    ),
    size
  );
}
