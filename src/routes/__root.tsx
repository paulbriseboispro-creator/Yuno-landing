import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  redirect,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { NotFoundPage } from "@/components/not-found";
import { LocaleProvider, detectLocale, getStandaloneLocale, type Locale } from "@/i18n/locale";
import { BING_SITE_VERIFICATION, GOOGLE_SITE_VERIFICATION, localePath } from "@/i18n/seo";
import { ogImageMeta } from "@/i18n/og";
import {
  ASSO_PATHS,
  CRM_PATHS,
  LANDING_PATHS,
  detectLandingLang,
  isLandingPath,
  type LandingLang,
} from "@/i18n/landing-lang";
import { crmPagePaths } from "@/i18n/hosts";
import { isCrmPagePath } from "@/i18n/crm-pages";
import { common } from "@/content/common";
import { COMPARE_PATHS } from "@/content/compare";
import { TOPIC_PATHS } from "@/content/topics";
import { organizationLd } from "@/i18n/landing-seo";
import { initPosthog } from "@/lib/posthog";
import { installClickTracking, trackSectionViews } from "@/lib/posthog-dom";
import { measureCrmPage } from "@/lib/crm-measure";

// Pages that exist in both languages. Only these get the French redirect, so
// asset/server routes (sitemap.xml, og/*.png) are never rewritten to /fr.
const LOCALIZED_PATHS = new Set([
  "/",
  "/pricing",
  "/contact",
  "/privacy",
  "/terms",
  "/alternative-shotgun",
]);

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  const t = common[getStandaloneLocale()].error;
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="yl flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="yl-h3 text-xl text-zinc-950">{t.title}</h1>
        <p className="mt-2 text-sm text-zinc-500">{t.body}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="yl-btn-primary h-10 px-4 text-sm"
          >
            {t.tryAgain}
          </button>
          <a href="/" className="yl-btn-secondary h-10 px-4 text-sm">
            {t.goHome}
          </a>
        </div>
      </div>
    </div>
  );
}

