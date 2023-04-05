import Document, {Head, Html, Main, NextScript} from 'next/document';

export default class _Document extends Document {

  render() {
    return (
        <Html lang="en">
          <Head>
            <meta name="description"
                  content="Marco Lotz:  Thoughts about Big Data and Embedded Systems"/>
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
