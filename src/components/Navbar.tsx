import { useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth'
import { Container } from './ui/Container'

export function Navbar() {
  const { user, signOut } = useAuth()

  const email = useMemo(() => user?.email ?? '—', [user?.email])

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/75 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-500/15 ring-1 ring-violet-400/20">
              <div className="h-4 w-4 rounded bg-violet-400/80" />
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight text-zinc-50">Secure File Vault</div>
              <div className="text-xs text-zinc-400">Client-side encrypted storage</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-xs text-zinc-400">Signed in as</div>
              <div className="max-w-[280px] truncate text-sm text-zinc-100">{email}</div>
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={async () => {
                try {
                  await signOut()
                  toast.success('Logged out')
                } catch (e) {
                  toast.error(e instanceof Error ? e.message : 'Failed to log out')
                }
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}

