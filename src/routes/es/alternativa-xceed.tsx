import { createFileRoute } from "@tanstack/react-router";
import { comparePage } from "@/content/compare";
import { compareHead } from "@/i18n/compare-seo";
import { ComparePage } from "@/pages/compare";

// Spanish comparison page targeting "alternativa a xceed", "xceed comisión", "xceed pro precio".
const page = comparePage("/es/alternativa-xceed");

export const Route = createFileRoute("/es/alternativa-xceed")({
  head: () => compareHead(page),
  component: () => <ComparePage page={page} />,
});
