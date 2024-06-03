import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'

export const metadata = {
  title: 'URL Shortener - Short URLs & Custom Free Link Shortener | Nano URL',
  description: "Free URL shortener to create perfect URLs for your business. It's open source",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="dark:bg-slate-700">
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
