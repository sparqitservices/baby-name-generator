'use client';
import { useState } from 'react';
import { Copy, Check, Heart, Share2 } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function NameCard({ name }) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  
  const isFavorite = favorites.some(fav => fav.name === name.name);

  const handleCopy = () => {
    navigator.clipboard.writeText(name.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareText = `Check out this beautiful baby name!\n\n✨ ${name.name} ✨\n\nOrigin: ${name.origin || 'Traditional'}\nMeaning: ${name.meaning || 'A beautiful and meaningful name'}\n\nDiscover more names at: ${window.location.origin}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Baby Name: ${name.name}`,
          text: shareText,
          url: window.location.origin
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        if (err.name !== 'AbortError') {
          navigator.clipboard.writeText(shareText);
          setShared(true);
          setTimeout(() => setShared(false), 2000);
        }
      }
    } else {
      navigator.clipboard.writeText(shareText);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(name.name);
    } else {
      addFavorite(name);
    }
  };

  // Shorten meaning to max 100 characters
  const shortMeaning = name.meaning && name.meaning.length > 100 
    ? name.meaning.substring(0, 100) + '...' 
    : name.meaning || 'A beautiful and meaningful name';

  const genderColors = {
    boy: 'from-blue-500 to-cyan-500',
    girl: 'from-pink-500 to-rose-500',
    any: 'from-purple-500 to-indigo-500'
  };

  const genderBg = {
    boy: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
    girl: 'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300',
    any: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-800">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className={`text-3xl font-bold bg-gradient-to-r ${genderColors[name.gender || 'any']} bg-clip-text text-transparent`}>
              {name.name}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${genderBg[name.gender || 'any']}`}>
              {name.gender === 'any' ? 'Unisex' : (name.gender || 'Any').charAt(0).toUpperCase() + (name.gender || 'any').slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {name.origin || 'Traditional'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className={`p-2 rounded-lg transition-all ${
              shared
                ? 'bg-green-100 dark:bg-green-900/30'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
            }`}
            title="Share this name"
          >
            <Share2 className={`w-5 h-5 ${shared ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'}`} />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Copy name"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-lg transition-all ${
              isFavorite
                ? 'bg-red-100 dark:bg-red-900/30'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            />
          </button>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
        {shortMeaning}
      </p>
    </div>
  );
}