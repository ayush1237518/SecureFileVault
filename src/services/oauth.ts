import type { Provider } from '@supabase/supabase-js'
import { getOAuthCallbackUrl } from './appUrl'
import { getSupabase } from './supabaseClient'

/** Where Supabase redirects after Google / GitHub sign-in. */
export function getOAuthRedirectUrl(): string {
  return getOAuthCallbackUrl()
}

export async function signInWithOAuthProvider(provider: Provider) {
  const { data, error } = await getSupabase().auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: getOAuthRedirectUrl(),
      skipBrowserRedirect: false,
    },
  })
  if (error) throw error
  if (data?.url) {
    window.location.assign(data.url)
  }
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

  const { error } = await getSupabase().auth.getSession()
  return { error: error ?? null }
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
