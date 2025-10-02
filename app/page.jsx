'use client';
import { useState } from 'react';
import NameForm from '@/components/NameForm';
import NameCard from '@/components/NameCard';
import { Sparkles, Loader2 } from 'lucide-react';

export default function Home() {
  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateNames = async (formData) => {
    setIsLoading(true);
    setNames([]); // Clear previous results

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate names');
      }

      const data = await response.json();
      
      if (data.names && Array.isArray(data.names)) {
        setNames(data.names);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Discover Perfect Baby Names
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find the perfect name for your little one with AI-powered suggestions
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-indigo-600" />
                Customize Your Search
              </h2>
              <NameForm 
                generateNames={generateNames} 
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12">
                <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Generating Amazing Names...
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our AI is crafting the perfect names for you
                </p>
              </div>
            ) : names.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Generated Names ({names.length})
                  </h2>
                </div>
                <div className="grid gap-4">
                  {names.map((name, index) => (
                    <NameCard key={index} name={name} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Ready to Find the Perfect Name?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                  Select your preferences and click "Generate Names" to discover beautiful, meaningful names for your baby
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}