import { useCallback, useEffect, useState } from 'react'
import { getSupabase } from '../services/supabaseClient'
import { mapSupabaseError } from '../services/supabaseConfig'
import type { ActivityAction, ActivityLog } from '../types/activity'

export type ActivityStats = {
  uploads: number
  downloads: number
  deletes: number
  logins: number
}

export function useActivity(userId: string | undefined) {
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [stats, setStats] = useState<ActivityStats>({
    uploads: 0,
    downloads: 0,
    deletes: 0,
    logins: 0,
  })
  const [loading, setLoading] = useState(true)
  const [tableMissing, setTableMissing] = useState(false)

  const fetchActivity = useCallback(async () => {
    if (!userId) {
      setActivities([])
      setLoading(false)
      return
    }

    setLoading(true)
    setTableMissing(false)

    const { data, error } = await getSupabase()
      .from('activity_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      const msg = error.message.toLowerCase()
      if (msg.includes('activity_log') || msg.includes('schema cache') || msg.includes('does not exist')) {
        setTableMissing(true)
        setActivities([])
        setStats({ uploads: 0, downloads: 0, deletes: 0, logins: 0 })
      } else {
        console.error(mapSupabaseError(error))
      }
      setLoading(false)
      return
    }

    const rows = (data as ActivityLog[]) ?? []
    setActivities(rows)

    const next: ActivityStats = { uploads: 0, downloads: 0, deletes: 0, logins: 0 }
    for (const row of rows) {
      if (row.action === 'upload') next.uploads++
      else if (row.action === 'download') next.downloads++
      else if (row.action === 'delete') next.deletes++
      else if (row.action === 'login') next.logins++
    }
    setStats(next)
    setLoading(false)
  }, [userId])

  useEffect(() => {
    fetchActivity().catch(() => setLoading(false))
  }, [fetchActivity])

  return { activities, stats, loading, tableMissing, refresh: fetchActivity }
}

export function activityLabel(action: ActivityAction): string {
  switch (action) {
    case 'login':
      return 'Sign in'
    case 'upload':
      return 'Upload'
    case 'download':
      return 'Download'
    case 'delete':
      return 'Delete'
  }
}
