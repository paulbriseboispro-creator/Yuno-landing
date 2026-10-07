// Paths of the Yuno CRM content pages (French, for the French market): one
// search intent = one page. They live on crm.yunoapp.eu at these exact paths
// (no rewrite), 301 there from landing.yunoapp.eu, and render with the CRM
// page's own nav and footer. Kept free of copy so the router and the host
// middleware can import it cheaply. Copy: src/content/crm-pages/*.
export const CRM_PAGE = {
  club: "/fr/crm-boite-de-nuit",
  organizer: "/fr/crm-organisateur-soiree",
  shotgun: "/fr/shotgun-crm",
  brevo: "/fr/yuno-crm-ou-brevo",
  guides: "/fr/guides",
  instagram: "/fr/guides/lien-story-instagram-shotgun",
  export: "/fr/guides/exporter-acheteurs-shotgun",
  sms: "/fr/guides/sms-soiree",
  loyalty: "/fr/guides/fideliser-public-boite-de-nuit",
} as const;

export type CrmPageId = keyof typeof CRM_PAGE;

export const CRM_PAGE_PATHS: ReadonlySet<string> = new Set(Object.values(CRM_PAGE));

export function isCrmPagePath(path: string): boolean {
  return CRM_PAGE_PATHS.has(path.length > 1 ? path.replace(/\/+$/, "") : path);
}
