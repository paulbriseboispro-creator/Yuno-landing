import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_ORIGIN, localeUrl } from "@/i18n/seo";
import { COMPARE_PAGES } from "@/content/compare";
import { TOPIC_PAGES } from "@/content/topics";
import { LANDING_LANGS, landingUrl } from "@/i18n/landing-lang";
import { LANDING_UPDATED } from "@/i18n/landing-seo";
import { ASSO_UPDATED, assoUrl } from "@/i18n/asso";

// Kept deliberately plain (<loc> + <lastmod>, no hreflang namespace): Search
// Console could not fetch the richer Worker-rendered version, while a static
// one-URL file passed at once. Language alternates live in each page's <head>.
// In production this route is never hit: the build (vite.config.ts,
// staticSitemap) renders it to dist/client/sitemap.xml (+ sitemap-pages.xml,
// the name submitted in Search Console) and Cloudflare serves
// that static file first. The route still answers in `vite dev`.

interface SitemapEntry {
  loc: string;
  lastmod?: string;
}

function sitemapEntries(): SitemapEntry[] {
  // Pages published in English (root) and French (/fr).
  const bilingual = [
    "/",
    "/start",
    "/clubs",
    "/organizers",
    "/affiliates",
    "/contact",
    "/privacy",
    "/terms",
  ];
  const entries: SitemapEntry[] = bilingual.flatMap((path) => {
    const lastmod = path === "/" ? LANDING_UPDATED : undefined;
    return [
      { loc: localeUrl(path, "en"), lastmod },
      { loc: localeUrl(path, "fr"), lastmod },
      // The landing and the signup page also exist in Spanish.
      ...(path === "/" ? [{ loc: landingUrl("es"), lastmod }] : []),
      ...(path === "/start" ? [{ loc: `${SITE_ORIGIN}/es/start` }] : []),
    ];
  });
  // Comparison pages, each in its own language.
  for (const page of COMPARE_PAGES) {
    entries.push({ loc: SITE_ORIGIN + page.path, lastmod: page.updated });
  }
  // Topic pages (features, pricing, city), each in its own language.
  for (const page of TOPIC_PAGES) {
    entries.push({ loc: SITE_ORIGIN + page.path, lastmod: page.updated });
  }
  // Student-association landing: one page per language.
  for (const lang of LANDING_LANGS) {
    entries.push({ loc: assoUrl(lang), lastmod: ASSO_UPDATED });
  }
  return entries;
}

function sitemapXml(): string {
  const urls = sitemapEntries().map((e) =>
    [
      `  <url>`,
      `    <loc>${e.loc}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () =>
        new Response(sitemapXml(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
