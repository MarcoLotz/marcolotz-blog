import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class AppDocument extends Document {
  render() {
    return (
      <Html lang="en" {...mantineHtmlProps}>
        <Head>
          <meta name="author" content="Marco Lotz" />
          <link rel="icon" href="/favicon.ico" />
          <ColorSchemeScript defaultColorScheme="light" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
