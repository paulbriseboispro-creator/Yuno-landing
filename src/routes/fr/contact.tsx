import { createFileRoute } from "@tanstack/react-router";
import { contactContent } from "@/content/contact";
import { pageSeo } from "@/i18n/seo";
import { ContactPage } from "@/pages/contact";

export const Route = createFileRoute("/fr/contact")({
  head: ({ match }) => {
    const m = contactContent[match.context.locale].meta;
    return pageSeo("/contact", match.context.locale, {
      title: m.title,
      description: m.description,
      ogDescription: m.ogDescription,
    });
  },
  component: ContactPage,
});
