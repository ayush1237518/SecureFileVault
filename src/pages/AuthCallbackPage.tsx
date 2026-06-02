import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { getSupabase } from '../services/supabaseClient'
import { getOAuthCallbackError } from '../services/oauth'
import { useAuth } from '../hooks/useAuth'
import { logActivity } from '../services/activityLog'
import { LoadingScreen } from '../components/ui/LoadingScreen'

const SIGN_IN_TIMEOUT_MS = 20_000

export function AuthCallbackPage() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const finishedRef = useRef(false)
  const loginLoggedRef = useRef(false)

  useEffect(() => {
    const oauthError = getOAuthCallbackError()
    if (oauthError) {
      toast.error(oauthError)
      navigate('/auth', { replace: true })
      return
    }

    const supabase = getSupabase()
    void supabase.auth.getSession()

    const timeoutId = window.setTimeout(() => {
      if (finishedRef.current) return
      finishedRef.current = true
      toast.error('Sign-in timed out. Add your callback URL in Supabase → Authentication → URL Configuration.')
      navigate('/auth', { replace: true })
    }, SIGN_IN_TIMEOUT_MS)

    return () => window.clearTimeout(timeoutId)
  }, [navigate])

  useEffect(() => {
    if (loading || !user || finishedRef.current) return

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
  }, [loading, user, navigate])

  useEffect(() => {
    if (loading || user) return

    const timeoutId = window.setTimeout(() => {
      if (finishedRef.current) return
      const oauthError = getOAuthCallbackError()
      if (oauthError) return

      finishedRef.current = true
      toast.error('Could not complete sign-in. Check OAuth redirect URLs in Supabase.')
      navigate('/auth', { replace: true })
    }, SIGN_IN_TIMEOUT_MS)

    return () => window.clearTimeout(timeoutId)
  }, [loading, user, navigate])

  return <LoadingScreen label="Completing sign in…" />
}
