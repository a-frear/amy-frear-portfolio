import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />

          {/* Preload local fonts for faster rendering */}
          <link
            rel="preload"
            href="/assets/fonts/BowlbyOneSC-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/fonts/FjallaOne-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          {/* Preconnect to Vimeo for faster video loading */}
          <link rel="preconnect" href="https://player.vimeo.com" />
          <link rel="preconnect" href="https://i.vimeocdn.com" />
          <link rel="dns-prefetch" href="https://player.vimeo.com" />
          <link rel="dns-prefetch" href="https://i.vimeocdn.com" />
          <link rel="prefetch" href="https://player.vimeo.com/api/player.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
