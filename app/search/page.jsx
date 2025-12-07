'use client';
import { useState } from 'react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shareMessage, setShareMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      setError('Please enter a name to search');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchResult(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: trimmedQuery }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to search name');
      }

      setSearchResult(data);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!searchResult) return;

    const shareText = `✨ ${searchResult.name} ✨\n\n📖 Meaning: ${searchResult.meaning}\n🌍 Origin: ${searchResult.origin}\n👤 Gender: ${searchResult.gender}\n\n🔗 Discover more baby names at: ${window.location.origin}`;

    // Try native share first
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${searchResult.name} - Baby Name Meaning`,
          text: shareText,
        });
        setShareMessage('Shared successfully! ✅');
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share error:', err);
          copyToClipboard(shareText);
        }
      }
    } else {
      // Fallback to clipboard
      copyToClipboard(shareText);
    }

    setTimeout(() => setShareMessage(''), 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareMessage('Copied to clipboard! 📋');
    }).catch(() => {
      setShareMessage('Failed to copy');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Search Your Name
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover detailed meanings, origins, and cultural significance
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter a name to search..."
              className="w-full px-6 py-5 pr-32 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50 transition-all duration-200 hover:shadow-lg"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Loading */}
        {isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Analyzing Name...
            </h3>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6">
            <p className="text-red-600 dark:text-red-400 text-center font-medium">
              {error}
            </p>
          </div>
        )}

        {/* Result */}
        {searchResult && !isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-4xl md:text-5xl font-bold">
                  {searchResult.name}
                </h2>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
                  title="Share this name"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-4 text-indigo-100">
                <span>{searchResult.origin}</span>
                <span>•</span>
                <span className="capitalize">{searchResult.gender}</span>
              </div>
              {shareMessage && (
                <div className="mt-4 bg-white/20 rounded-lg px-4 py-2 text-sm animate-fade-in">
                  {shareMessage}
                </div>
              )}
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  Meaning
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {searchResult.meaning}
                </p>
              </div>

              {searchResult.detailedDescription && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    Detailed Description
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {searchResult.detailedDescription}
                  </p>
                </div>
              )}

              {searchResult.culturalSignificance && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    Cultural Significance
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {searchResult.culturalSignificance}
                  </p>
                </div>
              )}

              {searchResult.popularity && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    Popularity
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {searchResult.popularity}
                  </p>
                </div>
              )}

              {searchResult.famousPersonalities && searchResult.famousPersonalities.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    Famous Personalities
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {searchResult.famousPersonalities.map((person, index) => (
                      <li key={index}>{person}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!searchResult && !isLoading && !error && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Search Any Name
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enter a name above to discover its meaning and significance
            </p>
          </div>
        )}
      </div>
    </div>
  );
}