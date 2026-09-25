// PostHog on the landing — the SAME PostHog project as the Yuno app, so one
// funnel runs from the first landing visit to the pro's first night in the
// Console (the app identifies people with the same Supabase user id).
//
// Guarantees:
//  - No key, no effect: without VITE_POSTHOG_KEY (public `phc_…` project key,
//    set as a Cloudflare *Build* variable) nothing is loaded.
//  - Browser only: never runs during SSR; `posthog-js` is a dynamic import, so
//    it never weighs on the first paint.
//  - Cookieless: `persistence: 'memory'` stores NOTHING on the device (no
//    cookie, no localStorage). ePrivacy art. 5(3) is not engaged, which is why
//    the landing has no cookie banner. A visitor is one browsing session;
//    returning visitors are not recognised — the price of no banner.
//  - Never an email, phone or name in an event. Identity = the account id
//    created at signup, nothing else.
//  - Every event carries `site: 'landing'`, `surface: 'landing'`,
//    `platform: 'web'`, `is_demo: false` and `landing_lang` (en | fr | es,
//    read from the URL at send time by `before_send`, so it stays right after
//    a language switch and on $pageview too).
import type { PostHog } from "posthog-js";

const KEY = (import.meta.env.VITE_POSTHOG_KEY as string | undefined)?.trim() || "";
const HOST =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined)?.trim() || "https://eu.i.posthog.com";

/**
 * The landing's tracking plan — the complete list. Add a name here first
 * (snake_case, past tense), never a free string in a component.
 */
export type LandingEvent =
  | "pro_signup_opened"
  | "pro_signup_step_completed"
  | "pro_signup_account_created"
  | "pro_signup_email_confirmation_required"
  | "pro_signup_existing_account"
  | "pro_signup_failed"
  | "pro_signup_lead_submitted"
  | "contact_form_submitted"
  // Page-level engagement (clicks are read by the delegated listener in
  // src/lib/posthog-dom.ts — `data-ph-*` attributes, never a handler per link).
  | "landing_section_viewed" // { section, page } — once per section per page view, ≥ 40 % visible
  | "landing_cta_clicked" // { cta, role, section, page }
  | "landing_language_changed" // { from, to }
  | "compare_page_viewed" // { competitor }
  | "pricing_page_viewed" // { page }
  | "contact_clicked" // { channel: whatsapp | email | phone | form, section, page }
  | "outbound_clicked"; // { destination: yuno_app | app_store | instagram | other, host, section, page }

export type LandingLang = "en" | "fr" | "es";

/** Language of the page at `pathname`: the URL is the source of truth. */
export function landingLangFromPath(pathname: string): LandingLang {
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  // /bde is the French-only BDE landing (no /fr prefix).
  if (pathname === "/bde" || pathname.startsWith("/bde/")) return "fr";
  return "en";
}

/** Page id without the language prefix: "/fr/pricing" → "/pricing", "/es" → "/". */
export function pageFromPath(pathname: string): string {
  const bare = pathname.replace(/^\/(fr|es)(?=\/|$)/, "").replace(/\/+$/, "");
  return bare || "/";
}

export function posthogEnabled(): boolean {
  return !!KEY && typeof window !== "undefined";
}

let client: PostHog | null = null;
let loading: Promise<PostHog | null> | null = null;
const queue: Array<[LandingEvent, Record<string, unknown> | undefined, boolean]> = [];

function load(): Promise<PostHog | null> {
  if (client) return Promise.resolve(client);
  if (loading) return loading;
  loading = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(KEY, {
        api_host: HOST,
        persistence: "memory",
        person_profiles: "identified_only",
        capture_pageview: "history_change",
        capture_pageleave: true,
        session_recording: { maskAllInputs: true },
        // Language and surface are stamped at send time from the live URL, so
        // every event — $pageview included — carries the page's real language.
        before_send: (event) => {
          if (!event) return null;
          event.properties = {
            ...event.properties,
            surface: "landing",
            landing_lang: landingLangFromPath(window.location.pathname),
          };
          return event;
        },
      });
      posthog.register({
        site: "landing",
        surface: "landing",
        platform: "web",
        is_demo: false,
        landing_lang: landingLangFromPath(window.location.pathname),
      });
      client = posthog;
      for (const [event, props, now] of queue.splice(0)) {
        posthog.capture(event, props, now ? { send_instantly: true } : undefined);
      }
      return posthog;
    })
    .catch(() => {
      loading = null;
      return null;
    });
  return loading;
}

/** Call once on the client (root component). */
export function initPosthog() {
  if (!KEY || typeof window === "undefined") return;
  void load();
}

/**
 * Tracking-plan event. `instant` sends it right away — use it right before a
 * full-page navigation (the handoff to yunoapp.eu), which would drop a batch.
 */
export function capture(
  event: LandingEvent,
  properties?: Record<string, unknown>,
  instant = false,
) {
  if (!KEY || typeof window === "undefined") return;
  if (client) {
    client.capture(event, properties, instant ? { send_instantly: true } : undefined);
    return;
  }
  if (queue.length < 50) queue.push([event, properties, instant]);
  void load();
}

/** Link this visit to the account just created on the Yuno app (Supabase user id only). */
export function identifyAccount(userId: string, role: string | null) {
  if (!KEY || typeof window === "undefined") return;
  void load().then((ph) => ph?.identify(userId, { signup_role: role, signup_site: "landing" }));
}
