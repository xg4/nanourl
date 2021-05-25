import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/tailwind.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nano URL</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
