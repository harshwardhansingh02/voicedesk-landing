"use client";

import { useEffect, useState } from "react";

// Mobile-only sticky footer CTA. Two gating rules combine:
//   • Show only when a "trigger" marker (id passed via showWhenPastId)
//     is above the viewport top — i.e. the user has scrolled past the
//     demo sequence. This keeps the CTA out of the way while demos are
//     the primary focus.
//   • Hide when the target section (id via hideWhenInView) is visible,
//     because the form there already carries the same action.
// Both observers are additive: visible = pastMarker && !targetInView.
// Desktop hides the whole thing via a media query.

type Props = {
  label: string;
  href: string;
  showWhenPastId?: string;
  hideWhenInView?: string;
};

export default function StickyFooterCTA({
  label,
  href,
  showWhenPastId,
  hideWhenInView,
}: Props) {
  const [pastMarker, setPastMarker] = useState(!showWhenPastId);
  const [targetInView, setTargetInView] = useState(false);

  useEffect(() => {
    if (!showWhenPastId) return;
    const el = document.getElementById(showWhenPastId);
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setPastMarker(entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [showWhenPastId]);

  useEffect(() => {
    if (!hideWhenInView) return;
    const el = document.getElementById(hideWhenInView);
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setTargetInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hideWhenInView]);

  const visible = pastMarker && !targetInView;

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
        transition: "transform 0.32s ease, opacity 0.28s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
      className="vd-sticky-cta"
      aria-hidden={!visible}
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
