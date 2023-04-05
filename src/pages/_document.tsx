import Document, {Head, Html, Main, NextScript} from 'next/document';

export default class _Document extends Document {

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="author" content="Marco Lotz"/>
          <link rel="icon" href="/favicon.ico"/>
          <link rel="stylesheet" href="styles/globals.css"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}
