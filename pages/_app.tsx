import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/tailwind.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
    </>
  )
}
