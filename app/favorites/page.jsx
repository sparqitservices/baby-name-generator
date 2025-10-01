// app/favorites/page.jsx
'use client';

import { useFavorites } from '@/contexts/FavoritesContext';
import NameCard from '@/components/NameCard';
import { Download, FileJson, Printer, Trash2 } from 'lucide-react';
import { exportToCSV, exportToJSON, printFavorites } from '@/utils/exportFavorites';

export default function FavoritesPage() {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all favorites?')) {
      clearFavorites();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Favorite Names
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {favorites.length} {favorites.length === 1 ? 'name' : 'names'} saved
            </p>
          </div>

          {favorites.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => exportToCSV(favorites)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={() => exportToJSON(favorites)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <FileJson className="w-4 h-4" />
                Export JSON
              </button>
              <button
                onClick={() => printFavorites(favorites)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💝</div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start adding names to your favorites to see them here
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Generate Names
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((name, index) => (
              <NameCard
                key={`${name.name}-${index}`}
                name={name}
                onFavorite={toggleFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}