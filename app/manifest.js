// app/manifest.js

export default function manifest() {
  return {
    name: 'BNG Baby Names – AI Baby Name Generator',
    short_name: 'BNG Names',
    description:
      'AI-powered baby name generator with meanings, origins, pronunciation and tools to check domains and baby essentials.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#faf5ff',
    theme_color: '#4f46e5',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
