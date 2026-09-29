// Shape of a "topic" page: one search intent = one page (VIP tables, promoter
// tracking, club × organizer split, pricing, a city…). Answer-first so that
// Google and AI assistants can lift a passage: a direct answer block, a
// keyword-bearing feature grid, an optional data table, steps, real proof
// numbers, FAQ, related pages. Every fact comes from docs/yuno-context.md.
import type { LandingLang } from "@/i18n/landing-lang";

export type TopicPageContent = {
  // Same id across the language versions of one page ("vip-tables").
  id: string;
  lang: LandingLang;
  // Absolute path of this page ("/fr/reservation-table-vip-discotheque").
  path: string;
  // The same page in the other languages, by landing language.
  twins: Partial<Record<LandingLang, string>>;
  // ISO date of the last meaningful copy update (sitemap, dateModified, stamp).
  updated: string;
  meta: { title: string; description: string; ogAlt: string };
  breadcrumb: { home: string; current: string };
  hero: {
    kicker: string;
    title: string;
    sub: string;
    primary: string;
    secondary: string;
    // Three short reassurance chips under the buttons.
    note?: string[];
  };
  // The direct answer to the query, in plain sentences (what an AI quotes).
  answer: { title: string; paragraphs: string[]; bullets?: string[] };
  features: {
    eyebrow: string;
    title: string;
    sub?: string;
    items: { title: string; body: string }[];
  };
  // Optional data table (fees, comparison, example). `head.length` columns.
  table?: {
    eyebrow: string;
    title: string;
    sub?: string;
    head: string[];
    rows: string[][];
    footnote?: string;
  };
  steps: {
    eyebrow: string;
    title: string;
    sub?: string;
    items: { title: string; body: string }[];
  };
  // Real numbers only (traction, worked example). Skip rather than invent.
  proof?: {
    eyebrow: string;
    title: string;
    sub?: string;
    stats: { value: string; label: string }[];
    note?: string;
  };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  related: { title: string; links: { label: string; href: string }[] };
  sources?: { title: string; items: { label: string; url: string }[]; disclaimer?: string };
};
