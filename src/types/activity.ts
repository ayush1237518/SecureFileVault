export type ActivityAction = 'login' | 'upload' | 'download' | 'delete'

export type ActivityLog = {
  id: string
  user_id: string
  action: ActivityAction
  title: string
  detail: string | null
  created_at: string
}
