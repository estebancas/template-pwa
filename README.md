# template-pwa

GitHub template for a TypeScript and Vite progressive web app (installable, works offline, iOS launch images) that starts with the standard CI guardrails: lint and typecheck, unit and integration tests with a 90% coverage gate, mutation testing, a bundle-size budget, dependency audit, and end-to-end tests with accessibility and visual regression. A guarded Cloudflare deploy is included and stays off until you configure it.

The CI logic lives in [`estebancas/standards`](https://github.com/estebancas/standards); this repo only calls it. Read `TEMPLATE.md` for what to change in a new project.

## Scripts

See `CLAUDE.md` for the full list. The short version: `npm run dev`, `npm run build`, `npm run lint`, `npm test`.
