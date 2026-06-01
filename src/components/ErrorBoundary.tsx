import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-[100svh] bg-zinc-950 px-4 py-12 text-zinc-100">
          <div className="mx-auto max-w-lg rounded-2xl border border-red-500/30 bg-red-950/20 p-8">
            <h1 className="text-lg font-semibold text-red-200">Something went wrong</h1>
            <p className="mt-2 text-sm text-zinc-400">
              The app crashed while loading. Try refreshing the page. If you opened a file from your
              disk, run <code className="rounded bg-white/10 px-1">npm run dev</code> instead.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-black/40 p-3 text-xs text-zinc-300">
              {this.state.error.message}
            </pre>
            <button
              type="button"
              className="mt-6 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
