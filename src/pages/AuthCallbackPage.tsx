import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { getSupabase } from '../services/supabaseClient'
import { mapSupabaseError } from '../services/supabaseConfig'
import { getOAuthCallbackError } from '../services/oauth'
import { LoadingScreen } from '../components/ui/LoadingScreen'

export function AuthCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const oauthError = getOAuthCallbackError()
    if (oauthError) {
      toast.error(oauthError)
      navigate('/auth', { replace: true })
      return
    }

    let cancelled = false
    const supabase = getSupabase()
    const params = new URLSearchParams(window.location.search)
    const hasAuthCode = params.has('code')

    const finish = (path: '/dashboard' | '/auth', message?: string) => {
      if (cancelled) return
      if (message) toast.error(message)
      else if (path === '/dashboard') toast.success('Signed in successfully')
      navigate(path, { replace: true })
    }

    const completeSignIn = async () => {
      try {
        if (hasAuthCode) {
          const { error } = await supabase.auth.exchangeCodeForSession(window.location.href)
          if (error) throw error
        }

        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        if (data.session) {
          finish('/dashboard')
          return
        }

        finish(
          '/auth',
          'Could not complete sign-in. Add http://localhost:5173/auth/callback to Supabase redirect URLs.',
        )
      } catch (err) {
        finish('/auth', mapSupabaseError(err))
      }
    }

    void completeSignIn()

    return () => {
      cancelled = true
    }
  }, [navigate])

  return <LoadingScreen label="Completing sign in…" />
}
