'use client';

import { Search, ExternalLink, Globe } from 'lucide-react';
import { useState } from 'react';

const VANITY_LINK = process.env.NEXT_PUBLIC_NAMECHEAP_VANITY;

export default function DomainSearch() {
  const [nameInput, setNameInput] = useState('');
  const [extension, setExtension] = useState('.com');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buildDomain = () => {
    const raw = nameInput.trim().toLowerCase();
    if (!raw) return '';
    // If user already typed a full domain (has a dot), don't append extension
    if (raw.includes('.')) return raw;
    return `${raw}${extension}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const domain = buildDomain();
    if (!domain) return;

    const destination = `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(
      domain
    )}`;

    let urlToOpen = destination;

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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-7 md:p-8">
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full mb-4">
          <Globe className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Find your baby&apos;s domain name
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Enter your baby&apos;s first name (or full name) and choose an
          extension to check availability on Namecheap.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSearch}
        className="max-w-xl mx-auto space-y-3 sm:space-y-4"
      >
        {/* Name input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter baby name or domain (e.g. aarav, zoya, aaravsharma.com)"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none text-sm sm:text-base"
            required
          />
        </div>

        {/* Extension selector */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <select
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
            className="w-full sm:w-40 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-3 text-sm sm:text-base font-medium text-gray-800 dark:text-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none"
          >
            {['.com', '.baby', '.family', '.online', '.me', '.in', '.kids'].map(
              (ext) => (
                <option key={ext} value={ext}>
                  {ext}
                </option>
              )
            )}
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>
              {isSubmitting ? 'Opening Namecheap…' : 'Search domain on Namecheap'}
            </span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Helper text – now responsive and nicely aligned */}
        <p className="mt-1 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed text-center sm:text-left">
          <span className="font-semibold">Tip:</span>{' '}
          If you type a full domain like{' '}
          <span className="font-mono">aaravsharma.com</span>, we&apos;ll use it
          as-is. Otherwise, we&apos;ll combine the name with the selected
          extension (for example, <span className="font-mono">aarav.com</span>{' '}
          or <span className="font-mono">aarav.baby</span>).
        </p>
      </form>
    </div>
  );
}
