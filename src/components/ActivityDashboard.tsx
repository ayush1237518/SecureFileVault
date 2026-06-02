import { activityLabel, useActivity } from '../hooks/useActivity'
import type { ActivityAction } from '../types/activity'

type Props = {
  userId: string | undefined
}

function actionColor(action: ActivityAction): string {
  switch (action) {
    case 'login':
      return 'bg-sky-500/15 text-sky-300 ring-sky-500/30'
    case 'upload':
      return 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30'
    case 'download':
      return 'bg-violet-500/15 text-violet-300 ring-violet-500/30'
    case 'delete':
      return 'bg-red-500/15 text-red-300 ring-red-500/30'
  }
}

function formatWhen(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const mins = Math.floor(diffMs / 60_000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function ActivityDashboard({ userId }: Props) {
  const { activities, stats, loading, tableMissing } = useActivity(userId)

  const statCards = [
    { label: 'Uploads', value: stats.uploads, color: 'text-emerald-400' },
    { label: 'Downloads', value: stats.downloads, color: 'text-violet-400' },
    { label: 'Deletes', value: stats.deletes, color: 'text-red-400' },
    { label: 'Sign-ins', value: stats.logins, color: 'text-sky-400' },
  ]

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-50">Your activity</h2>
        <p className="mt-1 text-sm text-zinc-400">Recent vault actions on this account</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {statCards.map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center"
          >
            <div className={`text-2xl font-semibold tabular-nums ${color}`}>{value}</div>
            <div className="mt-1 text-xs text-zinc-500">{label}</div>
          </div>
        ))}
      </div>

      {tableMissing && (
        <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-950/30 px-4 py-3 text-sm text-amber-100">
          Activity table not found. Run <code className="rounded bg-white/10 px-1">supabase/activity.sql</code> in
          Supabase SQL Editor, then refresh.
        </div>
      )}

      {loading ? (
        <p className="text-sm text-zinc-400">Loading activity…</p>
      ) : activities.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/10 py-8 text-center text-sm text-zinc-500">
          No activity yet. Upload a file or sign in to see events here.
        </p>
      ) : (
        <ul className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
          {activities.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
            >
              <span
                className={`mt-0.5 shrink-0 rounded-lg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${actionColor(item.action)}`}
              >
                {activityLabel(item.action)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-100">{item.title}</p>
                {item.detail && (
                  <p className="mt-0.5 truncate text-xs text-zinc-500">{item.detail}</p>
                )}
              </div>
              <time className="shrink-0 text-xs text-zinc-500" dateTime={item.created_at}>
                {formatWhen(item.created_at)}
              </time>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
