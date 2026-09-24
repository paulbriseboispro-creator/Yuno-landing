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
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FoundingBanner } from "@/components/site/FoundingBanner";
import { BdeHeader, BdeFooter } from "@/components/site/BdeChrome";
import { RoleHeader, RoleFooter } from "@/components/site/RoleChrome";
import { NotFoundPage } from "@/components/not-found";
import { LocaleProvider, detectLocale, getStandaloneLocale, type Locale } from "@/i18n/locale";
import { localePath } from "@/i18n/seo";
import {
  LANDING_PATHS,
  detectLandingLang,
  isLandingPath,
  type LandingLang,
} from "@/i18n/landing-lang";
import { common } from "@/content/common";
import { COMPARE_PATHS } from "@/content/compare";
import { ogImageUrl, organizationLd } from "@/i18n/landing-seo";

// Pages that exist in both languages. Only these get the French redirect, so
// asset/server routes (sitemap.xml, llms.txt, og images) are never rewritten to /fr.
const LOCALIZED_PATHS = new Set([
  "/",
  "/clubs",
  "/organizers",
  "/affiliates",
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-medium tracking-tight text-foreground">{t.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t.tryAgain}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-surface transition-colors"
          >
            {t.goHome}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: ({ location }) => {
    const path = location.pathname;
    // `lang` drives <html lang>; it only differs from `locale` on the Spanish
    // landing (the rest of the site, and its shared chrome, is EN/FR only).
    // `landing` switches the shell to the light, chrome-less landing surface.
    const landing = isLandingPath(path) || COMPARE_PATHS.has(path);
    // Spanish exists only for the landing ("/es").
    if (path === "/es" || path.startsWith("/es/")) {
      return { locale: "en" as Locale, lang: "es" as LandingLang, landing };
    }
    // French is served under /fr/* — there the URL is the source of truth.
    if (path === "/fr" || path.startsWith("/fr/")) {
      return { locale: "fr" as Locale, lang: "fr" as LandingLang, landing };
    }
    // /bde is the standalone French-only BDE landing (no /fr prefix, not in the
    // bilingual set), and /bde/contact is its dedicated contact page. Force French
    // so the page, its minimal chrome and <html lang> all render in French
    // regardless of cookie.
    if (path === "/bde" || path.startsWith("/bde/")) {
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
    // On an English (root) page, send a French-preferring visitor (cookie or
    // browser Accept-Language) to the /fr twin so the priority market lands in
    // its language at a real, crawlable URL. The URL still decides the language,
    // so search engines and explicit en-pickers keep getting English here.
    if (LOCALIZED_PATHS.has(path) && detectLocale() === "fr") {
      throw redirect({ href: localePath(path, "fr") + (location.searchStr ?? "") });
    }
    return { locale: "en" as Locale, lang: "en" as LandingLang, landing };
  },
  head: ({ match }) => {
    const locale = match.context.locale;
    const m = common[locale].meta;
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: m.title },
        { name: "description", content: m.description },
        { name: "author", content: "Yuno" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Yuno" },
        { property: "og:locale", content: locale === "fr" ? "fr_FR" : "en_GB" },
        { property: "og:title", content: m.title },
        { property: "og:description", content: m.description },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: m.title },
        { name: "twitter:description", content: m.description },
        { property: "og:image", content: ogImageUrl(locale) },
        { name: "twitter:image", content: ogImageUrl(locale) },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&display=swap",
        },
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

function RootShell({ children }: { children: ReactNode }) {
  const { lang, landing } = Route.useRouteContext();
  return (
    <html lang={lang} className={landing ? "yl-page" : "dark"}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// Which chrome a path gets. The role landings (/clubs, /organizers) and the
// gate (/) get a stripped-down, role-focused header — no full-site nav — so a
// visitor who picked a role stays in that clean funnel instead of facing the
// "trop d'éléments" menu again. /bde keeps its own private chrome. Everything
// else (pricing, contact, affiliates, legal) keeps the full site chrome.
type Surface = "landing" | "club" | "orga" | "bde" | "main";

function surfaceFor(pathname: string): Surface {
  let path = pathname;
  if (path === "/fr") path = "/";
  else if (path.startsWith("/fr/")) path = path.slice(3); // "/fr/clubs" -> "/clubs"
  if (path === "/bde" || path.startsWith("/bde/")) return "bde";
  if (isLandingPath(pathname) || COMPARE_PATHS.has(pathname)) return "landing";
  if (path === "/clubs") return "club";
  if (path === "/organizers") return "orga";
  return "main";
}

function RootComponent() {
  const { queryClient, locale } = Route.useRouteContext();
  const surface = useRouterState({ select: (s) => surfaceFor(s.location.pathname) });

  let header: ReactNode;
  let footer: ReactNode;
  switch (surface) {
    case "bde":
      header = <BdeHeader />;
      footer = <BdeFooter />;
      break;
    case "landing":
      // The landing brings its own nav and footer (light surface).
      return (
        <QueryClientProvider client={queryClient}>
          <LocaleProvider initialLocale={locale as Locale}>
            <Outlet />
          </LocaleProvider>
        </QueryClientProvider>
      );
    case "club":
      header = <RoleHeader role="club" />;
      footer = <RoleFooter />;
      break;
    case "orga":
      header = <RoleHeader role="orga" />;
      footer = <RoleFooter />;
      break;
    default:
      header = (
        <>
          <FoundingBanner />
          <SiteHeader />
        </>
      );
      footer = <SiteFooter />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider initialLocale={locale as Locale}>
        <div className="sticky top-0 z-[70] w-full">{header}</div>
        <main className="min-h-[60vh]">
          <Outlet />
        </main>
        {footer}
      </LocaleProvider>
    </QueryClientProvider>
  );
}
