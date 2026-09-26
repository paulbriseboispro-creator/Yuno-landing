import { createFileRoute } from "@tanstack/react-router";
import { assoHead } from "@/i18n/asso";
import { AssoPage } from "@/pages/asso";

// Student-association landing (es). See src/pages/asso.tsx.
export const Route = createFileRoute("/es/asociaciones")({
  head: () => assoHead("es"),
  component: () => <AssoPage lang="es" />,
});
