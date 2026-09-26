import { createFileRoute, redirect } from "@tanstack/react-router";

// The former French-only BDE page, replaced by the student-association landing.
// Kept as a permanent redirect so the links already handed to BDEs keep working.
export const Route = createFileRoute("/bde")({
  beforeLoad: () => {
    throw redirect({ href: "/fr/associations", statusCode: 301 });
  },
});
