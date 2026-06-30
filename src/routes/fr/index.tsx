import { createFileRoute } from "@tanstack/react-router";
import { selectContent } from "@/content/select";
import { pageSeo } from "@/i18n/seo";
import { RoleSelectPage } from "@/pages/role-select";

// French twin of "/". The root resolves locale=fr from the /fr path, so head()
// and every hook render in French.
export const Route = createFileRoute("/fr/")({
  head: ({ match }) => {
    const m = selectContent[match.context.locale].meta;
    return pageSeo("/", match.context.locale, {
      title: m.title,
      description: m.description,
      ogDescription: m.ogDescription,
    });
  },
  component: RoleSelectPage,
});
