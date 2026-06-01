import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { getSupabase } from '../services/supabaseClient'
import { mapSupabaseError } from '../services/supabaseConfig'
import { useAuth } from '../hooks/useAuth'
import { Container } from '../components/ui/Container'
import { LoadingScreen } from '../components/ui/LoadingScreen'

export function AuthPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (loading) return <LoadingScreen label="Loading…" />
  if (user) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    try {
      const auth = getSupabase().auth

      if (mode === 'signup') {
        const { data, error } = await auth.signUp({ email, password })
        if (error) {
          const msg = error.message.toLowerCase()
          if (msg.includes('already registered') || msg.includes('already exists')) {
            toast.error('This email is already registered. Log in instead.')
            setMode('login')
            return
          }
          throw error
        }

        if (data.session) {
          toast.success('Account created.')
          navigate('/dashboard')
          return
        }

        // Fallback when Supabase still requires email confirm (should be disabled in dashboard)
        const { error: signInError } = await auth.signInWithPassword({ email, password })
        if (!signInError) {
          toast.success('Account created.')
          navigate('/dashboard')
          return
        }

        toast.error(
          'Account created but sign-in is blocked. In Supabase → Authentication → Email, turn OFF "Confirm email", then log in.',
          { duration: 8000 },
        )
        setMode('login')
        return
      }

      const { error } = await auth.signInWithPassword({ email, password })
      if (error) throw error
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(mapSupabaseError(err))
    } finally {
      setSubmitting(false)
    }
  }

  const isSignup = mode === 'signup'

  return (
    <div className="min-h-[100svh] bg-zinc-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-zinc-950 to-zinc-950" />
      <Container>
        <div className="relative flex min-h-[100svh] items-center justify-center py-12">
          <div className="card w-full max-w-md p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/15 ring-1 ring-violet-400/20">
                <div className="h-5 w-5 rounded bg-violet-400/80" />
              </div>
              <h1 className="text-2xl font-semibold text-zinc-50">Secure File Vault</h1>
              <p className="mt-2 text-sm text-zinc-400">
                {isSignup ? 'Create an account — no email verification' : 'Log in to your vault'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Email</label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-400">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full">
                {submitting ? 'Please wait…' : isSignup ? 'Create account' : 'Log in'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-400">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                className="font-medium text-violet-400 hover:text-violet-300"
                onClick={() => setMode(isSignup ? 'login' : 'signup')}
              >
                {isSignup ? 'Log in' : 'Create account'}
              </button>
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
