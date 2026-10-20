import { createFileRoute } from "@tanstack/react-router";
import { parseStartPrefill, parseStartProduct, parseStartRole, startHead } from "@/i18n/start";
import { StartPage } from "@/pages/start";

// Direct path to a Yuno pro account (fr). ?role=club|organizer skips the
// first question; ?product=crm opens a Yuno CRM account. See src/pages/start.tsx.
export const Route = createFileRoute("/fr/start")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { role?: "club" | "organizer"; product?: "crm"; email?: string; org?: string } => {
    const role = parseStartRole(search.role);
    const product = parseStartProduct(search.product);
    return { ...(role ? { role } : {}), ...(product ? { product } : {}), ...parseStartPrefill(search) };
  },
  head: ({ match }) => startHead("fr", match.search.product),
  component: function Start() {
    const { role, product, email, org } = Route.useSearch();
    return <StartPage lang="fr" role={role} product={product} email={email} org={org} />;
  },
});
