'use client';
import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { theme } = useTheme();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    // Add your Mailchimp integration here
    // For now, just show success message
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="relative z-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-white border-t border-gray-200 dark:border-gray-800 py-16 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              BNG Baby Names
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              AI-powered baby name generator helping parents find the perfect name for their little ones. Discover meanings, origins, and cultural significance.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/sparqitservices" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all duration-200 transform hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/sparq-it-services/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all duration-200 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/sparqitservices" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all duration-200 transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Quick Links</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Search Your Names
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Your Favorites
                </Link>
              </li>
              <li>
                <a 
                  href="https://sparqitservices.com/?utm_source=babynamegenerator&utm_medium=aitool&utm_campaign=afzal_sparqit&utm_content=bngbabynames" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  Company Website <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/sparqitservices/baby-name-generator" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  GitHub Repository <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>
  <Link href="/shop" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
    Baby Shop
  </Link>
</li>
<li>
  <Link href="/domains" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
    Domain Search
  </Link>
</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Subscribe to get updates on new features!</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
              {subscribed && (
                <p className="text-green-500 dark:text-green-400 text-sm animate-fade-in">✓ Successfully subscribed!</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
              No copyrights, just good vibes & zero drama.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-center md:text-right">
              Built with ❤️ by{' '}
              <a 
                href="https://x.com/iafzalhameed" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors"
              >
                Afzal Hameed
              </a>
              
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}