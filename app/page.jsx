'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import NameForm from '@/components/NameForm';
import NameCard from '@/components/NameCard';
import Footer from '@/components/Footer';

export default function Home() {
  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = (generatedNames) => {
    setNames(generatedNames);
    setIsLoading(false);
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
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Customize Your Search
              </h2>
              <NameForm 
                onGenerate={handleGenerate} 
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Results Section */}
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
                <div className="grid gap-4">
                  {names.map((name, index) => (
                    <NameCard key={`${name.name}-${index}`} name={name} />
                  ))}
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