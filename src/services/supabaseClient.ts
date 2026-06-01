import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseEnv, isSupabaseConfigured } from './supabaseConfig'

export { isSupabaseConfigured }

let client: SupabaseClient | null = null

/** Supabase client — only available when `.env` has valid credentials. */
export function getSupabase(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Update .env with your project credentials.')
  }
  if (!client) {
    const { url, anonKey } = getSupabaseEnv()
    client = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
    })
  }
  return client
}

/** @deprecated Use getSupabase() — kept for gradual migration */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return Reflect.get(getSupabase(), prop)
  },
})
