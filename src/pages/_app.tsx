import Footer from '@/components/Footer'
import Header from '@/components/Header'

import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';

import '@/styles/globals.css'
import { AuthProvider } from '@/hooks/useAuth';
import { EditPostProvider } from '@/hooks/useEdit';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <EditPostProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
        >
          <Header />
          <Component {...pageProps} />
          <Footer />
        </MantineProvider>
      </EditPostProvider>
    </AuthProvider>
  );
}
