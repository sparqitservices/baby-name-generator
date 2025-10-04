'use client';
import { Search, ExternalLink, Globe } from 'lucide-react';
import { useState } from 'react';

export default function DomainSearch() {
  const [domainName, setDomainName] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (domainName.trim()) {
      // Namecheap affiliate link - Replace YOUR_AFFILIATE_ID with your actual ID
      const affiliateLink = `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(
        domainName
      )}&affid=YOUR_AFFILIATE_ID`;
      window.open(affiliateLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full mb-4">
          <Globe className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
          Find Your Baby's Domain Name
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Secure a unique domain name for your baby's future website, email, or digital presence
        </p>
      </div>

      <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              placeholder="Enter baby name (e.g., emma, noah)"
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all text-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Search Domain</span>
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">✓</span>
          </div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-2">Affordable Prices</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Starting from $0.99/year
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🔒</span>
          </div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-2">Free Privacy Protection</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Keep your information safe
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-2">Instant Activation</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get your domain in minutes
          </p>
        </div>
      </div>

      {/* Popular Extensions */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Popular extensions:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['.com', '.net', '.org', '.baby', '.family', '.kids'].map((ext) => (
            <span
              key={ext}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
            >
              {ext}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}