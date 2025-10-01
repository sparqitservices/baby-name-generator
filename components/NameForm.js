// components/NameForm.jsx
'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function NameForm({ onGenerate, loading }) {
  const [formData, setFormData] = useState({
    gender: 'any',
    religion: 'muslim',
    style: 'modern',
    language: 'english',
    count: 10
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
            name="style"
            value={formData.style}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
        className="mt-6 w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-5 h-5" />
        {loading ? 'Generating...' : 'Generate Names'}
      </button>
    </form>
  );
}