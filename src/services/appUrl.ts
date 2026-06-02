const PRODUCTION_SITE = 'https://filesecure1.netlify.app'

function normalizeOrigin(url: string): string {
  return url.trim().replace(/\/$/, '')
}

/** Dev-only pin from `.env` (e.g. force localhost when opened via LAN IP). Ignored in production builds. */
function getDevOverrideOrigin(): string | null {
  if (!import.meta.env.DEV) return null
  const override = normalizeOrigin(import.meta.env.VITE_APP_URL ?? '')
  return override || null
}

/**
 * App origin for OAuth redirects — must match Supabase → Authentication → URL Configuration.
 * In production, always uses the live site URL (never localhost from `.env`).
 */
export function getAppOrigin(): string {
  const devOverride = getDevOverrideOrigin()
  if (typeof window !== 'undefined' && window.location?.origin) {
    return devOverride ?? window.location.origin
  }
  if (import.meta.env.PROD) {
    const prodEnv = normalizeOrigin(import.meta.env.VITE_APP_URL ?? '')
    if (prodEnv && !prodEnv.includes('localhost') && !prodEnv.includes('127.0.0.1')) {
      return prodEnv
    }
    return PRODUCTION_SITE
  }
  return devOverride ?? 'http://localhost:5173'
}

export function getOAuthCallbackUrl(): string {
  return `${getAppOrigin()}/auth/callback`
}

/** True when dev `.env` pins a different origin than the browser (local misconfiguration). */
export function isOAuthOriginMismatch(): boolean {
  if (!import.meta.env.DEV || typeof window === 'undefined') return false
  const override = getDevOverrideOrigin()
  if (!override) return false
  return window.location.origin !== override
}

/** Shown in auth errors / setup hints for this deployment. */
export function getProductionSiteUrl(): string {
  return PRODUCTION_SITE
}
