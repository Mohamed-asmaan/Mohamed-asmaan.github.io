import Link from 'next/link'
import { Home } from 'lucide-react'
import { Container } from '@/components/ui/container'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Container>
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Sorry, the page you&apos;re looking for doesn&apos;t exist. It might have been moved, 
              deleted, or you entered the wrong URL.
            </p>
          </div>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </Container>
    </div>
  )
}
