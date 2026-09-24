import { createFileRoute } from "@tanstack/react-router";
import { comparePage } from "@/content/compare";
import { compareHead } from "@/i18n/compare-seo";
import { ComparePage } from "@/pages/compare";

// English twin of /fr/alternative-shotgun.
const page = comparePage("/alternative-shotgun");

export const Route = createFileRoute("/alternative-shotgun")({
  head: () => compareHead(page),
  component: () => <ComparePage page={page} />,
});
