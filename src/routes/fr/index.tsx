import { createFileRoute } from "@tanstack/react-router";
import { homeContent } from "@/content/home";
import { pageSeo } from "@/i18n/seo";
import { Index } from "@/routes/index";

// French twin of "/". Reuses the home component; the root resolves locale=fr
// from the /fr path, so head() and every hook render in French.
export const Route = createFileRoute("/fr/")({
  head: ({ match }) => {
    const c = homeContent[match.context.locale];
    const m = c.meta;
    return {
      ...pageSeo("/", match.context.locale, {
        title: m.title,
        description: m.description,
        ogDescription: m.ogDescription,
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faq.items.map((item) => ({
              "@type": "Question",
              name: item.title,
              acceptedAnswer: { "@type": "Answer", text: item.content },
            })),
          }),
        },
      ],
    };
  },
  component: Index,
});
