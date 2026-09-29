import { createFileRoute } from "@tanstack/react-router";
import { topicPage } from "@/content/topics";
import { topicHead } from "@/i18n/topic-seo";
import { TopicPage } from "@/pages/topic";

const page = topicPage("/pricing");

export const Route = createFileRoute("/pricing")({
  head: () => topicHead(page),
  component: () => <TopicPage page={page} />,
});
