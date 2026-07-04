"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Eyebrow from "@/components/ui/Eyebrow";
import type { PersonaConfig } from "@/personas/types";

// Multi-step waitlist wizard. Two steps + a success screen.
//   Step 1 (required): Name, WhatsApp, Instagram, Profession
//   Step 2 (optional): current lead system, referral source
//   Success: warm confirmation + what happens next
//
// The interaction design leans on three cues that build a "sense of
// achievement" as the user fills the form:
//   • Field-level check icon fades in the moment a field passes validation
//   • Top-of-form progress bar fills segment-by-segment based on completion
//   • Step transitions slide + fade so each step feels earned
//
// Wire-up to the backend (Fly endpoint / Sheets / Airtable / whatever)
// lands in build step 10. For now the form succeeds locally.

type Step = "details" | "optional" | "success";

type FormData = {
  name: string;
  whatsapp: string;
  instagram: string;
  profession: string;
  currentSystem: string;
  referralSource: string;
};

const PROFESSIONS = [
  "Wedding photographer",
  "Makeup artist",
  "Mehendi artist",
  "Cake maker",
  "Fitness coach",
  "Designer",
  "DJ",
  "Architect",
  "Other",
];

const REFERRAL_SOURCES = [
  "Instagram",
  "WhatsApp / friend referral",
  "Google search",
  "Podcast or article",
  "Other",
];

const validators = {
  name: (v: string) => v.trim().length >= 2,
  whatsapp: (v: string) => v.replace(/\D/g, "").length >= 10,
  instagram: (v: string) => v.replace(/^@/, "").trim().length >= 3,
  profession: (v: string) => v.length > 0,
};

type Props = { config: PersonaConfig };

export default function Waitlist({ config }: Props) {
  const { waitlist } = config;
  const [step, setStep] = useState<Step>("details");
  const [data, setData] = useState<FormData>({
    name: "",
    whatsapp: "",
    instagram: "",
    profession: PROFESSIONS[0],
    currentSystem: "",
    referralSource: "",
  });

  const valid = useMemo(
    () => ({
      name: validators.name(data.name),
      whatsapp: validators.whatsapp(data.whatsapp),
      instagram: validators.instagram(data.instagram),
      profession: validators.profession(data.profession),
    }),
    [data]
  );

  const requiredCount = 4;
  const completed = Object.values(valid).filter(Boolean).length;
  const canContinue = completed === requiredCount;

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const handleSubmit = () => {
    // TODO(step 10): POST to backend
    setStep("success");
  };

  const step1Progress = completed / requiredCount;
  const step2Progress =
    step === "success" ? 1 : step === "optional" ? 0.15 : 0;

  return (
    <section
      id="waitlist"
      style={{
        padding: "var(--section-pad-y) var(--section-pad-x)",
        background: "var(--color-linen)",
      }}
    >
      <div style={{ maxWidth: 440, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <Eyebrow>{waitlist.eyebrow}</Eyebrow>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 26,
            lineHeight: 1.22,
            color: "var(--color-ink)",
            margin: 0,
            textAlign: "center",
            letterSpacing: "-0.005em",
          }}
        >
          {waitlist.headline}
        </h2>

        <p
          style={{
            marginTop: 12,
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 14,
            lineHeight: 1.55,
            color: "var(--color-mocha)",
            textAlign: "center",
          }}
        >
          {waitlist.sub}
        </p>

        {/* Form card */}
        <div
          style={{
            marginTop: 22,
            background: "var(--color-cream)",
            border: "0.5px solid var(--color-border)",
            borderRadius: "var(--radius-xl)",
            padding: "20px 18px",
            overflow: "hidden",
          }}
        >
          {step !== "success" && (
            <ProgressBar
              step1={step1Progress}
              step2={step2Progress}
              stepLabel={step === "details" ? "Step 1 of 2" : "Step 2 of 2"}
              counterLabel={
                step === "details"
                  ? `${completed} of ${requiredCount} complete`
                  : "Almost there"
              }
            />
          )}

          <div style={{ marginTop: 22 }}>
            <AnimatePresence mode="wait" initial={false}>
              {step === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <DetailsStep
                    data={data}
                    valid={valid}
                    onChange={update}
                    onContinue={() => canContinue && setStep("optional")}
                    canContinue={canContinue}
                  />
                </motion.div>
              )}

              {step === "optional" && (
                <motion.div
                  key="optional"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <OptionalStep
                    data={data}
                    onChange={update}
                    onBack={() => setStep("details")}
                    onSubmit={handleSubmit}
                    submitLabel={waitlist.ctaLabel}
                  />
                </motion.div>
              )}

              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <SuccessScreen
                    headline={waitlist.successHeadline}
                    body={waitlist.successBody}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {step !== "success" && waitlist.microcopy && (
          <p
            style={{
              marginTop: 12,
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 11,
              lineHeight: 1.5,
              color: "var(--color-sand-dark)",
              textAlign: "center",
              letterSpacing: "0.02em",
            }}
          >
            {waitlist.microcopy}
          </p>
        )}
      </div>
    </section>
  );
}

