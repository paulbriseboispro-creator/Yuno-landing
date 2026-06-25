import { createFileRoute } from "@tanstack/react-router";
import { legalContent } from "@/content/legal";
import { pageSeo } from "@/i18n/seo";
import { TermsPage } from "@/pages/terms";

export const Route = createFileRoute("/terms")({
  head: ({ match }) => {
    const m = legalContent[match.context.locale].terms.meta;
    return pageSeo("/terms", match.context.locale, {
      title: m.title,
      description: m.description,
    });
  },
  component: TermsPage,
});
