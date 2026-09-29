import { createFileRoute } from "@tanstack/react-router";
import { comparePage } from "@/content/compare";
import { compareHead } from "@/i18n/compare-seo";
import { ComparePage } from "@/pages/compare";

// English comparison page targeting "dice alternative", "dice fees", "dice alternative club nights".
const page = comparePage("/dice-alternative");

export const Route = createFileRoute("/dice-alternative")({
  head: () => compareHead(page),
  component: () => <ComparePage page={page} />,
});
