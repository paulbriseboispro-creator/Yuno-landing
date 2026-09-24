import { createFileRoute } from "@tanstack/react-router";
import { comparePage } from "@/content/compare";
import { compareHead } from "@/i18n/compare-seo";
import { ComparePage } from "@/pages/compare";

// French comparison page targeting "shotgun pro", "shotgun billetterie", "alternative shotgun".
const page = comparePage("/fr/alternative-shotgun");

export const Route = createFileRoute("/fr/alternative-shotgun")({
  head: () => compareHead(page),
  component: () => <ComparePage page={page} />,
});
