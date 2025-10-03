'use client';
import { useState, useRef, useEffect } from 'react';
import NameForm from '@/components/NameForm';
import NameCard from '@/components/NameCard';
import { Sparkles, Loader2, Plus } from 'lucide-react';

export default function Home() {
  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFormData, setLastFormData] = useState(null);
  const firstNewCardRef = useRef(null);
  const shouldScrollRef = useRef(false);

  // Scroll to first new card after new names are added
  useEffect(() => {
    if (shouldScrollRef.current && firstNewCardRef.current) {
      setTimeout(() => {
        firstNewCardRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
        shouldScrollRef.current = false;
      }, 100);
    }
  }, [names]);

  const generateNames = async (formData, append = false) => {
    setIsLoading(true);
    
    if (!append) {
      setNames([]);
      shouldScrollRef.current = false;
    } else {
      shouldScrollRef.current = true;
    }
    
    const requestData = append ? { ...formData, count: 10 } : formData;
    setLastFormData(formData);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate names');
      }

      const data = await response.json();
      
      if (data.names && Array.isArray(data.names)) {
        if (append) {
          setNames(prev => [...prev, ...data.names]);
        } else {
          setNames(data.names);
        }
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('❌ Error generating names:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMore = () => {
    if (lastFormData) {
      generateNames(lastFormData, true);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 px-4">
            Discover Perfect Baby Names
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Find the perfect name for your little one with AI-powered suggestions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 w-full">
          <div className="lg:col-span-1 w-full">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                Customize Your Search
              </h2>
              <NameForm 
                generateNames={generateNames} 
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            </div>
          </div>

          <div className="lg:col-span-2 w-full">
            {isLoading && names.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12">
                <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-600 animate-spin mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                  Generating Amazing Names...
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Our AI is crafting the perfect names for you
                </p>
              </div>
            ) : names.length > 0 ? (
              <div className="space-y-4 w-full">
                <div className="flex items-center justify-between mb-4 sm:mb-6 px-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Generated Names ({names.length})
                  </h2>
                </div>
                <div className="grid gap-4 w-full">
                  {names.map((name, index) => {
                    const isFirstNewCard = shouldScrollRef.current && index === names.length - 10;
                    
                    return (
                      <div 
                        key={`${name.name}-${index}`}
                        ref={isFirstNewCard ? firstNewCardRef : null}
                        className="w-full"
                      >
                        <NameCard name={name} />
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-center mt-6 sm:mt-8 mb-6 sm:mb-8 px-4">
                  {isLoading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 animate-spin mb-3" />
                      <p className="text-gray-600 dark:text-gray-400 font-medium text-center">
                        Loading 10 more names...
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={handleGenerateMore}
                      disabled={isLoading}
                      className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl border-2 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 text-sm sm:text-base"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Generate More (10 names)</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                  Ready to Find the Perfect Name?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md px-4">
                  Select your preferences and click "Generate Names" to discover beautiful, meaningful names for your baby
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}