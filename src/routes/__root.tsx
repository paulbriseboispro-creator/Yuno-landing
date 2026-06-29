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
import { NotFoundPage } from "@/components/not-found";
import {
  LocaleProvider,
  detectLocale,
  getStandaloneLocale,
  type Locale,
} from "@/i18n/locale";
import { localePath } from "@/i18n/seo";
import { common } from "@/content/common";

// Pages that exist in both languages. Only these get the French redirect, so
// asset/server routes (sitemap.xml, og-image.png) are never rewritten to /fr.
const LOCALIZED_PATHS = new Set([
  "/",
  "/clubs",
  "/organizers",
  "/affiliates",
  "/pricing",
  "/contact",
  "/privacy",
  "/terms",
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
    // French is served under /fr/* — there the URL is the source of truth.
    if (path === "/fr" || path.startsWith("/fr/")) {
      return { locale: "fr" as Locale };
    }
    // /bde is the standalone French-only BDE landing (no /fr prefix, not in the
    // bilingual set). Force French so the page, its minimal chrome and <html lang>
    // all render in French regardless of cookie.
    if (path === "/bde") {
      return { locale: "fr" as Locale };
    }
    // On an English (root) page, send a French-preferring visitor (cookie or
    // browser Accept-Language) to the /fr twin so the priority market lands in
    // its language at a real, crawlable URL. The URL still decides the language,
    // so search engines and explicit en-pickers keep getting English here.
    if (LOCALIZED_PATHS.has(path) && detectLocale() === "fr") {
      throw redirect({ href: localePath(path, "fr") + (location.searchStr ?? "") });
    }
    return { locale: "en" as Locale };
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
        { property: "og:image", content: "https://landing.yunoapp.eu/og-image.png" },
        { name: "twitter:image", content: "https://landing.yunoapp.eu/og-image.png" },
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
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Yuno",
            description: m.description,
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
  const { locale } = Route.useRouteContext();
  return (
    <html lang={locale} className="dark">
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

function RootComponent() {
  const { queryClient, locale } = Route.useRouteContext();
  // The /bde landing gets its own stripped-down chrome (no main nav, no founding
  // banner) so a BDE handed the link stays focused and never crosses into the
  // club/organizer funnel.
  const isBde = useRouterState({ select: (s) => s.location.pathname === "/bde" });
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider initialLocale={locale as Locale}>
        {isBde ? (
          <div className="sticky top-0 z-[70] w-full">
            <BdeHeader />
          </div>
        ) : (
          <div className="sticky top-0 z-[70] w-full">
            <FoundingBanner />
            <SiteHeader />
          </div>
        )}
        <main className="min-h-[60vh]">
          <Outlet />
        </main>
        {isBde ? <BdeFooter /> : <SiteFooter />}
      </LocaleProvider>
    </QueryClientProvider>
  );
}
