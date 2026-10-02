import { createFileRoute } from "@tanstack/react-router";
import { crmHead } from "@/i18n/crm";
import { CrmPage } from "@/pages/crm";

// Yuno CRM (en): keep your ticketing, make your crowd come back. See src/pages/crm.tsx.
export const Route = createFileRoute("/crm")({
  head: () => crmHead("en"),
  component: () => <CrmPage lang="en" />,
});
