import type { Provider } from '@supabase/supabase-js'
import { getSupabase } from './supabaseClient'

/** Runtime callback URL — must match Supabase → Authentication → Redirect URLs. */
export function getOAuthRedirectUrl(): string {
  if (typeof window === 'undefined') {
    return 'https://filesecure1.netlify.app/auth/callback'
  }
  return `${window.location.origin}/auth/callback`
}

/** Ensure Supabase authorize URL returns to this site, not localhost from dashboard defaults. */
function fixAuthorizeRedirectUrl(authorizeUrl: string, redirectTo: string): string {
  try {
    const url = new URL(authorizeUrl)
    if (url.searchParams.has('redirect_to')) {
      url.searchParams.set('redirect_to', redirectTo)
    }
    return url.toString()
  } catch {
    return authorizeUrl
  }
}

export async function signInWithOAuthProvider(provider: Provider) {
  const redirectTo = getOAuthRedirectUrl()

  const { data, error } = await getSupabase().auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  })
  if (error) throw error
  if (!data?.url) {
    throw new Error('No OAuth URL returned. Enable Google/GitHub in Supabase → Authentication → Providers.')
  }

  window.location.assign(fixAuthorizeRedirectUrl(data.url, redirectTo))
}

/** Complete PKCE OAuth when returning from Google / GitHub. */
export async function completeOAuthCallback(): Promise<{ error: Error | null }> {
  const oauthError = getOAuthCallbackError()
  if (oauthError) {
    return { error: new Error(oauthError) }
  }

  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')

  if (code) {
    const { error } = await getSupabase().auth.exchangeCodeForSession(code)
    if (error) return { error }
    window.history.replaceState({}, document.title, '/auth/callback')
    return { error: null }
  }

  const { data, error } = await getSupabase().auth.getSession()
  if (error) return { error }
  if (!data.session) {
    return { error: new Error('No session after sign-in. Check redirect URLs in Supabase.') }
  }
  return { error: null }
}

/** Read OAuth error params Supabase may append to the callback URL. */
export function getOAuthCallbackError(): string | null {
  const search = new URLSearchParams(window.location.search)
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))
  const message =
    search.get('error_description') ||
    hash.get('error_description') ||
    search.get('error') ||
    hash.get('error')
  return message ? decodeURIComponent(message.replace(/\+/g, ' ')) : null
}
