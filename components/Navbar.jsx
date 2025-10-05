'use client';
import { Moon, Sun, Heart, Search, ShoppingBag, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import Link from 'next/link';
import Logo from './Logo';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? 'h-12 sm:h-14 md:h-16' : 'h-14 sm:h-16 md:h-20'
          }`}
        >
          <Link
            href="/"
            className={`transform hover:scale-105 transition-all duration-300 flex-shrink-0 ${
              isScrolled ? 'scale-90' : 'scale-100'
            }`}
          >
            <Logo size="small" />
          </Link>

          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            <Link
              href="/search"
              className={`flex items-center gap-1 sm:gap-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                isScrolled ? 'px-1.5 sm:px-2 md:px-3 py-1.5' : 'px-2 sm:px-3 md:px-4 py-2'
              }`}
            >
              <Search
                className={`transition-all duration-300 ${
                  isScrolled ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'
                }`}
              />
              <span className="font-medium hidden lg:inline text-sm">Search</span>
            </Link>

            <Link
              href="/shop"
              className={`flex items-center gap-1 sm:gap-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                isScrolled ? 'px-1.5 sm:px-2 md:px-3 py-1.5' : 'px-2 sm:px-3 md:px-4 py-2'
              }`}
            >
              <ShoppingBag
                className={`transition-all duration-300 ${
                  isScrolled ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'
                }`}
              />
              <span className="font-medium hidden lg:inline text-sm">Shop</span>
            </Link>

            <Link
              href="/domains"
              className={`flex items-center gap-1 sm:gap-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                isScrolled ? 'px-1.5 sm:px-2 md:px-3 py-1.5' : 'px-2 sm:px-3 md:px-4 py-2'
              }`}
            >
              <Globe
                className={`transition-all duration-300 ${
                  isScrolled ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'
                }`}
              />
              <span className="font-medium hidden lg:inline text-sm">Domains</span>
            </Link>

            <Link
              href="/favorites"
              className={`relative flex items-center gap-1 sm:gap-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                isScrolled ? 'px-1.5 sm:px-2 md:px-3 py-1.5' : 'px-2 sm:px-3 md:px-4 py-2'
              }`}
            >
              <Heart
                className={`transition-all duration-300 ${
                  isScrolled ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'
                }`}
              />
              <span className="font-medium hidden lg:inline text-sm">Favorites</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 animate-pulse shadow-lg">
                  {favorites.length}
                </span>
              )}
            </Link>

            <button
              onClick={toggleTheme}
              className={`rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg flex-shrink-0 ${
                isScrolled ? 'p-1.5 sm:p-2' : 'p-2 sm:p-2.5 md:p-3'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun
                  className={`text-white transition-all duration-300 ${
                    isScrolled ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'
                  }`}
                  strokeWidth={2.5}
                />
              ) : (
                <Moon
                  className={`text-white transition-all duration-300 ${
                    isScrolled ? 'w-4 h-4' : 'w-4 h-4 sm:w-5 sm:h-5'
                  }`}
                  strokeWidth={2.5}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}