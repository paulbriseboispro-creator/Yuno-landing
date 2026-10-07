import { createFileRoute } from "@tanstack/react-router";
import { CRM_PAGES } from "@/content/crm-pages";
import { crmPageHead } from "@/i18n/crm-page-seo";
import { CrmContentPage } from "@/pages/crm-page";

// Yuno CRM content page on crm.yunoapp.eu (copy: src/content/crm-pages/).
export const Route = createFileRoute("/fr/guides/fideliser-public-boite-de-nuit")({
  head: () => crmPageHead(CRM_PAGES.loyalty),
  component: () => <CrmContentPage page={CRM_PAGES.loyalty} />,
});
