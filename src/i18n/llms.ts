// Plain-markdown renderings of the landing for language models (/llms.txt and
// /llms-full.txt). Built from the same shape-checked copy as the page, so the
// facts an AI assistant reads can never drift from what visitors see.
import { landingContent } from "@/content/landing";
import {
  LANDING_LANGS,
  LANDING_LANG_LABELS,
  landingUrl,
  type LandingLang,
} from "@/i18n/landing-lang";
import { LANDING_UPDATED } from "@/i18n/landing-seo";
import { COMPARE_PAGES } from "@/content/compare";
import { compareMarkdown } from "@/i18n/compare-seo";
import { SITE_ORIGIN } from "@/i18n/seo";

const HEADINGS: Record<
  LandingLang,
  {
    facts: string;
    product: string;
    solutions: string;
    howItWorks: string;
    pricing: string;
    compare: string;
    crm: string;
    traction: string;
    faq: string;
    contact: string;
  }
> = {
  en: {
    facts: "Key facts",
    product: "Product",
    solutions: "Who it is for",
    howItWorks: "How a night runs on Yuno",
    pricing: "Pricing",
    compare: "Yuno compared with other ticketing platforms",
    crm: "CRM & emailing",
    traction: "Where Yuno stands",
    faq: "FAQ",
    contact: "Contact",
  },
  fr: {
    facts: "L'essentiel",
    product: "Produit",
    solutions: "Pour qui",
    howItWorks: "Une soirée avec Yuno",
    pricing: "Tarifs",
    compare: "Yuno comparé aux autres billetteries",
    crm: "CRM & emailing",
    traction: "Où en est Yuno",
    faq: "FAQ",
    contact: "Contact",
  },
  es: {
    facts: "Lo esencial",
    product: "Producto",
    solutions: "Para quién",
    howItWorks: "Una noche con Yuno",
    pricing: "Precios",
    compare: "Yuno comparado con otras ticketeras",
    crm: "CRM y emailing",
    traction: "Dónde está Yuno",
    faq: "FAQ",
    contact: "Contacto",
  },
};

const FOUNDER = "Paul Brisebois (founder) · +33 6 44 21 66 89 (WhatsApp) · https://yunoapp.eu";

// One language's full page, as markdown.
export function landingMarkdown(lang: LandingLang): string {
  const t = landingContent[lang];
  const h = HEADINGS[lang];
  const url = landingUrl(lang);
  const out: string[] = [];

  out.push(`# ${t.meta.title}`, "", `> ${t.meta.entity}`, "", `URL: ${url}`, "");

  out.push(`## ${h.facts}`, "");
  for (const it of t.stats.items) out.push(`- **${it.value} — ${it.label}.** ${it.body}`);
  out.push(`- ${t.hero.sub}`, "");

  out.push(`## ${h.product}`, "", t.pillars.sub, "");
  for (const it of t.pillars.items) out.push(`- **${it.title}:** ${it.body}`);
  out.push("");

  out.push(`## ${h.solutions}`, "");
  for (const tab of t.solutions.tabs) {
    out.push(`### ${tab.label} — ${tab.title}`, "", tab.body, "");
    for (const b of tab.bullets) out.push(`- ${b}`);
    out.push("");
  }

  out.push(`## ${h.howItWorks}`, "");
  for (const s of t.timeline.steps)
    out.push(`- **${s.when} · ${s.label} — ${s.title}.** ${s.body}`);
  out.push("");

  out.push(`## ${h.pricing}`, "", t.pricing.sub, "");
  out.push(
    `| ${t.pricing.colItem} | ${t.pricing.colWho} | ${t.pricing.colAmount} |`,
    "|---|---|---|",
  );
  for (const r of t.pricing.rows) out.push(`| ${r.item} | ${r.who} | ${r.amount} |`);
  out.push("", t.pricing.example, "", `${t.pricing.cardTitle}:`);
  for (const it of t.pricing.included) out.push(`- ${it}`);
  out.push("", t.email.included, "");

  out.push(`## ${h.compare}`, "");
  out.push(
    `| ${t.compare.colPlatform} | ${t.compare.colPays} | ${t.compare.colKeeps} |`,
    "|---|---|---|",
  );
  for (const r of t.compare.rows) out.push(`| ${r.name} | ${r.pays} | ${r.keeps} |`);
  out.push("", t.compare.extra, "", `_${t.compare.footnote}_`, "");

  out.push(`## ${h.crm}`, "", t.email.body, "");
  for (const s of t.email.stats) out.push(`- ${s.value} ${s.label}`);
  out.push(
    "",
    t.email.proof,
    "",
    `${t.email.automationsTitle}: ${t.email.automations.join(", ")}.`,
    "",
  );

  out.push(`## ${h.traction}`, "");
  for (const it of t.traction.items) out.push(`- **${it.value}:** ${it.label}`);
  out.push("");

  out.push(`## ${h.faq}`, "");
  for (const it of t.faq.items) out.push(`### ${it.q}`, "", it.a, "");

  out.push(`## ${h.contact}`, "", FOUNDER, "");
  return out.join("\n");
}

// /llms.txt — the short index (llmstxt.org format).
export function llmsIndex(): string {
  const t = landingContent.en;
  const out = [
    "# Yuno",
    "",
    `> ${t.meta.entity}`,
    "",
    "Yuno (yunoapp.eu) is the nightlife platform — not the payments company y.uno.",
    "",
    ...t.stats.items.map((it) => `- ${it.value} ${it.label.toLowerCase()}: ${it.body}`),
    `- ${t.pricing.example}`,
    `- ${t.traction.items.map((it) => `${it.value}: ${it.label}`).join(". ")}.`,
    "",
    "## Landing pages",
    "",
    ...LANDING_LANGS.map(
      (l) =>
        `- [${LANDING_LANG_LABELS[l]}](${landingUrl(l)}): ${landingContent[l].meta.description}`,
    ),
    "",
    "## Details",
    "",
    `- [Full facts: product, pricing, comparison, FAQ in EN/FR/ES](${SITE_ORIGIN}/llms-full.txt)`,
    `- [Pricing](${SITE_ORIGIN}/#pricing): ${t.pricing.rows.map((r) => `${r.item} ${r.amount}`).join("; ")}.`,
    `- [Comparison with Shotgun, DICE, Eventbrite, Weezevent, Xceed](${SITE_ORIGIN}/#compare)`,
    `- [FAQ](${SITE_ORIGIN}/#faq)`,
    "",
    "## Comparisons",
    "",
    ...COMPARE_PAGES.map(
      (p) => `- [${p.meta.title}](${SITE_ORIGIN + p.path}): ${p.meta.description}`,
    ),
    `- [Contact](${SITE_ORIGIN}/contact): ${FOUNDER}`,
    "",
    "## Optional",
    "",
    `- [Privacy](${SITE_ORIGIN}/privacy)`,
    `- [Terms](${SITE_ORIGIN}/terms)`,
    "",
    `Last updated: ${LANDING_UPDATED}`,
    "",
  ];
  return out.join("\n");
}

// /llms-full.txt — every language's page in full.
export function llmsFull(): string {
  const header = [
    "# Yuno — nightclub ticketing & management software (EN · FR · ES)",
    "",
    `Last updated: ${LANDING_UPDATED}. Source of every fact below: ${LANDING_LANGS.map(landingUrl).join(", ")}.`,
  ].join("\n");
  return [
    header,
    ...LANDING_LANGS.map(landingMarkdown),
    ...COMPARE_PAGES.map(compareMarkdown),
  ].join("\n\n---\n\n");
}
