import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://babynamegenerator.xyz'),
  title: {
    default: 'BNG – AI Baby Name Generator',
    template: '%s | BNG Baby Names',
  },
  description:
    'AI baby name generator for Indian and international parents. Discover modern, traditional, Muslim, Hindu, Christian and unisex baby names with meanings.',
  keywords: [
    'baby name generator',
    'Indian baby names',
    'Muslim baby names',
    'Hindu baby names',
    'Christian baby names',
    'unisex baby names',
    'modern baby names',
    'unique baby names',
  ],
  openGraph: {
    title: 'BNG – AI Baby Name Generator',
    description:
      'Find the perfect baby name with AI-powered suggestions. Filter by gender, religion, style and more.',
    url: 'https://babynamegenerator.xyz',
    siteName: 'BNG Baby Names',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BNG – AI Baby Name Generator',
    description:
      'Discover beautiful baby boy, girl and unisex names with meanings using AI.',
  },
  alternates: {
    canonical: '/',
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

        {/* Canonical */}
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
