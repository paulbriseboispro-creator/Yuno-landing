import { createFileRoute } from "@tanstack/react-router";
import { topicPage } from "@/content/topics";
import { topicHead } from "@/i18n/topic-seo";
import { TopicPage } from "@/pages/topic";

const page = topicPage("/club-organizer-revenue-split");

export const Route = createFileRoute("/club-organizer-revenue-split")({
  head: () => topicHead(page),
  component: () => <TopicPage page={page} />,
});
