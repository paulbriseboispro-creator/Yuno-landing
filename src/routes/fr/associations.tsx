import { createFileRoute } from "@tanstack/react-router";
import { assoHead } from "@/i18n/asso";
import { AssoPage } from "@/pages/asso";

// Student-association landing (fr). See src/pages/asso.tsx.
export const Route = createFileRoute("/fr/associations")({
  head: () => assoHead("fr"),
  component: () => <AssoPage lang="fr" />,
});
