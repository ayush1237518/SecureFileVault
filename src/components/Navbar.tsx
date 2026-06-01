import { useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth'
import { Container } from './ui/Container'
import { Logo } from './ui/Logo'

export function Navbar() {
  const { user, signOut } = useAuth()
  const email = useMemo(() => user?.email ?? '—', [user?.email])

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <div className="text-sm font-semibold leading-tight text-zinc-50">Secure File Vault</div>
              <div className="text-xs text-zinc-500">AES encrypted · client-side</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">Signed in</div>
              <div className="max-w-[220px] truncate text-sm text-zinc-200">{email}</div>
            </div>
            <button
              type="button"
              className="btn-secondary shrink-0"
              onClick={async () => {
                try {
                  await signOut()
                  toast.success('Logged out')
                } catch (e) {
                  toast.error(e instanceof Error ? e.message : 'Failed to log out')
                }
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}
