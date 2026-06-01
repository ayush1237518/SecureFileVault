import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-hot-toast'
import { MAX_FILE_SIZE } from '../hooks/useFiles'

type Props = {
  onUpload: (file: File, passphrase: string, onProgress: (pct: number) => void) => Promise<void>
}

export function FileUpload({ onUpload }: Props) {
  const [passphrase, setPassphrase] = useState('')
  const [progress, setProgress] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = useCallback(
    async (file: File) => {
      if (!passphrase.trim()) {
        toast.error('Enter an encryption passphrase first')
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error('File exceeds 10 MB limit')
        return
      }
      setUploading(true)
      setProgress(0)
      try {
        await onUpload(file, passphrase, setProgress)
        toast.success(`Uploaded ${file.name}`)
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Upload failed')
      } finally {
        setUploading(false)
        setTimeout(() => setProgress(null), 800)
      }
    },
    [passphrase, onUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (accepted) => {
      const file = accepted[0]
      if (file) void handleFile(file)
    },
    multiple: false,
    disabled: uploading,
    maxSize: MAX_FILE_SIZE,
  })

  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold text-zinc-50">Upload file</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Files are encrypted in your browser before upload (max 10 MB).
      </p>

      <div className="mt-4">
        <label className="mb-1 block text-xs font-medium text-zinc-400">Encryption passphrase</label>
        <input
          type="password"
          className="input"
          placeholder="Same passphrase needed to download"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          disabled={uploading}
        />
      </div>

      <div
        {...getRootProps()}
        className={`mt-4 cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition ${
          isDragActive
            ? 'border-violet-400/60 bg-violet-500/10'
            : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5'
        } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-zinc-300">
          {isDragActive ? 'Drop the file here…' : 'Drag & drop a file here, or click to browse'}
        </p>
        <p className="mt-1 text-xs text-zinc-500">Up to 10 MB per file</p>
      </div>

      {progress !== null && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-zinc-400">
            <span>Uploading…</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
