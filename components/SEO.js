import Head from 'next/head';
import PropTypes from 'prop-types';

const SITE_URL = 'https://www.frear-projects.com/';
// The round FP logo: a 1200x630 card for link previews (social media,
// text messages, Slack, etc.) and a square version for search engines
const SHARE_IMAGE = `${SITE_URL}og-image.png`;
const LOGO = `${SITE_URL}icon-512.png`;
const IMAGE_ALT = 'Frear Projects logo: FP. inside a green circle';

export default function SEO({
  title = 'Frear Projects | Independent Web Development for Creative Teams',
  description = 'Frear Projects is the independent web development practice of Amy Frear in Philadelphia, partnering with agencies and creative teams on front-end development and creative digital experiences.',
  image = SHARE_IMAGE,
  url = SITE_URL,
  keywords = 'freelance web developer, front-end development, agency subcontracting, Drupal, WordPress, React, Next.js, accessibility, Philadelphia',
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Amy Frear',
    url,
    image: LOGO,
    description,
    jobTitle: 'Freelance Web Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Frear Projects',
      url,
      logo: LOGO,
      image: LOGO,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Philadelphia',
      addressRegion: 'PA',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.linkedin.com/in/amy-frear',
      'https://github.com/a-frear',
      'https://vimeo.com/amyfrear',
    ],
    email: 'frearprojects@gmail.com',
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
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={IMAGE_ALT} />
      <meta property="og:site_name" content="Frear Projects" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={IMAGE_ALT} />

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
