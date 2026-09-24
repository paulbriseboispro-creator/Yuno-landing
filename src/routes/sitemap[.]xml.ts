import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { localeUrl } from "@/i18n/seo";
import { landingUrl } from "@/i18n/landing-lang";
import { LANDING_UPDATED } from "@/i18n/landing-seo";

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
        ]);

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
          ...urls,
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
