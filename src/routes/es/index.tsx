import { createFileRoute } from "@tanstack/react-router";
import { landingHead } from "@/i18n/landing-seo";
import { LandingPage } from "@/pages/landing";

// Spanish landing. Only the landing exists in Spanish; the rest of the site
// stays EN/FR.
export const Route = createFileRoute("/es/")({
  head: () => landingHead("es"),
  component: () => <LandingPage lang="es" />,
});