// Route ids of the Yuno CRM page (crm.yunoapp.eu "/", "/fr", "/es").
const CRM_ROUTE_IDS = new Set<string>(["/crm", "/fr/crm", "/es/crm"]);

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: ({ location }) => {
    const path = location.pathname;
    // `lang` drives <html lang>; it only differs from `locale` on the Spanish
    // landing (the rest of the site, and its shared chrome, is EN/FR only).
    // `landing` = a page that writes its own JSON-LD (landingHead and friends);
    // the others (contact, legal, 404) get the Organization entity from here.
    const landing = isLandingPath(path) || COMPARE_PATHS.has(path) || TOPIC_PATHS.has(path);
    // Spanish exists only for the landing ("/es").
    if (path === "/es" || path.startsWith("/es/")) {
      return { locale: "en" as Locale, lang: "es" as LandingLang, landing };
    }
    // French is served under /fr/* — there the URL is the source of truth.
    if (path === "/fr" || path.startsWith("/fr/")) {
      return { locale: "fr" as Locale, lang: "fr" as LandingLang, landing };
    }
    // The landing is trilingual: send a visitor who prefers French or Spanish
    // (cookie, else Accept-Language) from "/" to their language's URL.
    if (path === "/") {
      const pref = detectLandingLang();
      if (pref !== "en") {
        throw redirect({ href: LANDING_PATHS[pref] + (location.searchStr ?? "") });
      }
      return { locale: "en" as Locale, lang: "en" as LandingLang, landing };
    }
    // The pro signup page is trilingual like the landing: same language pick.
    if (path === "/start" || path === "/start/") {
      const pref = detectLandingLang();
      if (pref !== "en") {
        throw redirect({ href: `/${pref}/start` + (location.searchStr ?? "") });
      }
      return { locale: "en" as Locale, lang: "en" as LandingLang, landing };
    }
    // Same for the student-association landing (French first: BDE).
    if (path === ASSO_PATHS.en || path === ASSO_PATHS.en + "/") {
      const pref = detectLandingLang();
      if (pref !== "en") {
        throw redirect({ href: ASSO_PATHS[pref] + (location.searchStr ?? "") });
      }
      return { locale: "en" as Locale, lang: "en" as LandingLang, landing };
    }
    // Same for the Yuno CRM page ("/" on crm.yunoapp.eu: the redirect goes to
    // the visitor's host's own path, "/fr" there, "/fr/crm" here).
    if (path === CRM_PATHS.en || path === CRM_PATHS.en + "/") {
      const pref = detectLandingLang();
      if (pref !== "en") {
        throw redirect({ href: crmPagePaths()[pref] + (location.searchStr ?? "") });
      }
      return { locale: "en" as Locale, lang: "en" as LandingLang, landing };
    }
    // On an English (root) page, send a French-preferring visitor (cookie or
    // browser Accept-Language) to the /fr twin so the priority market lands in
    // its language at a real, crawlable URL. The URL still decides the language,
    // so search engines and explicit en-pickers keep getting English here.
    if (LOCALIZED_PATHS.has(path) && detectLocale() === "fr") {
      throw redirect({ href: localePath(path, "fr") + (location.searchStr ?? "") });
    }
    return { locale: "en" as Locale, lang: "en" as LandingLang, landing };
  },
  head: ({ match, matches }) => {
    const { locale, lang } = match.context;
    const m = common[locale].meta;
    // The Yuno CRM page draws only with its own faces (Bricolage / Geist, from
    // crmHead): skip the landing's Inter + Newsreader there, a render-blocking
    // stylesheet that delayed its first paint for nothing.
    const crmPage = matches.some((r) => CRM_ROUTE_IDS.has(r.routeId) || isCrmPagePath(r.routeId));
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: m.title },
        { name: "description", content: m.description },
        { name: "author", content: "Yuno" },
        ...(GOOGLE_SITE_VERIFICATION
          ? [{ name: "google-site-verification", content: GOOGLE_SITE_VERIFICATION }]
          : []),
        ...(BING_SITE_VERIFICATION
          ? [{ name: "msvalidate.01", content: BING_SITE_VERIFICATION }]
          : []),
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Yuno" },
        { property: "og:locale", content: locale === "fr" ? "fr_FR" : "en_GB" },
        { property: "og:title", content: m.title },
        { property: "og:description", content: m.description },
        ...ogImageMeta(lang),
        { name: "twitter:title", content: m.title },
        { name: "twitter:description", content: m.description },
      ],
      links: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        ...(crmPage
          ? []
          : [
              {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&display=swap",
              },
            ]),
      ],
      // The landing routes emit the full @graph (Organization included) from
      // landingHead(); every other page gets the same Organization entity here.
      scripts: match.context.landing
        ? []
        : [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                ...organizationLd(locale),
              }),
            },
          ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorComponent,
});

const LANDING_THEME_SCRIPT = `try{if(localStorage.getItem("yl-theme")==="dark")document.documentElement.setAttribute("data-yl-theme","dark")}catch(e){}`;

function RootShell({ children }: { children: ReactNode }) {
  const { lang } = Route.useRouteContext();
  // Every page is on the landing's light surface since the old site was retired
  // (20/10/2026): each one brings the landing's nav and footer itself.
  return (
    <html lang={lang} className="yl-page" suppressHydrationWarning>
      <head>
        {/* Applies the visitor's saved landing theme before first paint (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: LANDING_THEME_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient, locale } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // PostHog, browser only and cookieless (see src/lib/posthog.ts). One
  // delegated click listener + one section observer per page view
  // (src/lib/posthog-dom.ts): components only carry `data-ph-*` attributes.
  useEffect(() => {
    initPosthog();
    return installClickTracking();
  }, []);
  useEffect(() => trackSectionViews(pathname), [pathname]);
  // Yuno CRM page + its signup funnel: first-party, cookieless measurement
  // read by the CRM super admin (src/lib/crm-measure.ts).
  useEffect(() => measureCrmPage(pathname, window.location.search), [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider initialLocale={locale as Locale}>
        <Outlet />
      </LocaleProvider>
    </QueryClientProvider>
  );
}
