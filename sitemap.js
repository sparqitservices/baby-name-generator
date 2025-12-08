// sitemap.js

const BASE_URL = 'https://babynamegenerator.xyz';

/**
 * Next.js app router sitemap configuration.
 * Automatically served at /sitemap.xml
 */
export default function sitemap() {
  const now = new Date();

  const staticPages = [
    '/',
    '/search',
    '/generate',
    '/favorites',
    '/domains',
    '/shop',
    '/privacy',
    '/terms',
    '/thank-you',
  ];

  return staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '/' || path === '/search' ? 'daily' : 'weekly',
    priority:
      path === '/' ? 1.0 :
      path === '/search' || path === '/generate' ? 0.9 :
      0.7,
  }));
}
