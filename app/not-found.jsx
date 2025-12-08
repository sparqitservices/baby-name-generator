// app/not-found.jsx
import Link from 'next/link';
import { Baby, Home, Search, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="max-w-lg w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 dark:border-gray-800 px-6 sm:px-10 py-10 sm:py-12 text-center space-y-6">
        {/* Icon + code */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
              <Baby className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            Oops, tiny detour
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            This page hasn&apos;t been born yet 👶
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            The link you followed is sleeping, moved, or never existed. 
            Let&apos;s get you back to discovering beautiful baby names and domains.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm sm:text-base font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all"
          >
            <Home className="w-4 h-4" />
            Back to name generator
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 text-indigo-700 dark:text-indigo-300 text-sm sm:text-base font-semibold border border-indigo-100 dark:border-gray-700 hover:bg-indigo-50/90 dark:hover:bg-gray-800 transition-all"
          >
            <Search className="w-4 h-4" />
            Search baby names
          </Link>
        </div>

        {/* Extra links */}
        <div className="pt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 space-x-3">
          <Link href="/domains" className="hover:text-indigo-600 dark:hover:text-indigo-300 underline-offset-2 hover:underline">
            Check domains
          </Link>
          <span>•</span>
          <Link href="/shop" className="hover:text-indigo-600 dark:hover:text-indigo-300 underline-offset-2 hover:underline">
            Explore baby essentials
          </Link>
        </div>
      </div>
    </div>
  );
}
