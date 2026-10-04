import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useServerFn } from "@tanstack/react-start";
import type { Session } from "@supabase/supabase-js";
import appIcon from "@/assets/crm/yuno-app-icon.webp";
import { crmContent } from "@/content/crm";
import { crmSignupContent, type CrmSignupCopy } from "@/content/crm-signup";
import { LOGIN_URL } from "@/components/landing/context";
import { type LandingLang } from "@/i18n/landing-lang";
import { crmPagePaths, landingHref } from "@/i18n/hosts";
import { START_PATHS } from "@/i18n/start";
import { submitLead } from "@/lib/leads.functions";
import { capture, identifyAccount } from "@/lib/posthog";
import { YUNO_APP_ORIGIN, appHandoffUrl, newSignupKey, trackSignup, yunoApp } from "@/lib/yuno-app";

// The Yuno CRM account funnel ("/start?product=crm", "/fr/start?product=crm"…):
// the Claude Design project "Yuno CRM" > Inscription.dc.html. Email → password →
// activity → name → crowd size → (email link, only if confirmation is on) → done, with a live preview of the
// console on the side. Backend = the landing's existing pro signup: every step is
// tracked in the app's `pro_signups` (RPC track_pro_signup, `product: "crm"`), the
// account is created on the Yuno app's Supabase, `complete_pro_signup` opens a CRM
// Console with its 14-day trial, then the session is handed to yunoapp.eu.
// Google / Apple: `signInWithOAuth` (implicit flow) leaves for the provider and comes
// back HERE with the session in the URL fragment; the funnel resumes on "type" and the
// account is opened like any other (same `complete_pro_signup`, same handoff).

// "existing": the person signed in with Google / Apple and already has a Yuno account
// (Ticketing or CRM): we offer to open Yuno CRM on it instead of a new account.
type Step = "email" | "password" | "type" | "name" | "cap" | "confirm" | "existing" | "done";

// "confirm" is NOT part of the journey: it only shows if Supabase email confirmation is on
// (no session after signUp) and tells the person to open the link sent to them.
const FLOW: Step[] = ["email", "password", "type", "name", "cap", "done"];
// Google / Apple: the provider vouches for the address, so no password and no confirmation.
// "email" stays as the (already done) first bar; the journey resumes on "type".
const FLOW_OAUTH: Step[] = ["email", "type", "name", "cap", "done"];
type Provider = "google" | "apple";

/** An account the signed-in person holds (RPC get_my_product_accounts, yuno repo). */
interface ExistingAccount {
  kind: "venue" | "org";
  venue_id: string | null;
  organizer_user_id: string | null;
  name: string;
  city: string | null;
  products: string[];
}
const STORE_KEY = "yuno_crm_signup_key";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// What complete_pro_signup knows: a club or an organizer space.
const ROLE = { club: "club", bar: "club", orga: "organizer", fest: "organizer" } as const;
type TypeId = keyof typeof ROLE;
const REGULARS: Record<TypeId, number> = { club: 38, orga: 27, bar: 45, fest: 18 };
const MONEY: Record<TypeId, number> = { club: 1840, orga: 1260, bar: 920, fest: 3400 };
const NOT_A_NAME =
  /^(contact|info|infos|hello|bonjour|booking|admin|team|resa|reservation|event|events|club|bar|office|direction|vous|mail|compta)$/i;
const TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gnail.com": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmal.fr": "hotmail.fr",
  "yahooo.fr": "yahoo.fr",
  "yaho.fr": "yahoo.fr",
  "outlok.com": "outlook.com",
  "outlook.f": "outlook.fr",
  "orange.f": "orange.fr",
  "free.f": "free.fr",
  "icloud.co": "icloud.com",
};

const c = (n: string) => `var(--color-yc-${n})`;
const DISPLAY = "var(--font-yc-display)";
const MONO = "var(--font-yc-mono)";
const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

