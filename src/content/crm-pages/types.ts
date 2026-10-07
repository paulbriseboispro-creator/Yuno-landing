// Shape of a Yuno CRM content page (crm.yunoapp.eu/fr/…): one search intent =
// one page, answer first so Google and AI assistants can lift a passage, then
// blocks in the CRM design, a FAQ fully in the HTML, sources, related pages.
// Facts must hold against the yuno repo (what the Console really does) and,
// for any other tool, against a public page listed in `sources` with its date.
//
// Inline text accepts `**bold**` and links `[label](target)`, where target is
// `page:<id>` (another CRM page), `home` / `home#tarifs` (the CRM page) or an
// absolute https URL.
import type { CrmPageId } from "@/i18n/crm-pages";

export type CrmTextBlock = {
  type: "text";
  id?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type CrmCardsBlock = {
  type: "cards";
  id?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  sub?: string;
  items: { title: string; body: string }[];
};

export type CrmStepsBlock = {
  type: "steps";
  id?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  sub?: string;
  items: { title: string; body: string }[];
};

export type CrmTableBlock = {
  type: "table";
  id?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  sub?: string;
  head: string[];
  rows: string[][];
  footnote?: string;
};

// A call to action band between two blocks.
export type CrmCalloutBlock = { type: "callout"; title: string; body: string; cta: string };

// An interactive tool rendered by the page (src/components/crm/pages/*).
export type CrmToolBlock = {
  type: "tool";
  tool: "shotgun-links";
  id?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  sub?: string;
};

// A list of other CRM pages (the guides hub).
export type CrmLinksBlock = {
  type: "links";
  id?: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  sub?: string;
  pages: CrmPageId[];
};

export type CrmPageBlock =
  | CrmTextBlock
  | CrmCardsBlock
  | CrmStepsBlock
  | CrmTableBlock
  | CrmCalloutBlock
  | CrmToolBlock
  | CrmLinksBlock;

export type CrmPageContent = {
  id: CrmPageId;
  // solution = a product page for a profile or a tool; guide = how-to
  // (Article in JSON-LD); compare = honest comparison; hub = list of guides.
  kind: "solution" | "guide" | "compare" | "hub";
  // ISO dates (sitemap, JSON-LD, the stamp under the title).
  published: string;
  updated: string;
  meta: { title: string; description: string };
  // Breadcrumb label of this page; guides sit under the guides hub.
  crumb: string;
  // How other pages present this one (related cards, hub list).
  card: { title: string; body: string };
  hero: {
    kicker: string;
    title: string;
    accent: string;
    sub: string;
    cta: string;
    note?: string[];
  };
  // The direct answer to the query, in a few plain sentences.
  answer?: { title: string; paragraphs: string[]; bullets?: string[] };
  blocks: CrmPageBlock[];
  faq?: { title: string; accent?: string; items: { q: string; a: string }[] };
  sources?: { title: string; note?: string; items: { label: string; url: string }[] };
  related: CrmPageId[];
};
