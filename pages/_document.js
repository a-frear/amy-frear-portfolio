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
          {/* Preload local fonts for faster rendering */}
          <link
            rel="preload"
            href="/assets/fonts/BowlbyOneSC-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/fonts/FjallaOne-Regular.ttf"
            as="font"
            type="font/ttf"
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
