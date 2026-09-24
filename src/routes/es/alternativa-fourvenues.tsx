import { createFileRoute } from "@tanstack/react-router";
import { comparePage } from "@/content/compare";
import { compareHead } from "@/i18n/compare-seo";
import { ComparePage } from "@/pages/compare";

// Spanish-only comparison page targeting "alternativa a fourvenues", "fourvenues precio".
const page = comparePage("/es/alternativa-fourvenues");

export const Route = createFileRoute("/es/alternativa-fourvenues")({
  head: () => compareHead(page),
  component: () => <ComparePage page={page} />,
});
