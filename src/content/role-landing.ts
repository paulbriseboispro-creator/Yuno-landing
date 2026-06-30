// Shared content shape for the role-focused landings (Owner de club -> /clubs,
// Organisateur -> /organizers). Both pages render the same section skeleton via
// <RoleLanding>, modelled on the standalone /bde landing the team liked: a
// scroll-parallax hero of product screens, at-a-glance promises, a price angle,
// an audience/feature pair, a phone showcase, a premium grid, a money block, an
// optional collab block, a comparison table, a 3D dashboard marquee, three
// steps, an FAQ and a final CTA.
//
// Unlike /bde (French-only, noindex, private link) these landings are BILINGUAL
// and indexed — each content file is a Record<Locale, RoleLandingContent> so the
// French copy is checked against the English shape at compile time. The images
// (parallax screens, marquee wall, showcase phone) are supplied per page via the
// RoleImages prop, not stored here.

export type RoleQuickPoint = { icon: string; title: string; body: string };
export type RoleFeature = { title: string; body: string };
export type RoleCompareRow = {
  label: string;
  a: string | boolean;
  b: string | boolean;
  highlight?: boolean;
};
export type RoleStep = { n: string; title: string; body: string };
export type RoleFaqItem = { q: string; a: string };

export type RoleLandingContent = {
  // Read by the route head() — keep title/description/og* so the existing
  // clubs/organizers route files don't need to change.
  meta: {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
  };
  // Scoped header nav — section anchors on this landing (href like "#salle").
  nav: { label: string; href: string }[];
  hero: {
    badge: string;
    titleLead: string;
    titleEmphasis: string;
    titleRest?: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    note?: string;
  };
  quickPoints: RoleQuickPoint[];
  // The price / offer angle.
  free: {
    tag: string;
    title: string;
    body: string;
    bullets: string[];
    caption?: string;
  };
  // Left-copy / right-list pair.
  audience: { tag: string; title: string; body: string; bullets: string[] };
  // Phone screen paired with three feature callouts. `demo` optionally links the
  // device to a live page.
  showcase: {
    tag: string;
    title: string;
    body: string;
    demo?: { label: string; href: string };
    imageAlt: string;
    features: RoleFeature[];
  };
  premium: { tag: string; title: string; body: string; bullets: string[] };
  // Single highlighted money block (no bullets).
  payout: { tag: string; title: string; body: string };
  // Optional connect-a-partner block (Yuno Collab).
  collab?: { tag: string; title: string; body: string; bullets: string[] };
  comparison: {
    eyebrow: string;
    title: string;
    colA: string;
    colB: string;
    rows: RoleCompareRow[];
    footer: string;
  };
  marquee: { eyebrow: string; title: string; sub: string };
  steps: { tag: string; title: string; items: RoleStep[] };
  faq: { eyebrow: string; title: string; items: RoleFaqItem[] };
  cta: { title: string; body: string; button: string; note?: string };
};

// Images for one role landing, supplied by the page component. `parallax` needs
// 15 entries (three rows of five) to fill HeroParallax; `marquee` is the wall of
// dashboard screens; `showcase` is the single phone capture.
export type RoleImages = {
  parallax: { title: string; thumbnail: string }[];
  marquee: string[];
  showcase: string;
};
