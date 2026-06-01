import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { FileUpload } from '../components/FileUpload'
import { FileList } from '../components/FileList'
import { AppShell } from '../components/ui/AppShell'
import { Container } from '../components/ui/Container'
import { IconSearch } from '../components/ui/Icons'
import { useAuth } from '../hooks/useAuth'
import { useFiles } from '../hooks/useFiles'

export function DashboardPage() {
  const { user } = useAuth()
  const { files, loading, uploadFile, downloadFile, deleteFile } = useFiles(user?.id)
  const [search, setSearch] = useState('')

  return (
    <AppShell>
      <Navbar />
      <main className="py-8 pb-16">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="page-title">Your vault</h1>
              <p className="mt-2 text-sm text-zinc-400">
                Files are encrypted in your browser before they reach the cloud.
              </p>
            </div>
            <div className="relative w-full sm:max-w-sm">
              <IconSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="search"
                className="input pl-10"
                placeholder="Search files…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
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
    </AppShell>
  )
}
