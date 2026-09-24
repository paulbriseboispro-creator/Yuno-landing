import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { llmsFull } from "@/i18n/llms";

// /llms-full.txt — the whole landing (EN · FR · ES) as markdown for AI assistants.
export const Route = createFileRoute("/llms-full.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(llmsFull(), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
