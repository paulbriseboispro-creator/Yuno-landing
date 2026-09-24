import { createFileRoute } from "@tanstack/react-router";
import { parseStartRole, startHead } from "@/i18n/start";
import { StartPage } from "@/pages/start";

// Direct path to a Yuno pro account (es). ?role=club|organizer skips the
// first question. See src/pages/start.tsx.
export const Route = createFileRoute("/es/start")({
  validateSearch: (search: Record<string, unknown>): { role?: "club" | "organizer" } => {
    const role = parseStartRole(search.role);
    return role ? { role } : {};
  },
  head: () => startHead("es"),
  component: function Start() {
    const { role } = Route.useSearch();
    return <StartPage lang="es" role={role} />;
  },
});
