// Yuno CRM — first-party measurement of the CRM page and its signup funnel
// (crm.yunoapp.eu), read by the Yuno CRM super admin (Admin › Acquisition).
//
// Same promise as the rest of the landing: NO cookie, NO localStorage, nothing
// that identifies a person. Each event is a plain POST to the RPC
// `track_crm_landing_event` on the Yuno app's Supabase; the visitor is a hash
// salted DAILY on the server (IP + browser + a salt that changes every day), so
// nobody can be followed from one day to the next. A page view id lives in
// memory only, to count a section once per page view.
//
// Consent: an audience measurement this narrow is exempt from a banner, but a
// browser that says "do not track" (DNT or Global Privacy Control) is never
// measured. A measurement never breaks a page: every call is fire-and-forget.
//
// Events: visit (one per page view, with UTM / referrer), section_view (≥ 40 %
// visible, once per section per page view), click (`data-ph-cta`, FAQ questions,
// contact links), signup_start (the funnel opens).
import { isCrmHost } from "@/i18n/hosts";
import { landingLangFromPath, pageFromPath } from "./posthog";

const URL_ =
  (import.meta.env.VITE_YUNO_SUPABASE_URL as string | undefined) ||
  "https://fulawxvdlwtdlpkycixe.supabase.co";
const KEY =
  (import.meta.env.VITE_YUNO_SUPABASE_KEY as string | undefined) ||
  "sb_publishable_2rOH-YqTzz-YdIbQSrswpg_Os7DU-r1";

type Kind = "visit" | "section_view" | "click" | "signup_start";

function optedOut(): boolean {
  const n = navigator as Navigator & { globalPrivacyControl?: boolean; msDoNotTrack?: string };
  return n.globalPrivacyControl === true || n.doNotTrack === "1" || n.msDoNotTrack === "1";
}

/** The CRM page, and the signup funnel when it is the CRM one. */
export function isCrmMeasuredPath(pathname: string, search = ""): boolean {
  const page = pageFromPath(pathname);
  if (page === "/crm") return true;
  return (
    page === "/start" &&
    (isCrmHost(window.location.host) || /(?:^|[?&])product=crm(?:&|$)/.test(search))
  );
}

function newPv(): string {
  const b = new Uint8Array(12);
  crypto.getRandomValues(b);
  return Array.from(b, (x) => x.toString(36).padStart(2, "0"))
    .join("")
    .slice(0, 20);
}

let pv = "";

function send(
  kind: Kind,
  extra: {
    section?: string | null;
    target?: string | null;
    utm?: Record<string, string | null>;
    referrer?: string | null;
  } = {},
) {
  try {
    if (optedOut()) return;
    const path = window.location.pathname;
    const body = {
      p_kind: kind,
      p_page: pageFromPath(path),
      p_section: extra.section ?? null,
      p_target: extra.target ?? null,
      p_lang: landingLangFromPath(path),
      p_referrer_host: extra.referrer ?? null,
      p_utm_source: extra.utm?.utm_source ?? null,
      p_utm_medium: extra.utm?.utm_medium ?? null,
      p_utm_campaign: extra.utm?.utm_campaign ?? null,
      p_pv: pv || null,
    };
    void fetch(`${URL_}/rest/v1/rpc/track_crm_landing_event`, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json", apikey: KEY, Authorization: `Bearer ${KEY}` },
      body: JSON.stringify(body),
    }).catch(() => undefined);
  } catch {
    // A measurement never breaks a page.
  }
}

function referrerHost(): string | null {
  try {
    if (!document.referrer) return null;
    const h = new URL(document.referrer).hostname.toLowerCase();
    return h === window.location.hostname ? null : h;
  } catch {
    return null;
  }
}

/**
 * One page view of a measured page: the visit, then its sections. Call on each
 * route change (cleanup first). Returns its cleanup.
 */
export function measureCrmPage(pathname: string, search: string): () => void {
  if (typeof window === "undefined" || !isCrmMeasuredPath(pathname, search) || optedOut())
    return () => {};
  pv = newPv();
  const q = new URLSearchParams(search);
  const utm = {
    utm_source: q.get("utm_source"),
    utm_medium: q.get("utm_medium"),
    utm_campaign: q.get("utm_campaign"),
  };
  send("visit", { utm, referrer: referrerHost() });
  if (pageFromPath(pathname) === "/start") send("signup_start");

  if (typeof IntersectionObserver === "undefined") return () => {};
  const seen = new Set<string>();
  const observed = new WeakSet<Element>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        const s = el.dataset.phSection;
        if (!s || seen.has(s)) {
          io.unobserve(el);
          continue;
        }
        if (e.intersectionRatio >= 0.4 || e.intersectionRect.height >= window.innerHeight * 0.4) {
          seen.add(s);
          io.unobserve(el);
          send("section_view", { section: s });
        }
      }
    },
    { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
  );
  const scan = () =>
    document.querySelectorAll<HTMLElement>("[data-ph-section]").forEach((el) => {
      if (observed.has(el) || seen.has(el.dataset.phSection ?? "")) return;
      observed.add(el);
      io.observe(el);
    });
  scan();
  const mo = new MutationObserver(scan);
  mo.observe(document.body, { childList: true, subtree: true });

  // Clicks: CTAs, FAQ questions (by position), contact links.
  const onClick = (ev: MouseEvent) => {
    const t = ev.target;
    if (!(t instanceof Element)) return;
    const host = t.closest<HTMLElement>("[data-ph-section], [data-ph-area]");
    const section = host?.dataset.phSection ?? host?.dataset.phArea ?? null;
    const cta = t.closest<HTMLElement>("[data-ph-cta]")?.dataset.phCta;
    if (cta) {
      send("click", { section, target: `cta:${cta}` });
      return;
    }
    const q = t.closest<HTMLElement>("button[aria-expanded]");
    if (q && section === "faq") {
      const all = Array.from(
        document.querySelectorAll('[data-ph-section="faq"] button[aria-expanded]'),
      );
      if (q.getAttribute("aria-expanded") !== "true")
        send("click", { section, target: `faq:${all.indexOf(q) + 1}` });
      return;
    }
    const a = t.closest<HTMLAnchorElement>("a[href]");
    if (!a) return;
    const href = a.getAttribute("href") ?? "";
    if (href.startsWith("mailto:")) send("click", { section, target: "contact:email" });
    else if (/wa\.me|whatsapp\.com/.test(href))
      send("click", { section, target: "contact:whatsapp" });
    else if (/\/start(?:\?|$)/.test(href)) send("click", { section, target: "cta:start" });
  };
  document.addEventListener("click", onClick, true);

  return () => {
    mo.disconnect();
    io.disconnect();
    document.removeEventListener("click", onClick, true);
  };
}
