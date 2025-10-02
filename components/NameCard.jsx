'use client';
import { useState } from 'react';
import { Heart, Volume2, Copy, Share2 } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function NameCard({ name }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [copied, setCopied] = useState(false);
  
  const isFavorite = favorites.some(fav => fav.name === name.name);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(name.name);
    } else {
      addFavorite(name);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(name.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: name.name,
          text: `${name.name} - ${name.meaning}`,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopy();
    }
  };

  const handlePronounce = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(name.name);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getGenderColor = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'boy':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'girl':
        return 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300';
      default:
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
    }
  };

  const getGenderIcon = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'boy':
        return '👦';
      case 'girl':
        return '👧';
      default:
        return '👶';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {name.name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getGenderColor(name.gender)}`}>
              {getGenderIcon(name.gender)} {name.gender?.charAt(0).toUpperCase() + name.gender?.slice(1)}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              {name.origin}
            </span>
          </div>
        </div>
        <button
          onClick={handleFavorite}
          className={`p-2 rounded-full transition-all duration-200 ${
            isFavorite
              ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
              : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 hover:bg-red-50 hover:text-red-500'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`}
          />
        </button>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {name.meaning}
      </p>

      <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handlePronounce}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
        >
          <Volume2 className="w-4 h-4" />
          Pronounce
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
}