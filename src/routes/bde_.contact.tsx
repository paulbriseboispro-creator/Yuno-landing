import { createFileRoute } from "@tanstack/react-router";
import { bde } from "@/content/bde";
import { SITE_ORIGIN } from "@/i18n/seo";
import { BdeContactPage } from "@/pages/bde-contact";

// Contact page for the standalone /bde landing. The trailing underscore on `bde_`
// opts this route OUT of nesting under the /bde route (BdePage renders no
// <Outlet/>), so it mounts directly at /bde/contact under the root. Like /bde it
// is noindex/nofollow, absent from the sitemap, and French-only — the root forces
// locale="fr" and the BDE chrome for any /bde* path.
export const Route = createFileRoute("/bde_/contact")({
  head: () => ({
    meta: [
      { title: bde.contact.meta.title },
      { name: "description", content: bde.contact.meta.description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: bde.contact.meta.title },
      { property: "og:description", content: bde.contact.meta.description },
      { property: "og:url", content: `${SITE_ORIGIN}/bde/contact` },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/bde/contact` }],
  }),
  component: BdeContactPage,
});
