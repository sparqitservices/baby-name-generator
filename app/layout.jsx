import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '../contexts/ThemeContext';
import { FavoritesProvider } from '../contexts/FavoritesContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://babynamegenerator.xyz'),
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
    url: 'https://babynamegenerator.xyz',
    title: 'BNG Baby Name Generator - AI-Powered Baby Names',
    description: 'Discover beautiful, meaningful baby names with our AI-powered generator. Get personalized suggestions for 7+ religions and multiple styles.',
    siteName: 'BNG Baby Name Generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BNG Baby Name Generator - AI-Powered Baby Names',
    description: 'Discover beautiful, meaningful baby names with our AI-powered generator.',
    creator: '@afzalhameed',
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
  alternates: {
    canonical: 'https://babynamegenerator.xyz',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://babynamegenerator.xyz" />
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