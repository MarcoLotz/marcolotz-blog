import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Header
      user={{
        name: 'Marco Aurélio Lotz',
        image: 'https://github.com/marcolotz.png'
      }}
    />
    <Component {...pageProps} />
    <Footer />
  </>
}
