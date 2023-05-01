import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import '../styles/tailwind.css'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ConfigProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>URL Shortener - Short URLs & Custom Free Link Shortener | Nano URL</title>
            <link rel="icon" href="/favicon.ico" />
            <meta charSet="utf-8" />
            <meta
              name="description"
              content="Free URL shortener to create perfect URLs for your business. It's open source"
            />
          </Head>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </ConfigProvider>
  )
}
