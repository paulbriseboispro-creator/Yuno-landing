import type { ComparePageContent } from "@/content/compare-types";
import { landingContent } from "@/content/landing";
import { landingUrl } from "@/i18n/landing-lang";
import { ORG_ID, organizationLd } from "@/i18n/landing-seo";
import { SITE_ORIGIN } from "@/i18n/seo";

const OG_LOCALE = { en: "en_GB", fr: "fr_FR", es: "es_ES" } as const;

export function compareUrl(page: ComparePageContent): string {
  return SITE_ORIGIN + page.path;
}

export function compareOgImage(page: ComparePageContent): string {
  return `${SITE_ORIGIN}/og/vs-${page.id}-${page.lang}.png`;
}

// head() for a comparison page: meta/OG, self canonical, hreflang across its
// language twins, and a JSON-LD @graph (Organization, Article with dates and
// author, BreadcrumbList, FAQPage from the visible FAQ).
export function compareHead(page: ComparePageContent) {
  const self = compareUrl(page);
  const image = compareOgImage(page);
  const twins = Object.entries(page.twins) as [string, string][];
  const xDefault = page.twins.en ?? page.path;

  const graph = [
    organizationLd(page.lang),
    {
      "@type": "Article",
      "@id": `${self}#article`,
      headline: page.meta.title,
      description: page.meta.description,
      url: self,
      mainEntityOfPage: self,
      inLanguage: page.lang,
      image,
      datePublished: page.updated,
      dateModified: page.updated,
      author: { "@type": "Person", name: "Paul Brisebois", jobTitle: "Founder, Yuno" },
      publisher: { "@id": ORG_ID },
      about: [
        { "@type": "SoftwareApplication", name: "Yuno", url: SITE_ORIGIN + "/" },
        { "@type": "SoftwareApplication", name: page.competitor },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: page.breadcrumb.home,
          item: landingUrl(page.lang),
        },
        { "@type": "ListItem", position: 2, name: page.breadcrumb.current, item: self },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${self}#faq`,
      inLanguage: page.lang,
      mainEntity: page.faq.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    },
  ];

  return {
    meta: [
      { title: page.meta.title },
      { name: "description", content: page.meta.description },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:type", content: "article" },
      { property: "og:site_name", content: "Yuno" },
      { property: "og:title", content: page.meta.title },
      { property: "og:description", content: page.meta.description },
      { property: "og:url", content: self },
      { property: "og:locale", content: OG_LOCALE[page.lang] },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:alt", content: page.meta.ogAlt },
      { property: "article:modified_time", content: page.updated },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: page.meta.title },
      { name: "twitter:description", content: page.meta.description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: page.meta.ogAlt },
      { name: "theme-color", content: "#ffffff" },
    ],
    links: [
      { rel: "canonical", href: self },
      ...twins.map(([l, path]) => ({ rel: "alternate", hrefLang: l, href: SITE_ORIGIN + path })),
      { rel: "alternate", hrefLang: "x-default", href: SITE_ORIGIN + xDefault },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      },
    ],
  };
}

// Plain markdown of a comparison page for /llms-full.txt.
export function compareMarkdown(page: ComparePageContent): string {
  const out: string[] = [
    `# ${page.meta.title}`,
    "",
    `URL: ${compareUrl(page)} · ${page.hero.updatedLabel}`,
    "",
    `> ${page.meta.description}`,
    "",
    `## ${page.tldr.title}`,
    "",
    ...page.tldr.items.map((it) => `- ${it}`),
    "",
    `## ${page.table.title}`,
    "",
    `| ${page.table.colCriterion} | ${page.table.colYuno} | ${page.table.colOther} |`,
    "|---|---|---|",
    ...page.table.rows.map((r) => `| ${r.criterion} | ${r.yuno} | ${r.other} |`),
    "",
    `_${page.table.footnote}_`,
    "",
    `## ${page.about.title}`,
    "",
    ...page.about.paragraphs.flatMap((p) => [p, ""]),
    `## ${page.choose.title}`,
    "",
    `### ${page.choose.other.title}`,
    ...page.choose.other.items.map((it) => `- ${it}`),
    "",
    `### ${page.choose.yuno.title}`,
    ...page.choose.yuno.items.map((it) => `- ${it}`),
    "",
    `## ${page.switch.title}`,
    "",
    ...page.switch.steps.map((s, i) => `${i + 1}. **${s.title}.** ${s.body}`),
    "",
    `## ${page.faq.title}`,
    "",
    ...page.faq.items.flatMap((it) => [`### ${it.q}`, "", it.a, ""]),
    `## ${page.sources.title}`,
    "",
    ...page.sources.items.map((s) => `- [${s.label}](${s.url})`),
    "",
    `_${page.disclaimer}_`,
    "",
    `${landingContent[page.lang].meta.entity}`,
  ];
  return out.join("\n");
}
