// app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css';  // Make sure this is here
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Baby Name Generator',
  description: 'Generate beautiful, meaningful baby names with AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}