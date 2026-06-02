import { useCallback, useEffect, useState } from 'react'
import { getSupabase } from '../services/supabaseClient'
import { mapSupabaseError } from '../services/supabaseConfig'
import type { VaultFile } from '../types/file'
import { encryptFile, decryptFile } from '../utils/encryption'
import { logActivity } from '../services/activityLog'

const BUCKET = 'vault-files'
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

export function useFiles(userId: string | undefined) {
  const [files, setFiles] = useState<VaultFile[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFiles = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    const { data, error } = await getSupabase()
      .from('files')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw new Error(mapSupabaseError(error))
    setFiles((data as VaultFile[]) ?? [])
    setLoading(false)
  }, [userId])

  useEffect(() => {
    if (!userId) {
      setFiles([])
      setLoading(false)
      return
    }
    fetchFiles().catch(() => setLoading(false))
  }, [userId, fetchFiles])

  const uploadFile = async (
    file: File,
    passphrase: string,
    onProgress?: (pct: number) => void,
  ) => {
    if (!userId) throw new Error('Not authenticated')
    if (file.size > MAX_FILE_SIZE) throw new Error('File exceeds 10 MB limit')

    onProgress?.(10)
    const encrypted = await encryptFile(file, passphrase)
    onProgress?.(40)

    const storagePath = `${userId}/${crypto.randomUUID()}.enc`
    const { error: uploadError } = await getSupabase().storage
      .from(BUCKET)
      .upload(storagePath, encrypted, { upsert: false, contentType: 'text/plain' })

    if (uploadError) throw new Error(mapSupabaseError(uploadError))
    onProgress?.(75)

    const { error: dbError } = await getSupabase().from('files').insert({
      user_id: userId,
      file_name: file.name,
      file_size: file.size,
      storage_path: storagePath,
    })

    if (dbError) {
      await getSupabase().storage.from(BUCKET).remove([storagePath])
      throw new Error(mapSupabaseError(dbError))
    }

    onProgress?.(100)
    await fetchFiles()
    void logActivity('upload', `Uploaded ${file.name}`, `${file.size} bytes`)
  }

  const downloadFile = async (record: VaultFile, passphrase: string) => {
    const { data, error } = await getSupabase().storage.from(BUCKET).download(record.storage_path)
    if (error) throw new Error(mapSupabaseError(error))
    if (!data) throw new Error('No file data returned')

    const decrypted = await decryptFile(data, passphrase, record.file_name, {
      expectedSize: record.file_size,
    })
    const url = URL.createObjectURL(decrypted)
    const a = document.createElement('a')
    a.href = url
    a.download = record.file_name
    a.click()
    URL.revokeObjectURL(url)
    void logActivity('download', `Downloaded ${record.file_name}`)
  }

  const deleteFile = async (record: VaultFile) => {
    const { error: storageError } = await getSupabase().storage
      .from(BUCKET)
      .remove([record.storage_path])
    if (storageError) throw new Error(mapSupabaseError(storageError))

    const { error: dbError } = await getSupabase().from('files').delete().eq('id', record.id)
    if (dbError) throw new Error(mapSupabaseError(dbError))

    setFiles((prev) => prev.filter((f) => f.id !== record.id))
    void logActivity('delete', `Deleted ${record.file_name}`)
  }

  return { files, loading, uploadFile, downloadFile, deleteFile, refresh: fetchFiles }
}
