// components/Navbar.jsx
'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Moon, Sun, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            👶 BabyNames
          </Link>
          
          <div className="flex items-center gap-4">
            <Link
              href="/favorites"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden sm:inline">Favorites</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}