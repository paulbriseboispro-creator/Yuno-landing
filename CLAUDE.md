# Yuno landing

TanStack Start + React 19 + Tailwind v4, deployed on Cloudflare Workers (`wrangler.jsonc`).
Package manager: bun (`bun run build`, `bunx tsc --noEmit`, `bun run lint`).

## ALWAYS start from the latest version (Paul's rule — non-negotiable)

`main` is often NOT the latest published landing: work lands on `claude/*` branches first.
Starting from `main` silently throws away the newest design and copy. So, before any change:

1. `git fetch origin` (all branches), then list them newest first:
   `git for-each-ref --sort=-committerdate --format='%(committerdate:iso) %(refname:short)' refs/remotes`
2. The latest version is the most recently committed branch that contains the others' landing
   work (check with `git merge-base --is-ancestor`). If unsure which one is published, ask Paul.
3. Merge that branch into your working branch (`git merge origin/<latest>`) BEFORE editing
   anything, and build on it. Never rebuild, revert or "restore" an older landing design.
4. When done, say in your reply which branch/commit you started from.

- Product, pricing, competitor and traction facts: read `docs/yuno-context.md` before writing
  any copy. It supersedes older copy in `src/content/*`.
- The main landing (`/`, `/fr`, `/es`) lives in `src/pages/landing.tsx` +
  `src/components/landing/*`, copy in `src/content/landing.ts` (EN/FR/ES, shape-checked).
- Never mention BDE / student unions on the main landing.
- Other pages (/clubs, /organizers, /pricing, /contact…) are EN/FR only (`src/i18n/locale.tsx`).
- SEO/GEO: keyword targets & positioning in `docs/seo-geo-strategy.md`. Landing head/JSON-LD in
  `src/i18n/landing-seo.ts`; `/llms.txt` + `/llms-full.txt` are generated from the landing copy.
  Bump `LANDING_UPDATED` there when the landing copy changes.
- Sitemap: content in `src/routes/sitemap[.]xml.ts` (plain `<loc>` + `<lastmod>`, no hreflang — pages
  carry it in `<head>`). The build renders it to static `sitemap.xml` + `sitemap-pages.xml`
  (`staticSitemap` in `vite.config.ts`); Search Console reads `sitemap-pages.xml` (26 pages, 29/09/2026),
  `/sitemap.xml` stayed stuck at "couldn't fetch" there. Keep it static and keep both names.
- Comparison pages ("Yuno vs X"): copy in `src/content/compare.ts`, template `src/pages/compare.tsx`.
  Competitor claims must be public, dated and listed in `sources`; never guess a number.
- Topic pages (one search intent = one page: VIP tables, promoters, club × organizer split, guest list,
  pricing, Madrid — EN/FR/ES twins): copy in `src/content/topics/*.ts` (registry `topics/index.ts`, shape
  `topic-types.ts`), template `src/pages/topic.tsx`, head/JSON-LD/markdown in `src/i18n/topic-seo.ts`. One
  route file per path in `src/routes` (copy `vip-table-booking-software.tsx`); sitemap and `llms-full.txt`
  pick them up automatically. `/pricing`, `/fr/pricing`, `/es/precios` are topic pages: the only place
  where pricing is stated, keep it equal to `docs/yuno-context.md`. More "vs" pages: `compare-more.ts`,
  images `bun scripts/og/vs.ts`. Strategy, SERP findings and the weekly GSC/GEO loop: `docs/seo-geo-strategy.md` §9–13.
