"use client";

import { useEffect, useState } from "react";

// Mobile-only sticky footer CTA. Renders on top of the page, hides itself
// while the waitlist form is in view (so it doesn't compete with the same
// action inside the form section). Desktop hides it entirely via the media
// query in the outer wrapper.

type Props = {
  label: string;
  href: string;
  hideWhenInView?: string; // element id to observe; hides CTA when that is visible
};

export default function StickyFooterCTA({ label, href, hideWhenInView }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!hideWhenInView) return;
    const el = document.getElementById(hideWhenInView);
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hideWhenInView]);

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        padding: "10px 16px calc(10px + env(safe-area-inset-bottom, 0px))",
        background:
          "linear-gradient(180deg, rgba(250,247,242,0) 0%, rgba(250,247,242,0.92) 40%, var(--color-linen) 100%)",
        transform: visible ? "translateY(0)" : "translateY(120%)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.3s ease, opacity 0.25s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
      className="vd-sticky-cta"
    >
      <a
        href={href}
        className="vd-btn vd-btn-primary"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "14px 20px",
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          borderRadius: "var(--radius-md)",
          background: "var(--color-ink)",
          color: "var(--color-cream-on-dark)",
          textDecoration: "none",
          width: "100%",
          boxShadow: "0 12px 32px -12px rgba(26,18,8,0.35)",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {label}
        <span aria-hidden style={{ fontSize: 14, marginLeft: 2 }}>→</span>
      </a>

      <style>{`
        @media (min-width: 720px) {
          .vd-sticky-cta { display: none; }
        }
      `}</style>
    </div>
  );
}
