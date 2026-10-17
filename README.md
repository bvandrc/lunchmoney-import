# lunchmoney-import

A web app for importing Amazon order history into [Lunch Money](https://lunchmoney.app): it reads Amazon's exported transaction data and associates each order with the existing Lunch Money transaction for the payee "Amazon" that matches it on price and date.

Where it will be deployed is still to be decided (TODO-URL-UNKNOWN).

- **Vite 8** + **React 18** + **TypeScript**
- **TanStack Query** for API data and **TanStack Table** for the transactions table, against Lunch Money's [`@lunch-money/lunch-money-js-v2`](https://www.npmjs.com/package/@lunch-money/lunch-money-js-v2) client
- **Tailwind CSS 4** via `@tailwindcss/vite`, with theme tokens in [src/styles/index.css](src/styles/index.css)
- **Biome** for formatting, linting, and import sorting
- **GitHub Actions** for CI

## Setup

1. `pnpm install`
2. Copy `.env.example` to `.env.local` and set `VITE_LUNCH_MONEY_API_KEY` to a token from [Lunch Money's developers page](https://my.lunchmoney.app/developers).
3. `pnpm dev`

The token is built into the client bundle, so only run a build that carries it where you alone can reach it.

## Scripts

| Script         | What it does                    |
| -------------- | ------------------------------- |
| `pnpm dev`     | Vite dev server on port 5000    |
| `pnpm build`   | Production build into `dist`    |
| `pnpm preview` | Build, then serve `dist`        |
| `pnpm check`   | Format + lint + type check      |

## Layout

```
.github/
  actions/
    setup/        Composite action: pnpm + Node + install
  workflows/      CI, PR reports, and conventions sync
conventions/      Shared conventions, synced from bvandrc-conventions
public/
  favicon.svg     Browser tab icon
  logo.svg        In-app logo
  preview.svg     og:image / social preview
  robots.txt      Crawler rules
  sitemap.xml     Sitemap
  llms.txt        LLM-readable site summary
src/
  api/            Lunch Money API client
  components/     UI components
  hooks/          Data hooks
  styles/         Tailwind entrypoint and theme tokens
  utils/          Shared helpers
  App.tsx         App root
  main.tsx        Entry point
site.config.ts    Base path the site is served under
tsconfig.json     TypeScript config
vite.config.ts    Vite config (port, Tailwind plugin, build options)
.env.example      Environment variables to copy into .env.local
biome.jsonc       Formatter, linter, and import sorter config
index.html        HTML entry point (title, meta, og tags)
```

## CI

- **CI** — lint and type check on every push and PR
- **PR Reports** — changed-line count and bundle-size diff, posted as sticky comments on each PR
- **Sync Conventions** — weekly PR syncing `conventions/` from bvandrc-conventions
