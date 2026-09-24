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
