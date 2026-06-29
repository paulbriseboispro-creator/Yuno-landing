import { createFileRoute } from "@tanstack/react-router";
import { bde } from "@/content/bde";
import { SITE_ORIGIN } from "@/i18n/seo";
import { BdePage } from "@/pages/bde";

// Standalone French-only landing for student unions (BDE). Deliberately kept
// out of the bilingual SEO surface: it is `noindex, nofollow`, absent from the
// sitemap, and not linked from the nav/footer — a private link you hand to a BDE
// so they never land in the club/organizer funnel. The root forces locale="fr"
// for this path (so the shared chrome + <html lang> render in French) and swaps
// in the minimal BdeHeader/BdeFooter.
export const Route = createFileRoute("/bde")({
  head: () => ({
    meta: [
      { title: bde.meta.title },
      { name: "description", content: bde.meta.description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: bde.meta.title },
      { property: "og:description", content: bde.meta.description },
      { property: "og:url", content: `${SITE_ORIGIN}/bde` },
    ],
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/bde` }],
  }),
  component: BdePage,
});
