import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Megaphone,
  MessageCircle,
  PartyPopper,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { submitLead } from "@/lib/leads.functions";
import { cn } from "@/lib/utils";
import {
  YUNO_APP_ORIGIN,
  appHandoffUrl,
  appLoginUrl,
  newSignupKey,
  trackSignup,
  yunoApp,
} from "@/lib/yuno-app";
import { useLanding, whatsappHref, type SignupRole } from "./context";
import { EASE } from "./ui";

// The pro signup funnel: a club or an organizer creates their Yuno account
// end to end, then lands logged in on yunoapp.eu/get-started with a plan built
// from their answers. Promoters and "other" leave a lead instead (no
// self-serve account for them: a promoter joins through a club or an agency).
//
// Every step is written to the Yuno app's `pro_signups` (RPC track_pro_signup)
// so the super admin sees the funnel and who stopped where. The account itself
// is created on the Yuno app's Supabase (auth.signUp), then
// complete_pro_signup() opens the club / organizer space — see
// supabase/migrations/20260924120000_pro_self_signup.sql in the yuno repo.

const ROLE_ICONS: Record<SignupRole, LucideIcon> = {
  club: Building2,
  organizer: PartyPopper,
  promoter: Megaphone,
  other: Sparkles,
};

// demo_leads.segment (legacy lead table of the landing) only knows these four.
const SEGMENT: Record<SignupRole, "club" | "organizer" | "affiliate" | "other"> = {
  club: "club",
  organizer: "organizer",
  promoter: "affiliate",
  other: "other",
};

type Step = "role" | "structure" | "needs" | "account" | "lead";
type Phase = "form" | "creating" | "exists" | "confirm" | "done";

type Form = {
  role: SignupRole | null;
  org_name: string;
  city: string;
  size_band: string;
  frequency: string;
  pillars: string[];
  current_tool: string;
  next_night: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

const EMPTY: Form = {
  role: null,
  org_name: "",
  city: "",
  size_band: "",
  frequency: "",
  pillars: [],
  current_tool: "",
  next_night: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
};

const STORE_KEY = "yuno_pro_signup";
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// What each profile sells first — preselected, the person can untick.
function defaultPillars(role: SignupRole | null): string[] {
  if (role === "club") return ["tickets", "tables"];
  if (role === "organizer") return ["tickets", "guest_list"];
  return [];
}

function stepsFor(role: SignupRole | null): Step[] {
  return role === "promoter" || role === "other"
    ? ["role", "lead"]
    : ["role", "structure", "needs", "account"];
}

function loadStored(): { key: string; form: Form } | null {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as { key?: string; form?: Partial<Form> };
    if (!v.key || !/^[A-Za-z0-9_-]{16,64}$/.test(v.key)) return null;
    return { key: v.key, form: { ...EMPTY, ...(v.form ?? {}) } };
  } catch {
    return null;
  }
}

function attribution(source: string) {
  if (typeof window === "undefined") return { source };
  const q = new URLSearchParams(window.location.search);
  let referrer_host: string | undefined;
  try {
    const h = document.referrer ? new URL(document.referrer).host : "";
    if (h && h !== window.location.host) referrer_host = h;
  } catch {
    /* ignore */
  }
  return {
    source,
    utm_source: q.get("utm_source") || undefined,
    utm_medium: q.get("utm_medium") || undefined,
    utm_campaign: q.get("utm_campaign") || undefined,
    referrer_host,
  };
}

