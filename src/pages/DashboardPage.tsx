import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { FileUpload } from '../components/FileUpload'
import { FileList } from '../components/FileList'
import { Container } from '../components/ui/Container'
import { useAuth } from '../hooks/useAuth'
import { useFiles } from '../hooks/useFiles'

export function DashboardPage() {
  const { user } = useAuth()
  const { files, loading, uploadFile, downloadFile, deleteFile } = useFiles(user?.id)
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-[100svh] bg-zinc-950">
      <Navbar />
      <main className="py-8">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-50">Dashboard</h1>
              <p className="mt-1 text-sm text-zinc-400">Manage your encrypted files securely.</p>
            </div>
            <input
              type="search"
              className="input sm:max-w-xs"
              placeholder="Search files…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <FileUpload onUpload={uploadFile} />
            <FileList
              files={files}
              loading={loading}
              search={search}
              onDownload={downloadFile}
              onDelete={deleteFile}
            />
          </div>
        </Container>
      </main>
    </div>
  )
}
