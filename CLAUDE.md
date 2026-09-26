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
- Comparison pages ("Yuno vs X"): copy in `src/content/compare.ts`, template `src/pages/compare.tsx`.
  Competitor claims must be public, dated and listed in `sources`; never guess a number.
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
