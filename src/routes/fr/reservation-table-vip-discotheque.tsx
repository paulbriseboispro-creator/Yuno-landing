import { createFileRoute } from "@tanstack/react-router";
import { topicPage } from "@/content/topics";
import { topicHead } from "@/i18n/topic-seo";
import { TopicPage } from "@/pages/topic";

const page = topicPage("/fr/reservation-table-vip-discotheque");

export const Route = createFileRoute("/fr/reservation-table-vip-discotheque")({
  head: () => topicHead(page),
  component: () => <TopicPage page={page} />,
});
