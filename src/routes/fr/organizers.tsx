import { createFileRoute } from "@tanstack/react-router";
import { organizersContent } from "@/content/organizers";
import { pageSeo } from "@/i18n/seo";
import { validateOrgaSearch } from "@/lib/search-params";
import { OrganizersPage } from "@/pages/organizers";

export const Route = createFileRoute("/fr/organizers")({
  validateSearch: validateOrgaSearch,
  head: ({ match }) => {
    const m = organizersContent[match.context.locale].meta;
    return pageSeo("/organizers", match.context.locale, {
      title: m.title,
      description: m.description,
      ogTitle: m.ogTitle,
      ogDescription: m.ogDescription,
    });
  },
  component: OrganizersPage,
});
