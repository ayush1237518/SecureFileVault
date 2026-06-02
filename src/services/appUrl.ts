/** App origin for OAuth redirects — must match Supabase → Authentication → URL Configuration. */
export function getAppOrigin(): string {
  const fromEnv = (import.meta.env.VITE_APP_URL ?? '').trim().replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return 'http://localhost:5173'
}

export function getOAuthCallbackUrl(): string {
  return `${getAppOrigin()}/auth/callback`
}

/** True when the browser URL does not match the configured OAuth origin (common misconfiguration). */
export function isOAuthOriginMismatch(): boolean {
  const configured = (import.meta.env.VITE_APP_URL ?? '').trim()
  if (!configured || typeof window === 'undefined') return false
  const expected = configured.replace(/\/$/, '')
  return window.location.origin !== expected
}
