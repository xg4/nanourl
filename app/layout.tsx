import { Analytics } from '@vercel/analytics/react'
import 'antd/dist/reset.css'
import '../styles/globals.css'
import Providers from './providers'

export const metadata = {
  title: 'URL Shortener - Short URLs & Custom Free Link Shortener | Nano URL',
  description: "Free URL shortener to create perfect URLs for your business. It's open source",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Providers>
        <body>{children}</body>
      </Providers>
      <Analytics />
    </html>
  )
}
