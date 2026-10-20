import { createFileRoute } from "@tanstack/react-router";
import { landingHead } from "@/i18n/landing-seo";
import { LandingPage } from "@/pages/landing";

// "/" — the main landing in English (French at /fr, Spanish at /es).
export const Route = createFileRoute("/")({
  head: () => landingHead("en"),
  component: () => <LandingPage lang="en" />,
});
