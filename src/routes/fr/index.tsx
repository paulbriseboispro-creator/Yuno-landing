import { createFileRoute } from "@tanstack/react-router";
import { landingHead } from "@/i18n/landing-seo";
import { LandingPage } from "@/pages/landing";

// French twin of "/".
export const Route = createFileRoute("/fr/")({
  head: () => landingHead("fr"),
  component: () => <LandingPage lang="fr" />,
});
