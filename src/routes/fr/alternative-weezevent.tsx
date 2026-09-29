import { createFileRoute } from "@tanstack/react-router";
import { comparePage } from "@/content/compare";
import { compareHead } from "@/i18n/compare-seo";
import { ComparePage } from "@/pages/compare";

// French comparison page targeting "alternative weezevent", "weezevent tarifs", "weezevent commission".
const page = comparePage("/fr/alternative-weezevent");

export const Route = createFileRoute("/fr/alternative-weezevent")({
  head: () => compareHead(page),
  component: () => <ComparePage page={page} />,
});
