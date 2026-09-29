import { createFileRoute } from "@tanstack/react-router";
import { topicPage } from "@/content/topics";
import { topicHead } from "@/i18n/topic-seo";
import { TopicPage } from "@/pages/topic";

const page = topicPage("/es/software-reservados-discoteca");

export const Route = createFileRoute("/es/software-reservados-discoteca")({
  head: () => topicHead(page),
  component: () => <TopicPage page={page} />,
});
