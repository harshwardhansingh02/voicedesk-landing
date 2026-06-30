import type { ReactNode } from "react";

// Lead-status pill used in dashboard mockups. Five variants — Hot / Warm / Cold
// for triage, Captured for the success state after a fresh lead lands, and
// Neutral as a generic tag fallback.
//
// Colors derived from the demo reference HTML (hot/warm pills) plus our
// semantic tokens (success for Captured). Visual rule: small, no shadow, no
// emoji — relies on type/color only.

type BadgeVariant = "hot" | "warm" | "cold" | "captured" | "neutral";

type Props = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const PALETTE: Record<BadgeVariant, { bg: string; fg: string; border?: string }> = {
  hot:      { bg: "var(--color-danger-bg)",  fg: "var(--color-danger-text)" },
  warm:     { bg: "#FAEEDA",                 fg: "#633806" },
  cold:     { bg: "var(--color-sand)",       fg: "var(--color-mocha)" },
  captured: { bg: "var(--color-success-bg)", fg: "var(--color-success-text)" },
  neutral:  { bg: "var(--color-sand)",       fg: "var(--color-mocha)" },
};

export default function Badge({ children, variant = "neutral", className }: Props) {
  const { bg, fg, border } = PALETTE[variant];
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: bg,
        color: fg,
        border: border ?? "none",
        borderRadius: 999,
        padding: "2px 8px",
        fontFamily: "var(--font-jakarta), system-ui, sans-serif",
        fontSize: 10,
        fontWeight: 500,
        lineHeight: 1.4,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
