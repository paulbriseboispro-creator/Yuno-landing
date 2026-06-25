import { createFileRoute } from "@tanstack/react-router";
import { affiliatesContent } from "@/content/affiliates";
import { pageSeo } from "@/i18n/seo";
import { AffiliatesPage } from "@/pages/affiliates";

export const Route = createFileRoute("/fr/affiliates")({
  head: ({ match }) => {
    const m = affiliatesContent[match.context.locale].meta;
    return pageSeo("/affiliates", match.context.locale, {
      title: m.title,
      description: m.description,
      ogDescription: m.ogDescription,
    });
  },
  component: AffiliatesPage,
});
