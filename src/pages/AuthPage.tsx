import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { getSupabase } from '../services/supabaseClient'
import { mapSupabaseError } from '../services/supabaseConfig'
import { useAuth } from '../hooks/useAuth'
import { AppShell } from '../components/ui/AppShell'
import { Container } from '../components/ui/Container'
import { LoadingScreen } from '../components/ui/LoadingScreen'
import { Logo } from '../components/ui/Logo'
import { OAuthButtons } from '../components/OAuthButtons'

export function AuthPage() {
  const { user, loading, connectionError } = useAuth()
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

        const { error: signInError } = await auth.signInWithPassword({ email, password })
        if (!signInError) {
          toast.success('Account created.')
          navigate('/dashboard')
          return
        }

        toast.error(
          'Turn OFF "Confirm email" in Supabase → Authentication → Email, then log in.',
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
    <AppShell>
      <Container>
        <div className="flex min-h-[100svh] flex-col items-center justify-center py-10">
          <div className="card w-full max-w-md p-8">
            <div className="mb-8 flex flex-col items-center text-center">
              <Logo size="md" />
              <h1 className="page-title mt-5">Secure File Vault</h1>
              <p className="mt-2 max-w-xs text-sm text-zinc-400">
                {isSignup
                  ? 'Create an account and start uploading encrypted files.'
                  : 'Log in to access your private vault.'}
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-zinc-950/80 p-1 ring-1 ring-white/10">
              <button
                type="button"
                className={`rounded-lg py-2 text-sm font-medium transition ${
                  !isSignup ? 'bg-violet-500 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                onClick={() => setMode('login')}
              >
                Log in
              </button>
              <button
                type="button"
                className={`rounded-lg py-2 text-sm font-medium transition ${
                  isSignup ? 'bg-violet-500 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
                }`}
                onClick={() => setMode('signup')}
              >
                Create account
              </button>
            </div>

            {connectionError && (
              <div
                className="mb-4 rounded-xl border border-amber-500/30 bg-amber-950/30 px-4 py-3 text-sm text-amber-100"
                role="alert"
              >
                {connectionError}
              </div>
            )}

            <OAuthButtons mode={mode} disabled={submitting} />

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center" aria-hidden>
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wide">
                <span className="bg-zinc-900/40 px-3 text-zinc-500">or use email</span>
              </div>
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
                  placeholder="At least 6 characters"
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full py-2.5">
                {submitting ? 'Please wait…' : isSignup ? 'Create account' : 'Log in'}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </AppShell>
  )
}
