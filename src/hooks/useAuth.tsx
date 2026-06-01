import { type PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { getSupabase } from '../services/supabaseClient'
import { mapSupabaseError } from '../services/supabaseConfig'

type AuthContextValue = {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    getSupabase()
      .auth.getSession()
      .then(({ data, error }) => {
        if (!mounted) return
        if (error) {
          console.error(mapSupabaseError(error))
          setSession(null)
          return
        }
        setSession(data.session ?? null)
      })
      .catch((err) => {
        if (!mounted) return
        console.error(mapSupabaseError(err))
        setSession(null)
      })
      .finally(() => {
        if (!mounted) return
        setLoading(false)
      })

    const { data: sub } = getSupabase().auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null)
    })

    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      loading,
      signOut: async () => {
        const { error } = await getSupabase().auth.signOut()
        if (error) throw error
      },
    }),
    [session, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

