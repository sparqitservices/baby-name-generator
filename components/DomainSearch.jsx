'use client';

import { Search, ExternalLink, Globe, Wand2 } from 'lucide-react';
import { useState } from 'react';

const VANITY_LINK = process.env.NEXT_PUBLIC_NAMECHEAP_VANITY;

export default function DomainSearch() {
  const [nameInput, setNameInput] = useState('');
  const [extension, setExtension] = useState('.com');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buildDomain = () => {
    const raw = nameInput.trim().toLowerCase();
    if (!raw) return '';
    // If user already typed a full domain (with dot), don't append extension
    if (raw.includes('.')) return raw;
    return `${raw}${extension}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const domain = buildDomain();
    if (!domain) return;

    // Final destination on Namecheap
    const destination = `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(
      domain
    )}`;

    let urlToOpen = destination;

    // If vanity link is set, wrap destination with Impact tracking
    if (VANITY_LINK) {
      urlToOpen = `${VANITY_LINK}?u=${encodeURIComponent(destination)}`;
    } else {
      console.warn(
        'Missing NEXT_PUBLIC_NAMECHEAP_VANITY env var – opening direct Namecheap URL without affiliate tracking.'
      );
    }

    setIsSubmitting(true);
    try {
      window.open(urlToOpen, '_blank', 'noopener,noreferrer');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full mb-4">
          <Globe className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Find your baby&apos;s domain name
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Enter your baby&apos;s first name (or full name) and choose an
          extension to check availability on Namecheap.
        </p>
      </div>

      <form onSubmit={handleSearch} className="max-w-3xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Name input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter baby name or domain (e.g. aarav, zoya, littleaarav)"
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all text-base sm:text-lg"
              required
            />
          </div>

          {/* Extension selector */}
          <div className="flex items-center gap-2 sm:w-40">
            <label
              htmlFor="extension"
              className="sr-only sm:not-sr-only sm:text-xs sm:text-gray-500 dark:sm:text-gray-400"
            >
              Extension
            </label>
            <select
              id="extension"
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
              className="w-full sm:w-auto rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-3 text-sm sm:text-base font-medium text-gray-800 dark:text-gray-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none"
            >
              {['.com', '.baby', '.family', '.online', '.me', '.in', '.kids'].map(
                (ext) => (
                  <option key={ext} value={ext}>
                    {ext}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Helper line */}
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <Wand2 className="w-4 h-4" />
          If you type a full domain (like <code>aaravsharma.com</code>) we&apos;ll
          use it as-is. Otherwise we&apos;ll combine the name with the selected
          extension.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 sm:mt-3 w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>{isSubmitting ? 'Opening Namecheap…' : 'Search domain on Namecheap'}</span>
          <ExternalLink className="w-5 h-5" />
        </button>
      </form>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">✓</span>
          </div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1">
            Competitive pricing
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Namecheap often runs promos on popular extensions like .com and
            .online.
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🔒</span>
          </div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1">
            Free privacy protection
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Keep your contact details hidden in WHOIS with domain privacy.
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1">
            Fast setup
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Connect your domain to email, a website builder or blog in minutes.
          </p>
        </div>
      </div>

      {/* Popular Extensions */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Popular extensions for baby names:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {['.com', '.baby', '.family', '.online', '.me', '.in', '.kids'].map(
            (ext) => (
              <span
                key={ext}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
              >
                {ext}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
