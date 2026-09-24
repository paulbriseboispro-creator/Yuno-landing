import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { llmsIndex } from "@/i18n/llms";

// /llms.txt — short, citable summary of Yuno for AI assistants (llmstxt.org).
export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(llmsIndex(), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
