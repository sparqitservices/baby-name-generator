'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import NameForm from '@/components/NameForm';
import NameCard from '@/components/NameCard';
import Footer from '@/components/Footer';
import { Sparkles, Loader2 } from 'lucide-react';

export default function Home() {
  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [lastFormData, setLastFormData] = useState(null);

  const generateNames = async (formData, isMore = false) => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          count: isMore ? 10 : formData.count // 10 for "Generate More", otherwise use form count
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      if (!data.names || data.names.length === 0) {
        throw new Error('No names generated. Please try again.');
      }

      if (isMore) {
        // Append new names to existing ones
        setNames(prev => [...prev, ...data.names]);
      } else {
        // Replace with new names
        setNames(data.names);
      }

      // Save form data for "Generate More"
      setLastFormData(formData);

      return data.names;

    } catch (err) {
      console.error('❌ Generation error:', err);
      throw err;
    }
  };

  const handleGenerateMore = async () => {
    if (!lastFormData) return;

    setIsLoadingMore(true);
    try {
      await generateNames(lastFormData, true);
    } catch (error) {
      alert(error.message || 'Failed to generate more names');
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Baby Name Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the perfect name for your little one with AI-powered suggestions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Form Section - LEFT SIDE ONLY */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Customize Your Search
              </h2>
              <NameForm 
                generateNames={generateNames}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Results Section - RIGHT SIDE ONLY */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent mb-4"></div>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Generating beautiful names...
                </p>
              </div>
            ) : names.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {names.length} Names Generated
                  </h2>
                </div>
                
                {/* NAME CARDS */}
                <div className="grid gap-4">
                  {names.map((name, index) => (
                    <NameCard key={`${name.name}-${index}`} name={name} />
                  ))}
                </div>

                {/* Generate More Button */}
                <div className="flex justify-center mt-8 mb-4">
                  <button
                    onClick={handleGenerateMore}
                    disabled={isLoadingMore}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Generating More...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Generate 10 More Names</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">👶</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Ready to Find the Perfect Name?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-md">
                  Select your preferences and click "Generate Names" to discover beautiful, meaningful names for your baby.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}