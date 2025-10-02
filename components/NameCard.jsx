'use client';
import { useState } from 'react';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';

export default function NameForm({ generateNames, setIsLoading, isLoading }) {
  const [formData, setFormData] = useState({
    gender: 'any',
    religion: 'muslim',
    style: 'modern',
    count: 20
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await generateNames(formData, false);
    } catch (err) {
      console.error('❌ Generation error:', err);
      setError(err.message || 'Failed to generate names. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Gender Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Gender
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['boy', 'girl', 'any'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFormData({ ...formData, gender: option })}
              disabled={isLoading}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                formData.gender === option
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Religion Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Religion / Culture
        </label>
        <select
          name="religion"
          value={formData.religion}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="muslim">Muslim / Islamic</option>
          <option value="hindu">Hindu / Vedic</option>
          <option value="christian">Christian / Biblical</option>
          <option value="sikh">Sikh / Punjabi</option>
          <option value="buddhist">Buddhist / Dharmic</option>
          <option value="jain">Jain / Jainism</option>
          <option value="jewish">Jewish / Hebrew</option>
        </select>
      </div>

      {/* Style Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Style
        </label>
        <select
          name="style"
          value={formData.style}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="modern">Modern & Trendy</option>
          <option value="traditional">Traditional & Classic</option>
          <option value="unique">Unique & Rare</option>
          <option value="spiritual">Spiritual & Meaningful</option>
          <option value="royal">Royal & Elegant</option>
          <option value="nature">Nature-Inspired</option>
        </select>
      </div>

      {/* Number of Names */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Number of Names: <span className="text-indigo-600 dark:text-indigo-400">{formData.count}</span>
        </label>
        <input
          type="range"
          name="count"
          min="5"
          max="50"
          step="5"
          value={formData.count}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>5</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl animate-shake">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
                Generation Failed
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                {error}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-600 dark:hover:text-red-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating Amazing Names...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Generate Names</span>
          </>
        )}
      </button>

      {/* Info Text */}
      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        Powered by AI • {formData.count} unique names will be generated
      </p>
    </form>
  );
}