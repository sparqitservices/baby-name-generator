'use client';
import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function NameForm({ onGenerate, isLoading }) {
  const [formData, setFormData] = useState({
    gender: 'any',
    religion: 'muslim',
    style: 'modern',
    count: 20
  });
  const [apiStatus, setApiStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onGenerate(formData);
    
    // Show API status message
    if (result && !result.isApiWorking) {
      setApiStatus(result.message || 'Using sample names');
      setTimeout(() => setApiStatus(null), 5000);
    } else {
      setApiStatus(null);
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
              className={`px-4 py-3 rounded-xl font-medium transition-all ${
                formData.gender === option
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
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
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition-all"
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
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 transition-all"
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
          Number of Names: {formData.count}
        </label>
        <input
          type="range"
          name="count"
          min="5"
          max="50"
          step="5"
          value={formData.count}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      {/* Generate Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Names
          </>
        )}
      </button>

      {/* API Status Message */}
      {apiStatus && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
            ⚠️ {apiStatus}
          </p>
        </div>
      )}
    </form>
  );
}