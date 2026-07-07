import '@mantine/core/styles.css';
import '@/styles/globals.css';

import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider defaultColorScheme="light">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </MantineProvider>
  );
}
