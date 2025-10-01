'use client';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function NameForm({ onGenerate, onRegenerate, hasResults }) {
  const [params, setParams] = useState({
    gender: 'any',
    religion: 'muslim',
    style: 'modern',
    language: 'english',
    count: 10
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onGenerate(params);
    setLoading(false);
  };

  const handleRegenerate = async () => {
    setLoading(true);
    await onRegenerate(params);
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender
            </label>
            <select
              value={params.gender}
              onChange={(e) => setParams({ ...params, gender: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="any">Any</option>
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
            </select>
          </div>

          {/* Religion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Religion
            </label>
            <select
              value={params.religion}
              onChange={(e) => setParams({ ...params, religion: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="muslim">Muslim</option>
              <option value="hindu">Hindu</option>
            </select>
          </div>

          {/* Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Style
            </label>
            <select
              value={params.style}
              onChange={(e) => setParams({ ...params, style: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="modern">Modern</option>
              <option value="traditional">Traditional</option>
              <option value="unique">Unique</option>
              <option value="spiritual">Spiritual</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <select
              value={params.language}
              onChange={(e) => setParams({ ...params, language: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="urdu">Urdu</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-5 h-5" />
          {loading ? 'Generating...' : 'Generate Names'}
        </button>
      </form>

      {/* Regenerate Button - Shows only when there are results */}
      {hasResults && (
        <button
          onClick={handleRegenerate}
          disabled={loading}
          className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-5 h-5" />
          {loading ? 'Regenerating...' : 'Regenerate Names'}
        </button>
      )}
    </div>
  );
}