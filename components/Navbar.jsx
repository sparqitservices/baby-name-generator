'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Heart, Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg sm:text-xl">BNG</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                BabyNames
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 -mt-1">
                AI-POWERED GENERATOR
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/search"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200"
            >
              Search Names
            </Link>
            <Link
              href="/favorites"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors duration-200"
            >
              Favorites
            </Link>
          </div>

          {/* Action Buttons - Desktop & Mobile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon */}
            <Link
              href="/search"
              className="p-2 sm:p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 transform hover:scale-105"
              aria-label="Search"
            >
              <Search className="w-5 h-5 sm:w-5 sm:h-5" />
            </Link>

            {/* Favorites Icon */}
            <Link
              href="/favorites"
              className="p-2 sm:p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 transform hover:scale-105"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5 sm:w-5 sm:h-5" />
            </Link>

            {/* Theme Toggle - Enhanced for Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 sm:w-5 sm:h-5" strokeWidth={2.5} />
              ) : (
                <Moon className="w-5 h-5 sm:w-5 sm:h-5" strokeWidth={2.5} />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors duration-200"
              >
                Search Names
              </Link>
              <Link
                href="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors duration-200"
              >
                Favorites
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}