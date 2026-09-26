import { createFileRoute } from "@tanstack/react-router";
import { assoHead } from "@/i18n/asso";
import { AssoPage } from "@/pages/asso";

// Student-association landing (en). The root sends French and Spanish browsers
// to their page. See src/pages/asso.tsx.
export const Route = createFileRoute("/associations")({
  head: () => assoHead("en"),
  component: () => <AssoPage lang="en" />,
});
