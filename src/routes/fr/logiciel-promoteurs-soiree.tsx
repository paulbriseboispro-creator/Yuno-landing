import { createFileRoute } from "@tanstack/react-router";
import { topicPage } from "@/content/topics";
import { topicHead } from "@/i18n/topic-seo";
import { TopicPage } from "@/pages/topic";

const page = topicPage("/fr/logiciel-promoteurs-soiree");

export const Route = createFileRoute("/fr/logiciel-promoteurs-soiree")({
  head: () => topicHead(page),
  component: () => <TopicPage page={page} />,
});
