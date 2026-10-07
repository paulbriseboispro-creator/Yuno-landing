import { createFileRoute } from "@tanstack/react-router";
import { CRM_PAGES } from "@/content/crm-pages";
import { crmPageHead } from "@/i18n/crm-page-seo";
import { CrmContentPage } from "@/pages/crm-page";

// Yuno CRM content page on crm.yunoapp.eu (copy: src/content/crm-pages/).
export const Route = createFileRoute("/fr/crm-boite-de-nuit")({
  head: () => crmPageHead(CRM_PAGES.club),
  component: () => <CrmContentPage page={CRM_PAGES.club} />,
});
