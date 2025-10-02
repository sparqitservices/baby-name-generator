import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '../contexts/ThemeContext';
import { FavoritesProvider } from '../contexts/FavoritesContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://baby-name-generator-afzal.vercel.app'),
  title: {
    default: 'BNG Baby Name Generator - AI-Powered Baby Names | Free & Meaningful',
    template: '%s | BNG Baby Name Generator'
  },
  description: 'Discover beautiful, meaningful baby names with our AI-powered generator. Get personalized name suggestions for Muslim, Hindu, Christian, Sikh, Buddhist, Jain, and Jewish traditions. Free, modern, and easy to use.',
  keywords: [
    'baby name generator',
    'AI baby names',
    'Muslim baby names',
    'Hindu baby names',
    'Christian baby names',
    'Sikh baby names',
    'Buddhist baby names',
    'Jain baby names',
    'Jewish baby names',
    'baby boy names',
    'baby girl names',
    'unique baby names',
    'traditional baby names',
    'modern baby names',
    'baby name meanings',
    'name generator',
    'free baby names',
    'baby naming tool',
    'pregnancy names',
    'newborn names'
  ],
  authors: [{ name: 'Afzal Hameed', url: 'https://www.sparqitservices.com' }],
  creator: 'Afzal Hameed',
  publisher: 'Sparq IT Services',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://baby-name-generator-afzal.vercel.app',
    title: 'BNG Baby Name Generator - AI-Powered Baby Names',
    description: 'Discover beautiful, meaningful baby names with our AI-powered generator. Get personalized suggestions for 7+ religions and multiple styles.',
    siteName: 'BNG Baby Name Generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BNG Baby Name Generator - AI-Powered Baby Names',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BNG Baby Name Generator - AI-Powered Baby Names',
    description: 'Discover beautiful, meaningful baby names with our AI-powered generator.',
    creator: '@afzalhameed',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://baby-name-generator-afzal.vercel.app',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://baby-name-generator-afzal.vercel.app" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'BNG Baby Name Generator',
              description: 'AI-powered baby name generator with support for multiple religions and styles',
              url: 'https://baby-name-generator-afzal.vercel.app',
              applicationCategory: 'LifestyleApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              author: {
                '@type': 'Person',
                name: 'Afzal Hameed',
                url: 'https://www.sparqitservices.com'
              },
              publisher: {
                '@type': 'Organization',
                name: 'Sparq IT Services',
                url: 'https://www.sparqitservices.com'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '1250'
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <FavoritesProvider>
            <Navbar />
            {children}
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}