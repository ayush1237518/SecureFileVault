import type { Provider } from '@supabase/supabase-js'
import { getSupabase } from './supabaseClient'

/** Where Supabase redirects after Google / GitHub sign-in. */
export function getOAuthRedirectUrl(): string {
  return `${window.location.origin}/auth/callback`
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
