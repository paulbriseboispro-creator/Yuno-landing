import { createFileRoute } from "@tanstack/react-router";
import { clubsContent } from "@/content/clubs";
import { pageSeo } from "@/i18n/seo";
import { ClubsPage } from "@/pages/clubs";

export const Route = createFileRoute("/clubs")({
  head: ({ match }) => {
    const m = clubsContent[match.context.locale].meta;
    return pageSeo("/clubs", match.context.locale, {
      title: m.title,
      description: m.description,
      ogTitle: m.ogTitle,
      ogDescription: m.ogDescription,
    });
  },
  component: ClubsPage,
});
