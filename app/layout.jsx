import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

// ✅ SINGLE metadata export (old + new merged)
export const metadata = {
  metadataBase: new URL('https://babynamegenerator.xyz'),
  title: {
    default: 'BNG Baby Names – AI Baby Name Generator',
    template: '%s | BNG Baby Names',
  },
  description:
    'BNG Baby Names is an AI-powered baby name generator that helps parents discover beautiful baby boy, girl and unisex names with meanings, origins and pronunciation. Also check domains and baby essentials.',
  applicationName: 'BNG Baby Names',
  keywords: [
    'baby name generator',
    'baby names',
    'BNG baby names',
    'Indian baby names',
    'Muslim baby names',
    'Hindu baby names',
    'Christian baby names',
    'urdu baby names',
    'unisex baby names',
    'modern baby names',
    'unique baby names',
    'baby name meanings',
    'baby domain name',
  ],
  authors: [{ name: 'BNG Baby Names' }],
  creator: 'BNG Baby Names',
  publisher: 'BNG Baby Names',
  openGraph: {
    title: 'BNG Baby Names – AI Baby Name Generator',
    description:
      'Generate meaningful baby names with meanings and origins, save favourites, listen to pronunciation and check domains for your favourite names.',
    url: 'https://babynamegenerator.xyz/',
    siteName: 'BNG Baby Names',
    images: [
      {
        url: '/og-image.png', // put 1200x630 image in /public/og-image.png
        width: 1200,
        height: 630,
        alt: 'BNG Baby Names – AI Baby Name Generator',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BNG Baby Names – AI Baby Name Generator',
    description:
      'Discover baby name ideas with our AI-powered generator. Filter by gender, culture and style, save favourites and secure matching domains.',
    // change to your real handle if/when you have one
    site: '@babynamegenerator',
    creator: '@babynamegenerator',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      'en-IN': '/',
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png', // optional but recommended
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BNG Baby Names',
    url: 'https://babynamegenerator.xyz',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://babynamegenerator.xyz/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NWRQXTQR');
          `}
        </Script>

        {/* Canonical (metadata.alternates also defines canonical, but this is fine) */}
        <link rel="canonical" href="https://babynamegenerator.xyz" />

        {/* Structured data */}
        <Script
          id="website-ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NWRQXTQR"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ThemeProvider>
          <FavoritesProvider>
            <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
              <Navbar />
              {/* Padding for fixed navbar */}
              <main className="flex-grow w-full overflow-x-hidden pt-14 sm:pt-16 md:pt-20">
                {children}
              </main>
              <Footer />
            </div>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
