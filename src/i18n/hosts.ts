// Two domains, one Worker (Cloudflare → yuno-landing → Domains):
//   - landing.yunoapp.eu: the ticketing Suite's landing (every page of this repo);
//   - crm.yunoapp.eu: Yuno CRM's landing (decided 4 Oct 2026).
// On crm.yunoapp.eu the CRM page sits at the root: "/", "/fr", "/es" are the
// routes "/crm", "/fr/crm", "/es/crm" (router rewrite, src/router.tsx), the
// signup funnel keeps its "/start" paths (CRM product implied), the Yuno APP
// serves its CRM side there (sign-in "/login", Console "/crm/*", Admin CRM…:
// relayed to yunoapp.eu, see `appPathOnCrmHost`), and every other path belongs
// to the landing (301, src/start.ts). The former landing.yunoapp.eu/crm URLs
// 301 to the new domain.
// `crm.localhost` behaves like crm.yunoapp.eu to try it under `vite dev`.
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { CRM_PATHS, LANDING_LANGS, type LandingLang } from "@/i18n/landing-lang";
import { SITE_ORIGIN } from "@/i18n/seo";

export const LANDING_HOST = "landing.yunoapp.eu";
export const CRM_HOST = "crm.yunoapp.eu";
export const CRM_ORIGIN = `https://${CRM_HOST}`;

/** Yuno CRM sign-in (the app's `/login`, served on crm.yunoapp.eu). */
export const CRM_LOGIN_URL = `${CRM_ORIGIN}/login`;

// The Yuno app (Worker `yuno`, custom domain yunoapp.eu): crm.yunoapp.eu relays
// its CRM paths to it. A Worker may fetch another Worker's custom domain on the
// same zone. `VITE_YUNO_APP_ORIGIN` points `vite dev` at a local app build.
const APP_ORIGIN = import.meta.env.VITE_YUNO_APP_ORIGIN || "https://yunoapp.eu";

// Paths of the APP on crm.yunoapp.eu — mirror of `CRM_PATH_PREFIXES` +
// `SHARED_PATH_PREFIXES` in the yuno repo (src/lib/productHost.ts): the CRM
// sign-in, Console and Admin, the CRM opening on an account, session handoff,
// signup follow-up, team invites, 2FA. Plus the ticketing consoles the CRM
// links to: the app hands the session over to yunoapp.eu itself, a plain 301
// from here would ask to sign in again.
const APP_PATH_PREFIXES = [
  "/crm",
  "/crm-admin",
  "/admin",
  "/login",
  "/open",
  "/auth",
  "/get-started",
  "/accept-org-member",
  "/mfa-setup",
  "/mfa-disable-confirm",
  "/account-suspended",
  "/owner",
  "/organizer-app",
  "/manager",
  "/agency-app",
  "/legal",
];

// Landing files with an extension that must keep going to the landing.
const LANDING_FILES = new Set([
  "/sitemap.xml",
  "/sitemap-pages.xml",
  "/llms.txt",
  "/llms-full.txt",
]);

/** The CRM page's paths on crm.yunoapp.eu. */
export const CRM_HOST_PATHS: Record<LandingLang, string> = { en: "/", fr: "/fr", es: "/es" };

const START_PATHS = ["/start", "/fr/start", "/es/start"];

// Paths the Worker renders for crm.yunoapp.eu besides its pages (static files
// such as robots.txt never reach the Worker: Cloudflare serves them first).
const CRM_HOST_FILES = new Set(["/sitemap-crm.xml"]);

function hostname(host: string): string {
  return host.toLowerCase().replace(/:\d+$/, "");
}

