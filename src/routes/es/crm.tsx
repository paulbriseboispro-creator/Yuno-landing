import { createFileRoute } from "@tanstack/react-router";
import { crmHead } from "@/i18n/crm";
import { CrmPage } from "@/pages/crm";

// Yuno CRM (es): keep your ticketing, make your crowd come back. See src/pages/crm.tsx.
export const Route = createFileRoute("/es/crm")({
  head: () => crmHead("es"),
  component: () => <CrmPage lang="es" />,
});