function prefersReducedMotion() {
  return (
    typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Eased count towards `target` (the preview numbers move, they don't jump). */
function useTween(target: number, ms: number) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (prefersReducedMotion()) {
      from.current = target;
      setV(target);
      return;
    }
    const a = from.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      const e = 1 - Math.pow(1 - p, 4);
      const cur = a + (target - a) * e;
      from.current = cur;
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

function shake(el: HTMLElement | null) {
  if (!el || prefersReducedMotion() || !el.animate) return;
  el.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(7px)" },
      { transform: "translateX(-4px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 380, easing: "ease-out" },
  );
}

function attribution(source: string) {
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

const pwChecks = (v: string) => [
  v.length >= 8,
  /[A-Z]/.test(v) && /[a-z]/.test(v),
  /[\d\W_]/.test(v),
];

function ProviderMark({ provider }: { provider: Provider }) {
  if (provider === "apple")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="currentColor">
        <path d="M16.37 1.43c0 1.14-.42 2.2-1.12 2.97-.76.83-2 1.47-3.02 1.39-.13-1.1.4-2.26 1.08-2.99.76-.82 2.07-1.42 3.06-1.37zM20.5 17.3c-.55 1.27-.82 1.84-1.53 2.96-.99 1.57-2.39 3.52-4.12 3.53-1.54.02-1.94-1-4.03-.99-2.09.01-2.53 1.01-4.07.99-1.73-.02-3.05-1.78-4.04-3.35C-.27 16.1-.56 10.9 1.15 8.27c1.21-1.87 3.12-2.97 4.92-2.97 1.83 0 2.98 1.01 4.49 1.01 1.47 0 2.36-1.01 4.48-1.01 1.6 0 3.3.87 4.51 2.38-3.96 2.17-3.32 7.82.95 9.62z" />
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export function CrmSignup({ lang, initialEmail }: { lang: LandingLang; initialEmail?: string }) {
  const t: CrmSignupCopy = crmSignupContent[lang];
  const contactEmail = crmContent[lang].faq.email;
  const sendLead = useServerFn(submitLead);
  const nf = useMemo(
    () => new Intl.NumberFormat(lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : "en-GB"),
    [lang],
  );
  const num = (n: number) => nf.format(Math.round(n));

  const [key] = useState(() => {
    try {
      const k = sessionStorage.getItem(STORE_KEY);
      if (k && /^[A-Za-z0-9_-]{16,64}$/.test(k)) return k;
    } catch {
      /* ignore */
    }
    return newSignupKey();
  });
  useEffect(() => {
    try {
      sessionStorage.setItem(STORE_KEY, key);
    } catch {
      /* ignore */
    }
  }, [key]);

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState(initialEmail ?? "");
  const [emailErr, setEmailErr] = useState("");
  const [exists, setExists] = useState(false);
  const [pw, setPw] = useState("");
  const [pwShow, setPwShow] = useState(false);
  const [pwErr, setPwErr] = useState(false);
  const [type, setType] = useState<TypeId | null>(null);
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [city, setCity] = useState("");
  const [cap, setCap] = useState<string | null>(null);
  const [resendNote, setResendNote] = useState("");
  const [resend, setResend] = useState(30);
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [handoff, setHandoff] = useState<{ at: string; rt: string; redirect: string } | null>(null);
  const [leaving, setLeaving] = useState(false);
  // Google / Apple: a session is already there when the person comes back from the provider.
  const [oauthSession, setOauthSession] = useState<Session | null>(null);
  const [oauthBusy, setOauthBusy] = useState<Provider | null>(null);
  const [oauthErr, setOauthErr] = useState("");
  const [accounts, setAccounts] = useState<ExistingAccount[]>([]);
  const [pickedAccount, setPickedAccount] = useState(0);
  const [resuming, setResuming] = useState(() =>
    /(^|[#&])(access_token|error)=/.test(window.location.hash),
  );

  const emailRef = useRef<HTMLInputElement>(null);
  const emailWrap = useRef<HTMLDivElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const pwWrap = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const nameWrap = useRef<HTMLDivElement>(null);
  const timer = useRef<number>(0);

  const typeItem = t.type.items.find((i) => i.id === type);
  const capItem = t.cap.items.find((i) => i.id === cap);
  const flow = oauthSession ? FLOW_OAUTH : FLOW;
  // With a provider session the first step is already behind the person: no way back to it.
  const firstIndex = oauthSession ? 1 : 0;
  const stepIndex = flow.indexOf(step);
  const total = flow.length - 1;
  const done = step === "done";

  // Journey opened — or resumed after Google / Apple (session in the URL fragment).
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const accessToken = hash.get("access_token");
    const refreshToken = hash.get("refresh_token");
    const failed = hash.get("error") || new URLSearchParams(window.location.search).get("error");
    if (!accessToken && !failed) {
      void trackSignup(key, "opened", { lang, product: "crm", ...attribution("start_crm") });
      capture("pro_signup_opened", {
        audience: "pro",
        product: "crm",
        lang,
        variant: "page",
        role: null,
        ...attribution("start_crm"),
      });
      return;
    }
    // Tokens must not stay in the address bar (history, shared screenshots).
    window.history.replaceState(null, "", `${window.location.pathname}?product=crm`);
    const fail = (reason: string) => {
      capture("pro_signup_failed", {
        audience: "pro",
        product: "crm",
        lang,
        source: "start_crm",
        method: "oauth",
        code: reason,
      });
      setOauthErr(t.errors.oauth);
      setResuming(false);
    };
    if (failed || !accessToken || !refreshToken) {
      fail(failed || "no_session");
      return;
    }
    void (async () => {
      const sb = yunoApp();
      const { data, error } = await sb.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      const user = data.session?.user;
      if (error || !data.session || !user?.email) {
        fail(error ? "set_session" : "no_email");
        return;
      }
      const method = (user.app_metadata?.provider as string | undefined) ?? "oauth";
      capture("pro_signup_step_completed", {
        audience: "pro",
        product: "crm",
        step: "email",
        method,
        lang,
        source: "start_crm",
      });
      setEmail(user.email);
      setOauthSession(data.session);
      // Already a Yuno pro (Ticketing or CRM)? Then no second account: open
      // Yuno CRM on that one (open_product_on_my_account, yuno repo).
      const { data: owned } = await sb.rpc("get_my_product_accounts");
      const list = (Array.isArray(owned) ? owned : []) as ExistingAccount[];
      setResuming(false);
      if (list.length) {
        setAccounts(list);
        go("existing");
        return;
      }
      go("type");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Back from the provider's page with the browser's back button: unlock the buttons.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => e.persisted && setOauthBusy(null);
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  const go = useCallback((to: Step) => {
    window.clearTimeout(timer.current);
    setStep(to);
  }, []);

  // Focus the first control of each step.
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (step === "email") emailRef.current?.focus({ preventScroll: true });
      if (step === "password") pwRef.current?.focus({ preventScroll: true });
      if (step === "name") nameRef.current?.focus({ preventScroll: true });
    }, 80);
    return () => window.clearTimeout(id);
  }, [step]);

  // Resend countdown on the confirmation step.
  useEffect(() => {
    if (step !== "confirm") return;
    const id = window.setInterval(() => setResend((n) => Math.max(0, n - 1)), 1000);
    return () => window.clearInterval(id);
  }, [step]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const back = useCallback(() => {
    window.clearTimeout(timer.current);
    setSubmitError("");
    const i = flow.indexOf(step);
    if (step === "confirm") return go("email");
    if (i > firstIndex && step !== "done") go(flow[i - 1]);
  }, [step, go, flow, firstIndex]);

  // 1-4 pick on the two choice steps, Esc goes back (never while typing).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "BUTTON" || tag === "A") return;
      const n = parseInt(e.key, 10);
      if (step === "type" && n >= 1 && n <= 4) pickType(t.type.items[n - 1].id as TypeId);
      if (step === "cap" && n >= 1 && n <= 4) setCap(t.cap.items[n - 1].id);
      if (e.key === "Escape" && stepIndex > firstIndex && !done) back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, stepIndex, done, back]);

  // ---- steps ----------------------------------------------------------------

  const at = email.indexOf("@");
  const dom =
    at > 0
      ? email
          .slice(at + 1)
          .toLowerCase()
          .trim()
      : "";
  const suggestion = dom && TYPOS[dom] ? email.slice(0, at) + "@" + TYPOS[dom] : "";

  async function startOAuth(provider: Provider) {
    if (oauthBusy) return;
    setOauthErr("");
    setOauthBusy(provider);
    capture(
      "pro_signup_step_completed",
      {
        audience: "pro",
        product: "crm",
        step: "email",
        method: provider,
        lang,
        source: "start_crm",
      },
      true,
    );
    const { data, error } = await yunoApp().auth.signInWithOAuth({
      provider,
      options: {
        // Back on this very funnel, in the page's language. The origin must be listed in the
        // Supabase Auth redirect URLs (docs: "Yuno CRM — connexion Google / Apple").
        redirectTo: `${window.location.origin}${START_PATHS[lang]}?product=crm`,
        skipBrowserRedirect: true,
      },
    });
    if (error || !data.url) {
      setOauthBusy(null);
      setOauthErr(t.errors.oauth);
      capture("pro_signup_failed", {
        audience: "pro",
        product: "crm",
        lang,
        source: "start_crm",
        method: provider,
        code: error?.name ?? "no_url",
      });
      return;
    }
    window.location.assign(data.url);
  }

  const withCrm = accounts.find((a) => a.products.includes("crm"));
  const candidates = accounts.filter((a) => !a.products.includes("crm"));
  const target = candidates[pickedAccount] ?? candidates[0];

  /** Open Yuno CRM on the account the person already has, then go to the CRM console. */
  async function openOnExisting() {
    if (!oauthSession || busy) return;
    setSubmitError("");
    setBusy(true);
    if (target) {
      const { error } = await yunoApp().rpc("open_product_on_my_account", {
        p_product: "crm",
        p_venue_id: target.venue_id,
        p_organizer_user_id: target.kind === "org" ? target.organizer_user_id : null,
        p_signup_key: key,
      });
      if (error) {
        setBusy(false);
        setSubmitError(t.errors.generic);
        capture("pro_signup_failed", {
          audience: "pro",
          product: "crm",
          lang,
          source: "start_crm",
          method: "existing",
          code: error.message.slice(0, 60),
        });
        return;
      }
    }
    capture(
      "pro_signup_account_created",
      {
        audience: "pro",
        product: "crm",
        lang,
        source: "start_crm",
        existing_account: true,
        space_opened: true,
        method: oauthSession.user.app_metadata?.provider ?? "oauth",
      },
      true,
    );
    identifyAccount(oauthSession.user.id, null);
    try {
      sessionStorage.removeItem(STORE_KEY);
    } catch {
      /* ignore */
    }
    window.location.assign(
      appHandoffUrl(oauthSession.access_token, oauthSession.refresh_token, lang, "/crm"),
    );
  }

  /** Another address: forget this session and start again from the email step. */
  async function switchAddress() {
    await yunoApp().auth.signOut({ scope: "local" });
    setOauthSession(null);
    setAccounts([]);
    setEmail("");
    go("email");
  }

  function submitEmail(e: FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!EMAIL_RE.test(v)) {
      setEmailErr(v ? t.email.errBad : t.email.errEmpty);
      shake(emailWrap.current);
      emailRef.current?.focus();
      return;
    }
    setExists(false);
    capture("pro_signup_step_completed", {
      audience: "pro",
      product: "crm",
      step: "email",
      lang,
      source: "start_crm",
    });
    go("password");
  }

  function submitPw(e: FormEvent) {
    e.preventDefault();
    if (!pwChecks(pw).every(Boolean)) {
      setPwErr(true);
      shake(pwWrap.current);
      pwRef.current?.focus();
      return;
    }
    go("type");
  }

  function pickType(id: TypeId) {
    setType(id);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => go("name"), 1400);
    void trackSignup(key, "role", { kind: ROLE[id], activity: id, lang, product: "crm" });
    capture("pro_signup_step_completed", {
      audience: "pro",
      product: "crm",
      step: "role",
      role: ROLE[id],
      lang,
      source: "start_crm",
    });
  }

  function submitName(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setNameErr(true);
      shake(nameWrap.current);
      nameRef.current?.focus();
      return;
    }
    go("cap");
  }

  const capLabel = (id: string | null) =>
    (({ s: "<200", m: "200-500", l: "500-1500", xl: "1500+" }) as Record<string, string>)[
      id ?? ""
    ] ?? "";

  async function fallbackLead(note: string) {
    // Safety net: if the Yuno side refused, the founder still gets the request.
    try {
      await sendLead({
        data: {
          segment: ROLE[type ?? "club"] === "club" ? "club" : "organizer",
          name: email.trim(),
          email: email.trim(),
          company: name.trim(),
          role: ROLE[type ?? "club"],
          phone: "",
          message: `[CRM] ${note} — ${city} · ${capLabel(cap)} · shotgun`,
          source: `landing-signup:${lang}`,
        },
      });
    } catch {
      /* ignore */
    }
  }

  /** The person has a session: open the CRM space, then show the last screen. */
  async function openSpace(session: Session) {
    const role = ROLE[type ?? "club"];
    const { error: cErr } = await yunoApp().rpc("complete_pro_signup", { p_key: key });
    capture(
      "pro_signup_account_created",
      {
        audience: "pro",
        product: "crm",
        role,
        lang,
        source: "start_crm",
        pillars: [],
        space_opened: !cErr,
        method: oauthSession ? (session.user.app_metadata?.provider ?? "oauth") : "password",
      },
      true,
    );
    if (cErr) {
      console.error("[crm-signup] complete_pro_signup", cErr);
      await fallbackLead("Account created, CRM space NOT opened (complete_pro_signup failed)");
    }
    try {
      sessionStorage.removeItem(STORE_KEY);
    } catch {
      /* ignore */
    }
    setHandoff({
      at: session.access_token,
      rt: session.refresh_token,
      redirect: cErr ? `/get-started?key=${key}` : "/get-started",
    });
    go("done");
  }

  async function createAccount(withCap: boolean) {
    if (busy) return;
    window.clearTimeout(timer.current);
    setSubmitError("");
    setBusy(true);
    const addr = email.trim().toLowerCase();
    const role = ROLE[type ?? "club"];
    const usedCap = withCap ? cap : null;
    if (!withCap) setCap(null);
    capture("pro_signup_step_completed", {
      audience: "pro",
      product: "crm",
      step: "structure",
      role,
      lang,
      source: "start_crm",
      city: city.trim(),
      size_band: capLabel(usedCap),
    });
    void trackSignup(key, "structure", {
      kind: role,
      activity: type,
      org_name: name.trim(),
      city: city.trim(),
      size_band: capLabel(usedCap),
      current_tool: "shotgun",
      product: "crm",
    });
    // The draft must exist server-side BEFORE complete_pro_signup reads it.
    await trackSignup(key, "account", {
      kind: role,
      lang,
      org_name: name.trim(),
      city: city.trim(),
      email: addr,
      pillars: [],
      current_tool: "shotgun",
      product: "crm",
    });

    // Google / Apple: the account already exists, only the CRM space is left to open.
    if (oauthSession) {
      identifyAccount(oauthSession.user.id, role);
      await openSpace(oauthSession);
      setBusy(false);
      return;
    }

    const sb = yunoApp();
    const { data, error: signErr } = await sb.auth.signUp({
      email: addr,
      password: pw,
      // Email confirmation ON: the link in the mail lands on the page that finishes the job.
      options: { emailRedirectTo: `${YUNO_APP_ORIGIN}/get-started?key=${key}` },
    });

    if (signErr) {
      const code = (signErr as { code?: string }).code ?? "";
      const msg = signErr.message.toLowerCase();
      setBusy(false);
      if (
        code === "user_already_exists" ||
        msg.includes("already registered") ||
        msg.includes("already been registered")
      ) {
        capture("pro_signup_existing_account", {
          audience: "pro",
          role,
          lang,
          source: "start_crm",
        });
        setExists(true);
        go("email");
        return;
      }
      capture("pro_signup_failed", {
        audience: "pro",
        role,
        lang,
        source: "start_crm",
        code: code || String(signErr.status ?? ""),
      });
      if (
        signErr.status === 429 ||
        code === "over_request_rate_limit" ||
        code === "over_email_send_rate_limit"
      )
        setSubmitError(t.errors.rate);
      else if (code === "weak_password" || msg.includes("password")) {
        setSubmitError(t.errors.password);
        go("password");
      } else if (code === "email_address_invalid" || msg.includes("email")) {
        setSubmitError(t.errors.email);
        go("email");
      } else setSubmitError(t.errors.generic);
      return;
    }

    // Email-enumeration protection: an existing address comes back without identities.
    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      capture("pro_signup_existing_account", { audience: "pro", role, lang, source: "start_crm" });
      setBusy(false);
      setExists(true);
      go("email");
      return;
    }

    if (data.user) identifyAccount(data.user.id, role);
    if (!data.session) {
      capture(
        "pro_signup_email_confirmation_required",
        { audience: "pro", product: "crm", role, lang, source: "start_crm", pillars: [] },
        true,
      );
      setBusy(false);
      setResend(30);
      setResendNote("");
      go("confirm");
      return;
    }
    await openSpace(data.session);
    setBusy(false);
  }

  async function resendCode() {
    if (resend > 0) return;
    setResend(30);
    const { error } = await yunoApp().auth.resend({
      type: "signup",
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: `${YUNO_APP_ORIGIN}/get-started?key=${key}` },
    });
    setResendNote(error ? t.errors.rate : t.confirm.resent);
  }

  function openConsole() {
    if (!handoff || leaving) return;
    setLeaving(true);
    window.location.assign(appHandoffUrl(handoff.at, handoff.rt, lang, handoff.redirect));
  }

  // ---- preview values ------------------------------------------------------------

  const words = name
    .trim()
    .split(/\s+/)
    .filter((w) => w && !/^(le|la|les|l’|l'|the|el|los|las)$/i.test(w));
  const initials = name.trim()
    ? (words.length ? words : [name.trim()])
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "Y";
  const displayName = name.trim() || typeItem?.ph || t.name.fallbackName;
  const metaLine = [
    typeItem?.short ?? t.name.typeFallback,
    city.trim() || (step === "name" ? t.name.cityFallback : null),
  ]
    .filter(Boolean)
    .join(" · ");
  const fn = (email.split("@")[0] || "").split(/[._\-+0-9]/)[0];
  const first =
    /^[a-zA-ZÀ-ÿ]{2,14}$/.test(fn) && !NOT_A_NAME.test(fn)
      ? fn[0].toUpperCase() + fn.slice(1).toLowerCase()
      : "";
  const capV = capItem?.val ?? 300;
  const tickets = Math.round(capV * 0.86);
  const statP = useTween(step === "name" ? 1 : 0, 1100);
  const capN = useTween(capItem ? capItem.val : 0, 1600);
  const reg = REGULARS[type ?? "club"];

  const progress = Array.from({ length: total }, (_, i) => (done || i <= stepIndex ? 1 : 0));
  const scene = (t.scenes as Record<string, { k: string; c: string }>)[step];

  return (
    <div
      className="flex min-h-screen flex-row-reverse bg-white"
      style={{ fontFamily: "var(--font-yc-body)", color: c("ink") }}
    >
      <main className="flex min-h-screen min-w-0 flex-1 basis-[520px] flex-col bg-white px-5 py-6 sm:px-[clamp(20px,5vw,56px)]">
        <header className="flex items-center justify-between gap-4">
          <a
            href={crmPagePaths()[lang]}
            className="flex items-center gap-2.5 no-underline"
            style={{
              color: c("ink"),
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "-.03em",
            }}
          >
            <img
              src={appIcon}
              alt=""
              width={32}
              height={32}
              className="block size-8 rounded-[9px]"
            />
            yuno
          </a>
          <span className="text-[14px]" style={{ color: c("sand-600") }}>
            {t.haveAccount}{" "}
            <a href={LOGIN_URL} className="yc-su-link font-semibold">
              {t.login}
            </a>
          </span>
        </header>

        <div className="flex flex-1 items-center justify-center py-12">
          <div className="flex w-full max-w-[440px] flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex min-h-7 items-center justify-between">
                <button
                  type="button"
                  onClick={back}
                  className="yc-su-back flex items-center gap-1 py-1 pr-2 text-[14px] font-medium"
                  style={{
                    opacity: stepIndex > firstIndex && !done ? 1 : 0,
                    pointerEvents: stepIndex > firstIndex && !done ? "auto" : "none",
                  }}
                  tabIndex={stepIndex > firstIndex && !done ? 0 : -1}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  {t.back}
                </button>
                <span
                  className="text-[12px] uppercase"
                  style={{ fontFamily: MONO, letterSpacing: ".08em", color: c("sand-500") }}
                >
                  {done
                    ? t.created
                    : stepIndex < 0
                      ? ""
                      : fill(t.stepOf, { n: stepIndex + 1, total })}
                </span>
              </div>
              <div className="flex gap-1.5" aria-hidden>
                {progress.map((f, i) => (
                  <div
                    key={i}
                    className="h-1.5 flex-1 overflow-hidden rounded-md"
                    style={{ background: c("sand-100") }}
                  >
                    <div
                      className="h-full w-full rounded-md"
                      style={{
                        background: "var(--gradient-brand)",
                        transformOrigin: "left center",
                        transform: `scaleX(${f})`,
                        transition: "transform 650ms cubic-bezier(.65,0,.35,1)",
                        transitionDelay: i === stepIndex ? "120ms" : "0ms",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div key={step} className="yc-su-in">
              {step === "email" && !resuming && (
                <div className="flex flex-col gap-7">
                  <div className="flex flex-col gap-3.5">
                    <Title size="lg">
                      {t.email.titlePre} <Accent>{t.email.accent}</Accent>
                      {t.email.titlePost}
                    </Title>
                    <p
                      className="m-0 text-[17px] leading-normal text-pretty"
                      style={{ color: c("sand-600") }}
                    >
                      {t.email.sub}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="grid grid-cols-2 gap-2.5">
                      {(
                        [
                          ["google", t.email.google],
                          ["apple", t.email.apple],
                        ] as const
                      ).map(([provider, label]) => (
                        <button
                          key={provider}
                          type="button"
                          className="yc-su-oauth"
                          disabled={oauthBusy !== null}
                          aria-busy={oauthBusy === provider}
                          onClick={() => void startOAuth(provider)}
                        >
                          <ProviderMark provider={provider} />
                          {oauthBusy === provider ? t.email.busy : label}
                        </button>
                      ))}
                    </div>
                    {oauthErr && (
                      <p
                        className="m-0 text-[14px] font-medium"
                        style={{ color: c("red-600") }}
                        role="alert"
                      >
                        {oauthErr}
                      </p>
                    )}
                  </div>
                  <div
                    className="flex items-center gap-3.5 text-[12px] uppercase"
                    style={{ color: c("sand-400"), fontFamily: MONO, letterSpacing: ".08em" }}
                  >
                    <span className="h-px flex-1" style={{ background: c("sand-200") }} />
                    {t.email.or}
                    <span className="h-px flex-1" style={{ background: c("sand-200") }} />
                  </div>
                  <form onSubmit={submitEmail} noValidate className="m-0 flex flex-col gap-3">
                    <div ref={emailWrap} className="flex flex-col gap-2">
                      <label htmlFor="y-email" className="text-[14px] font-semibold">
                        {t.email.label}
                      </label>
                      <input
                        id="y-email"
                        ref={emailRef}
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailErr("");
                          setExists(false);
                        }}
                        placeholder={t.email.placeholder}
                        className="yc-su-input"
                        style={{
                          borderColor: emailErr ? c("red-500") : undefined,
                          boxShadow: emailErr ? `0 0 0 3px ${c("red-100")}` : undefined,
                        }}
                      />
                      {emailErr && (
                        <span className="text-[14px] font-medium" style={{ color: c("red-600") }}>
                          {emailErr}
                        </span>
                      )}
                      {exists && !emailErr && (
                        <span className="text-[14px] font-medium" style={{ color: c("red-600") }}>
                          {t.email.exists}{" "}
                          <a
                            href={`${YUNO_APP_ORIGIN}/auth?redirect=${encodeURIComponent("/open/crm")}`}
                            className="yc-su-link font-semibold underline"
                          >
                            {t.email.existsCta}
                          </a>
                        </span>
                      )}
                      {suggestion && !emailErr && (
                        <span className="text-[14px]" style={{ color: c("sand-600") }}>
                          {t.email.didYouMean}{" "}
                          <button
                            type="button"
                            onClick={() => {
                              setEmail(suggestion);
                              emailRef.current?.focus();
                            }}
                            className="yc-su-link cursor-pointer border-0 bg-transparent p-0 font-semibold underline underline-offset-[3px]"
                          >
                            {suggestion}
                          </button>{" "}
                          ?
                        </span>
                      )}
                    </div>
                    <Cta type="submit">{t.email.cta}</Cta>
                    <p
                      className="m-0 text-center text-[13px] leading-normal"
                      style={{ color: c("sand-500") }}
                    >
                      {t.email.termsPre}{" "}
                      <a
                        href={landingHref(lang === "fr" ? "/fr/terms" : "/terms")}
                        className="yc-su-link"
                      >
                        {t.email.cgu}
                      </a>{" "}
                      {t.email.termsMid}{" "}
                      <a
                        href={landingHref(lang === "fr" ? "/fr/privacy" : "/privacy")}
                        className="yc-su-link"
                      >
                        {t.email.privacy}
                      </a>
                      {t.email.termsPost}
                    </p>
                  </form>
                  <div
                    className="flex flex-wrap justify-center gap-x-[18px] gap-y-2 text-[13px]"
                    style={{ color: c("sand-600") }}
                  >
                    {t.email.trust.map((x) => (
                      <span key={x} className="flex items-center gap-1.5">
                        <Tick size={14} color={c("green-500")} />
                        {x}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {step === "password" && (
                <form onSubmit={submitPw} noValidate className="m-0 flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Title>
                      {t.password.titlePre} <Accent>{t.password.accent}</Accent>
                      {t.password.titlePost}
                    </Title>
                    <p
                      className="m-0 text-base leading-normal [overflow-wrap:anywhere]"
                      style={{ color: c("sand-600") }}
                    >
                      {t.password.sub}{" "}
                      <strong className="font-semibold" style={{ color: c("ink") }}>
                        {email}
                      </strong>
                      .
                    </p>
                  </div>
                  <input type="email" autoComplete="username" value={email} readOnly hidden />
                  <PasswordBlock
                    t={t}
                    wrapRef={pwWrap}
                    inputRef={pwRef}
                    pw={pw}
                    show={pwShow}
                    err={pwErr}
                    onChange={(v) => {
                      setPw(v);
                      setPwErr(false);
                    }}
                    onToggle={() => {
                      setPwShow((s) => !s);
                      pwRef.current?.focus();
                    }}
                  />
                  <Cta type="submit">{t.email.cta}</Cta>
                </form>
              )}

              {step === "type" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Title>
                      {t.type.titlePre} <Accent>{t.type.accent}</Accent>
                      {t.type.titlePost}
                    </Title>
                    <p className="m-0 text-base leading-normal" style={{ color: c("sand-600") }}>
                      {t.type.sub}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {t.type.items.map((it, i) => {
                      const on = type === it.id;
                      return (
                        <button
                          key={it.id}
                          type="button"
                          onClick={() => pickType(it.id as TypeId)}
                          className="yc-su-choice grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3.5 rounded-2xl border-[1.5px] py-4 pl-3.5 pr-4 text-left"
                          style={{
                            borderColor: on ? c("red-500") : c("sand-200"),
                            background: on ? c("red-50") : "#fff",
                            color: c("ink"),
                          }}
                        >
                          <span
                            className="flex size-7 items-center justify-center rounded-lg border bg-white text-[12px]"
                            style={{
                              borderColor: c("sand-200"),
                              fontFamily: MONO,
                              color: c("sand-500"),
                            }}
                          >
                            {i + 1}
                          </span>
                          <span className="flex min-w-0 flex-col gap-0.5">
                            <span className="text-base font-semibold">{it.label}</span>
                            <span className="text-[14px]" style={{ color: c("sand-600") }}>
                              {it.sub}
                            </span>
                          </span>
                          <Radio on={on} size={24} />
                        </button>
                      );
                    })}
                  </div>
                  {type && (
                    <button
                      type="button"
                      onClick={() => go("name")}
                      className="yc-su-dark h-14 cursor-pointer rounded-full border-0 text-base font-semibold text-white"
                      style={{ background: c("ink") }}
                    >
                      {t.type.cta}
                    </button>
                  )}
                </div>
              )}

              {step === "name" && (
                <form onSubmit={submitName} noValidate className="m-0 flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Title>
                      {t.name.titlePre}{" "}
                      <Accent>{typeItem?.noun ?? t.name.fallbackName.toLowerCase()}</Accent>
                      {t.name.titlePost}
                    </Title>
                    <p className="m-0 text-base leading-normal" style={{ color: c("sand-600") }}>
                      {t.name.sub}
                    </p>
                  </div>
                  <div ref={nameWrap} className="flex flex-col gap-2">
                    <label htmlFor="y-name" className="text-[14px] font-semibold">
                      {t.name.label}
                    </label>
                    <input
                      id="y-name"
                      ref={nameRef}
                      autoComplete="organization"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setNameErr(false);
                      }}
                      placeholder={typeItem?.ph ?? "Le Sonar"}
                      className="yc-su-input"
                      style={{ borderColor: nameErr ? c("red-500") : undefined }}
                    />
                    {nameErr && (
                      <span className="text-[14px] font-medium" style={{ color: c("red-600") }}>
                        {t.name.nameErr}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="y-city" className="text-[14px] font-semibold">
                      {t.name.cityLabel}{" "}
                      <span className="font-normal" style={{ color: c("sand-500") }}>
                        · {t.name.optional}
                      </span>
                    </label>
                    <input
                      id="y-city"
                      autoComplete="address-level2"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={t.name.cityPh}
                      className="yc-su-input"
                    />
                    <div className="mt-0.5 flex flex-wrap gap-1.5">
                      {t.name.cities.map((ct) => {
                        const on = city.trim().toLowerCase() === ct.toLowerCase();
                        return (
                          <button
                            key={ct}
                            type="button"
                            onClick={() => setCity(on ? "" : ct)}
                            className="yc-su-chip h-8 cursor-pointer rounded-full border px-3.5 text-[13px] font-medium"
                            style={{
                              borderColor: on ? c("ink") : c("sand-200"),
                              background: on ? c("ink") : "#fff",
                              color: on ? "#fff" : c("sand-700"),
                            }}
                          >
                            {ct}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <Cta type="submit">{t.name.cta}</Cta>
                </form>
              )}

              {step === "cap" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Title>
                      {t.cap.titlePre} <Accent>{t.cap.accent}</Accent>
                      {t.cap.titlePost}
                    </Title>
                    <p className="m-0 text-base leading-normal" style={{ color: c("sand-600") }}>
                      {t.cap.sub}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {t.cap.items.map((it) => {
                      const on = cap === it.id;
                      return (
                        <button
                          key={it.id}
                          type="button"
                          onClick={() => setCap(it.id)}
                          className="yc-su-choice relative flex cursor-pointer flex-col items-start gap-1 rounded-2xl border-[1.5px] px-[18px] py-5 text-left"
                          style={{
                            borderColor: on ? c("red-500") : c("sand-200"),
                            background: on ? c("red-50") : "#fff",
                            color: c("ink"),
                          }}
                        >
                          <span
                            style={{
                              fontFamily: DISPLAY,
                              fontWeight: 600,
                              fontSize: 28,
                              letterSpacing: "-.03em",
                              lineHeight: 1,
                            }}
                          >
                            {it.big}
                          </span>
                          <span className="text-[14px]" style={{ color: c("sand-600") }}>
                            {t.cap.people}
                          </span>
                          <span className="absolute right-3 top-3">
                            <Radio on={on} size={22} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {submitError && (
                    <p
                      className="m-0 text-[14px] font-medium"
                      style={{ color: c("red-600") }}
                      role="alert"
                    >
                      {submitError}
                    </p>
                  )}
                  <div className="flex flex-col items-center gap-3">
                    <Cta
                      type="button"
                      onClick={() => void createAccount(true)}
                      disabled={busy || !cap}
                    >
                      {busy ? t.cap.busy : t.cap.cta}
                    </Cta>
                    <button
                      type="button"
                      onClick={() => void createAccount(false)}
                      disabled={busy}
                      className="yc-su-back cursor-pointer border-0 bg-transparent p-1.5 text-[14px] font-medium"
                    >
                      {t.cap.skip}
                    </button>
                  </div>
                </div>
              )}

              {step === "existing" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Title>{withCrm && !target ? t.existing.hasCrmTitle : t.existing.title}</Title>
                    <p
                      className="m-0 text-base leading-normal text-pretty"
                      style={{ color: c("sand-600") }}
                    >
                      {withCrm && !target
                        ? fill(t.existing.hasCrmBody, { name: withCrm.name })
                        : fill(t.existing.body, { name: target?.name ?? "" })}
                    </p>
                  </div>
                  {candidates.length > 1 && (
                    <div className="flex flex-col gap-2" role="radiogroup">
                      {candidates.map((a, i) => {
                        const on = i === pickedAccount;
                        return (
                          <button
                            key={`${a.kind}-${a.venue_id ?? a.organizer_user_id}`}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            onClick={() => setPickedAccount(i)}
                            className="yc-su-oauth justify-start px-4 text-left"
                            style={{ borderColor: on ? c("red-500") : undefined }}
                          >
                            {a.name}
                            {a.city ? (
                              <span style={{ color: c("sand-500"), fontWeight: 400 }}>
                                {" "}
                                · {a.city}
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {target && (
                    <ul className="m-0 flex list-none flex-col gap-2 p-0">
                      {t.existing.facts.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-[15px]">
                          <span style={{ color: c("red-500"), fontWeight: 700 }}>✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  {submitError && (
                    <p
                      className="m-0 text-[14px] font-medium"
                      style={{ color: c("red-600") }}
                      role="alert"
                    >
                      {submitError}
                    </p>
                  )}
                  <div className="flex flex-col items-center gap-3">
                    <Cta type="button" onClick={() => void openOnExisting()} disabled={busy}>
                      {busy
                        ? t.cap.busy
                        : target
                          ? fill(t.existing.cta, { name: target.name })
                          : t.existing.hasCrmCta}
                    </Cta>
                    <button
                      type="button"
                      onClick={() => void switchAddress()}
                      disabled={busy}
                      className="yc-su-back cursor-pointer border-0 bg-transparent p-1.5 text-[14px] font-medium"
                    >
                      {t.existing.other}
                    </button>
                  </div>
                </div>
              )}

              {step === "confirm" && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Title>
                      {t.confirm.titlePre} <Accent>{t.confirm.accent}</Accent>
                      {t.confirm.titlePost}
                    </Title>
                    <p
                      className="m-0 text-base leading-normal [overflow-wrap:anywhere]"
                      style={{ color: c("sand-600") }}
                    >
                      {t.confirm.sentTo}{" "}
                      <strong className="font-semibold" style={{ color: c("ink") }}>
                        {email}
                      </strong>
                      . {t.confirm.hint}
                    </p>
                  </div>
                  <div
                    className="min-h-5 text-[14px] font-medium"
                    style={{ color: c("sand-600") }}
                    aria-live="polite"
                  >
                    {resendNote}
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-5 gap-y-2 text-[14px]">
                    <button
                      type="button"
                      onClick={() => void resendCode()}
                      className="border-0 bg-transparent p-0 font-semibold"
                      style={{
                        cursor: resend > 0 ? "default" : "pointer",
                        color: resend > 0 ? c("sand-400") : c("red-600"),
                      }}
                    >
                      {resend > 0
                        ? fill(t.confirm.resendIn, { t: `0:${String(resend).padStart(2, "0")}` })
                        : t.confirm.resend}
                    </button>
                    <button
                      type="button"
                      onClick={back}
                      className="yc-su-back cursor-pointer border-0 bg-transparent p-0 font-medium"
                    >
                      {t.confirm.edit}
                    </button>
                  </div>
                </div>
              )}

              {done && (
                <div className="flex flex-col gap-6">
                  <div
                    className="flex size-16 items-center justify-center rounded-full"
                    style={{
                      background: c("green-500"),
                      boxShadow: "0 10px 30px rgba(23,163,74,.35)",
                    }}
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Title size="lg">
                      {t.done.titlePre} <Accent>{t.done.accent}</Accent>
                      {t.done.titlePost}
                    </Title>
                    <p
                      className="m-0 text-[17px] leading-normal text-pretty"
                      style={{ color: c("sand-600") }}
                    >
                      {fill(t.done.line, { name: name.trim() || t.name.fallbackName })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <Cta type="button" onClick={openConsole} disabled={leaving || !handoff}>
                      {leaving ? t.done.opening : t.done.primary}
                    </Cta>
                    <button
                      type="button"
                      onClick={openConsole}
                      disabled={leaving || !handoff}
                      className="yc-su-ghost flex h-[52px] cursor-pointer items-center justify-center rounded-full border-[1.5px] text-[15px] font-semibold"
                      style={{ borderColor: c("sand-200"), color: c("ink"), background: "#fff" }}
                    >
                      {t.done.secondary}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer
          className="flex flex-wrap justify-between gap-x-5 gap-y-2 text-[13px]"
          style={{ color: c("sand-500") }}
        >
          <span>{t.footerHosted}</span>
          <span>
            {t.footerHelp}{" "}
            <a href={`mailto:${contactEmail}`} className="yc-su-link">
              {t.footerWrite}
            </a>
          </span>
        </footer>
      </main>

      <aside className="hidden min-h-screen min-w-0 flex-1 basis-[460px] p-4 lg:flex" aria-hidden>
        <div
          className="relative flex flex-1 flex-col gap-5 overflow-hidden rounded-[28px] px-[clamp(20px,3.5vw,44px)] py-7"
          style={{ minHeight: 600, backgroundColor: c("sand-50"), backgroundImage: "var(--noise)" }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-[40%] size-[560px] rounded-full"
            style={{
              margin: "-280px 0 0 -280px",
              background:
                "radial-gradient(closest-side,rgba(227,20,27,.14),rgba(255,107,53,.07) 55%,transparent)",
              transform: ORB[step],
              transition: "transform 1400ms cubic-bezier(.22,1,.36,1)",
            }}
          />
          <div className="relative flex items-center justify-between gap-3">
            <span
              className="text-[12px] uppercase"
              style={{ fontFamily: MONO, letterSpacing: ".08em", color: c("sand-500") }}
            >
              {step === "confirm" ? t.confirm.kicker : done ? t.done.kicker : scene?.k}
            </span>
          </div>
          <div className="relative flex min-h-[260px] flex-1 items-center justify-center">
            <div key={step} className="yc-su-scene flex w-full items-center justify-center">
              <Scene
                step={step === "existing" ? "email" : step}
                t={t}
                email={email}
                pw={pw}
                typeItem={typeItem}
                type={type}
                capItem={capItem}
                capN={capN}
                initials={initials}
                displayName={displayName}
                metaLine={metaLine}
                statP={statP}
                num={num}
                tickets={tickets}
                reg={reg}
                first={first}
                nameClean={name.trim()}
                money={MONEY[type ?? "club"]}
              />
            </div>
          </div>
          <p
            className="relative m-0 text-center text-[14px] leading-normal"
            style={{ color: c("sand-600") }}
          >
            {step === "confirm" ? t.confirm.caption : done ? t.done.caption : scene?.c}
          </p>
        </div>
      </aside>
    </div>
  );
}

const ORB: Record<Step, string> = {
  email: "translate(-90px,-130px)",
  password: "translate(120px,-110px)",
  type: "translate(130px,-60px)",
  name: "translate(-70px,90px)",
  cap: "translate(110px,130px)",
  confirm: "translate(-130px,30px)",
  existing: "translate(-90px,-130px)",
  done: "translate(0,0) scale(1.25)",
};

// ---- small pieces ----------------------------------------------------------------

function Title({ children, size = "md" }: { children: ReactNode; size?: "md" | "lg" }) {
  return (
    <h1
      className="m-0 text-balance"
      style={{
        fontFamily: DISPLAY,
        fontWeight: 600,
        fontSize: size === "lg" ? "clamp(34px,4.4vw,46px)" : "clamp(32px,4vw,42px)",
        lineHeight: size === "lg" ? 1.02 : 1.04,
        letterSpacing: "-.035em",
      }}
    >
      {children}
    </h1>
  );
}

function Accent({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        background: "var(--gradient-brand)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}

function Cta({
  children,
  type,
  onClick,
  disabled,
}: {
  children: ReactNode;
  type: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="yc-su-cta">
      <span>{children}</span>
      <span
        className="flex size-9 items-center justify-center rounded-full"
        style={{ background: "rgba(255,255,255,.22)" }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </button>
  );
}

function Tick({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

function Radio({ on, size }: { on: boolean; size: number }) {
  return (
    <span
      className="flex items-center justify-center rounded-full border-[1.5px]"
      style={{
        width: size,
        height: size,
        borderColor: on ? c("red-500") : c("sand-300"),
        background: on ? c("red-500") : "#fff",
        transition: "all 200ms",
      }}
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: `scale(${on ? 1 : 0})`,
          transition: "transform 360ms cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        <path d="M5 12l5 5L20 7" />
      </svg>
    </span>
  );
}

function strength(pw: string) {
  const ck = pwChecks(pw);
  const n = ck.filter(Boolean).length;
  const sc = pw ? n + (n === 3 && pw.length >= 12 ? 1 : 0) : 0;
  const bar = sc <= 1 ? c("red-500") : sc === 2 ? c("amber-500") : c("green-500");
  const lvl = [c("sand-500"), c("red-600"), c("amber-700"), c("green-700"), c("green-700")][sc];
  return { ck, sc, bar, lvl };
}

function PasswordBlock({
  t,
  wrapRef,
  inputRef,
  pw,
  show,
  err,
  onChange,
  onToggle,
}: {
  t: CrmSignupCopy;
  wrapRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  pw: string;
  show: boolean;
  err: boolean;
  onChange: (v: string) => void;
  onToggle: () => void;
}) {
  const { ck, sc, bar, lvl } = strength(pw);
  return (
    <div ref={wrapRef} className="flex flex-col gap-2.5">
      <label htmlFor="y-pw" className="text-[14px] font-semibold">
        {t.password.label}
      </label>
      <div className="relative">
        <input
          id="y-pw"
          ref={inputRef}
          type={show ? "text" : "password"}
          autoComplete="new-password"
          value={pw}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.password.placeholder}
          className="yc-su-input w-full pr-24"
          style={{ borderColor: err ? c("red-500") : undefined }}
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={show ? t.password.hideAria : t.password.showAria}
          className="yc-su-toggle absolute right-1.5 top-[7px] h-10 cursor-pointer rounded-[9px] border-0 bg-transparent px-3 text-[14px] font-semibold"
        >
          {show ? t.password.hide : t.password.show}
        </button>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="grid flex-1 grid-cols-4 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-1 rounded-sm"
              style={{ background: i < sc ? bar : c("sand-100"), transition: "background 260ms" }}
            />
          ))}
        </div>
        <span className="min-w-[68px] text-right text-[13px] font-semibold" style={{ color: lvl }}>
          {t.password.levels[sc]}
        </span>
      </div>
      <div className="mt-0.5 flex flex-col gap-1.5">
        {t.password.rules.map((label, i) => (
          <span
            key={label}
            className="flex items-center gap-2 text-[14px]"
            style={{ color: ck[i] ? c("ink") : c("sand-600"), transition: "color 200ms" }}
          >
            <Radio on={ck[i]} size={18} />
            {label}
          </span>
        ))}
      </div>
      {err && (
        <span className="text-[14px] font-medium" style={{ color: c("red-600") }}>
          {t.password.err}
        </span>
      )}
    </div>
  );
}

// ---- the side preview ---------------------------------------------------------------

function Scene(p: {
  step: Step;
  t: CrmSignupCopy;
  email: string;
  pw: string;
  type: TypeId | null;
  typeItem: CrmSignupCopy["type"]["items"][number] | undefined;
  capItem: CrmSignupCopy["cap"]["items"][number] | undefined;
  capN: number;
  initials: string;
  displayName: string;
  metaLine: string;
  statP: number;
  num: (n: number) => string;
  tickets: number;
  reg: number;
  first: string;
  nameClean: string;
  money: number;
}) {
  const { step, t, num } = p;
  const card = { background: "#fff", boxShadow: "var(--shadow-md)" } as const;

  if (step === "email")
    return (
      <div className="flex flex-col items-center gap-6">
        <img
          src={appIcon}
          alt=""
          width={120}
          height={120}
          className="block size-[120px] rounded-[30px]"
          style={{ boxShadow: "0 24px 60px -12px rgba(227,20,27,.45)" }}
        />
        <div className="flex flex-wrap justify-center gap-2">
          {t.chips.map((x) => (
            <span
              key={x}
              className="flex h-[34px] items-center rounded-full border bg-white px-4 text-[14px] font-medium"
              style={{ borderColor: c("sand-200") }}
            >
              {x}
            </span>
          ))}
        </div>
      </div>
    );

  if (step === "password") {
    const { sc, bar } = strength(p.pw);
    return (
      <div className="flex w-full max-w-[360px] flex-col gap-4 rounded-[20px] p-5" style={card}>
        <div className="flex items-center gap-3">
          <img
            src={appIcon}
            alt=""
            width={40}
            height={40}
            className="size-10 flex-none rounded-[10px]"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-[15px] font-semibold">{t.account}</span>
            <span className="truncate text-[13px]" style={{ color: c("sand-600") }}>
              {p.email}
            </span>
          </div>
        </div>
        <div
          className="flex h-12 items-center overflow-hidden whitespace-nowrap rounded-xl px-3.5 text-[20px]"
          style={{ background: c("sand-50"), letterSpacing: ".18em" }}
        >
          {p.pw ? "•".repeat(Math.min(p.pw.length, 18)) : "—"}
        </div>
        <div className="grid grid-cols-4 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-1.5 rounded-sm"
              style={{ background: i < sc ? bar : c("sand-100"), transition: "background 260ms" }}
            />
          ))}
        </div>
        <span
          className="text-[11px] uppercase"
          style={{ fontFamily: MONO, letterSpacing: ".08em", color: c("sand-500") }}
        >
          {t.secure}
        </span>
      </div>
    );
  }

  if (step === "type")
    return (
      <div className="flex flex-col items-center gap-3.5 text-center">
        <div
          style={{
            fontFamily: DISPLAY,
            fontWeight: 600,
            lineHeight: 1,
            fontSize: "clamp(56px,7vw,92px)",
            letterSpacing: "-.045em",
            color: p.typeItem ? c("ink") : c("sand-300"),
            transition: "color 300ms",
          }}
        >
          {p.typeItem?.short ?? t.type.previewEmpty}
        </div>
        <div className="max-w-[300px] text-base leading-normal" style={{ color: c("sand-600") }}>
          {p.typeItem?.sub ?? t.type.previewSub}
        </div>
      </div>
    );

  if (step === "name") {
    const N = 1240;
    const funnel = [100, 61, 37, 34].map((v, i) => ({
      label: t.name.funnel[i],
      pct: Math.round(v * p.statP),
      n: num(((N * v) / 100) * p.statP),
    }));
    const stats = [
      { pre: "+", val: String(Math.round(23 * p.statP)), unit: "%", label: t.name.stats[0] },
      { pre: "+", val: num(p.money * p.statP), unit: "€", label: t.name.stats[1] },
      { pre: "", val: String(Math.round(37 * p.statP)), unit: "%", label: t.name.stats[2] },
    ];
    return (
      <div className="flex w-full max-w-[420px] flex-col items-center gap-7 text-center">
        <div className="flex w-full min-w-0 flex-col items-center gap-[18px]">
          <div
            className="flex size-24 items-center justify-center rounded-[28px] text-[36px] text-white"
            style={{
              background: p.typeItem || p.nameClean ? "var(--gradient-brand)" : c("sand-300"),
              fontFamily: DISPLAY,
              fontWeight: 700,
              letterSpacing: "-.03em",
              boxShadow: "0 24px 50px -16px rgba(227,20,27,.45)",
              transition: "background 400ms",
            }}
          >
            {p.initials}
          </div>
          <div className="flex w-full min-w-0 flex-col gap-2">
            <div
              className="text-balance [overflow-wrap:anywhere]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 600,
                fontSize: "clamp(36px,4.6vw,54px)",
                letterSpacing: "-.045em",
                lineHeight: 1,
                color: p.nameClean ? c("ink") : c("sand-300"),
                transition: "color 200ms",
              }}
            >
              {p.displayName}
            </div>
            <div
              className="text-[12px] uppercase"
              style={{ fontFamily: MONO, letterSpacing: ".08em", color: c("sand-500") }}
            >
              {p.metaLine}
            </div>
          </div>
        </div>
        <div
          className="flex w-full flex-col gap-3 rounded-[20px] p-4 pb-3.5 text-left"
          style={card}
        >
          <div className="flex items-baseline justify-between gap-2.5">
            <span className="min-w-0 truncate text-[14px] font-semibold">
              {t.name.campaign} · {p.displayName}
            </span>
            <span
              className="flex-none text-[10.5px] uppercase"
              style={{ fontFamily: MONO, letterSpacing: ".08em", color: c("sand-500") }}
            >
              {t.name.example}
            </span>
          </div>
          <div
            className="relative h-28"
            style={{ clipPath: `inset(0 ${100 - p.statP * 100}% 0 0)` }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "var(--gradient-brand)",
                clipPath:
                  "polygon(0 0,18% 0,32% 19%,43% 19%,57% 31%,68% 31%,82% 33%,100% 33%,100% 67%,82% 67%,68% 69%,57% 69%,43% 81%,32% 81%,18% 100%,0 100%)",
              }}
            />
            <div className="absolute inset-0 grid grid-cols-4">
              {funnel.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center justify-center whitespace-nowrap text-white"
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 600,
                    fontSize: "clamp(15px,1.6vw,19px)",
                    letterSpacing: "-.03em",
                  }}
                >
                  {f.pct} %
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4">
            {funnel.map((f) => (
              <div key={f.label} className="flex min-w-0 flex-col items-center gap-0.5 text-center">
                <span className="text-[13px] font-semibold">{f.n}</span>
                <span className="whitespace-nowrap text-[11.5px]" style={{ color: c("sand-600") }}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 pt-1">
          <div className="grid grid-cols-3 gap-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex min-w-0 flex-col items-start gap-1.5 rounded-2xl border px-3 py-3.5 text-left"
                style={{ background: "rgba(255,255,255,.7)", borderColor: c("sand-100") }}
              >
                <span
                  className="flex items-baseline gap-px whitespace-nowrap"
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 600,
                    fontSize: "clamp(22px,2.2vw,28px)",
                    letterSpacing: "-.04em",
                    lineHeight: 1,
                  }}
                >
                  <Accent>{s.pre}</Accent>
                  {s.val}
                  <span className="ml-0.5 text-[.6em]">{s.unit}</span>
                </span>
                <span
                  className="text-pretty text-[12.5px] leading-snug"
                  style={{ color: c("sand-600") }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === "cap") {
    const lit = Math.round(20 * Math.sqrt(p.capN / 2000));
    return (
      <div className="flex w-full max-w-[360px] flex-col items-center gap-[18px]">
        <div className="flex flex-col items-center gap-1.5">
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 600,
              lineHeight: 1,
              fontSize: "clamp(64px,8vw,100px)",
              letterSpacing: "-.045em",
              color: p.capItem ? c("ink") : c("sand-300"),
              transition: "color 300ms",
            }}
          >
            {p.capItem ? num(p.capN) : "—"}
          </div>
          <div className="text-base" style={{ color: c("sand-600") }}>
            {t.cap.perNight}
          </div>
        </div>
        <div className="grid w-full grid-cols-[repeat(20,minmax(0,1fr))] gap-1">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="h-[30px] rounded"
              style={{
                background: i < lit ? c("red-500") : c("sand-200"),
                transition: "background 260ms cubic-bezier(.16,1,.3,1)",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (step === "confirm")
    return (
      <div
        className="flex w-full max-w-[360px] items-center gap-3 rounded-[20px] px-4 py-3.5"
        style={card}
      >
        <img
          src={appIcon}
          alt=""
          width={40}
          height={40}
          className="size-10 flex-none rounded-[10px]"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-px leading-snug">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[14px] font-semibold">{t.confirm.notifTitle}</span>
            <span className="text-[12px]" style={{ color: c("sand-500") }}>
              {t.confirm.notifNow}
            </span>
          </div>
          <span className="text-[14px] font-semibold">{t.confirm.notifLine}</span>
          <span className="text-[13px]" style={{ color: c("sand-600") }}>
            {t.confirm.notifNote}
          </span>
        </div>
      </div>
    );

  // done
  const nClients = p.tickets * 1.66;
  const segB = 29;
  const segC = 100 - p.reg - segB - 17;
  const segs = [
    { v: p.reg, bg: c("ink") },
    { v: segB, bg: c("red-500") },
    { v: segC, bg: c("tangerine-400") },
    { v: 17, bg: c("sand-300") },
  ];
  const tagStyle = [
    { bg: c("sand-100"), fg: c("ink") },
    { bg: c("red-50"), fg: c("red-600") },
    { bg: c("amber-50"), fg: c("amber-700") },
  ];
  return (
    <div
      className="flex w-full max-w-[540px] flex-col gap-4 rounded-3xl border p-5"
      style={{ ...card, borderColor: c("sand-100") }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex size-10 flex-none items-center justify-center rounded-xl text-[15px] text-white"
          style={{ background: "var(--gradient-brand)", fontFamily: DISPLAY, fontWeight: 700 }}
        >
          {p.initials}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span
            className="truncate"
            style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 17, letterSpacing: "-.02em" }}
          >
            {p.displayName} · {t.done.clients}
          </span>
          <span className="truncate text-[13px]" style={{ color: c("sand-600") }}>
            {p.metaLine}
          </span>
        </div>
        <span
          className="flex h-6 flex-none items-center rounded-full px-2.5 text-[10.5px] uppercase"
          style={{
            background: c("sand-50"),
            color: c("sand-500"),
            fontFamily: MONO,
            letterSpacing: ".08em",
          }}
        >
          {t.done.after}
        </span>
      </div>
      <div
        style={{
          fontFamily: DISPLAY,
          fontWeight: 600,
          fontSize: "clamp(20px,2.2vw,25px)",
          letterSpacing: "-.03em",
          lineHeight: 1.15,
        }}
        className="text-balance"
      >
        {p.first ? fill(t.done.crmTitleNamed, { first: p.first }) : t.done.crmTitle}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          {
            l: t.done.file,
            v: num(nClients),
            s: `▲ ${num(p.tickets * 0.38)} ${t.done.thisMonth}`,
            g: true,
          },
          { l: t.done.returning, v: `${Math.round(28 + p.reg * 0.5)} %`, s: t.done.afterFirst },
          { l: t.done.reachable, v: "82 %", s: t.done.reachableBy },
        ].map((k) => (
          <div
            key={k.l}
            className="flex min-w-0 flex-col gap-1.5 rounded-[14px] p-3"
            style={{ background: c("sand-50") }}
          >
            <span
              className="truncate text-[11px] uppercase"
              style={{ fontFamily: MONO, letterSpacing: ".08em", color: c("sand-500") }}
            >
              {k.l}
            </span>
            <span
              style={{
                fontFamily: DISPLAY,
                fontWeight: 600,
                letterSpacing: "-.03em",
                lineHeight: 1,
                fontSize: 24,
              }}
            >
              {k.v}
            </span>
            <span
              className="whitespace-nowrap text-[12px]"
              style={{ color: k.g ? c("green-700") : c("sand-600"), fontWeight: k.g ? 500 : 400 }}
            >
              {k.s}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-md">
          {segs.map((s, i) => (
            <div key={i} style={{ width: `${s.v}%`, background: s.bg }} />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-3.5 gap-y-1">
          {segs.map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 text-[12px]"
              style={{ color: c("sand-600") }}
            >
              <span className="size-2 rounded-sm" style={{ background: s.bg }} />
              {t.done.seg[i]}{" "}
              <span className="font-semibold" style={{ color: c("ink") }}>
                {s.v}%
              </span>
            </span>
          ))}
        </div>
      </div>
      <div
        className="flex flex-wrap items-center gap-3 rounded-2xl p-3.5"
        style={{ background: c("red-50") }}
      >
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-0.5">
          <span className="text-[14px] font-semibold">
            {fill(t.done.relaunch, { n: num(nClients * 0.17) })}
          </span>
          <span className="text-[13px]" style={{ color: c("sand-600") }}>
            {t.done.relaunchSub}
          </span>
        </div>
        <span
          className="flex h-9 flex-none items-center rounded-full px-4 text-[13px] font-semibold text-white"
          style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-cta)" }}
        >
          {t.done.prepare}
        </span>
      </div>
      <div className="flex flex-col">
        {t.done.people.map((pe, i) => (
          <div
            key={pe.name}
            className="flex items-center gap-3 border-t py-2.5"
            style={{ borderColor: c("sand-100") }}
          >
            <div
              className="flex size-8 flex-none items-center justify-center rounded-full text-[12px] font-semibold"
              style={{ background: c("sand-100"), color: c("sand-700") }}
            >
              {pe.ini}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-px">
              <span className="text-[14px] font-semibold">{pe.name}</span>
              <span className="truncate text-[12px]" style={{ color: c("sand-600") }}>
                {pe.meta}
              </span>
            </div>
            <span
              className="flex h-6 flex-none items-center rounded-full px-2.5 text-[12px] font-semibold"
              style={{ background: tagStyle[i].bg, color: tagStyle[i].fg }}
            >
              {pe.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
