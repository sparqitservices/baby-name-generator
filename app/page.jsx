'use client';
import { useState } from 'react';
import NameForm from './components/NameForm';
import NameCard from './components/NameCard';
import Logo from './components/Logo';

export default function Home() {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateNames = async (params) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const data = await response.json();
      setNames(data.names || []);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const regenerateNames = async (params) => {
    await generateNames(params);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-12 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="flex justify-center mb-6 animate-fade-in">
            <Logo size="large" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              AI Baby Name Generator
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Discover beautiful, meaningful names for your baby with{' '}
            <span className="font-bold text-indigo-600 dark:text-indigo-400">AI-powered suggestions</span>{' '}
            tailored to your preferences
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in-up animation-delay-400">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">10+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Names per search</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Religions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">∞</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Possibilities</div>
            </div>
          </div>
        </div>

        <NameForm 
          onGenerate={generateNames} 
          onRegenerate={regenerateNames}
          hasResults={names.length > 0}
        />

        {loading && (
          <div className="text-center py-20 animate-fade-in">
            <div className="relative inline-block">
              <div className="w-20 h-20 border-4 border-indigo-200 dark:border-indigo-900 rounded-full"></div>
              <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="mt-6 text-xl font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
              Generating magical names...
            </p>
          </div>
        )}

        {!loading && names.length > 0 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Generated Names ({names.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {names.map((name, index) => (
                <div
                  key={index}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <NameCard name={name} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}