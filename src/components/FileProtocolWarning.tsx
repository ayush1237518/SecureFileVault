export function FileProtocolWarning() {
  return (
    <div className="min-h-[100svh] bg-zinc-950 px-4 py-12 text-zinc-100">
      <div className="mx-auto max-w-lg rounded-2xl border border-amber-500/30 bg-amber-950/20 p-8">
        <h1 className="text-lg font-semibold text-amber-100">Start the dev server</h1>
        <p className="mt-2 text-sm text-zinc-400">
          This app cannot run by double-clicking <code className="rounded bg-white/10 px-1">index.html</code>.
          Browsers block it for security. Use a local web server instead.
        </p>
        <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-zinc-300">
          <li>
            Open a terminal in the project folder{' '}
            <code className="rounded bg-white/10 px-1">d:\SecureFileVault</code>
          </li>
          <li>
            Run <code className="rounded bg-white/10 px-1">npm install</code> (first time only)
          </li>
          <li>
            Run <code className="rounded bg-white/10 px-1">npm run dev</code>
          </li>
          <li>
            On this PC, open{' '}
            <code className="rounded bg-white/10 px-1">http://localhost:5173</code>
          </li>
          <li>
            On your phone (same Wi‑Fi), open the <strong>Network</strong> URL from the terminal, e.g.{' '}
            <code className="rounded bg-white/10 px-1">http://192.168.1.5:5173</code> — not localhost
          </li>
        </ol>
      </div>
    </div>
  )
}
