'use client';
import { useFavorites } from '../../contexts/FavoritesContext';
import NameCard from '../../components/NameCard';
import { Download, FileJson, Printer, Trash2 } from 'lucide-react';
import { exportToCSV, exportToJSON, printFavorites } from '../../utils/exportFavorites';

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();

  const handleExportCSV = () => {
    exportToCSV(favorites);
  };

  const handleExportJSON = () => {
    exportToJSON(favorites);
  };

  const handlePrint = () => {
    printFavorites(favorites);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Favorite Names ({favorites.length})
          </h1>

          {favorites.length > 0 && (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={handleExportJSON}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <FileJson className="w-4 h-4" />
                Export JSON
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={clearFavorites}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💝</div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start adding names to your favorites from the generator!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((name, index) => (
              <div key={index} className="animate-fade-in-up">
                <NameCard name={name} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}