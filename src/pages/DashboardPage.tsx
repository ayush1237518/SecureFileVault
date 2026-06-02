import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { FileUpload } from '../components/FileUpload'
import { FileList } from '../components/FileList'
import { ActivityDashboard } from '../components/ActivityDashboard'
import { AppShell } from '../components/ui/AppShell'
import { Container } from '../components/ui/Container'
import { IconSearch } from '../components/ui/Icons'
import { useAuth } from '../hooks/useAuth'
import { useFiles } from '../hooks/useFiles'
import { useActivity } from '../hooks/useActivity'

type Tab = 'vault' | 'activity'

export function DashboardPage() {
  const { user } = useAuth()
  const { files, loading, uploadFile, downloadFile, deleteFile } = useFiles(user?.id)
  const { refresh: refreshActivity } = useActivity(user?.id)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<Tab>('vault')

  const wrapUpload = async (
    file: File,
    passphrase: string,
    onProgress: (pct: number) => void,
  ) => {
    await uploadFile(file, passphrase, onProgress)
    void refreshActivity()
  }

  const wrapDownload = async (record: Parameters<typeof downloadFile>[0], passphrase: string) => {
    await downloadFile(record, passphrase)
    void refreshActivity()
  }

  const wrapDelete = async (record: Parameters<typeof deleteFile>[0]) => {
    await deleteFile(record)
    void refreshActivity()
  }

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

          <div className="mb-6 flex gap-1 rounded-xl bg-zinc-950/80 p-1 ring-1 ring-white/10 w-fit">
            <button
              type="button"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                tab === 'vault' ? 'bg-violet-500 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
              onClick={() => setTab('vault')}
            >
              Files
            </button>
            <button
              type="button"
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                tab === 'activity'
                  ? 'bg-violet-500 text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              onClick={() => setTab('activity')}
            >
              Activity
            </button>
          </div>

          {tab === 'vault' ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <FileUpload onUpload={wrapUpload} />
              <FileList
                files={files}
                loading={loading}
                search={search}
                onDownload={wrapDownload}
                onDelete={wrapDelete}
              />
            </div>
          ) : (
            <ActivityDashboard userId={user?.id} />
          )}
        </Container>
      </main>
    </AppShell>
  )
}
