import DomainSearch from '@/components/DomainSearch';
import { Globe, Sparkles } from 'lucide-react';

export default function DomainsPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Secure Your Baby's Digital Future
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Register a domain name for your baby's future website, email, or online portfolio
          </p>
        </div>

        {/* Domain Search Widget */}
        <div className="mb-16">
          <DomainSearch />
        </div>

        {/* Why Register Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Why Register a Domain for Your Baby?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎁</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Unique Gift</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A memorable and lasting gift for your child's future
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900 dark:to-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📧</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Personal Email</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create a professional email address with their name
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌐</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Online Portfolio</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Build their digital presence from day one
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Investment</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Secure their name before someone else does
              </p>
            </div>
          </div>
        </div>

        {/* Popular Baby Domains */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Popular Baby Domain Ideas
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              'firstname.com',
              'firstnamelastname.com',
              'babyfirstname.com',
              'firstname.baby',
              'firstname.family',
              'littlefirstname.com',
            ].map((domain, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300">{domain}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            <strong>Affiliate Disclosure:</strong> We may earn a commission when you purchase a domain through our Namecheap affiliate link. 
            This helps support our service at no extra cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}