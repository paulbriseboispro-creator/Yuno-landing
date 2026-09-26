// DOM-level tracking for the landing: ONE delegated click listener and ONE
// section observer, installed from the root. Components never call PostHog for
// a click — they describe themselves with attributes, read here:
//
//  - `data-ph-cta="<id>"` (+ optional `data-ph-role`) on a CTA → landing_cta_clicked.
//  - `data-ph-lang="<en|fr|es>"` on a language link/button → landing_language_changed.
//  - `data-ph-section="<id>"` on a landing section → landing_section_viewed
//    (≥ 40 % visible, once per section per page view) and the `section` of any
//    click inside it. `data-ph-area="<id>"` names a click area (nav, footer…)
//    without being counted as a viewed section.
//  - Any `a[href]` is classified on its own: WhatsApp / mailto / tel / link to
//    the contact page → contact_clicked; a link leaving the landing →
//    outbound_clicked; a link to /start or the contact page is a CTA even
//    without `data-ph-cta`.
//
// Browser only (called from effects), no-op without a PostHog key.
import { capture, landingLangFromPath, pageFromPath, posthogEnabled } from "./posthog";

type Role = "club" | "organizer" | "promoter" | "other";
const ROLES = new Set<string>(["club", "organizer", "promoter", "other"]);
const LANGS = new Set<string>(["en", "fr", "es"]);

function sectionOf(el: Element): string | null {
  const host = el.closest<HTMLElement>("[data-ph-section], [data-ph-area]");
  return host?.dataset.phSection ?? host?.dataset.phArea ?? null;
}

function roleOf(el: HTMLElement | null): Role | null {
  const r = el?.dataset.phRole;
  return r && ROLES.has(r) ? (r as Role) : null;
}

function isContactPath(path: string): boolean {
  const p = pageFromPath(path);
  return p === "/contact";
}

function isStartPath(path: string): boolean {
  return pageFromPath(path) === "/start";
}

function outboundDestination(host: string): "yuno_app" | "app_store" | "instagram" | "other" {
  if (host === "yunoapp.eu" || host.endsWith(".yunoapp.eu")) return "yuno_app";
  if (host === "apps.apple.com" || host === "itunes.apple.com") return "app_store";
  if (host === "instagram.com" || host.endsWith(".instagram.com")) return "instagram";
  return "other";
}

function onClick(e: MouseEvent) {
  const target = e.target;
  if (!(target instanceof Element)) return;
  const path = window.location.pathname;
  const page = pageFromPath(path);
  const section = sectionOf(target);

  // Language switch (links of the landing, buttons of the EN/FR site switcher).
  const langEl = target.closest<HTMLElement>("[data-ph-lang]");
  if (langEl) {
    const to = langEl.dataset.phLang ?? "";
    const from = landingLangFromPath(path);
    if (LANGS.has(to) && to !== from) capture("landing_language_changed", { from, to }, true);
    return;
  }

  const ctaEl = target.closest<HTMLElement>("[data-ph-cta]");
  const link = target.closest<HTMLAnchorElement>("a[href]");
  let url: URL | null = null;
  if (link) {
    try {
      url = new URL(link.href, window.location.href);
    } catch {
      url = null;
    }
  }

  // CTA: explicit attribute first, then links that are CTAs by destination.
  let cta = ctaEl?.dataset.phCta ?? null;
  const internal = !!url && url.origin === window.location.origin;
  if (!cta && url && internal) {
    if (isStartPath(url.pathname)) cta = "start";
    else if (isContactPath(url.pathname)) cta = "contact";
  }
  if (cta) {
    capture("landing_cta_clicked", { cta, role: roleOf(ctaEl), section, page }, true);
  }

  if (!url) return;
  const proto = url.protocol;
  const host = url.hostname.toLowerCase();

  if (proto === "mailto:") {
    capture("contact_clicked", { channel: "email", section, page }, true);
    return;
  }
  if (proto === "tel:") {
    capture("contact_clicked", { channel: "phone", section, page }, true);
    return;
  }
  if (proto !== "http:" && proto !== "https:") return;

  if (host === "wa.me" || host === "whatsapp.com" || host.endsWith(".whatsapp.com")) {
    capture("contact_clicked", { channel: "whatsapp", section, page }, true);
    return;
  }
  if (internal) {
    if (isContactPath(url.pathname)) {
      capture("contact_clicked", { channel: "form", section, page }, true);
    }
    return;
  }
  // Leaving the landing. `instant`: a same-tab navigation would drop a batch.
  capture(
    "outbound_clicked",
    { destination: outboundDestination(host), host, section, page },
    true,
  );
}

/** Installs the delegated click listener. Returns its cleanup. */
export function installClickTracking(): () => void {
  if (!posthogEnabled()) return () => {};
  // Capture phase: runs before any handler that navigates or stops propagation.
  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}

const MIN_RATIO = 0.4;
const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

/**
 * Observes every `[data-ph-section]` of the current page and sends
 * landing_section_viewed once per section. Call again (after cleanup) on each
 * route change: that is what "per page view" means. A section taller than the
 * screen can never be 40 % visible, so 40 % of the viewport filled by it counts
 * too.
 */
export function trackSectionViews(pathname: string): () => void {
  if (!posthogEnabled() || typeof IntersectionObserver === "undefined") return () => {};
  const page = pageFromPath(pathname);
  const seen = new Set<string>();
  const observed = new WeakSet<Element>();

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const section = el.dataset.phSection;
        if (!section || seen.has(section)) {
          io.unobserve(el);
          continue;
        }
        const fillsScreen = entry.intersectionRect.height >= window.innerHeight * MIN_RATIO;
        if (entry.intersectionRatio >= MIN_RATIO || fillsScreen) {
          seen.add(section);
          io.unobserve(el);
          capture("landing_section_viewed", { section, page });
        }
      }
    },
    { threshold: THRESHOLDS },
  );

  const scan = () => {
    document.querySelectorAll<HTMLElement>("[data-ph-section]").forEach((el) => {
      if (observed.has(el) || seen.has(el.dataset.phSection ?? "")) return;
      observed.add(el);
      io.observe(el);
    });
  };
  scan();
  // Sections mounted after the first paint (lazy content, route transitions).
  const mo = new MutationObserver(scan);
  mo.observe(document.body, { childList: true, subtree: true });

  return () => {
    mo.disconnect();
    io.disconnect();
  };
}
