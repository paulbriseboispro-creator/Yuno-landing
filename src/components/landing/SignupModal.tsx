import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Loader2,
  Megaphone,
  MessageCircle,
  PartyPopper,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { submitLead } from "@/lib/leads.functions";
import { cn } from "@/lib/utils";
import { useLanding, whatsappHref, type SignupRole } from "./context";
import { EASE } from "./ui";

const ROLE_ICONS: Record<SignupRole, LucideIcon> = {
  club: Building2,
  organizer: PartyPopper,
  promoter: Megaphone,
  other: Sparkles,
};

// demo_leads.segment only knows these four values.
const SEGMENT: Record<SignupRole, "club" | "organizer" | "affiliate" | "other"> = {
  club: "club",
  organizer: "organizer",
  promoter: "affiliate",
  other: "other",
};

type Step = "role" | "details" | "done";

// The landing's conversion flow: pick a role, leave your details, done — no
// call required. Today it files a pro-account request (demo_leads, source
// "landing-signup:<lang>"); it's the slot the self-serve account creation will
// plug into.
export function SignupModal() {
  const { t, lang, signup, closeSignup } = useLanding();
  const s = t.signup;
  const send = useServerFn(submitLead);
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<SignupRole | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  // Reset / preselect each time the modal opens.
  useEffect(() => {
    if (!signup.open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    setStatus("idle");
    if (signup.role) {
      setRole(signup.role);
      setStep("details");
    } else {
      setStep((cur) => (cur === "done" ? "done" : "role"));
    }
  }, [signup.open, signup.role]);

  useEffect(() => {
    if (!signup.open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSignup();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input, a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      lastFocus.current?.focus?.();
    };
  }, [signup.open, closeSignup]);

  // Focus the first control of each step.
  useEffect(() => {
    if (!signup.open) return;
    const id = window.setTimeout(() => {
      const el = dialogRef.current?.querySelector<HTMLElement>(
        step === "details" ? "input" : "[data-autofocus]",
      );
      el?.focus();
    }, 60);
    return () => window.clearTimeout(id);
  }, [signup.open, step]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!role) return;
    const fd = new FormData(e.currentTarget);
    const roleLabel = s.roles.find((r) => r.id === role)?.label ?? role;
    setStatus("loading");
    try {
      await send({
        data: {
          segment: SEGMENT[role],
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          company: String(fd.get("company") || ""),
          role,
          phone: String(fd.get("phone") || ""),
          message: `Pro account request from the landing (${lang.toUpperCase()}) — ${roleLabel}`,
          source: `landing-signup:${lang}`,
        },
      });
      setStatus("idle");
      setStep("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  const stepIndex = step === "role" ? 1 : 2;

  return (
    <AnimatePresence>
      {signup.open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[6px]"
            onClick={closeSignup}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="yl relative max-h-[92dvh] w-full overflow-y-auto rounded-t-[1.75rem] bg-white p-6 shadow-[0_40px_80px_-24px_rgba(10,10,11,0.5)] sm:max-w-[460px] sm:rounded-[1.75rem] sm:p-8"
          >
            <button
              type="button"
              onClick={closeSignup}
              aria-label={s.close}
              className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              <X className="size-4" />
            </button>

            {step !== "done" && (
              <div className="mb-6 flex items-center gap-3">
                <div className="flex gap-1">
                  {[1, 2].map((n) => (
                    <span
                      key={n}
                      className={cn(
                        "h-1 w-8 rounded-full transition-colors duration-300",
                        n <= stepIndex ? "bg-[var(--yuno-red)]" : "bg-zinc-200",
                      )}
                    />
                  ))}
                </div>
                <span className="text-[12px] font-medium text-zinc-400">
                  {s.stepOf.replace("{n}", String(stepIndex))}
                </span>
              </div>
            )}

            <AnimatePresence mode="wait" initial={false}>
              {step === "role" && (
                <motion.div
                  key="role"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <h2 id="signup-title" className="yl-h3 text-[24px] text-zinc-950">
                    {s.roleTitle}
                  </h2>
                  <p className="mt-1.5 text-[14px] text-zinc-500">{s.roleSub}</p>
                  <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {s.roles.map((r, i) => {
                      const id = r.id as SignupRole;
                      const Icon = ROLE_ICONS[id];
                      const on = role === id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          data-autofocus={i === 0 ? true : undefined}
                          onClick={() => {
                            setRole(id);
                            setStep("details");
                          }}
                          className={cn(
                            "group flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all sm:flex-col sm:items-start sm:p-4",
                            on
                              ? "border-zinc-950 bg-zinc-50"
                              : "border-zinc-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_10px_24px_-14px_rgba(10,10,11,0.25)]",
                          )}
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800 transition-colors group-hover:bg-[var(--yuno-red)] group-hover:text-white">
                            <Icon className="size-[18px]" />
                          </span>
                          <span>
                            <span className="block text-[14px] font-semibold tracking-tight text-zinc-950">
                              {r.label}
                            </span>
                            <span className="block text-[12.5px] text-zinc-500">{r.hint}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === "details" && (
                <motion.form
                  key="details"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <h2 id="signup-title" className="yl-h3 text-[24px] text-zinc-950">
                    {s.detailsTitle}
                  </h2>
                  <p className="mt-1.5 text-[13.5px] text-zinc-500">{s.detailsSub}</p>
                  <div className="mt-6 space-y-3">
                    <Field
                      label={s.name}
                      name="name"
                      placeholder={s.namePh}
                      autoComplete="name"
                      required
                    />
                    <Field
                      label={s.email}
                      name="email"
                      type="email"
                      placeholder={s.emailPh}
                      autoComplete="email"
                      defaultValue={signup.email}
                      required
                    />
                    <Field
                      label={s.company}
                      name="company"
                      placeholder={s.companyPh}
                      autoComplete="organization"
                    />
                    <Field
                      label={s.phone}
                      name="phone"
                      type="tel"
                      placeholder={s.phonePh}
                      autoComplete="tel"
                    />
                  </div>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="mt-4 rounded-xl bg-red-50 px-3.5 py-2.5 text-[13px] text-red-700"
                    >
                      {s.error}
                    </p>
                  )}

                  <div className="mt-6 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep("role")}
                      className="yl-btn-secondary h-12 px-4 text-[14px]"
                      aria-label={s.back}
                    >
                      <ArrowLeft className="size-4" />
                    </button>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="yl-btn-primary group h-12 flex-1 text-[15px] disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="size-4 animate-spin" /> {s.submitting}
                        </>
                      ) : (
                        <>
                          {s.submit}
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-4 text-[11.5px] leading-relaxed text-zinc-400">{s.consent}</p>
                </motion.form>
              )}

              {step === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="py-4 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, duration: 0.6, delay: 0.1 }}
                    className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500 shadow-[0_0_0_8px_rgba(16,185,129,0.12)]"
                  >
                    <Check className="size-8 text-white" strokeWidth={3} />
                  </motion.span>
                  <h2 id="signup-title" className="yl-h3 mt-6 text-[26px] text-zinc-950">
                    {s.doneTitle}
                  </h2>
                  <p className="mx-auto mt-2 max-w-sm text-pretty text-[14.5px] leading-relaxed text-zinc-500">
                    {s.doneBody}
                  </p>
                  <div className="mt-7 flex flex-col gap-2">
                    <a
                      href={whatsappHref(t.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-autofocus
                      className="yl-btn-secondary h-12 text-[14px]"
                    >
                      <MessageCircle className="size-4 text-[#25D366]" /> {s.doneCta}
                    </a>
                    <button
                      type="button"
                      onClick={closeSignup}
                      className="h-11 text-[13.5px] font-medium text-zinc-500 hover:text-zinc-900"
                    >
                      {s.close}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-zinc-700">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        required={required}
        maxLength={name === "phone" ? 40 : 160}
        className="mt-1.5 h-11 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[15px] text-zinc-950 outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-zinc-950 focus:shadow-[0_0_0_4px_rgba(10,10,11,0.06)]"
      />
    </label>
  );
}
