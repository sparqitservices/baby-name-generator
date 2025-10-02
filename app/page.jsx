'use client';
import { useState } from 'react';
import NameForm from '../components/NameForm';
import NameCard from '../components/NameCard';
import Hero from '../components/Hero';
import { Plus } from 'lucide-react';

export default function Home() {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentParams, setCurrentParams] = useState(null);

  const generateNames = async (params) => {
    setLoading(true);
    setCurrentParams(params);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const data = await response.json();
      setNames(data.names || []);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const generateMore = async () => {
    if (!currentParams) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentParams, count: 10 })
      });
      const data = await response.json();
      setNames([...names, ...(data.names || [])]);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
      <div className="fixed top-40 right-10 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="fixed -bottom-8 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Hero Section - Fixed */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center py-12 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <Hero />
          <NameForm onGenerate={generateNames} />
        </div>
      </div>

      {/* Results Section - Scrollable */}
      {names.length > 0 && (
        <div id="results" className="relative z-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {loading && names.length === 0 ? (
              <div className="text-center py-20 animate-fade-in">
                <div className="relative inline-block">
                  <div className="w-20 h-20 border-4 border-indigo-200 dark:border-indigo-900 rounded-full"></div>
                  <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p className="mt-6 text-xl font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
                  Generating magical names...
                </p>
              </div>
            ) : (
              <div className="animate-fade-in-up">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Generated Names ({names.length})
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {names.map((name, index) => (
                    <div
                      key={index}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${(index % 20) * 50}ms` }}
                    >
                      <NameCard name={name} />
                    </div>
                  ))}
                </div>

                {/* Generate More Button */}
                <div className="flex justify-center">
                  <button
                    onClick={generateMore}
                    disabled={loading}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95"
                  >
                    <Plus className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
                    <span className="text-lg">{loading ? 'Generating...' : 'Generate More (10)'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}