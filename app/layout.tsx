import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Library',
  description: 'Browse for assets needed to report and present analysis.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
