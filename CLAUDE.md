## Project

A web app that imports Amazon's exported transaction data and matches each order to the existing Lunch Money transaction for the payee "Amazon" by price and date, using the Lunch Money API. Where it will be deployed is not yet decided.

- **Stack**: React 18 + Vite + TypeScript, Tailwind v4, Biome.
- **Layout**: `src/` is the app; `main.tsx` is the entry point and `App.tsx` the root component.
- **Base path**: `site.config.ts` holds `BASE_PATH`, imported by `vite.config.ts`. It's `/` until a host is chosen. In app code, build asset URLs from `import.meta.env.BASE_URL` — a leading-slash path like `/logo.svg` 404s if the site is ever served from a subpath.

## Code conventions

Conventions live outside this file, synced from https://github.com/bvandrc/bvandrc-conventions — follow all of them:

- @conventions/typescript.md — language-level TypeScript/JavaScript rules
- @conventions/react.md — component, JSX, and accessibility rules
- @conventions/all.md — practice for every repo: branches, formatting, comments, testing, markdown, PR reviews

## Commands

- `pnpm dev` — dev server on port 5000. `pnpm build`, `pnpm preview`.
- `pnpm format` — Biome check/fix. `pnpm check` — the full gate: format plus `tsc`. Run before every commit; it's what CI runs.

## Repo conventions

- **Package manager**: pnpm. `npm install` writes a competing `package-lock.json` that CI ignores.
- **package.json**: Linted in CI by `bvandrc/lint-package-json`, which enforces top-level key order, alphabetical `dependencies` and `devDependencies`, and exact-semver `version`. Adding a field in the wrong place, or a dependency out of order, fails the lint job.
- **Typed `Object` walks**: `typedKeys`, `typedEntries`, and `typedFromEntries`, exported from `src/utils/index.ts`, are ours. They are the builtins with the cast a call site would otherwise write by hand, so reach for one instead of asserting the result -- and leave `Object.keys`/`entries`/`fromEntries` alone where the widened type is what's wanted.
- **Convention files**: `conventions/` is synced from https://github.com/bvandrc/bvandrc-conventions and overwritten on every sync. Edit a rule upstream, never in that directory.