// ─── Progress bar ────────────────────────────────────────────────────────

function ProgressBar({
  step1,
  step2,
  stepLabel,
  counterLabel,
}: {
  step1: number;
  step2: number;
  stepLabel: string;
  counterLabel: string;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 10,
            fontWeight: 500,
            color: "var(--color-mocha)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {stepLabel}
        </span>
        <span
          style={{
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 10,
            color: "var(--color-sand-dark)",
            letterSpacing: "0.02em",
          }}
        >
          {counterLabel}
        </span>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <ProgressSegment fill={step1} />
        <ProgressSegment fill={step2} />
      </div>
    </div>
  );
}

function ProgressSegment({ fill }: { fill: number }) {
  return (
    <div
      style={{
        flex: 1,
        height: 4,
        background: "var(--color-sand)",
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${Math.min(100, Math.max(0, fill * 100))}%`,
          background: "var(--color-warm-accent)",
          borderRadius: 999,
          transition: "width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />
    </div>
  );
}

// ─── Step 1: required details ────────────────────────────────────────────

function DetailsStep({
  data,
  valid,
  onChange,
  onContinue,
  canContinue,
}: {
  data: FormData;
  valid: { name: boolean; whatsapp: boolean; instagram: boolean; profession: boolean };
  onChange: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onContinue: () => void;
  canContinue: boolean;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onContinue();
      }}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      <Field label="Your name" valid={valid.name}>
        <input
          required
          name="name"
          type="text"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Sneha Verma"
          autoComplete="name"
          style={inputStyle}
        />
      </Field>

      <Field label="WhatsApp number" valid={valid.whatsapp}>
        <input
          required
          name="whatsapp"
          type="tel"
          inputMode="tel"
          value={data.whatsapp}
          onChange={(e) => onChange("whatsapp", e.target.value)}
          placeholder="+91 98765 43210"
          autoComplete="tel"
          style={inputStyle}
        />
      </Field>

      <Field label="Instagram handle" valid={valid.instagram}>
        <div style={{ position: "relative" }}>
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              fontSize: 14,
              color: "var(--color-sand-dark)",
              pointerEvents: "none",
            }}
          >
            @
          </span>
          <input
            required
            name="instagram"
            type="text"
            value={data.instagram.replace(/^@/, "")}
            onChange={(e) =>
              onChange("instagram", e.target.value.replace(/^@/, ""))
            }
            placeholder="yourstudio"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            style={{ ...inputStyle, paddingLeft: 28 }}
          />
        </div>
      </Field>

      <Field label="You are a…" valid={valid.profession}>
        <select
          required
          name="profession"
          value={data.profession}
          onChange={(e) => onChange("profession", e.target.value)}
          style={{
            ...inputStyle,
            appearance: "none",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238B6F47' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 14px center",
            paddingRight: 36,
          }}
        >
          {PROFESSIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </Field>

      <button
        type="submit"
        disabled={!canContinue}
        className="vd-btn vd-btn-primary"
        style={{
          marginTop: 8,
          padding: "14px 20px",
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          borderRadius: "var(--radius-md)",
          border: "0.5px solid transparent",
          background: canContinue ? "var(--color-ink)" : "var(--color-sand)",
          color: canContinue
            ? "var(--color-cream-on-dark)"
            : "var(--color-sand-dark)",
          cursor: canContinue ? "pointer" : "not-allowed",
          transition: "background 0.3s ease, color 0.3s ease",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {canContinue ? "Continue →" : "Fill in the details above"}
      </button>
    </form>
  );
}

// ─── Step 2: optional ────────────────────────────────────────────────────

function OptionalStep({
  data,
  onChange,
  onBack,
  onSubmit,
  submitLabel,
}: {
  data: FormData;
  onChange: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitLabel: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
          fontSize: 12,
          color: "var(--color-mocha)",
          lineHeight: 1.5,
        }}
      >
        Optional — helps us onboard you faster. Skip if you'd rather.
      </p>

      <Field label="How do you manage leads today?">
        <input
          name="currentSystem"
          type="text"
          value={data.currentSystem}
          onChange={(e) => onChange("currentSystem", e.target.value)}
          placeholder="Notes app, WhatsApp starred, mostly memory…"
          style={inputStyle}
        />
      </Field>

      <Field label="How did you hear about us?">
        <select
          name="referralSource"
          value={data.referralSource}
          onChange={(e) => onChange("referralSource", e.target.value)}
          style={{
            ...inputStyle,
            appearance: "none",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238B6F47' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 14px center",
            paddingRight: 36,
            color: data.referralSource ? "var(--color-ink)" : "var(--color-sand-dark)",
          }}
        >
          <option value="">Pick one…</option>
          {REFERRAL_SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, marginTop: 8 }}>
        <button
          type="button"
          onClick={onBack}
          className="vd-btn vd-btn-secondary"
          style={{
            padding: "14px 18px",
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 500,
            borderRadius: "var(--radius-md)",
            border: "0.5px solid var(--color-border-strong)",
            background: "transparent",
            color: "var(--color-mocha)",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          ← Back
        </button>
        <button
          type="submit"
          className="vd-btn vd-btn-primary"
          style={{
            padding: "14px 20px",
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 500,
            borderRadius: "var(--radius-md)",
            border: "0.5px solid transparent",
            background: "var(--color-ink)",
            color: "var(--color-cream-on-dark)",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {submitLabel} →
        </button>
      </div>
    </form>
  );
}

// ─── Success ─────────────────────────────────────────────────────────────

function SuccessScreen({ headline, body }: { headline: string; body: string }) {
  return (
    <div style={{ textAlign: "center", padding: "12px 0 8px" }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
          delay: 0.05,
        }}
        style={{
          width: 56,
          height: 56,
          margin: "0 auto",
          borderRadius: "50%",
          background: "var(--color-warm-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px -8px rgba(201,168,76,0.55)",
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeInOut" }}
            d="M5 12.5L10 17.5L19 7.5"
            stroke="var(--color-cream-on-dark)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <p
        style={{
          marginTop: 18,
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 24,
          lineHeight: 1.25,
          color: "var(--color-ink)",
        }}
      >
        {headline}
      </p>
      <p
        style={{
          marginTop: 8,
          fontFamily: "var(--font-jakarta), system-ui, sans-serif",
          fontSize: 13,
          lineHeight: 1.55,
          color: "var(--color-mocha)",
        }}
      >
        {body}
      </p>
    </div>
  );
}

// ─── Field wrapper ───────────────────────────────────────────────────────

function Field({
  label,
  valid,
  children,
}: {
  label: string;
  valid?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "block" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
            fontSize: 11,
            fontWeight: 500,
            color: "var(--color-mocha)",
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </span>
        <AnimatePresence>
          {valid && (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                type: "spring",
                stiffness: 340,
                damping: 22,
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                fontSize: 10,
                fontWeight: 500,
                color: "var(--color-warm-accent)",
                letterSpacing: "0.02em",
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12.5L10 17.5L19 7.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              looks good
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontFamily: "var(--font-jakarta), system-ui, sans-serif",
  fontSize: 14,
  color: "var(--color-ink)",
  background: "var(--color-linen)",
  border: "0.5px solid var(--color-border-strong)",
  borderRadius: "var(--radius-md)",
  outline: "none",
  WebkitAppearance: "none",
  transition: "border-color 0.2s ease, background 0.2s ease",
};
