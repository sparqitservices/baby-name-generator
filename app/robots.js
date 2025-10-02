export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://baby-name-generator-afzal.vercel.app/sitemap.xml',
  };
}