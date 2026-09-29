import { createFileRoute } from "@tanstack/react-router";
import { topicPage } from "@/content/topics";
import { topicHead } from "@/i18n/topic-seo";
import { TopicPage } from "@/pages/topic";

const page = topicPage("/promoter-tracking-software");

export const Route = createFileRoute("/promoter-tracking-software")({
  head: () => topicHead(page),
  component: () => <TopicPage page={page} />,
});
