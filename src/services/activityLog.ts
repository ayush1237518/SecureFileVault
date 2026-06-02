import { getSupabase } from './supabaseClient'
import type { ActivityAction } from '../types/activity'

export async function logActivity(
  action: ActivityAction,
  title: string,
  detail?: string,
): Promise<void> {
  try {
    const {
      data: { user },
    } = await getSupabase().auth.getUser()
    if (!user) return

    const { error } = await getSupabase().from('activity_log').insert({
      user_id: user.id,
      action,
      title,
      detail: detail ?? null,
    })

    if (error) console.warn('Activity log:', error.message)
  } catch (err) {
    console.warn('Activity log failed:', err)
  }
}
