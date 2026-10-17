/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Lunch Money API token, set in `.env.local` (see `.env.example`). */
  readonly VITE_LUNCH_MONEY_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
