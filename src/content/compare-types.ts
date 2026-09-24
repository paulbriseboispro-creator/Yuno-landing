// Shape of a "Yuno vs <competitor>" page. Every claim about the competitor must
// be public, dated and listed in `sources` (EU comparative-advertising rules:
// objective, verifiable, not misleading, not denigrating).
import type { LandingLang } from "@/i18n/landing-lang";

export type CompareVerdict = "yuno" | "other" | "tie";

export type ComparePageContent = {
  id: string;
  lang: LandingLang;
  // Absolute path of this page ("/fr/alternative-shotgun").
  path: string;
  // Same page in other languages, by landing language.
  twins: Partial<Record<LandingLang, string>>;
  competitor: string;
  // ISO date of the last fact check (sitemap, dateModified, visible stamp).
  updated: string;
  meta: { title: string; description: string; ogAlt: string };
  breadcrumb: { home: string; current: string };
  hero: {
    kicker: string;
    title: string;
    sub: string;
    primary: string;
    secondary: string;
    updatedLabel: string;
  };
  tldr: { title: string; items: string[] };
  table: {
    eyebrow: string;
    title: string;
    sub: string;
    colCriterion: string;
    colYuno: string;
    colOther: string;
    rows: { criterion: string; yuno: string; other: string; verdict: CompareVerdict }[];
    footnote: string;
  };
  about: { eyebrow: string; title: string; paragraphs: string[] };
  choose: {
    eyebrow: string;
    title: string;
    other: { title: string; items: string[] };
    yuno: { title: string; items: string[] };
  };
  switch: {
    eyebrow: string;
    title: string;
    sub: string;
    steps: { title: string; body: string }[];
  };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  related: { title: string; links: { label: string; href: string }[] };
  sources: { title: string; items: { label: string; url: string }[] };
  disclaimer: string;
};
