import { createFileRoute, redirect } from "@tanstack/react-router";

// The former BDE contact page: associations now open their account themselves
// from the student-association landing (or write to the founder from there).
export const Route = createFileRoute("/bde_/contact")({
  beforeLoad: () => {
    throw redirect({ href: "/fr/associations", statusCode: 301 });
  },
});
