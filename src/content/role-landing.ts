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

// A single need / pain point a visitor can self-select. Picking one (via the
// PainChips row, persisted in the ?besoin= URL param) re-leads the hero and
// hoists a grounded "focus" proof block — its own copy + a real screenshot —
// above the standard sections. Every pain maps to a CONFIRMED Yuno feature; the
// copy is grounded in the app PRD/audit, never invented. Image + parallax wiring
// is locale-independent and lives in the page component (painImages /
// painLeadScreens, both keyed by this `id`), so the content stays purely textual.
export type RolePain = {
  id: string;
  chipLabel: string;
  hero: {
    badge: string;
    titleLead: string;
    titleEmphasis: string;
    titleRest?: string;
    subtitle: string;
  };
  focus: {
    tag: string;
    title: string;
    body: string;
    bullets: string[];
    caveat?: string;
  };
  contactLabel: string;
};
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
  // Needs-based selector. When present, the landing renders a PainChips row under
  // the hero and adapts to the active ?besoin=. `defaultPainId` is the pain the
  // page leads with when no param is set (the wedge).
  pains?: RolePain[];
  defaultPainId?: string;
};

// Images for one role landing, supplied by the page component. `parallax` needs
// 15 entries (three rows of five) to fill HeroParallax; `marquee` is the wall of
// dashboard screens; `showcase` is the single phone capture.
export type RoleImages = {
  parallax: { title: string; thumbnail: string }[];
  marquee: string[];
  showcase: string;
  // Optional second phone capture. When supplied, the showcase renders TWO phone
  // screens side by side (e.g. tickets + guest list, then VIP tables + floor plan)
  // because they don't fit legibly on one. Absent → the single-phone layout.
  showcaseAlt?: string;
  // Real screenshots keyed by RolePain.id — the proof image for each pain's
  // hoisted focus block. Supplied by the page component.
  painImages?: Record<string, string>;
  // Optional second real screenshot, shown as an overlapping inset on the focus
  // block (md+ only) so a pain can prove two surfaces at once (e.g. VIP plan +
  // live minimum-spend). Keyed by RolePain.id.
  painImagesAlt?: Record<string, string>;
};
