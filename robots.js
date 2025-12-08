// robots.js

const BASE_URL = 'https://babynamegenerator.xyz';

/**
 * Next.js app router robots configuration.
 * Automatically served at /robots.txt
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',       // internal APIs
          '/_next/*',     // build assets
          '/favicon.ico',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL.replace('https://', ''),
  };
}
