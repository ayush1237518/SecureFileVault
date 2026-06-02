import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { completeOAuthCallback } from '../services/oauth'
import { mapSupabaseError } from '../services/supabaseConfig'
import { useAuth } from '../hooks/useAuth'
import { logActivity } from '../services/activityLog'
import { LoadingScreen } from '../components/ui/LoadingScreen'

const SIGN_IN_TIMEOUT_MS = 20_000

export function AuthCallbackPage() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const finishedRef = useRef(false)
  const loginLoggedRef = useRef(false)
  const [exchangeDone, setExchangeDone] = useState(false)

  useEffect(() => {
    let cancelled = false

    void completeOAuthCallback().then(({ error }) => {
      if (cancelled) return
      if (error) {
        finishedRef.current = true
        toast.error(mapSupabaseError(error))
        navigate('/auth', { replace: true })
        return
      }
      setExchangeDone(true)
    })

    return () => {
      cancelled = true
    }
  }, [navigate])

  useEffect(() => {
    if (!exchangeDone || loading || !user || finishedRef.current) return

    finishedRef.current = true

    if (!loginLoggedRef.current) {
      loginLoggedRef.current = true
      const raw =
        (user.app_metadata?.provider as string | undefined) ??
        user.identities?.[0]?.provider ??
        'oauth'
      const provider =
        raw === 'github' ? 'GitHub' : raw === 'google' ? 'Google' : raw === 'email' ? 'Email' : raw
      const key = `login-logged-${user.id}`
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, '1')
        void logActivity('login', `Signed in via ${provider}`, user.email ?? undefined)
      }
    }

    toast.success('Signed in successfully')
    navigate('/dashboard', { replace: true })
  }, [exchangeDone, loading, user, navigate])

  useEffect(() => {
    if (!exchangeDone || loading || user) return

    const timeoutId = window.setTimeout(() => {
      if (finishedRef.current) return
      finishedRef.current = true
      toast.error(
        'Could not complete sign-in. Run npm run dev, open http://localhost:5173, and add that callback URL in Supabase.',
      )
      navigate('/auth', { replace: true })
    }, SIGN_IN_TIMEOUT_MS)

    return () => window.clearTimeout(timeoutId)
  }, [exchangeDone, loading, user, navigate])

  return <LoadingScreen label="Completing sign in…" />
}
