import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// OG image for anywhere the site link gets shared (WhatsApp, iMessage, IG,
// Slack, Twitter/X). 1200×630 is the canonical Open Graph aspect. This
// same image serves as the Twitter card fallback via the `twitter-image`
// convention if we ever add differentiated copy for X.
//
// Composed at build time via next/og — the horizontal logo is inlined as
// base64 and the war-cry text is Georgia italic (Fraunces isn't loadable
// inside Edge Runtime without a font-fetch hop, and Georgia is close
// enough at OG scale).

export const runtime = "nodejs";
export const alt =
  "VoiceDesk — the AI front office for wedding photographers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const logoBytes = readFileSync(
    join(process.cwd(), "public", "voicedesk-logo-horizontal.png")
  );
  const logoBase64 = `data:image/png;base64,${logoBytes.toString("base64")}`;

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
          background: "#FAF7F2",
          padding: "80px 120px",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoBase64}
          width={420}
          height={150}
          alt="VoiceDesk"
          style={{ objectFit: "contain" }}
        />

        <div
          style={{
            marginTop: 56,
            fontFamily: "Georgia",
            fontStyle: "italic",
            fontSize: 68,
            fontWeight: 400,
            lineHeight: 1.14,
            letterSpacing: "-0.005em",
            color: "#1A1208",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>You were shooting.</span>
          <span>VoiceDesk was closing.</span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 42,
            fontFamily: "sans-serif",
            fontSize: 20,
            letterSpacing: "0.14em",
            color: "#8B6F47",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          AI front office · for wedding photographers
        </div>
      </div>
    ),
    size
  );
}
