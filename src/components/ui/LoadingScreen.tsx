export function LoadingScreen({ label }: { label?: string }) {
  return (
    <div className="min-h-[100svh] bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-[100svh] max-w-6xl items-center justify-center px-4">
        <div className="card w-full max-w-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
            <div className="text-sm text-zinc-200">{label ?? 'Loading…'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

