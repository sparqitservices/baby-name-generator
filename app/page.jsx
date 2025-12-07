'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import NameForm from '@/components/NameForm';
import NameCard from '@/components/NameCard';
import { Sparkles, Loader2, Plus, Globe, ShoppingBag } from 'lucide-react';

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
          inline: 'nearest',
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
          setNames((prev) => [...prev, ...data.names]);
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
        {/* Hero */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 px-4">
            AI Baby Name Generator
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Generate meaningful baby boy, girl and unisex names with short
            descriptions. Perfect for Indian, Muslim, Hindu, Christian, Sikh and
            global parents.
          </p>

          {/* Quick CTAs to Domains & Shop */}
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/domains"
              className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-gray-900/70 px-4 py-2 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-100 shadow hover:shadow-md hover:bg-white dark:hover:bg-gray-800 transition"
            >
              <Globe className="w-4 h-4" />
              Check domain for your favourite name
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-4 py-2 text-xs sm:text-sm font-semibold shadow hover:bg-indigo-700 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              Explore baby essentials
            </Link>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {/* Left: Form */}
          <div className="lg:col-span-1 w-full">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                Customize your search
              </h2>
              <NameForm
                generateNames={generateNames}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Tip: change gender, religion / culture and style to discover
                Muslim, Hindu, Christian, Sikh or completely unique modern
                names.
              </p>
            </div>
          </div>

          {/* Right: Results + SEO sections */}
          <div className="lg:col-span-2 w-full space-y-8">
            {/* Results */}
            {isLoading && names.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12">
                <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-600 animate-spin mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                  Generating amazing names...
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Our AI is crafting meaningful baby names based on your
                  preferences.
                </p>
              </div>
            ) : names.length > 0 ? (
              <div className="space-y-4 w-full">
                <div className="flex items-center justify-between mb-4 sm:mb-6 px-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    Generated names ({names.length})
                  </h2>
                </div>
                <div className="grid gap-4 w-full">
                  {names.map((name, index) => {
                    const isFirstNewCard =
                      shouldScrollRef.current &&
                      index === names.length - 10;

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

                <div className="flex flex-col items-center gap-4 mt-6 sm:mt-8 mb-6 sm:mb-8 px-4">
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
                      <span>Generate more (10 names)</span>
                    </button>
                  )}

                  {/* Inline CTA to domains & shop under results */}
                  <div className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Love a name?{' '}
                    <Link
                      href="/domains"
                      className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Check if the domain is available
                    </Link>{' '}
                    or{' '}
                    <Link
                      href="/shop"
                      className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      start shopping baby essentials
                    </Link>
                    .
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                  Ready to find the perfect name?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center max-w-md px-4">
                  Select your preferences and click &quot;Generate names&quot;
                  to discover beautiful, meaningful names for your baby.
                </p>
              </div>
            )}

            {/* SEO section */}
            <section className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-md p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                How this AI baby name generator works
              </h2>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                The generator uses artificial intelligence to suggest baby names
                based on your selected gender, religion or culture, style and
                length. Whether you are looking for modern Indian baby names,
                traditional Muslim names, Biblical Christian names or short
                unisex names, the tool creates personalised lists with short
                meanings.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm sm:text-base">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                    Indian &amp; regional names
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Explore Hindu, Sikh, Buddhist and regional Indian names
                    with roots in Sanskrit and local languages.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                    Muslim &amp; Arabic names
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Discover meaningful Muslim baby names inspired by Arabic
                    origins and Islamic heritage.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                    Modern &amp; global names
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Prefer something short and international? Choose modern or
                    unique style to see global-friendly names.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-md p-6 sm:p-8 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Frequently asked questions
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                <div>
                  <h3 className="font-semibold">
                    Is this baby name generator free?
                  </h3>
                  <p>
                    Yes, the generator is completely free to use. You can
                    create unlimited lists of baby names and save your
                    favourites.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">
                    Can I search specifically for Indian baby names?
                  </h3>
                  <p>
                    Yes. Choose options like <strong>Hindu / Vedic</strong>,{' '}
                    <strong>Sikh / Punjabi</strong>, or{' '}
                    <strong>regional Indian</strong> in the religion / culture
                    dropdown (depending on how you&apos;ve configured the form)
                    to see Indian-origin names.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">
                    How do I check domains or shop for baby products?
                  </h3>
                  <p>
                    After you find a name you love, visit our{' '}
                    <Link
                      href="/domains"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      domain search
                    </Link>{' '}
                    page to check available domains, or browse the{' '}
                    <Link
                      href="/shop"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      baby shop
                    </Link>{' '}
                    for curated items.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
