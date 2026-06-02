export const PRODUCTION_SITE = 'https://filesecure1.netlify.app'

/**
 * OAuth redirect origin — always the page the user is on (never a baked-in localhost from `.env`).
 */
export function getAppOrigin(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return import.meta.env.PROD ? PRODUCTION_SITE : 'http://localhost:5173'
}

export function getOAuthCallbackUrl(): string {
  return `${getAppOrigin()}/auth/callback`
}

/** @deprecated Dev-only mismatch check removed — OAuth always uses window.location.origin. */
export function isOAuthOriginMismatch(): boolean {
  return false
}

export function getProductionSiteUrl(): string {
  return PRODUCTION_SITE
}
