'use client';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function NameForm({ onGenerate }) {
  const [params, setParams] = useState({
    gender: 'any',
    religion: 'muslim',
    style: 'modern',
    count: 20
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onGenerate(params);
    setLoading(false);
  };

  return (
    <div className="relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
      
      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gender */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                👶 Gender
              </label>
              <select
                value={params.gender}
                onChange={(e) => setParams({ ...params, gender: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 cursor-pointer hover:border-indigo-400"
              >
                <option value="any">Any</option>
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
              </select>
            </div>

            {/* Religion */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                🕌 Religion
              </label>
              <select
                value={params.religion}
                onChange={(e) => setParams({ ...params, religion: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 cursor-pointer hover:border-indigo-400"
              >
                <option value="muslim">Muslim</option>
                <option value="hindu">Hindu</option>
                <option value="christian">Christian</option>
                <option value="sikh">Sikh</option>
                <option value="buddhist">Buddhist</option>
                <option value="jain">Jain</option>
                <option value="jewish">Jewish</option>
              </select>
            </div>

            {/* Style */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                ✨ Style
              </label>
              <select
                value={params.style}
                onChange={(e) => setParams({ ...params, style: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 cursor-pointer hover:border-indigo-400"
              >
                <option value="modern">Modern</option>
                <option value="traditional">Traditional</option>
                <option value="unique">Unique</option>
                <option value="spiritual">Spiritual</option>
                <option value="royal">Royal</option>
                <option value="nature">Nature-Inspired</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className={`w-6 h-6 ${loading ? 'animate-spin' : 'animate-pulse'}`} />
            <span className="text-lg">{loading ? 'Generating Magic...' : 'Generate Names'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}