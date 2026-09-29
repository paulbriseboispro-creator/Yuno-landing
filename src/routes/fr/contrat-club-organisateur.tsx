import { createFileRoute } from "@tanstack/react-router";
import { topicPage } from "@/content/topics";
import { topicHead } from "@/i18n/topic-seo";
import { TopicPage } from "@/pages/topic";

const page = topicPage("/fr/contrat-club-organisateur");

export const Route = createFileRoute("/fr/contrat-club-organisateur")({
  head: () => topicHead(page),
  component: () => <TopicPage page={page} />,
});
