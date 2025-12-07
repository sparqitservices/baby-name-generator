'use client';

import { useState } from 'react';
import { Copy, Check, Heart, Share2, Volume2 } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';

// Simple in-memory cache for generated audio URLs
// key: name string, value: object URL (string)
const audioCache = new Map();

export default function NameCard({ name }) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some((fav) => fav.name === name.name);

  // 🔊 ElevenLabs TTS + cache + fallback
  const handleSpeak = async () => {
    const text = name.name;
    if (!text || isLoadingAudio) return;

    // If we already have audio cached for this name, just play it
    if (audioCache.has(text)) {
      const cachedUrl = audioCache.get(text);
      playAudioFromUrl(cachedUrl);
      return;
    }

    setIsLoadingAudio(true);

    try {
      const res = await fetch(`/api/pronounce?text=${encodeURIComponent(text)}`);
      if (!res.ok) throw new Error('TTS failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // Cache it for future plays
      audioCache.set(text, url);

      playAudioFromUrl(url);
    } catch (err) {
      console.error('ElevenLabs TTS error, falling back to SpeechSynthesis:', err);
      setIsLoadingAudio(false);

      // Fallback: browser speech synthesis if available
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        synth.cancel();
        const utterance = new window.SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        synth.speak(utterance);
      }
    }
  };

  const playAudioFromUrl = (url) => {
    const audio = new Audio(url);
    setIsLoadingAudio(false);
    setIsSpeaking(true);

    audio.onended = () => {
      setIsSpeaking(false);
    };
    audio.onerror = () => {
      setIsSpeaking(false);
    };

    audio.play().catch(() => {
      setIsSpeaking(false);
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(name.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareText = `Check out this beautiful baby name!\n\n✨ ${name.name} ✨\n\nOrigin: ${
      name.origin || 'Traditional'
    }\nMeaning: ${
      name.meaning || 'A beautiful and meaningful name'
    }\n\nDiscover more names at: ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Baby Name: ${name.name}`,
          text: shareText,
          url: window.location.origin,
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

  const genderColors = {
    boy: 'from-blue-500 to-cyan-500',
    girl: 'from-pink-500 to-rose-500',
    any: 'from-purple-500 to-indigo-500',
  };

  const genderBg = {
    boy: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
    girl: 'bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300',
    any: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
  };

  const speakTitle = isLoadingAudio
    ? 'Preparing pronunciation...'
    : isSpeaking
    ? 'Playing pronunciation'
    : 'Listen to pronunciation';

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-800">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3
              className={`text-3xl font-bold bg-gradient-to-r ${
                genderColors[name.gender || 'any']
              } bg-clip-text text-transparent`}
            >
              {name.name}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                genderBg[name.gender || 'any']
              }`}
            >
              {name.gender === 'any'
                ? 'Unisex'
                : (name.gender || 'Any').charAt(0).toUpperCase() +
                  (name.gender || 'any').slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {name.origin || 'Traditional'}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {/* 🔊 Pronounce button with loading / speaking animation */}
          <button
            onClick={handleSpeak}
            disabled={isLoadingAudio}
            className={`p-2 rounded-lg transition-all ${
              isSpeaking
                ? 'bg-indigo-100 dark:bg-indigo-900/40'
                : isLoadingAudio
                ? 'bg-gray-100 dark:bg-gray-700 cursor-wait'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
            }`}
            title={speakTitle}
          >
            {isLoadingAudio ? (
              // Spinner
              <span className="block w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Volume2
                className={`w-5 h-5 ${
                  isSpeaking ? 'text-indigo-600' : 'text-gray-700 dark:text-gray-300'
                }`}
              />
            )}
          </button>

          <button
            onClick={handleShare}
            className={`p-2 rounded-lg transition-all ${
              shared
                ? 'bg-green-100 dark:bg-green-900/30'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
            }`}
            title="Share this name"
          >
            <Share2
              className={`w-5 h-5 ${
                shared ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'
              }`}
            />
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

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        {name.meaning || 'A beautiful and meaningful name'}
      </p>
    </div>
  );
}
