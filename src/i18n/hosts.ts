// Two domains, one Worker (Cloudflare → yuno-landing → Domains):
//   - landing.yunoapp.eu: the ticketing Suite's landing (every page of this repo);
//   - crm.yunoapp.eu: Yuno CRM's landing (decided 4 Oct 2026).
// On crm.yunoapp.eu the CRM page sits at the root: "/", "/fr", "/es" are the
// routes "/crm", "/fr/crm", "/es/crm" (router rewrite, src/router.tsx), the
// signup funnel keeps its "/start" paths (CRM product implied), and every other
// path belongs to the landing (301, src/server.ts). The former
// landing.yunoapp.eu/crm URLs 301 to the new domain.
// `crm.localhost` behaves like crm.yunoapp.eu to try it under `vite dev`.
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { CRM_PATHS, LANDING_LANGS, type LandingLang } from "@/i18n/landing-lang";
import { SITE_ORIGIN } from "@/i18n/seo";

export const LANDING_HOST = "landing.yunoapp.eu";
export const CRM_HOST = "crm.yunoapp.eu";
export const CRM_ORIGIN = `https://${CRM_HOST}`;

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

/** Where a request must be sent instead (301), or null to serve it. */
export function hostRedirect(url: URL): string | null {
  const path = trimSlash(url.pathname);
  if (hostname(url.host) === LANDING_HOST) {
    const lang = langOf(CRM_PATHS, path);
    if (lang) return crmUrl(lang) + url.search;
    if (START_PATHS.includes(path) && url.searchParams.get("product") === "crm") {
      return CRM_ORIGIN + path + url.search;
    }
    return null;
  }
  if (!isCrmHost(url.host)) return null;
  const lang = langOf(CRM_PATHS, path);
  if (lang) return url.origin + CRM_HOST_PATHS[lang] + url.search;
  if (langOf(CRM_HOST_PATHS, path) || START_PATHS.includes(path)) return null;
  if (path.startsWith("/_serverFn") || CRM_HOST_FILES.has(path)) return null;
  return landingOriginFrom(url.host) + url.pathname + url.search;
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
