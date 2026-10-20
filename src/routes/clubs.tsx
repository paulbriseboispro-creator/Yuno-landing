import { createFileRoute, redirect } from "@tanstack/react-router";

// Retired on 20/10/2026 (Paul): this page belonged to the old site, before the
// main landing was rebuilt (24/09). Kept as a permanent redirect so the links
// already shared and indexed land on the real landing.
export const Route = createFileRoute("/clubs")({
  beforeLoad: () => {
    throw redirect({ href: "/", statusCode: 301 });
  },
});
