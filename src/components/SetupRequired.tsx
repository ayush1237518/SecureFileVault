import { Container } from './ui/Container'

export function SetupRequired() {
  return (
    <div className="min-h-[100svh] bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-zinc-950 to-zinc-950" />
      <Container>
        <div className="relative flex min-h-[100svh] items-center justify-center py-12">
          <div className="card w-full max-w-lg p-8">
            <h1 className="text-xl font-semibold text-zinc-50">Supabase setup required</h1>
            <p className="mt-2 text-sm text-zinc-400">
              The app cannot connect because <code className="rounded bg-white/10 px-1">.env</code> still
              has placeholder values or is missing. &quot;Failed to fetch&quot; happens when the URL does not
              point to a real Supabase project.
            </p>

            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm text-zinc-300">
              <li>
                Create a free project at{' '}
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noreferrer"
                  className="text-violet-400 hover:underline"
                >
                  supabase.com/dashboard
                </a>
              </li>
              <li>
                Open <strong>Project Settings → API</strong> and copy the Project URL and{' '}
                <code className="rounded bg-white/10 px-1">anon</code> public key.
              </li>
              <li>
                Create <code className="rounded bg-white/10 px-1">.env</code> in the project root (copy from{' '}
                <code className="rounded bg-white/10 px-1">.env.example</code>):
                <pre className="mt-2 overflow-x-auto rounded-xl bg-black/40 p-3 text-xs text-zinc-200">
{`VITE_SUPABASE_URL=https://YOUR_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here`}
                </pre>
              </li>
              <li>
                In Supabase <strong>SQL Editor</strong>, run the script:{' '}
                <code className="rounded bg-white/10 px-1">supabase/schema.sql</code>
              </li>
              <li>
                Enable <strong>Authentication → Email</strong> provider (and disable email confirm for local
                testing if you prefer).
              </li>
              <li>
                Restart the dev server: <code className="rounded bg-white/10 px-1">npm run dev</code>
              </li>
            </ol>
          </div>
        </div>
      </Container>
    </div>
  )
}
