/**
 * Shared site config for the build (vite.config.ts) and CI.
 */

/**
 * Path the site is served under, which every asset URL is prefixed with.
 *
 * Where the site will be hosted isn't decided yet, so it's served from the
 * root. Set it to the subpath if the host serves it from one (e.g. GitHub
 * Pages project sites, served from `/<repo>/`).
 */
export const BASE_PATH = '/'

// TODO: Uncomment and set once the deployed URL is known.
/** Public URL of the deployed site. */
// export const SITE_URL = `TODO-URL-UNKNOWN${BASE_PATH}`
