// Registry of the Yuno CRM content pages (crm.yunoapp.eu/fr/…). Paths live in
// src/i18n/crm-pages.ts; the sitemap, /llms-full.txt and the CRM footer read
// this list, so a page added here is picked up everywhere.
import { CRM_PAGE, type CrmPageId } from "@/i18n/crm-pages";
import type { CrmPageContent } from "./types";
import { club } from "./club";
import { organizer } from "./organizer";
import { shotgun } from "./shotgun";
import { brevo } from "./brevo";
import { guides } from "./guides";
import { instagram } from "./instagram";
import { exportGuide } from "./export";
import { sms } from "./sms";
import { loyalty } from "./loyalty";

export const CRM_PAGES: Record<CrmPageId, CrmPageContent> = {
  club,
  organizer,
  shotgun,
  brevo,
  guides,
  instagram,
  export: exportGuide,
  sms,
  loyalty,
};

export const CRM_PAGE_LIST: CrmPageContent[] = Object.values(CRM_PAGES);

export function crmPagePath(id: CrmPageId): string {
  return CRM_PAGE[id];
}

// Guides sit under the guides hub in the breadcrumb.
export function crmPageParent(page: CrmPageContent): CrmPageId | null {
  return page.kind === "guide" ? "guides" : null;
}
