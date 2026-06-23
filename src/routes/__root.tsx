import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FoundingBanner } from "@/components/site/FoundingBanner";
import { NotFoundPage } from "@/components/not-found";
import {
  LocaleProvider,
  detectLocale,
  getStandaloneLocale,
  type Locale,
} from "@/i18n/locale";
import { common } from "@/content/common";


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
  beforeLoad: () => ({ locale: detectLocale() }),
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
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider initialLocale={locale as Locale}>
        <div className="sticky top-0 z-[70] w-full">
          <FoundingBanner />
          <SiteHeader />
        </div>
        <main className="min-h-[60vh]">
          <Outlet />
        </main>
        <SiteFooter />
      </LocaleProvider>
    </QueryClientProvider>
  );
}
