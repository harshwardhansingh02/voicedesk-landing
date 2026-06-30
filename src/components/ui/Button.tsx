import Link from "next/link";
import type { ReactNode } from "react";

// Locked styles from build handoff §3:
// - Primary: ink bg, cream text, 13px Jakarta 500, padding 14px, radius-md.
//   Hover opacity 0.92, active scale 0.98.
// - Secondary: transparent, 0.5px border, mocha text. Hover bg sand.
//
// Polymorphic by intent — pass `href` to render an <a> (internal Link or external),
// or `onClick` to render a <button>. Auto-detects.

type ButtonVariant = "primary" | "secondary";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
};

type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonProps = CommonProps & {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type Props = LinkProps | ButtonProps;

function baseStyles(variant: ButtonVariant, fullWidth: boolean): React.CSSProperties {
  const common: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "14px 20px",
    fontFamily: "var(--font-jakarta), system-ui, sans-serif",
    fontSize: 13,
    fontWeight: 500,
    borderRadius: "var(--radius-md)",
    border: "0.5px solid transparent",
    cursor: "pointer",
    textDecoration: "none",
    transition: "opacity 0.18s ease, transform 0.12s ease, background 0.2s ease",
    width: fullWidth ? "100%" : "auto",
    lineHeight: 1.2,
    WebkitTapHighlightColor: "transparent",
  };

  if (variant === "primary") {
    return {
      ...common,
      background: "var(--color-ink)",
      color: "var(--color-cream-on-dark)",
    };
  }
  return {
    ...common,
    background: "transparent",
    color: "var(--color-mocha)",
    borderColor: "var(--color-border-strong)",
  };
}

export default function Button(props: Props) {
  const variant = props.variant ?? "primary";
  const fullWidth = props.fullWidth ?? false;
  const style = baseStyles(variant, fullWidth);

  // Apply hover/active interactions via CSS class names rather than inline so
  // the cubic-bezier easing per §3 stays consistent and motion-friendly.
  const cls = `vd-btn vd-btn-${variant} ${props.className ?? ""}`.trim();

  if ("href" in props && props.href) {
    const isExternal = props.external || props.href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          style={style}
        >
          {props.children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={cls} style={style}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cls}
      style={{
        ...style,
        opacity: props.disabled ? 0.4 : undefined,
        cursor: props.disabled ? "not-allowed" : "pointer",
      }}
    >
      {props.children}
    </button>
  );
}
