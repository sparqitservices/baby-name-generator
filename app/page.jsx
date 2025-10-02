'use client';
import { useState } from 'react';
import NameForm from '../components/NameForm';
import NameCard from '../components/NameCard';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { Plus, AlertCircle } from 'lucide-react';

export default function Home() {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentParams, setCurrentParams] = useState(null);
  const [isApiWorking, setIsApiWorking] = useState(true);

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
      setIsApiWorking(data.isApiWorking !== false);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error:', error);
      setIsApiWorking(false);
    }
    setLoading(false);
  };

  const generateMore = async () => {
    if (!currentParams) return;
    
    // Check limits
    if (!isApiWorking && names.length >= 10) {
      alert('API is not working. Maximum 10 names in fallback mode.');
      return;
    }
    
    if (isApiWorking && names.length >= 100) {
      alert('Maximum 100 names reached!');
      return;
    }
    
    setLoading(true);
    try {
      const countToGenerate = isApiWorking ? 10 : Math.min(10 - names.length, 10);
      
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentParams, count: countToGenerate })
      });
      const data = await response.json();
      
      const newNames = [...names, ...(data.names || [])];
      const maxNames = isApiWorking ? 100 : 10;
      setNames(newNames.slice(0, maxNames));
      setIsApiWorking(data.isApiWorking !== false);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const canGenerateMore = () => {
    if (!isApiWorking) return names.length < 10;
    return names.length < 100;
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="fixed top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob" aria-hidden="true"></div>
        <div className="fixed top-40 right-10 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000" aria-hidden="true"></div>
        <div className="fixed -bottom-8 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000" aria-hidden="true"></div>

        {/* Hero Section - Fixed */}
        <section className="relative z-10 min-h-screen flex flex-col justify-center py-12 px-4" aria-label="Baby name generator hero section">
          <div className="max-w-7xl mx-auto w-full">
            <Hero />
            <NameForm onGenerate={generateNames} />
          </div>
        </section>

        {/* Results Section - Scrollable */}
        {names.length > 0 && (
          <section id="results" className="relative z-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm py-16 px-4" aria-label="Generated baby names results">
            <div className="max-w-7xl mx-auto">
              {/* API Status Warning */}
              {!isApiWorking && (
                <aside className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-lg animate-fade-in" role="alert">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-yellow-800 dark:text-yellow-200">API Offline - Fallback Mode</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">Showing limited results (max 10 names). API connection required for full features.</p>
                    </div>
                  </div>
                </aside>
              )}

              {loading && names.length === 0 ? (
                <div className="text-center py-20 animate-fade-in" role="status" aria-live="polite">
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
                  <header className="flex items-center justify-between mb-8">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Generated Names ({names.length}{isApiWorking ? '/100' : '/10'})
                    </h2>
                  </header>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" role="list" aria-label="List of generated baby names">
                    {names.map((name, index) => (
                      <article
                        key={index}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${(index % 20) * 50}ms` }}
                        role="listitem"
                      >
                        <NameCard name={name} />
                      </article>
                    ))}
                  </div>

                  {/* Generate More Button */}
                  {canGenerateMore() && (
                    <div className="flex justify-center">
                      <button
                        onClick={generateMore}
                        disabled={loading}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95"
                        aria-label="Generate 10 more baby names"
                      >
                        <Plus className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
                        <span className="text-lg">{loading ? 'Generating...' : 'Generate More (10)'}</span>
                      </button>
                    </div>
                  )}

                  {!canGenerateMore() && (
                    <div className="text-center py-8" role="status">
                      <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                        {isApiWorking ? '🎉 Maximum 100 names reached!' : '⚠️ Maximum 10 names in fallback mode'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}