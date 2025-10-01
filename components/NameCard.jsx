// components/NameCard.jsx
'use client';

import { useState } from 'react';
import { Heart, Copy, Share2, Volume2, Info } from 'lucide-react';

export default function NameCard({ name, onFavorite, isFavorite }) {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleCopy = async () => {
    const text = `${name.name} - ${name.meaning}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: name.name,
      text: `${name.name} - ${name.meaning}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copy
        await handleCopy();
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
    }
  };

  const handlePronounce = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(name.name);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-700">
      {/* Favorite Button */}
      <button
        onClick={() => onFavorite(name)}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          className={`w-5 h-5 transition-all ${
            isFavorite 
              ? 'fill-red-500 text-red-500 scale-110' 
              : 'text-gray-400 hover:text-red-400'
          }`}
        />
      </button>

      {/* Name */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 pr-10">
        {name.name}
      </h3>

      {/* Gender Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          name.gender === 'boy' 
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
            : 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300'
        }`}>
          {name.gender === 'boy' ? '👦 Boy' : '👧 Girl'}
        </span>
        
        {name.origin && (
          <span className="text-xs text-gray-500 dark:text-gray-400 italic">
            {name.origin}
          </span>
        )}
      </div>

      {/* Pronunciation */}
      {name.pronunciation && name.pronunciation !== name.name && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 italic">
          Pronunciation: {name.pronunciation}
        </p>
      )}

      {/* Meaning */}
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        {name.meaning}
      </p>

      {/* Translations */}
      {name.translation && Object.keys(name.translation).length > 0 && (
        <div className="space-y-2 mb-4 p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-600">
          {name.translation.hindi && (
            <div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Hindi:
              </span>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {name.translation.hindi}
              </p>
            </div>
          )}
          {name.translation.urdu && (
            <div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Urdu:
              </span>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-right" dir="rtl">
                {name.translation.urdu}
              </p>
            </div>
          )}
          {name.translation.arabic && (
            <div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Arabic:
              </span>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 text-right" dir="rtl">
                {name.translation.arabic}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={handlePronounce}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="Hear pronunciation"
        >
          <Volume2 className="w-4 h-4" />
          <span className="hidden sm:inline">Pronounce</span>
        </button>
        
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="Copy to clipboard"
        >
          <Copy className="w-4 h-4" />
          <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
        
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="Share this name"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>
    </div>
  );
}