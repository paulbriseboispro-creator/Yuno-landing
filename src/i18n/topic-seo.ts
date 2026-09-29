import type { TopicPageContent } from "@/content/topic-types";
import { landingContent } from "@/content/landing";
import { landingUrl } from "@/i18n/landing-lang";
import { ogImageMeta, ogImageUrl } from "@/i18n/og";
import { ORG_ID, organizationLd, softwareAppLd } from "@/i18n/landing-seo";
import { SITE_ORIGIN } from "@/i18n/seo";

const OG_LOCALE = { en: "en_GB", fr: "fr_FR", es: "es_ES" } as const;

export function topicUrl(page: TopicPageContent): string {
  return SITE_ORIGIN + page.path;
}

// head() for a topic page: meta/OG (the landing's per-language preview image),
// self canonical, hreflang across the language twins, and one JSON-LD @graph
// (Organization, WebPage with author and dates, BreadcrumbList, the shared
// SoftwareApplication node, FAQPage generated from the visible FAQ).
export function topicHead(page: TopicPageContent) {
  const self = topicUrl(page);
  const twins = Object.entries(page.twins) as [string, string][];
  const xDefault = page.twins.en ?? page.path;
  const image = ogImageUrl(page.lang);

  const graph = [
    organizationLd(page.lang),
    {
      "@type": "WebPage",
      "@id": `${self}#webpage`,
      url: self,
      name: page.meta.title,
      description: page.meta.description,
      inLanguage: page.lang,
      datePublished: page.updated,
      dateModified: page.updated,
      author: { "@type": "Person", name: "Paul Brisebois", jobTitle: "Founder, Yuno" },
      publisher: { "@id": ORG_ID },
      about: { "@id": `${SITE_ORIGIN}/#software` },
      primaryImageOfPage: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
      breadcrumb: { "@id": `${self}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${self}#breadcrumb`,
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
    softwareAppLd(page.lang),
    {
      "@type": "FAQPage",
      "@id": `${self}#faq`,
      inLanguage: page.lang,
      isPartOf: { "@id": `${self}#webpage` },
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
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Yuno" },
      { property: "og:title", content: page.meta.title },
      { property: "og:description", content: page.meta.description },
      { property: "og:url", content: self },
      { property: "og:locale", content: OG_LOCALE[page.lang] },
      ...ogImageMeta(page.lang),
      { name: "twitter:title", content: page.meta.title },
      { name: "twitter:description", content: page.meta.description },
      { property: "article:modified_time", content: page.updated },
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

// Plain markdown of a topic page for /llms-full.txt.
export function topicMarkdown(page: TopicPageContent): string {
  const out: string[] = [
    `# ${page.meta.title}`,
    "",
    `URL: ${topicUrl(page)} · ${page.updated}`,
    "",
    `> ${page.meta.description}`,
    "",
    `## ${page.answer.title}`,
    "",
    ...page.answer.paragraphs.flatMap((p) => [p, ""]),
    ...(page.answer.bullets ? [...page.answer.bullets.map((b) => `- ${b}`), ""] : []),
    `## ${page.features.title}`,
    "",
    ...page.features.items.flatMap((it) => [`### ${it.title}`, "", it.body, ""]),
  ];
  if (page.table) {
    out.push(
      `## ${page.table.title}`,
      "",
      `| ${page.table.head.join(" | ")} |`,
      `|${page.table.head.map(() => "---").join("|")}|`,
      ...page.table.rows.map((r) => `| ${r.join(" | ")} |`),
      "",
      ...(page.table.footnote ? [`_${page.table.footnote}_`, ""] : []),
    );
  }
  out.push(
    `## ${page.steps.title}`,
    "",
    ...page.steps.items.map((s, i) => `${i + 1}. **${s.title}.** ${s.body}`),
    "",
  );
  if (page.proof) {
    out.push(
      `## ${page.proof.title}`,
      "",
      ...page.proof.stats.map((s) => `- **${s.value}** — ${s.label}`),
      "",
    );
  }
  out.push(
    `## ${page.faq.title}`,
    "",
    ...page.faq.items.flatMap((it) => [`### ${it.q}`, "", it.a, ""]),
    `${landingContent[page.lang].meta.entity}`,
  );
  return out.join("\n");
}
