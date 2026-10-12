@AGENTS.md

# CLAUDE.md

## What this is

Replace this with one paragraph on what the project is. The repo started from `template-pwa`, which is a TypeScript and Vite progressive web app. See `TEMPLATE.md` for the per-project setup.

## Commands

- `npm run dev`: Vite dev server.
- `npm run build`: production build into `dist/`.
- `npm run preview`: serve the build.
- `npm run lint`: ESLint plus `tsc --noEmit` (the typecheck is part of Lint).
- `npm test`: Vitest (unit and integration projects) with a 90% coverage gate. `test:unit`, `test:integration` and `test:watch` are narrower runs.
- `npm run mutate`: Stryker mutation testing, breaks below 85.
- `npm run size`: size-limit against the budgets in `.size-limit.json`. Needs `dist/` already built.
- `npm run e2e`: Playwright against `vite preview` on port 4173. Needs `dist/` already built. The visual specs skip outside Linux.
- `npm run generate-icons:docker`: regenerate the PWA icons and iOS launch images in `public/` from `public/icon.svg`, on Linux x64 like CI (needs Docker running). Lint fails when they differ from what is committed, and the PNG output differs on macOS. `npm run generate-icons` is the same command without Docker.
- `npm run deploy`: build and `wrangler deploy` (CI deploys through the guarded `Deploy to Cloudflare` job instead).
- `npm run e2e:visual`: the visual specs inside the pinned Playwright Docker image (needs Docker running). Add `-- --update-snapshots` to regenerate baselines, then commit `e2e/__screenshots__/**`.

## Guardrails

CI (`.github/workflows/ci.yml`) calls the shared workflows in `estebancas/standards`, pinned by commit SHA and bumped by Dependabot. `main` requires a PR (0 approvals) and six checks, reported as `<job name> / <job id>`: `Lint / lint`, `Unit tests + build / test`, `Mutation testing / mutation`, `Bundle size / size`, `Dependency audit / audit`, `End-to-end / e2e`. Renaming a job here or in `standards` changes the required context. `scripts/apply-repo-settings.sh verify <owner/repo>` in `standards` reports drift in the GitHub settings.

- **Pinning:** every Action and reusable workflow is pinned to a commit SHA with the version as a trailing comment, and the repo setting `sha_pinning_required` rejects unpinned ones.
- **Dependencies:** `npm audit --omit=dev` blocks on high severity. Dev dependencies carry a known `braces` advisory through `patch-package` (postinstall only); the `qs` override in `package.json` exists for a security fix. Dependabot waits 7 days (`cooldown`) and leaves majors of the fragile toolchain, and TypeScript majors and minors, to be bumped by hand.
- **Coverage and mutation:** 90% coverage gate; Stryker breaks below 85. Stryker needs `vitest.stryker.config.ts`, a flat copy of the Vitest config without `projects`.
- **Stryker patch:** `patches/@stryker-mutator+vitest-runner+10.0.0.patch` (applied by `patch-package` on `postinstall`) backports stryker-js#6220 for #6210, because Vitest 5 joins test names with `' > '`. Remove it once a Stryker release contains the fix.
- **Visual regression:** baselines are Linux-only and come from the Playwright image whose tag must equal the installed `@playwright/test` version, in `ci.yml` and in the `e2e:visual` script.
- **Size:** each limit is the measured size plus about 10%.
- **Accessibility:** axe WCAG 2.0/2.1 A and AA checks run as part of `npm run e2e`.

## Architecture

Describe the app's structure here once it exists.
