import './globals.css';
import Navbar from '../components/Navbar';
import { ThemeProvider } from '../contexts/ThemeContext';
import { FavoritesProvider } from '../contexts/FavoritesContext';

export const metadata = {
  title: 'BNG - AI Baby Name Generator',
  description: 'Discover beautiful, meaningful baby names with AI-powered suggestions',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
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