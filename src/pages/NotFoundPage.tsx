import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'

export function NotFoundPage() {
  return (
    <div className="min-h-[100svh] bg-zinc-950">
      <Container>
        <div className="flex min-h-[100svh] flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-4xl font-semibold text-zinc-50">404</h1>
          <p className="text-zinc-400">Page not found.</p>
          <Link to="/dashboard" className="btn-primary">
            Go to dashboard
          </Link>
        </div>
      </Container>
    </div>
  )
}