- Pro signup funnel: `src/components/landing/SignupFlow.tsx` (dialog `SignupModal` + page
  `/start`, `/fr/start`, `/es/start` in `src/pages/start.tsx`). It creates the account on the
  Yuno APP's Supabase (`src/lib/yuno-app.ts`, public key only), tracks every step in the app's
  `pro_signups` (RPC `track_pro_signup`), opens the club / organizer space with
  `complete_pro_signup`, then hands the session to `yunoapp.eu/auth/handoff`. Server side lives
  in the `yuno` repo (migration `20260924120000_pro_self_signup.sql`, super admin
  `/admin/signups`). `demo_leads` (this project's Supabase) is only a fallback safety net now.

## Student-association landing (`/fr/associations`, `/associations`, `/es/asociaciones`)
- Separate audience (BDE, BDS, BDA, ESN…), separate story: page `src/pages/asso.tsx`, sections in
  `src/components/asso/*`, copy in `src/content/asso.ts` (EN/FR/ES, shape-checked), head/JSON-LD in
  `src/i18n/asso.ts` (bump `ASSO_UPDATED` on copy changes), previews `public/og/asso-*.png`
  (`bun run og asso`). Reuses the landing chrome via `LandingProvider home=… whatsappMessage=…`.
- Never linked from the main landing (no student unions there). `/bde` and `/bde/contact` 301 to it.
- Real model (yuno repo): an asso = an organizer account flagged `bde_verified` by a super admin →
  buyer fee minimum €0.49 instead of €0.99 (4 % and the €25 table cap unchanged), nights private by
  default (going public = admin-approved request). Stripe 1.5 % + €0.25 stays on the asso.
- Self-serve signup: `SignupFlow audience="asso"` (no role step, organizer account, own
  sessionStorage journey, `source` = `asso`) — the admin alert reads "via asso" so Paul verifies it
  and sets the flag. Copy says the rate is switched on after verification, never instantly.
- Competitors here are HelloAsso, Shotgun, Lydia/Bizum + forms (sources dated in `switch.sources`).
  Never claim "cheapest" (HelloAsso and Billetweb can cost the asso less).

## Yuno CRM page (crm.yunoapp.eu: `/`, `/fr`, `/es`; routes `/crm`, `/fr/crm`, `/es/crm`)
- **Own domain since 4 Oct 2026: `crm.yunoapp.eu`**, attached to the SAME Worker as
  landing.yunoapp.eu (Cloudflare → yuno-landing → Domains). Single source: `src/i18n/hosts.ts`.
  On the CRM host the router rewrites `/`, `/fr`, `/es` to the `/crm` routes (`rewrite` in
  `src/router.tsx`, both ways), `/start` keeps its paths with `product=crm` implied, the Yuno
  APP's CRM side is relayed to yunoapp.eu (see next bullet), and every other path 301s to
  landing.yunoapp.eu; `landing.yunoapp.eu/crm` (+ fr/es) and
  `/start?product=crm` 301 to the CRM host (`hostMiddleware`, `src/start.ts`). Canonical,
  hreflang, og and JSON-LD of the CRM page and its signup point to crm.yunoapp.eu; its URLs
  live in `sitemap-crm.xml` (static, listed in `public/robots.txt`), not in the landing sitemap.
  A link from a CRM page to the landing (legal pages, the Suite) goes through `landingHref()`;
  the CRM page's own links through `crmPagePaths()`.
- **The Yuno app's CRM side lives on crm.yunoapp.eu too** (Paul, 4 Oct 2026: "tout le CRM passe
  par ce lien"): sign-in `/login`, Console `/crm/*`, Admin CRM `/admin/crm/*`, session handoff
  `/auth/handoff`, `/open/crm`, `/get-started`, 2FA, team invites, the ticketing consoles the CRM
  links to, the app's `/assets/*` and any other file path. `hostRoute` (src/i18n/hosts.ts) sends
  them to `relayToApp`, which fetches `https://yunoapp.eu` + path (a Worker may fetch another
  Worker's custom domain on the same zone) and passes the answer through. The list
  (`APP_PATH_PREFIXES`) mirrors `CRM_PATH_PREFIXES` + `SHARED_PATH_PREFIXES` of
  `src/lib/productHost.ts` in the yuno repo: a new app path that should work here goes in BOTH,
  otherwise it 301s to landing.yunoapp.eu. `/crm` is now the app's Console here (only `/fr/crm`,
  `/es/crm` still 301 to `/fr`, `/es`). "Log in" on CRM pages = `CRM_LOGIN_URL`
  (crm.yunoapp.eu/login); the CRM signup hands the session to `crm.yunoapp.eu/auth/handoff`
  (`appHandoffUrl(…, CRM_ORIGIN)`), never to yunoapp.eu. `VITE_YUNO_APP_ORIGIN` points the relay
  at a local app build. `wrangler dev` crashes on its own on this project ("Network connection
  lost"): test a build by importing `dist/server/server.js` and calling its `fetch` (static
  `dist/client` files first, like Cloudflare).
- Link previews: `public/og/crm-{en,fr,es}.png`, rendered by `bun scripts/og/crm.ts`
  (`CHROMIUM_PATH` = Chrome): hero title + accent, Shotgun chip, the trial as a button, and the
  real Console captured from the live page in each language (fonts in `scripts/og/*.woff2`).
  Tags = `crmOgImageMeta()` (`src/i18n/og.ts`, bump `CRM_OG_VERSION` after a re-render), on the
  CRM page AND its signup (`/start?product=crm`); always the full set, or the root route's
  landing image leaks its `secure_url` and alt. Never import app modules into
  `src/server.ts`: their constants become exports of the Worker entry and the deploy is
  rejected ("Incorrect type for map entry"). Try it locally on `crm.localhost:<port>`.
- SEO (France): strategy, SERP findings and to-dos in `docs/seo-crm-france.md`. Rules: every FAQ answer stays
  in the HTML (closed ones fold in CSS, never unmounted); above-the-fold entrance is CSS (`.yc-rise` / `.yc-pop`
  in `crm.css`), never a motion `initial` (it ships the hero at opacity 0 until hydration: LCP 9.5 s);
  relayed app screens get `X-Robots-Tag: noindex` (`relayToApp`); never claim Shotgun lacks contacts,
  segments or newsletters (it has them) — say what Yuno CRM adds.
- Second product: organizers and clubs who KEEP their ticketing (Shotgun first). Page
  `src/pages/crm.tsx`, sections `src/components/crm/*`, copy `src/content/crm.ts` (EN/FR/ES,
  shape-checked: `fr` is the shape), head/JSON-LD `src/i18n/crm.ts` (bump `CRM_UPDATED`), paths
  `CRM_PATHS` in `src/i18n/landing-lang.ts` (standalone surface; "/crm" sends FR/ES browsers on).
- Look: the Insyder landing grammar (floating pill nav, centred hero + live product frame, profile
  marquee, problem + phone, night block with chip marquees, sticky monitor steps, "your data, your AI,
  through MCP" (ChatGPT / Claude / Gemini marks in `components/crm/marks.tsx`), "your ticketing gives
  you / Yuno gives you" dial, bento, sending composer, pricing, FAQ, final call + footer card) rebuilt on the
  Yuno design system of the Claude Design project "Design system Yuno créé": tokens and `.yc-*`
  classes in `src/styles/crm.css` (scoped to `.ycrm`, `yc-` Tailwind colors/fonts, light only),
  Bricolage Grotesque / Geist / Geist Mono loaded by `crmHead`. Yuno Red #E3141B + tangerine gradient,
  vouvoiement in FR, one accented phrase per headline (`title` + `accent` in the copy).
- The hero frame is a React rebuild of the Console home ("Dashboard Accueil" of the design,
  `components/crm/Dashboard.tsx`), scaled from 1440 px; it tours itself (`.yc-tour`). Its numbers are
  the design's demo club (Le Bunker), not real data. No `h1`/`h2` inside it (page outline).
- Assets `src/assets/crm/*`: the app icon, the Shotgun logo, and the two 3D Yunit coins cut out from
  Paul's originals (`Downloads/Token #1|#2.png`).
- SMS and the MCP server (ChatGPT, Claude, Gemini) are announced as live (Paul, 4 Oct 2026);
  Instagram DM, WhatsApp and Meta audiences stay "soon".
- Pricing (one subscription + Yunits): table in `docs/yuno-context.md` § Yuno CRM, mirrored in
  `components/crm/Pricing.tsx` (packs + cheapest-recharge solver of the design). Never show the
  Suite's "€0" banner or copy there, never "hosted in France" (EU).
- Signup: every CRM CTA is a plain link to the funnel `/start?product=crm` (`/fr/start`, `/es/start`;
  `crmStartHref` in `src/i18n/start.ts`; `…/crm#signup` redirects there). The funnel is the Claude Design
  "Inscription" screens: `src/components/crm/signup/CrmSignup.tsx` (email → password → activity → name →
  crowd size → done, live console preview on the side; copy EN/FR/ES in
  `src/content/crm-signup.ts`, styles `.yc-su-*` at the end of `crm.css`). Same backend as the Suite flow:
  every tracked step carries `product: "crm"` (`track_pro_signup`), `auth.signUp` on the app's Supabase,
  `complete_pro_signup` opens a CRM Console with its 14-day trial, then handoff to crm.yunoapp.eu. Own
  journey key (`yuno_crm_signup_key`). Type → role: club/bar → club, collective/festival → organizer.
  There is NO code step: the account opens at once (the app's Supabase has email confirmation off: `mailer_autoconfirm`).
  If confirmation is ever switched on, `signUp` returns no session and the funnel shows a "confirm" screen (link sent,
  resend button): the link lands on `crm.yunoapp.eu/get-started?key=…` which finishes the job. SMTP + templates to prepare
  first: `scripts/auth-smtp` in the yuno repo. Google / Apple (wired 4 Oct 2026): `signInWithOAuth` on the app's Supabase (implicit flow, `skipBrowserRedirect`),
  `redirectTo` = this funnel in the page's language (`/fr/start?product=crm`); the session comes back in the URL fragment,
  is read by `CrmSignup` (`setSession`, fragment wiped with `history.replaceState`) and the journey resumes on "type"
  with a shorter flow (`FLOW_OAUTH`: no password, no confirmation, no way back to the email step). Same `complete_pro_signup`
  and handoff afterwards. **Prerequisite in the Yuno app's Supabase Auth → URL configuration: `https://crm.yunoapp.eu/**`
  (and `https://landing.yunoapp.eu/**`) must be in the Redirect URLs allow-list**, otherwise Supabase falls back to yunoapp.eu and the funnel never resumes.
  Google and Apple providers are already enabled there (Apple Services ID `eu.yunoapp.web`).
  **Existing Yuno account** (4 Oct 2026, yuno repo `docs/ACCOUNT_PRODUCTS.md`): after Google / Apple, the funnel
  calls `get_my_product_accounts`; if the person already holds a club or an organization, it shows the `existing`
  step instead of the questions: "open Yuno CRM on {name}" (`open_product_on_my_account`, CRM trial on the SAME
  account, same contacts) or "Yuno CRM is waiting for you" if it already has CRM, then handoff to `/crm`. By
  email + password, "address already used" links to `crm.yunoapp.eu/login?redirect=/open/crm`. Never a second account.
  The generic `SignupFlow`/`SignupModal` stay for the Suite landing, associations and `/start` without product.
- Opening the signup (modal or `/start?product=crm`) writes a `pro_signups` row in production: never
  test it against production without blocking `track_pro_signup` or deleting the row it writes
  (anonymous, `source = 'crm'` / `'start_crm'`).

## PostHog (cookieless, same project as the Yuno app)
- Single entry point `src/lib/posthog.ts`: `persistence: 'memory'` (no cookie, no banner), dynamic
  import, SSR-safe, never an email/phone/name in an event. Plan = the `LandingEvent` type: add a
  name there first, never a free string.
- Every event carries `site`/`surface: 'landing'`, `platform: 'web'`, `is_demo: false` and
  `landing_lang` (en | fr | es, stamped from the URL by `before_send`, $pageview included).
- Events: `pro_signup_*` + `contact_form_submitted` (SignupFlow, contact pages);
  `landing_section_viewed` {section, page} (≥ 40 % visible, once per page view);
  `landing_cta_clicked` {cta, role, section, page}; `landing_language_changed` {from, to};
  `contact_clicked` {channel: whatsapp|email|phone|form}; `outbound_clicked` {destination:
  yuno_app|app_store|instagram|other, host}; `compare_page_viewed` {competitor};
  `pricing_page_viewed` {page}. `page` = path without /fr|/es.
- Clicks and section views are read by ONE delegated listener + ONE observer
  (`src/lib/posthog-dom.ts`, installed in `__root.tsx`). Components only carry attributes:
  `data-ph-section` (tracked section), `data-ph-area` (click area: nav, footer, menu…),
  `data-ph-cta` + `data-ph-role` (`PrimaryCta` / `FounderCta` set them), `data-ph-lang` (language
  links). Links (wa.me, mailto, tel, /contact, /start, other hosts) are classified automatically:
  a new section needs `data-ph-section`, a new CTA button `data-ph-cta`, nothing else.

## Git workflow (Paul's rule — overrides session defaults)
`main` is the single source of truth and what gets deployed. Several Claude sessions work in
parallel, each on its own `claude/*` branch: work left only on a branch never reaches the site.
- **Start of a session:** `git fetch origin main` and merge `origin/main` into your branch before
  editing, so you build on the latest design, not on an old base.
- **Every time Paul asks to commit & push:** commit on your branch, `git fetch origin main`
  again, merge your branch into `main` (resolve conflicts keeping everyone's work — latest
  design wins on visuals), run `bunx tsc --noEmit` and `bun run build`, then push **both** your
  branch and `main`. Never force-push `main`.
