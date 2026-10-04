import { createFileRoute } from "@tanstack/react-router";
import { parseStartProduct, parseStartRole, startHead } from "@/i18n/start";
import { StartPage } from "@/pages/start";

// Direct path to a Yuno pro account (en). ?role=club|organizer skips the
// first question; ?product=crm opens a Yuno CRM account. See src/pages/start.tsx.
export const Route = createFileRoute("/start")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { role?: "club" | "organizer"; product?: "crm" } => {
    const role = parseStartRole(search.role);
    const product = parseStartProduct(search.product);
    return { ...(role ? { role } : {}), ...(product ? { product } : {}) };
  },
  head: ({ match }) => startHead("en", match.search.product),
  component: function Start() {
    const { role, product } = Route.useSearch();
    return <StartPage lang="en" role={role} product={product} />;
  },
});
