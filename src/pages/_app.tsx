import Footer from '@/components/Footer'
import Header from '@/components/Header'

import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
    >
      <Header
        user={{
          name: 'Marco Aurélio Lotz',
          image: 'https://github.com/marcolotz.png'
        }}
      />
      <Component {...pageProps} />
      <Footer />
    </MantineProvider>
  );
}
