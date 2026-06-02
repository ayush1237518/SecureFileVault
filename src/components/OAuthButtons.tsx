import { useState } from 'react'
import { toast } from 'react-hot-toast'
import type { Provider } from '@supabase/supabase-js'
import { signInWithOAuthProvider } from '../services/oauth'
import { mapSupabaseError } from '../services/supabaseConfig'
import { IconGitHub, IconGoogle } from './ui/Icons'

type OAuthProvider = 'google' | 'github'

type Props = {
  disabled?: boolean
  mode: 'login' | 'signup'
}

const providers: { id: OAuthProvider; label: string; icon: typeof IconGoogle }[] = [
  { id: 'google', label: 'Google', icon: IconGoogle },
  { id: 'github', label: 'GitHub', icon: IconGitHub },
]

export function OAuthButtons({ disabled, mode }: Props) {
  const [busy, setBusy] = useState<OAuthProvider | null>(null)

  const handleOAuth = async (provider: OAuthProvider) => {
    if (disabled || busy) return
    setBusy(provider)
    try {
      await signInWithOAuthProvider(provider as Provider)
    } catch (err) {
      toast.error(mapSupabaseError(err))
      setBusy(null)
    }
  }

  const action = mode === 'signup' ? 'Sign up' : 'Continue'

  return (
    <div className="space-y-3">
      {providers.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          disabled={disabled || busy !== null}
          onClick={() => void handleOAuth(id)}
          className="btn-oauth w-full"
        >
          <Icon className="h-5 w-5 shrink-0" />
          <span>
            {busy === id ? 'Redirecting…' : `${action} with ${label}`}
          </span>
        </button>
      ))}
    </div>
  )
}
