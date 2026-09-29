import { createFileRoute } from "@tanstack/react-router";
import { topicPage } from "@/content/topics";
import { topicHead } from "@/i18n/topic-seo";
import { TopicPage } from "@/pages/topic";

const page = topicPage("/fr/guest-list-soiree-logiciel");

export const Route = createFileRoute("/fr/guest-list-soiree-logiciel")({
  head: () => topicHead(page),
  component: () => <TopicPage page={page} />,
});
