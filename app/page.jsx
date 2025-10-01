// app/page.jsx
'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import NameForm from '@/components/NameForm';
import NameCard from '@/components/NameCard';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function Home() {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate names');
      }

      const data = await response.json();
      
      if (data.fallback) {
        setNames(data.fallback);
        setError('Using fallback names. Please check your API configuration.');
      } else {
        setNames(data.names || []);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error generating names:', err);
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (name) => {
    return favorites.some(fav => fav.name === name.name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AI Baby Name Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover beautiful, meaningful names for your baby with AI-powered suggestions
            tailored to your preferences
          </p>
        </div>

        {/* Form Section */}
        <div className="mb-12">
          <NameForm onGenerate={handleGenerate} loading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400 text-center">
              {error}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Generating beautiful names for you...
            </p>
          </div>
        )}

        {/* Results Section */}
        {!loading && names.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Generated Names ({names.length})
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {names.map((name, index) => (
                <NameCard
                  key={`${name.name}-${index}`}
                  name={name}
                  onFavorite={toggleFavorite}
                  isFavorite={isFavorite(name)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && names.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👶</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Ready to find the perfect name?
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Fill out the form above to generate personalized baby name suggestions
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>Made with ❤️ for expecting parents</p>
        </div>
      </footer>
    </div>
  );
}