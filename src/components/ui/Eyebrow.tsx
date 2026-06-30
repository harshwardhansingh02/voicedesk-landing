import type { ReactNode } from "react";

// Section / hero kicker. Locked per §3 type scale:
//   10px Jakarta 500, uppercase, letter-spacing 0.14em, mocha color.
// `variant="dark"` swaps to the cream-on-dark version for ink hero surfaces.

type Props = {
  children: ReactNode;
  variant?: "default" | "dark";
  align?: "left" | "center";
  className?: string;
};

export default function Eyebrow({
  children,
  variant = "default",
  align = "center",
  className,
}: Props) {
  return (
    <span
      className={className}
      style={{
        display: "block",
        fontFamily: "var(--font-jakarta), system-ui, sans-serif",
        fontSize: 10,
        fontWeight: 500,
        lineHeight: 1.4,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: variant === "dark" ? "var(--color-mocha-on-dark)" : "var(--color-mocha)",
        textAlign: align,
      }}
    >
      {children}
    </span>
  );
}
