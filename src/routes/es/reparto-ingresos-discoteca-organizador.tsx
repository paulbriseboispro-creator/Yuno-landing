import { createFileRoute } from "@tanstack/react-router";
import { topicPage } from "@/content/topics";
import { topicHead } from "@/i18n/topic-seo";
import { TopicPage } from "@/pages/topic";

const page = topicPage("/es/reparto-ingresos-discoteca-organizador");

export const Route = createFileRoute("/es/reparto-ingresos-discoteca-organizador")({
  head: () => topicHead(page),
  component: () => <TopicPage page={page} />,
});
