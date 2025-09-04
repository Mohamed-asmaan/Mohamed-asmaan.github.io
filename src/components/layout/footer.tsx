import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { siteConfig } from '@/site.config'
import { Container } from '@/components/ui/container'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <Container className="py-12">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MA</span>
            </div>
            <span className="font-bold text-xl">{siteConfig.name.split(' ')[2]}</span>
          </div>
          
          <p className="text-sm text-muted-foreground max-w-md">
            {siteConfig.shortBio}
          </p>

          <div className="flex items-center space-x-4">
            {siteConfig.social.github && (
              <Link
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            )}
            {siteConfig.social.linkedin && (
              <Link
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            )}
            <Link
              href={`mailto:${siteConfig.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  )
}
