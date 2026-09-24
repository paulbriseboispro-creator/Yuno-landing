# Yuno landing

TanStack Start + React 19 + Tailwind v4, deployed on Cloudflare Workers (`wrangler.jsonc`).
Package manager: bun (`bun run build`, `bunx tsc --noEmit`, `bun run lint`).

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
