import { createFileRoute } from "@tanstack/react-router";
import { legalContent } from "@/content/legal";
import { pageSeo } from "@/i18n/seo";
import { PrivacyPage } from "@/pages/privacy";

export const Route = createFileRoute("/fr/privacy")({
  head: ({ match }) => {
    const m = legalContent[match.context.locale].privacy.meta;
    return pageSeo("/privacy", match.context.locale, {
      title: m.title,
      description: m.description,
    });
  },
  component: PrivacyPage,
});
