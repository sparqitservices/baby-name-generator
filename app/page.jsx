'use client';
import { useState } from 'react';
import NameForm from '../components/NameForm';
import NameCard from '../components/NameCard';
import { Baby } from 'lucide-react';

export default function Home() {
  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setNames(data.names || []);
      
      // Return the data so NameForm can show status
      return data;
    } catch (error) {
      console.error('Error generating names:', error);
      setNames([]);
      return { names: [], isApiWorking: false, message: 'Network error. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Baby className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              BNG Baby Name Generator
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover beautiful, meaningful names powered by AI ✨
          </p>
        </div>

        {/* Form and Results */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Customize Your Search
              </h2>
              <NameForm onGenerate={handleGenerate} isLoading={isLoading} />
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {names.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {names.map((name, index) => (
                  <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <NameCard name={name} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
                <div className="text-6xl mb-4">👶</div>
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Ready to find the perfect name?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Select your preferences and click "Generate Names" to get started!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}