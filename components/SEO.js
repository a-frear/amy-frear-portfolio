import Head from 'next/head';
import PropTypes from 'prop-types';

export default function SEO({
  title = 'Amy Frear - Web Developer',
  description = 'Portfolio of Amy Frear, a web developer specializing in interactive web experiences, animation, and video art.',
  image = 'https://www.frear-projects.com/assets/amy-hs.jpeg',
  url = 'https://www.frear-projects.com/',
  keywords = 'developer, portfolio, react, next.js, video art, web design, animation',
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Amy Frear',
    url,
    image,
    description,
    jobTitle: 'Web Developer',
    sameAs: [
      'https://www.linkedin.com/in/amy-frear',
      'https://github.com/a-frear',
      'https://vimeo.com/amyfrear',
    ],
    email: 'amy.frear@gmail.com',
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Amy Frear" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Amy Frear Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="30 days" />
      <meta name="theme-color" content="#ffffff" />

      {/* Canonical Tag */}
      <link rel="canonical" href={url} />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  keywords: PropTypes.string,
};
