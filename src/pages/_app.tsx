import Footer from '@/components/Footer'
import Header from '@/components/Header'

import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';

import '@/styles/globals.css'
import { AuthProvider } from '@/hooks/useAuth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
      >
        <Header />
        <Component {...pageProps} />
        <Footer />
      </MantineProvider>
    </AuthProvider>
  );
}
