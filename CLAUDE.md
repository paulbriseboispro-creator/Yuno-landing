# Yuno landing

TanStack Start + React 19 + Tailwind v4, deployed on Cloudflare Workers (`wrangler.jsonc`).
Package manager: bun (`bun run build`, `bunx tsc --noEmit`, `bun run lint`).

- Product, pricing, competitor and traction facts: read `docs/yuno-context.md` before writing
  any copy. It supersedes older copy in `src/content/*`.
- The main landing (`/`, `/fr`, `/es`) lives in `src/pages/landing.tsx` +
  `src/components/landing/*`, copy in `src/content/landing.ts` (EN/FR/ES, shape-checked).
- Never mention BDE / student unions on the main landing.
- Other pages (/clubs, /organizers, /pricing, /contact…) are EN/FR only (`src/i18n/locale.tsx`).
