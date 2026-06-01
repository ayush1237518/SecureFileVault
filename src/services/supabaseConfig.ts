import { AuthApiError } from '@supabase/supabase-js'

const url = (import.meta.env.VITE_SUPABASE_URL ?? '').trim()
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim()

const PLACEHOLDER_PATTERNS = [
  'placeholder',
  'your-project',
  'your-anon-key',
  'example.com',
  'xxxxx',
]

/** True when real Supabase project URL and anon key are set in `.env`. */
export function isSupabaseConfigured(): boolean {
  if (!url || !anonKey) return false
  if (!url.startsWith('https://') || !url.includes('.supabase.co')) return false
  const lower = `${url} ${anonKey}`.toLowerCase()
  if (PLACEHOLDER_PATTERNS.some((p) => lower.includes(p))) return false
  if (anonKey.length < 100) return false
  return true
}

export function getSupabaseEnv() {
  return { url, anonKey }
}

function isEmailRateLimitError(message: string, status?: number): boolean {
  const lower = message.toLowerCase()
  return (
    status === 429 ||
    lower.includes('rate limit') ||
    lower.includes('over_email_send_rate_limit') ||
    lower.includes('email rate limit')
  )
}

/** User-facing hint when fetch fails (invalid URL, offline, or missing project). */
export function mapSupabaseError(error: unknown): string {
  if (error instanceof AuthApiError && isEmailRateLimitError(error.message, error.status)) {
    return 'Too many auth emails were sent. Wait 1 hour or see supabase/AUTH_SETUP.md.'
  }

  const message = error instanceof Error ? error.message : String(error)

  if (isEmailRateLimitError(message)) {
    return 'Too many auth emails were sent. Wait 1 hour or see supabase/AUTH_SETUP.md.'
  }

  if (message.toLowerCase().includes('failed to fetch')) {
    if (!isSupabaseConfigured()) {
      return 'Supabase is not configured. Add your project URL and anon key to the .env file, then restart the dev server.'
    }
    return 'Cannot reach Supabase. Check your URL/key in .env, internet connection, and that the project is not paused.'
  }
  return message
}
