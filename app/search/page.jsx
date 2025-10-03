'use client';
import { useState } from 'react';
import { Search, Loader2, Sparkles, BookOpen, Globe, Heart as HeartIcon } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setSearchResult(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: searchQuery.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to search name');
      }

      const data = await response.json();
      setSearchResult(data);
    } catch (err) {
      console.error('❌ Search error:', err);
      setError(err.message || 'Failed to search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (!searchResult) return;
    
    const nameData = {
      name: searchResult.name,
      meaning: searchResult.meaning,
      origin: searchResult.origin,
      gender: searchResult.gender
    };

    if (isFavorite(searchResult.name)) {
      removeFavorite(searchResult.name);
    } else {
      addFavorite(nameData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Search className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Name Search
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover detailed meanings, origins, and cultural significance of any name
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter a name to search (e.g., Aisha, Arjun, Sophia)..."
                className="w-full px-6 py-5 pr-32 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 shadow-lg transition-all duration-200"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !searchQuery.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="hidden sm:inline">Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span className="hidden sm:inline">Search</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12">
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Analyzing Name...
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our AI is gathering detailed information
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6">
              <p className="text-red-600 dark:text-red-400 text-center font-medium">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Search Result */}
        {searchResult && !isLoading && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-2">
                      {searchResult.name}
                    </h2>
                    <div className="flex items-center gap-4 text-indigo-100">
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {searchResult.origin}
                      </span>
                      <span>•</span>
                      <span className="capitalize">{searchResult.gender}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleFavoriteToggle}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
                  >
                    <HeartIcon
                      className={`w-6 h-6 ${
                        isFavorite(searchResult.name)
                          ? 'fill-red-500 text-red-500'
                          : 'text-white'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Meaning */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      Meaning
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {searchResult.meaning}
                  </p>
                </div>

                {/* Detailed Description */}
                {searchResult.detailedDescription && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        Detailed Description
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {searchResult.detailedDescription}
                    </p>
                  </div>
                )}

                {/* Cultural Significance */}
                {searchResult.culturalSignificance && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        Cultural Significance
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {searchResult.culturalSignificance}
                    </p>
                  </div>
                )}

                {/* Popularity */}
                {searchResult.popularity && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        Popularity
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {searchResult.popularity}
                    </p>
                  </div>
                )}

                {/* Famous Personalities */}
                {searchResult.famousPersonalities && searchResult.famousPersonalities.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        Famous Personalities
                      </h3>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      {searchResult.famousPersonalities.map((person, index) => (
                        <li key={index}>{person}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!searchResult && !isLoading && !error && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Search Any Name
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  Enter a name above to discover its meaning, origin, cultural significance, and much more powered by AI
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}