export function SignupFlow({
  source,
  initialRole,
  initialEmail,
  onClose,
  variant = "modal",
}: {
  source: string;
  initialRole?: SignupRole;
  initialEmail?: string;
  onClose?: () => void;
  variant?: "modal" | "page";
}) {
  const { t, lang } = useLanding();
  const s = t.signup;
  const sendLead = useServerFn(submitLead);

  const stored = useMemo(() => (typeof window === "undefined" ? null : loadStored()), []);
  const [key] = useState(() => stored?.key ?? newSignupKey());
  const [form, setForm] = useState<Form>(() => {
    const base = stored?.form ?? EMPTY;
    const role = initialRole ?? base.role;
    return {
      ...base,
      role,
      pillars: base.pillars.length ? base.pillars : defaultPillars(role),
      email: initialEmail || base.email,
    };
  });
  const [step, setStep] = useState<Step>(() => (initialRole ? stepsFor(initialRole)[1] : "role"));
  const [phase, setPhase] = useState<Phase>("form");
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [terms, setTerms] = useState(false);
  const [busy, setBusy] = useState(false);
  const [tick, setTick] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  // Persist the journey for the tab's lifetime: a refresh or a closed modal
  // resumes where the person stopped, on the same pro_signups row.
  useEffect(() => {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify({ key, form }));
    } catch {
      /* ignore */
    }
  }, [key, form]);

  // Journey opened (+ role when the CTA already picked one).
  useEffect(() => {
    void trackSignup(key, "opened", { lang, ...attribution(source) });
    if (initialRole) void trackSignup(key, "role", { kind: initialRole, lang });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Focus the first control of each step.
  useEffect(() => {
    const id = window.setTimeout(() => {
      const el = rootRef.current?.querySelector<HTMLElement>(
        "[data-autofocus], input:not([type=checkbox])",
      );
      el?.focus({ preventScroll: variant === "page" });
    }, 80);
    return () => window.clearTimeout(id);
  }, [step, phase, variant]);

  // "Creating" checklist animation.
  useEffect(() => {
    if (phase !== "creating") return;
    setTick(0);
    const id = window.setInterval(() => setTick((n) => Math.min(n + 1, 3)), 650);
    return () => window.clearInterval(id);
  }, [phase]);

  const steps = stepsFor(form.role);
  const stepIndex = Math.max(1, steps.indexOf(step) + 1);
  const isClub = form.role === "club";
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  function pickRole(role: SignupRole) {
    setForm((f) => ({
      ...f,
      role,
      pillars: f.role === role && f.pillars.length ? f.pillars : defaultPillars(role),
    }));
    setError(null);
    void trackSignup(key, "role", { kind: role, lang });
    setStep(stepsFor(role)[1]);
  }

  function goBack() {
    setError(null);
    const i = steps.indexOf(step);
    if (i > 0) setStep(steps[i - 1]);
  }

  function submitStructure(e: FormEvent) {
    e.preventDefault();
    if (form.org_name.trim().length < 2 || !form.city.trim()) return;
    void trackSignup(key, "structure", {
      kind: form.role,
      org_name: form.org_name,
      city: form.city,
      size_band: form.size_band,
      frequency: form.frequency,
    });
    setStep("needs");
  }

  function submitNeeds(e: FormEvent) {
    e.preventDefault();
    if (!form.pillars.length) return;
    void trackSignup(key, "structure", {
      pillars: form.pillars,
      current_tool: form.current_tool,
      next_night: form.next_night,
    });
    setStep("account");
  }

  function saveIdentity() {
    if (!EMAIL_RE.test(form.email.trim())) return;
    void trackSignup(key, "account", {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
    });
  }

  async function fallbackLead(note: string) {
    // Safety net: if the Yuno side refused, the founder still gets the request.
    try {
      await sendLead({
        data: {
          segment: SEGMENT[form.role ?? "other"],
          name: `${form.first_name} ${form.last_name}`.trim() || form.email,
          email: form.email.trim(),
          company: form.org_name,
          role: form.role ?? "",
          phone: form.phone,
          message: `${note} — ${form.city} · ${form.pillars.join(", ")} · ${form.current_tool} · ${form.next_night}`,
          source: `landing-signup:${lang}`,
        },
      });
    } catch {
      /* ignore */
    }
  }

  async function submitAccount(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const email = form.email.trim().toLowerCase();
    if (!EMAIL_RE.test(email)) return setError(s.errors.email);
    if (password.length < 8) return setError(s.errors.password);
    if (!terms) return setError(s.errors.terms);

    setPhase("creating");
    const startedAt = Date.now();
    const minDelay = () =>
      new Promise((r) => setTimeout(r, Math.max(0, 1900 - (Date.now() - startedAt))));

    // The draft must exist server-side BEFORE complete_pro_signup reads it.
    await trackSignup(key, "account", {
      kind: form.role,
      lang,
      org_name: form.org_name,
      city: form.city,
      first_name: form.first_name,
      last_name: form.last_name,
      email,
      phone: form.phone,
      pillars: form.pillars,
    });

    const sb = yunoApp();
    const { data, error: signErr } = await sb.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: form.first_name.trim() || undefined,
          last_name: form.last_name.trim() || undefined,
        },
        // Email confirmation ON: the link lands on the page that finishes the job.
        emailRedirectTo: `${YUNO_APP_ORIGIN}/get-started?key=${key}`,
      },
    });

    if (signErr) {
      const code = (signErr as { code?: string }).code ?? "";
      const msg = signErr.message.toLowerCase();
      if (
        code === "user_already_exists" ||
        msg.includes("already registered") ||
        msg.includes("already been registered")
      ) {
        setPhase("exists");
        return;
      }
      setPhase("form");
      if (
        signErr.status === 429 ||
        code === "over_request_rate_limit" ||
        code === "over_email_send_rate_limit"
      )
        setError(s.errors.rate);
      else if (code === "weak_password" || msg.includes("password")) setError(s.errors.password);
      else if (code === "email_address_invalid" || msg.includes("email")) setError(s.errors.email);
      else setError(s.errors.generic);
      return;
    }

    // Email-enumeration protection: an existing address comes back as a user
    // without identities and without a session.
    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      setPhase("exists");
      return;
    }

    if (!data.session) {
      await minDelay();
      setPhase("confirm");
      return;
    }

    const { error: cErr } = await sb.rpc("complete_pro_signup", { p_key: key });
    if (cErr) {
      console.error("[signup] complete_pro_signup", cErr);
      await fallbackLead("Account created, pro space NOT opened (complete_pro_signup failed)");
    }
    await minDelay();
    try {
      sessionStorage.removeItem(STORE_KEY);
    } catch {
      /* ignore */
    }
    // /get-started?key=… finishes the job itself if complete_pro_signup failed.
    window.location.assign(
      appHandoffUrl(
        data.session.access_token,
        data.session.refresh_token,
        lang,
        cErr ? `/get-started?key=${key}` : "/get-started",
      ),
    );
  }

  async function submitLeadStep(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = form.email.trim().toLowerCase();
    if (!form.first_name.trim()) return;
    if (!EMAIL_RE.test(email)) return setError(s.errors.email);
    setError(null);
    setBusy(true);
    const payload = {
      kind: form.role,
      lang,
      first_name: form.first_name,
      email,
      org_name: form.org_name,
      phone: form.phone,
    };
    const [yuno, legacy] = await Promise.allSettled([
      yunoApp().rpc("track_pro_signup", { p_key: key, p_step: "lead", p_data: payload }),
      sendLead({
        data: {
          segment: SEGMENT[form.role ?? "other"],
          name: form.first_name,
          email,
          company: form.org_name,
          role: form.role ?? "",
          phone: form.phone,
          message: `Pro request from the landing (${lang.toUpperCase()}) — ${form.role}`,
          source: `landing-signup:${lang}`,
        },
      }),
    ]);
    setBusy(false);
    const yunoOk = yuno.status === "fulfilled" && !yuno.value.error;
    if (!yunoOk && legacy.status === "rejected") {
      setError(s.error);
      return;
    }
    try {
      sessionStorage.removeItem(STORE_KEY);
    } catch {
      /* ignore */
    }
    setPhase("done");
  }

  const orgLabel = form.org_name.trim() || (isClub ? s.clubName : s.orgName);

  // ── Terminal phases ────────────────────────────────────────────────────────
  if (phase === "creating") {
    return (
      <div ref={rootRef} className="py-6 text-center" aria-live="polite">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-zinc-950 text-white">
          <Loader2 className="size-6 animate-spin" />
        </span>
        <h2 id="signup-title" className="yl-h3 mt-6 text-[24px] text-zinc-950">
          {s.creatingTitle.replace("{org}", orgLabel)}
        </h2>
        <ul className="mx-auto mt-6 max-w-xs space-y-2.5 text-left">
          {s.creatingSteps.map((label, i) => {
            const done = tick > i;
            return (
              <li key={label} className="flex items-center gap-3 text-[14px]">
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full transition-colors duration-300",
                    done ? "bg-emerald-500 text-white" : "bg-zinc-100 text-zinc-400",
                  )}
                >
                  {done ? (
                    <Check className="size-3.5" strokeWidth={3} />
                  ) : (
                    <Loader2 className="size-3.5 animate-spin" />
                  )}
                </span>
                <span className={done ? "text-zinc-950" : "text-zinc-400"}>{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (phase === "exists" || phase === "confirm") {
    const exists = phase === "exists";
    return (
      <div ref={rootRef} className="py-4 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900">
          <Mail className="size-6" />
        </span>
        <h2 id="signup-title" className="yl-h3 mt-6 text-[24px] text-zinc-950">
          {exists ? s.existsTitle : s.confirmTitle}
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-pretty text-[14.5px] leading-relaxed text-zinc-500">
          {(exists ? s.existsBody : s.confirmBody).replace("{email}", form.email.trim())}
        </p>
        <div className="mt-7 flex flex-col gap-2">
          {exists ? (
            <a
              href={appLoginUrl(key)}
              data-autofocus
              className="yl-btn-primary group h-12 text-[15px]"
            >
              {s.existsCta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          ) : null}
          <a
            href={whatsappHref(t.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="yl-btn-secondary h-12 text-[14px]"
          >
            <MessageCircle className="size-4 text-[#25D366]" /> {s.doneCta}
          </a>
          {exists && (
            <button
              type="button"
              onClick={() => {
                setPhase("form");
                setStep("account");
              }}
              className="h-11 text-[13.5px] font-medium text-zinc-500 hover:text-zinc-900"
            >
              {s.back}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div ref={rootRef} className="py-4 text-center">
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
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="h-11 text-[13.5px] font-medium text-zinc-500 hover:text-zinc-900"
            >
              {s.close}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Form steps ─────────────────────────────────────────────────────────────
  return (
    <div ref={rootRef}>
      {step !== "role" && (
        <div className="mb-6 flex items-center gap-3">
          <div className="flex gap-1">
            {steps.map((st, i) => (
              <span
                key={st}
                className={cn(
                  "h-1 w-7 rounded-full transition-colors duration-300",
                  i + 1 <= stepIndex ? "bg-[var(--yuno-red)]" : "bg-zinc-200",
                )}
              />
            ))}
          </div>
          <span className="text-[12px] font-medium text-zinc-400">
            {s.stepOf.replace("{n}", String(stepIndex)).replace("{total}", String(steps.length))}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {step === "role" && (
          <Pane key="role">
            <h2 id="signup-title" className="yl-h3 text-[24px] text-zinc-950">
              {s.roleTitle}
            </h2>
            <p className="mt-1.5 text-[14px] text-zinc-500">{s.roleSub}</p>
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {s.roles.map((r, i) => {
                const id = r.id as SignupRole;
                const Icon = ROLE_ICONS[id];
                const on = form.role === id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    data-autofocus={i === 0 ? true : undefined}
                    onClick={() => pickRole(id)}
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
            <LoginHint />
          </Pane>
        )}

        {step === "structure" && (
          <Pane key="structure" as="form" onSubmit={submitStructure}>
            <h2 id="signup-title" className="yl-h3 text-[24px] text-zinc-950">
              {isClub ? s.clubTitle : s.orgTitle}
            </h2>
            <p className="mt-1.5 text-[13.5px] text-zinc-500">{s.structureSub}</p>
            <div className="mt-6 space-y-4">
              <Field
                label={isClub ? s.clubName : s.orgName}
                value={form.org_name}
                onChange={(v) => set("org_name", v)}
                placeholder={isClub ? s.clubNamePh : s.orgNamePh}
                autoComplete="organization"
                required
                minLength={2}
                maxLength={120}
              />
              <Field
                label={s.city}
                value={form.city}
                onChange={(v) => set("city", v)}
                placeholder={s.cityPh}
                autoComplete="address-level2"
                required
                maxLength={120}
              />
              <Chips
                label={isClub ? s.capacity : s.crowd}
                options={isClub ? s.capacityOpts : s.crowdOpts}
                value={form.size_band}
                onChange={(v) => set("size_band", v)}
              />
              {!isClub && (
                <Chips
                  label={s.frequency}
                  options={s.frequencyOpts}
                  value={form.frequency}
                  onChange={(v) => set("frequency", v)}
                />
              )}
            </div>
            <Actions onBack={goBack} backLabel={s.back}>
              <button
                type="submit"
                disabled={form.org_name.trim().length < 2 || !form.city.trim()}
                className="yl-btn-primary group h-12 flex-1 text-[15px] disabled:opacity-50"
              >
                {s.continue}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Actions>
          </Pane>
        )}

        {step === "needs" && (
          <Pane key="needs" as="form" onSubmit={submitNeeds}>
            <h2 id="signup-title" className="yl-h3 text-[24px] text-zinc-950">
              {s.needsTitle}
            </h2>
            <p className="mt-1.5 text-[13.5px] text-zinc-500">{s.needsSub}</p>
            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {s.pillars
                .filter((p) => (isClub ? p.id !== "guest_list" : p.id !== "drinks"))
                .map((p, i) => {
                  const on = form.pillars.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      aria-pressed={on}
                      data-autofocus={i === 0 ? true : undefined}
                      onClick={() =>
                        set(
                          "pillars",
                          on ? form.pillars.filter((x) => x !== p.id) : [...form.pillars, p.id],
                        )
                      }
                      className={cn(
                        "flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-colors",
                        on ? "border-zinc-950 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                          on
                            ? "border-zinc-950 bg-zinc-950 text-white"
                            : "border-zinc-300 bg-white",
                        )}
                      >
                        {on && <Check className="size-3.5" strokeWidth={3} />}
                      </span>
                      <span>
                        <span className="block text-[14px] font-semibold text-zinc-950">
                          {p.label}
                        </span>
                        <span className="block text-[12.5px] leading-snug text-zinc-500">
                          {p.hint}
                        </span>
                      </span>
                    </button>
                  );
                })}
            </div>
            <div className="mt-5 space-y-4">
              <Chips
                label={s.tool}
                hint={form.current_tool && form.current_tool !== "none" ? s.toolHint : undefined}
                options={s.toolOpts}
                value={form.current_tool}
                onChange={(v) => set("current_tool", v)}
              />
              <Chips
                label={s.nextNight}
                options={s.nextNightOpts}
                value={form.next_night}
                onChange={(v) => set("next_night", v)}
              />
            </div>
            <Actions onBack={goBack} backLabel={s.back}>
              <button
                type="submit"
                disabled={!form.pillars.length}
                className="yl-btn-primary group h-12 flex-1 text-[15px] disabled:opacity-50"
              >
                {s.continue}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Actions>
          </Pane>
        )}

        {step === "account" && (
          <Pane key="account" as="form" onSubmit={submitAccount}>
            <h2 id="signup-title" className="yl-h3 text-[24px] text-zinc-950">
              {form.org_name.trim()
                ? s.accountTitleOrg.replace("{org}", form.org_name.trim())
                : s.accountTitle}
            </h2>
            <p className="mt-1.5 text-[13.5px] text-zinc-500">{s.accountSub}</p>
            <div className="mt-6 space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <Field
                  label={s.firstName}
                  value={form.first_name}
                  onChange={(v) => set("first_name", v)}
                  placeholder={s.firstNamePh}
                  autoComplete="given-name"
                  required
                  maxLength={80}
                />
                <Field
                  label={s.lastName}
                  value={form.last_name}
                  onChange={(v) => set("last_name", v)}
                  placeholder={s.lastNamePh}
                  autoComplete="family-name"
                  maxLength={80}
                />
              </div>
              <Field
                label={s.email}
                type="email"
                value={form.email}
                onChange={(v) => set("email", v)}
                onBlur={saveIdentity}
                placeholder={s.emailPh}
                autoComplete="email"
                required
                maxLength={254}
              />
              <Field
                label={s.phone}
                type="tel"
                value={form.phone}
                onChange={(v) => set("phone", v)}
                onBlur={saveIdentity}
                placeholder={s.phonePh}
                autoComplete="tel"
                hint={s.phoneHint}
                maxLength={40}
              />
              <label className="block">
                <span className="text-[13px] font-medium text-zinc-700">{s.password}</span>
                <span className="relative mt-1.5 block">
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={s.passwordPh}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    maxLength={72}
                    className={cn(INPUT, "pr-20")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-lg px-2 py-1 text-[12px] font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    {showPwd ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                    {showPwd ? s.hide : s.show}
                  </button>
                </span>
              </label>
              <label className="flex items-start gap-2.5 pt-1 text-[12.5px] leading-snug text-zinc-500">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 accent-zinc-950"
                />
                <span>
                  {s.termsA}{" "}
                  <a
                    href={s.termsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-zinc-900"
                  >
                    {s.termsLink}
                  </a>{" "}
                  {s.termsB}{" "}
                  <a
                    href={s.privacyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-zinc-900"
                  >
                    {s.privacyLink}
                  </a>
                  .
                </span>
              </label>
            </div>

            {error && <ErrorNote>{error}</ErrorNote>}

            <Actions onBack={goBack} backLabel={s.back}>
              <button
                type="submit"
                disabled={!terms}
                className="yl-btn-primary group h-12 flex-1 text-[15px] disabled:opacity-50"
              >
                {s.submit}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Actions>
            <LoginHint signupKey={key} />
          </Pane>
        )}

        {step === "lead" && (
          <Pane key="lead" as="form" onSubmit={submitLeadStep}>
            <h2 id="signup-title" className="yl-h3 text-[24px] text-zinc-950">
              {s.leadTitle}
            </h2>
            <p className="mt-1.5 text-[13.5px] text-zinc-500">{s.leadSub}</p>
            <div className="mt-6 space-y-3">
              <Field
                label={s.name}
                value={form.first_name}
                onChange={(v) => set("first_name", v)}
                placeholder={s.namePh}
                autoComplete="name"
                required
                maxLength={120}
              />
              <Field
                label={s.email}
                type="email"
                value={form.email}
                onChange={(v) => set("email", v)}
                placeholder={s.emailPh}
                autoComplete="email"
                required
                maxLength={254}
              />
              <Field
                label={s.company}
                value={form.org_name}
                onChange={(v) => set("org_name", v)}
                placeholder={s.companyPh}
                autoComplete="organization"
                maxLength={120}
              />
              <Field
                label={s.leadPhone}
                type="tel"
                value={form.phone}
                onChange={(v) => set("phone", v)}
                placeholder={s.phonePh}
                autoComplete="tel"
                maxLength={40}
              />
            </div>
            {error && <ErrorNote>{error}</ErrorNote>}
            <Actions onBack={goBack} backLabel={s.back}>
              <button
                type="submit"
                disabled={busy}
                className="yl-btn-primary group h-12 flex-1 text-[15px] disabled:opacity-70"
              >
                {busy ? <Loader2 className="size-4 animate-spin" /> : null}
                {s.leadSubmit}
                {!busy && (
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            </Actions>
            <p className="mt-4 text-[11.5px] leading-relaxed text-zinc-400">{s.consent}</p>
          </Pane>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Pieces ───────────────────────────────────────────────────────────────────

const INPUT =
  "h-11 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-[15px] text-zinc-950 outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-zinc-950 focus:shadow-[0_0_0_4px_rgba(10,10,11,0.06)]";

function Pane({
  children,
  as = "div",
  onSubmit,
}: {
  children: ReactNode;
  as?: "div" | "form";
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const props = {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
    transition: { duration: 0.25, ease: EASE },
  };
  return as === "form" ? (
    <motion.form {...props} onSubmit={onSubmit} noValidate={false}>
      {children}
    </motion.form>
  ) : (
    <motion.div {...props}>{children}</motion.div>
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  autoComplete,
  required,
  minLength,
  maxLength,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-zinc-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className={cn(INPUT, "mt-1.5")}
      />
      {hint && <span className="mt-1 block text-[11.5px] text-zinc-400">{hint}</span>}
    </label>
  );
}

function Chips({
  label,
  hint,
  options,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[13px] font-medium text-zinc-700">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((o) => {
          const on = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(on ? "" : o.id)}
              className={cn(
                "h-9 rounded-full border px-3.5 text-[13px] font-medium transition-colors",
                on
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      {hint && <p className="mt-1.5 text-[11.5px] text-zinc-400">{hint}</p>}
    </fieldset>
  );
}

function Actions({
  children,
  onBack,
  backLabel,
}: {
  children: ReactNode;
  onBack: () => void;
  backLabel: string;
}) {
  return (
    <div className="mt-6 flex gap-2">
      <button
        type="button"
        onClick={onBack}
        className="yl-btn-secondary h-12 px-4 text-[14px]"
        aria-label={backLabel}
      >
        <ArrowLeft className="size-4" />
      </button>
      {children}
    </div>
  );
}

function ErrorNote({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="mt-4 rounded-xl bg-red-50 px-3.5 py-2.5 text-[13px] text-red-700">
      {children}
    </p>
  );
}

// With a key (account step), logging in finishes opening THIS pro space on
// /get-started. Without one (nothing described yet), it's a plain login.
function LoginHint({ signupKey }: { signupKey?: string }) {
  const { t } = useLanding();
  return (
    <p className="mt-5 text-center text-[12.5px] text-zinc-500">
      {t.signup.haveAccount}{" "}
      <a
        href={signupKey ? appLoginUrl(signupKey) : `${YUNO_APP_ORIGIN}/auth`}
        className="font-medium text-zinc-950 underline-offset-2 hover:underline"
      >
        {t.signup.login}
      </a>
    </p>
  );
}
