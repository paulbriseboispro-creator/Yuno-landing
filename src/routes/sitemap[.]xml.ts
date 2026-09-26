import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_ORIGIN, localeUrl } from "@/i18n/seo";
import { COMPARE_PAGES } from "@/content/compare";
import { LANDING_LANGS, landingUrl } from "@/i18n/landing-lang";
import { LANDING_UPDATED } from "@/i18n/landing-seo";
import { ASSO_UPDATED, assoUrl } from "@/i18n/asso";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: LANDING_UPDATED },
          // Direct path to a pro account (EN / FR / ES).
          { path: "/start", changefreq: "monthly", priority: "0.9" },
          { path: "/clubs", changefreq: "monthly", priority: "0.9" },
          { path: "/organizers", changefreq: "monthly", priority: "0.9" },
          { path: "/affiliates", changefreq: "monthly", priority: "0.9" },
          { path: "/pricing", changefreq: "monthly", priority: "0.8" },
          { path: "/contact", changefreq: "yearly", priority: "0.5" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
        ];

        // Each page is published in English (root) and French (/fr), with
        // hreflang alternates linking the pair so Google indexes both.
        const alternates = (path: string) =>
          [
            `    <xhtml:link rel="alternate" hreflang="en" href="${localeUrl(path, "en")}"/>`,
            `    <xhtml:link rel="alternate" hreflang="fr" href="${localeUrl(path, "fr")}"/>`,
            // The landing ("/") also exists in Spanish.
            path === "/"
              ? `    <xhtml:link rel="alternate" hreflang="es" href="${landingUrl("es")}"/>`
              : null,
            path === "/start"
              ? `    <xhtml:link rel="alternate" hreflang="es" href="${SITE_ORIGIN}/es/start"/>`
              : null,
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl(path, "en")}"/>`,
          ]
            .filter(Boolean)
            .join("\n");

        const urlBlock = (loc: string, e: SitemapEntry) =>
          [
            `  <url>`,
            `    <loc>${loc}</loc>`,
            alternates(e.path),
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n");

        const urls = entries.flatMap((e) => [
          urlBlock(localeUrl(e.path, "en"), e),
          urlBlock(localeUrl(e.path, "fr"), e),
          ...(e.path === "/" ? [urlBlock(landingUrl("es"), e)] : []),
          ...(e.path === "/start" ? [urlBlock(`${SITE_ORIGIN}/es/start`, e)] : []),
        ]);

        // Comparison pages exist in their own set of languages.
        const compareUrls = COMPARE_PAGES.map((page) => {
          const twins = Object.entries(page.twins) as [string, string][];
          const xDefault = page.twins.en ?? page.path;
          return [
            `  <url>`,
            `    <loc>${SITE_ORIGIN + page.path}</loc>`,
            ...twins.map(
              ([l, path]) =>
                `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_ORIGIN + path}"/>`,
            ),
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN + xDefault}"/>`,
            `    <lastmod>${page.updated}</lastmod>`,
            `    <changefreq>monthly</changefreq>`,
            `    <priority>0.8</priority>`,
            `  </url>`,
          ].join("\n");
        });

        // Student-association landing: one page per language, each its own slug.
        const assoUrls = LANDING_LANGS.map((lang) =>
          [
            `  <url>`,
            `    <loc>${assoUrl(lang)}</loc>`,
            ...LANDING_LANGS.map(
              (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${assoUrl(l)}"/>`,
            ),
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${assoUrl("en")}"/>`,
            `    <lastmod>${ASSO_UPDATED}</lastmod>`,
            `    <changefreq>monthly</changefreq>`,
            `    <priority>0.8</priority>`,
            `  </url>`,
          ].join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
          ...compareUrls,
          ...assoUrls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
