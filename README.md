# lunchmoney-import

A web app for importing Amazon order history into [Lunch Money](https://lunchmoney.app): it reads Amazon's exported transaction data and associates each order with the existing Lunch Money transaction for the payee "Amazon" that matches it on price and date.

Where it will be deployed is still to be decided (TODO-URL-UNKNOWN).

- **Vite 8** + **React 18** + **TypeScript**
- **Tailwind CSS 4** via `@tailwindcss/vite`, with theme tokens in [src/styles/index.css](src/styles/index.css)
- **Biome** for formatting, linting, and import sorting
- **GitHub Actions** for CI

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
  styles/         Tailwind entrypoint and theme tokens
  utils/          Shared helpers
  App.tsx         App root
  main.tsx        Entry point
site.config.ts    Base path the site is served under
tsconfig.json     TypeScript config
vite.config.ts    Vite config (port, Tailwind plugin, build options)
biome.jsonc       Formatter, linter, and import sorter config
index.html        HTML entry point (title, meta, og tags)
```

## CI

- **CI** — lint and type check on every push and PR
- **PR Reports** — changed-line count and bundle-size diff, posted as sticky comments on each PR
- **Sync Conventions** — weekly PR syncing `conventions/` from bvandrc-conventions
