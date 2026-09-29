import { createFileRoute } from "@tanstack/react-router";
import { topicPage } from "@/content/topics";
import { topicHead } from "@/i18n/topic-seo";
import { TopicPage } from "@/pages/topic";

const page = topicPage("/es/software-discotecas-madrid");

export const Route = createFileRoute("/es/software-discotecas-madrid")({
  head: () => topicHead(page),
  component: () => <TopicPage page={page} />,
});