function trimSlash(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

function langOf(paths: Record<LandingLang, string>, path: string): LandingLang | undefined {
  return LANDING_LANGS.find((l) => paths[l] === path);
}

export function isCrmHost(host: string | null | undefined): boolean {
  const h = hostname(host ?? "");
  return h === CRM_HOST || h === "crm.localhost";
}

// The ticketing landing as seen from a CRM host ("crm.localhost:3000" →
// "http://localhost:3000" in dev).
function landingOriginFrom(host: string): string {
  return hostname(host) === "crm.localhost"
    ? `http://${host.toLowerCase().replace(/^crm\./, "")}`
    : SITE_ORIGIN;
}

/** Canonical URL of the CRM page in a language. */
export function crmUrl(lang: LandingLang): string {
  return CRM_ORIGIN + CRM_HOST_PATHS[lang];
}

/** Route path behind a public path of a CRM host ("/fr" → "/fr/crm"). */
export function crmRoutePath(path: string): string {
  const lang = langOf(CRM_HOST_PATHS, trimSlash(path));
  return lang ? CRM_PATHS[lang] : path;
}

/** Router input on a CRM host: the URL the visitor sees → the route that renders it. */
export function crmHostToRoute(url: URL): URL {
  const path = trimSlash(url.pathname);
  const lang = langOf(CRM_HOST_PATHS, path);
  if (lang) url.pathname = CRM_PATHS[lang];
  else if (START_PATHS.includes(path) && url.searchParams.get("product") !== "crm") {
    url.searchParams.set("product", "crm");
  }
  return url;
}

/** Router output on a CRM host: a route → the URL the visitor sees. */
export function crmRouteToHost(url: URL): URL {
  const path = trimSlash(url.pathname);
  const lang = langOf(CRM_PATHS, path);
  if (lang) {
    url.pathname = CRM_HOST_PATHS[lang];
    return url;
  }
  if (START_PATHS.includes(path)) return url;
  // Every other page lives on the landing.
  return new URL(url.pathname + url.search + url.hash, landingOriginFrom(url.host));
}

/**
 * A path of crm.yunoapp.eu that the Yuno APP serves (relayed to yunoapp.eu):
 * the prefixes above, its build output (`/assets/*`) and any other file
 * (`/manifest.webmanifest`, `/crm/yunit-token.webp`…). The landing's own static
 * files never get here: Cloudflare serves them before the Worker runs.
 */
export function appPathOnCrmHost(path: string): boolean {
  if (APP_PATH_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))) return true;
  if (path.startsWith("/assets/")) return true;
  const last = path.slice(path.lastIndexOf("/") + 1);
  return last.includes(".") && !LANDING_FILES.has(path) && !CRM_HOST_FILES.has(path);
}

export type HostRoute =
  /** 301 to this URL. */
  | { redirect: string }
  /** Relay to the Yuno app: fetch this URL and return its response. */
  | { app: string };

/** What crm.yunoapp.eu / landing.yunoapp.eu do with a request, or null to serve it. */
export function hostRoute(url: URL): HostRoute | null {
  const path = trimSlash(url.pathname);
  if (hostname(url.host) === LANDING_HOST) {
    const lang = langOf(CRM_PATHS, path);
    if (lang) return { redirect: crmUrl(lang) + url.search };
    if (START_PATHS.includes(path) && url.searchParams.get("product") === "crm") {
      return { redirect: CRM_ORIGIN + path + url.search };
    }
    return null;
  }
  if (!isCrmHost(url.host)) return null;
  // "/crm" is the app's Console here; only the localized twins of the former page path move.
  const lang = path === "/crm" ? undefined : langOf(CRM_PATHS, path);
  if (lang) return { redirect: url.origin + CRM_HOST_PATHS[lang] + url.search };
  if (langOf(CRM_HOST_PATHS, path) || START_PATHS.includes(path)) return null;
  if (path.startsWith("/_serverFn") || CRM_HOST_FILES.has(path)) return null;
  if (appPathOnCrmHost(path)) return { app: APP_ORIGIN + url.pathname + url.search };
  return { redirect: landingOriginFrom(url.host) + url.pathname + url.search };
}

/**
 * Relay a crm.yunoapp.eu request to the Yuno app. The answer is passed through,
 * minus what belongs to the hop (encoding: the body comes back decoded), and a
 * redirect towards yunoapp.eu stays on this host when it lands on an app path.
 */
export async function relayToApp(request: Request, target: string): Promise<Response> {
  const headers = new Headers(request.headers);
  headers.delete("host");
  const res = await fetch(target, { method: request.method, headers, redirect: "manual" });
  const out = new Headers(res.headers);
  out.delete("content-encoding");
  out.delete("content-length");
  const location = out.get("location");
  if (location) {
    const to = new URL(location, target);
    if (to.origin === new URL(APP_ORIGIN).origin && appPathOnCrmHost(trimSlash(to.pathname))) {
      out.set("location", to.pathname + to.search + to.hash);
    }
  }
  return new Response(request.method === "HEAD" ? null : res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: out,
  });
}

/** Host of the page being rendered (request header on the server, location in the browser). */
export const requestHost = createIsomorphicFn()
  .server((): string => getRequestHeader("host") ?? "")
  .client((): string => window.location.host);

/** The CRM page's paths as the current host serves them ("/fr/crm" here, "/fr" on crm.yunoapp.eu). */
export function crmPagePaths(): Record<LandingLang, string> {
  return isCrmHost(requestHost()) ? CRM_HOST_PATHS : CRM_PATHS;
}

/** A landing path ("/fr/privacy", "/fr") linked from a page that may be on crm.yunoapp.eu. */
export function landingHref(path: string): string {
  const host = requestHost();
  return isCrmHost(host) ? landingOriginFrom(host) + path : path;
}
