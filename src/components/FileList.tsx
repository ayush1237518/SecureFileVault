import { useState } from 'react'
import { toast } from 'react-hot-toast'
import type { VaultFile } from '../types/file'
import { formatBytes, formatDate } from '../utils/format'

type Props = {
  files: VaultFile[]
  loading: boolean
  search: string
  onDownload: (file: VaultFile, passphrase: string) => Promise<void>
  onDelete: (file: VaultFile) => Promise<void>
}

export function FileList({ files, loading, search, onDownload, onDelete }: Props) {
  const [passphrase, setPassphrase] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)

  const filtered = files.filter((f) =>
    f.file_name.toLowerCase().includes(search.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="card p-6">
        <p className="text-sm text-zinc-400">Loading files…</p>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-50">Your files</h2>
          <p className="mt-1 text-sm text-zinc-400">{filtered.length} file(s)</p>
        </div>
        <div className="w-full sm:max-w-xs">
          <label className="mb-1 block text-xs font-medium text-zinc-400">Decryption passphrase</label>
          <input
            type="password"
            className="input"
            placeholder="For downloads"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-zinc-500">
          {search ? 'No files match your search.' : 'No files yet. Upload your first encrypted file.'}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs text-zinc-400">
                <th className="pb-3 pr-4 font-medium">Name</th>
                <th className="pb-3 pr-4 font-medium">Size</th>
                <th className="pb-3 pr-4 font-medium">Uploaded</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((file) => (
                <tr key={file.id} className="border-b border-white/5 last:border-0">
                  <td className="py-3 pr-4 font-medium text-zinc-100">{file.file_name}</td>
                  <td className="py-3 pr-4 text-zinc-400">{formatBytes(file.file_size)}</td>
                  <td className="py-3 pr-4 text-zinc-400">{formatDate(file.created_at)}</td>
                  <td className="py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="btn-secondary text-xs"
                        disabled={busyId === file.id}
                        onClick={async () => {
                          if (!passphrase.trim()) {
                            toast.error('Enter decryption passphrase')
                            return
                          }
                          setBusyId(file.id)
                          try {
                            await onDownload(file, passphrase)
                            toast.success('Download started')
                          } catch (e) {
                            toast.error(e instanceof Error ? e.message : 'Download failed')
                          } finally {
                            setBusyId(null)
                          }
                        }}
                      >
                        Download
                      </button>
                      <button
                        type="button"
                        className="btn text-xs text-red-300 hover:bg-red-500/10"
                        disabled={busyId === file.id}
                        onClick={async () => {
                          if (!confirm(`Delete "${file.file_name}"?`)) return
                          setBusyId(file.id)
                          try {
                            await onDelete(file)
                            toast.success('File deleted')
                          } catch (e) {
                            toast.error(e instanceof Error ? e.message : 'Delete failed')
                          } finally {
                            setBusyId(null)
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
