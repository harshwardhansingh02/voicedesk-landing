import type { CSSProperties } from "react";

// Inline SVG icons, sized on the fly. Names match the Tabler / Lucide kebab-
// case convention we use in PersonaConfig — makes swapping to lucide-react
// later (when demos need dozens of icons) a one-line change per usage site.
//
// Add new icons here as sections need them. Kept as pure SVG paths (no
// external dependency, no webfont request — critical for IG in-app browser
// load budget).

export type IconName =
  | "message-circle-heart"
  | "sparkles"
  | "trending-up"
  | "phone"
  | "phone-off"
  | "brand-instagram"
  | "brand-whatsapp"
  | "calendar-x"
  | "chevron-down";

type Props = {
  // Accept string so PersonaConfig's opaque icon strings compile without casts.
  // Unknown names fall back to a subtle "sparkles" default (see PATHS lookup).
  name: IconName | string;
  size?: number;
  strokeWidth?: number;
  color?: string;
  style?: CSSProperties;
};

const PATHS: Record<string, React.ReactNode> = {
  "chevron-down": <polyline points="6 9 12 15 18 9" />,
  "message-circle-heart": (
    <>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M15.8 9.2a2.5 2.5 0 0 0-3.5 0l-.3.4-.3-.4a2.5 2.5 0 0 0-3.5 0c-1 1-.9 2.6.1 3.6l3.7 3.7 3.7-3.7c1-1 1.1-2.6.1-3.6" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
      <path d="M5 3v4" />
      <path d="M3 5h4" />
      <path d="M19 17v4" />
      <path d="M17 19h4" />
    </>
  ),
  "trending-up": (
    <>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  "phone-off": (
    <>
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67" />
      <path d="M5 2a2 2 0 0 0-2 2v3.5a2 2 0 0 0 2 2 12.84 12.84 0 0 0 2.81-.7 2 2 0 0 1 2.11.45L11.19 10" />
      <line x1="22" y1="2" x2="2" y2="22" />
    </>
  ),
  "brand-instagram": (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  "brand-whatsapp": (
    <>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </>
  ),
  "calendar-x": (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="10" y1="14" x2="14" y2="18" />
      <line x1="14" y1="14" x2="10" y2="18" />
    </>
  ),
};

export default function Icon({
  name,
  size = 24,
  strokeWidth = 1.5,
  color = "currentColor",
  style,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden
    >
      {PATHS[name] ?? PATHS.sparkles}
    </svg>
  );
}
