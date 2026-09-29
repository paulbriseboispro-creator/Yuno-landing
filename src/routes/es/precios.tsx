import { createFileRoute } from "@tanstack/react-router";
import { topicPage } from "@/content/topics";
import { topicHead } from "@/i18n/topic-seo";
import { TopicPage } from "@/pages/topic";

const page = topicPage("/es/precios");

export const Route = createFileRoute("/es/precios")({
  head: () => topicHead(page),
  component: () => <TopicPage page={page} />,
});
