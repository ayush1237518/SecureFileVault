import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { getSupabase } from '../services/supabaseClient'
import { mapSupabaseError } from '../services/supabaseConfig'

const SESSION_TIMEOUT_MS = 12_000

type AuthContextValue = {
  user: User | null
  session: Session | null
  loading: boolean
  connectionError: string | null
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const sessionResolved = useRef(false)

  useEffect(() => {
    let mounted = true
    sessionResolved.current = false

    const timeoutId = window.setTimeout(() => {
      if (!mounted || sessionResolved.current) return
      setConnectionError(
        'Connection timed out. Check your internet, Supabase URL in .env, and that the project is not paused.',
      )
      setLoading(false)
    }, SESSION_TIMEOUT_MS)

    const finishLoading = () => {
      sessionResolved.current = true
      window.clearTimeout(timeoutId)
      if (mounted) setLoading(false)
    }

    getSupabase()
      .auth.getSession()
      .then(({ data, error }) => {
        if (!mounted) return
        if (error) {
          console.error(mapSupabaseError(error))
          setConnectionError(mapSupabaseError(error))
          setSession(null)
          return
        }
        setConnectionError(null)
        setSession(data.session ?? null)
      })
      .catch((err) => {
        if (!mounted) return
        const message = mapSupabaseError(err)
        console.error(message)
        setConnectionError(message)
        setSession(null)
      })
      .finally(finishLoading)

    const { data: sub } = getSupabase().auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null)
      setConnectionError(null)
    })

    return () => {
      mounted = false
      window.clearTimeout(timeoutId)
      sub.subscription.unsubscribe()
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      loading,
      connectionError,
      signOut: async () => {
        const { error } = await getSupabase().auth.signOut()
        if (error) throw error
      },
    }),
    [session, loading, connectionError],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

