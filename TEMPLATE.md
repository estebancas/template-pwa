# New project checklist

Do these after creating a repo from this template, then delete this file or keep it as history.

1. **Rename.** Set `name` in `package.json`, and the `<title>` and description in `index.html`. Replace the counter in `src/` with your app (keep tests alongside it: the coverage gate is 90%).
   Then make it yours as a PWA: set `name`, `short_name`, `description` and the colours in the manifest in `vite.config.ts` (keep `background_color` equal to `background` in `pwa-assets.config.ts`), `theme-color` and `apple-mobile-web-app-title` in `index.html`. Replace `public/icon.svg` with your icon, run `npm run generate-icons:docker` (Docker must be running), and commit everything it changes in `public/`. Lint fails when the committed icons differ from the generator's output, and the output differs between macOS and Linux (the 64px icon did), so generate on Linux like the visual baselines.
2. **Owner.** Change `@estebancas` in `.github/CODEOWNERS` if the owner differs.
3. **Install and lock.** `npm install` once so `package-lock.json` is yours. CI uses `npm ci`.
4. **Apply the repo settings** from a checkout of `estebancas/standards`:
   `scripts/apply-repo-settings.sh apply <owner>/<repo>`, then `verify` should exit 0. The repo must be public (branch protection on the Free plan is public-only), and the script needs `gh` with admin on the repo and `jq`.
5. **Visual baselines.** The committed baselines belong to the starter counter. After you change the UI, regenerate them in Docker: `npm run e2e:visual -- --update-snapshots`, and commit `e2e/__screenshots__/**`. Until they match, `End-to-end / e2e` fails.
6. **Size budgets.** After your first real build, run `npm run size`, then set each limit in `.size-limit.json` to the measured size plus about 10%. Add a group per asset type you ship (for example fonts, measured raw).
7. **Playwright tag.** Keep the image tag equal to the installed `@playwright/test` version in two places: `container-image` in `.github/workflows/ci.yml` and the `e2e:visual` script in `package.json`. Bump all three together.
8. **Deploy (Cloudflare).** The `Deploy to Cloudflare` job in `ci.yml` is skipped until the repo variable `CLOUDFLARE_ACCOUNT_ID` is set, so a new project stays green. To turn it on: set `name` in `wrangler.jsonc`, replace the `url` under `environment` in `ci.yml` with your Worker's URL, add the `CLOUDFLARE_ACCOUNT_ID` variable and the `CLOUDFLARE_API_TOKEN` secret (Settings > Secrets and variables > Actions), and approve the first run in the `production` environment (the settings script creates it with you as the required reviewer). `Deploy` is not a required check. To deploy somewhere else, replace the job and delete `wrangler.jsonc`.
9. **Install scripts.** npm 12 skips dependency install scripts that are not approved. `esbuild` and `workerd` (pulled in by `wrangler`) are left unapproved because nothing here needs them; approve one with `npm approve-scripts <pkg>` if a tool asks for it.
10. **Update the docs.** Fill in "What this is" and "Architecture" in `CLAUDE.md`.

## Known quirks (see `CLAUDE.md` for the details)

- The Stryker patch under `patches/` is still needed. Check whether a Stryker release contains the fix for stryker-js#6210 before copying it into a newer project.
- TypeScript is held below 6.1 because typescript-eslint's peer range stops there. Dependabot ignores TypeScript majors and minors for that reason.
