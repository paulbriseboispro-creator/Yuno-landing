import { createFileRoute } from "@tanstack/react-router";
import { selectContent } from "@/content/select";
import { pageSeo } from "@/i18n/seo";
import { RoleSelectPage } from "@/pages/role-select";

// "/" is now the role-selection gate (Owner de club / Organisateur), replacing
// the old overloaded home. The old home component (pages/index.tsx) is kept in
// the repo but no longer routed.
export const Route = createFileRoute("/")({
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
