import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BabyNames - AI-Powered Baby Name Generator',
  description: 'Discover the perfect name for your little one with AI-powered suggestions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <FavoritesProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}