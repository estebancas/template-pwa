# AGENTS.md

Shared rules for any AI coding agent working in this repository (Claude Code, Codex, Cursor, or otherwise). `CLAUDE.md` holds the commands and guardrails reference. Despite the name, its content applies regardless of which agent is reading it.

## Rules

- **Ship unit tests with every feature or bug fix.** Any change to `src/` that adds behavior or fixes a bug must come with tests in `tests/unit/` (or `tests/integration/` when the change is a cross-module flow best verified end to end). Keep the 90% coverage gate (`npm test`) and the mutation threshold (`npm run mutate`) green.
- **Branch naming.** See `CONTRIBUTING.md`.
- **Do not weaken a guardrail to make a check pass.** Fix the code, or ask. That covers coverage thresholds, size budgets, lint rules and the pinned Playwright tag.
