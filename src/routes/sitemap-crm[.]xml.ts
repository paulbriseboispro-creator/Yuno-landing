import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { LANDING_LANGS } from "@/i18n/landing-lang";
import { CRM_UPDATED, crmUrl } from "@/i18n/crm";
import { sitemapXml } from "@/i18n/sitemap-xml";
import { CRM_PAGE_LIST } from "@/content/crm-pages";
import { crmPageUrl } from "@/i18n/crm-page-seo";

// Sitemap of crm.yunoapp.eu (the Yuno CRM page in EN / FR / ES, then its
// French content pages). Like
// /sitemap.xml, the build renders it to a static dist/client/sitemap-crm.xml
// (vite.config.ts, staticSitemap) that Cloudflare serves on both domains;
// public/robots.txt points to it.
export const Route = createFileRoute("/sitemap-crm.xml")({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          sitemapXml([
            ...LANDING_LANGS.map((lang) => ({ loc: crmUrl(lang), lastmod: CRM_UPDATED })),
            // The French content pages (src/content/crm-pages).
            ...CRM_PAGE_LIST.map((p) => ({ loc: crmPageUrl(p), lastmod: p.updated })),
          ]),
          {
            headers: {
              "Content-Type": "application/xml; charset=utf-8",
              "Cache-Control": "public, max-age=3600",
            },
          },
        ),
    },
  },
});
