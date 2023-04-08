import {createGetInitialProps} from '@mantine/next';
import Document, {Head, Html, Main, NextScript} from 'next/document';


// as per: https://mantine.dev/guides/next/
const getInitialProps = createGetInitialProps();

export default class _Document extends Document {

  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="author" content="Marco Lotz"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}
