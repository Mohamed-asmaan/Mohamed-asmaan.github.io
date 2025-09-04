import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ScrollToTop } from '@/components/layout/scroll-to-top'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'M. Mohamed Asmaan - Low-Code Developer & Frontend Engineer',
  description: 'Low-Code Specialist with expertise in Webflow, WordPress, React, and AI integration. Creating modern, scalable web solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
