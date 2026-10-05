# New project checklist

Do these after creating a repo from this template, then delete this file or keep it as history.

1. **Rename.** Set `name` in `package.json`, and the `<title>` and description in `index.html`. Replace the counter in `src/` with your app (keep tests alongside it: the coverage gate is 90%).
2. **Owner.** Change `@estebancas` in `.github/CODEOWNERS` if the owner differs.
3. **Install and lock.** `npm install` once so `package-lock.json` is yours. CI uses `npm ci`.
4. **Apply the repo settings** from a checkout of `estebancas/standards`:
   `scripts/apply-repo-settings.sh apply <owner>/<repo>`, then `verify` should exit 0. The repo must be public (branch protection on the Free plan is public-only), and the script needs `gh` with admin on the repo and `jq`.
5. **Visual baselines.** The committed baselines belong to the starter counter. After you change the UI, regenerate them in Docker: `npm run e2e:visual -- --update-snapshots`, and commit `e2e/__screenshots__/**`. Until they match, `End-to-end / e2e` fails.
6. **Size budgets.** After your first real build, run `npm run size`, then set each limit in `.size-limit.json` to the measured size plus about 10%. Add a group per asset type you ship (for example fonts, measured raw).
7. **Playwright tag.** Keep the image tag equal to the installed `@playwright/test` version in two places: `container-image` in `.github/workflows/ci.yml` and the `e2e:visual` script in `package.json`. Bump all three together.
8. **Deploy.** `ci.yml` has a placeholder `Deploy` job that only echoes. Replace it with a real deploy. For Cloudflare, copy `wrangler.jsonc` and the deploy job from `weekly-routine`, add `environment: production` (the settings script already creates it, with you as the required reviewer), and set the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets by hand. `Deploy` is not a required check.
9. **Optional: PWA.** Not included. Follow `weekly-routine` (`vite-plugin-pwa`, `@vite-pwa/assets-generator`), and use the Lint workflow's `generated-assets-*` inputs in `ci.yml` to check regenerated icons. Add the PWA packages to Dependabot's major-version ignore list.
10. **Update the docs.** Fill in "What this is" and "Architecture" in `CLAUDE.md`.

## Known quirks (see `CLAUDE.md` for the details)

- The Stryker patch under `patches/` is still needed. Check whether a Stryker release contains the fix for stryker-js#6210 before copying it into a newer project.
- TypeScript is held below 6.1 because typescript-eslint's peer range stops there. Dependabot ignores TypeScript majors and minors for that reason.
