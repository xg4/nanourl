import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import '../styles/tailwind.css'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <title>
            URL Shortener - Short URLs & Custom Free Link Shortener | Nano URL
          </title>
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
  )
}
