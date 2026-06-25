import { createFileRoute } from "@tanstack/react-router";
import { pricingContent } from "@/content/pricing";
import { pageSeo } from "@/i18n/seo";
import { PricingPage } from "@/pages/pricing";

export const Route = createFileRoute("/fr/pricing")({
  head: ({ match }) => {
    const m = pricingContent[match.context.locale].meta;
    return pageSeo("/pricing", match.context.locale, {
      title: m.title,
      description: m.description,
      ogTitle: m.ogTitle,
      ogDescription: m.ogDescription,
    });
  },
  component: PricingPage,
});
