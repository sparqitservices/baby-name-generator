'use client';
import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    // Add your Mailchimp integration here
    // For now, just show success message
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="relative z-10 bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              BNG Baby Names
            </h3>
            <p className="text-gray-400 mb-4">
              AI-powered baby name generator helping parents find the perfect name for their little ones.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/sparqitservices" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/sparq-it-services/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/afzalhameed" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-indigo-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="/favorites" className="hover:text-indigo-400 transition-colors">Favorites</a>
              </li>
              <li>
                <a 
                  href="https://www.sparqitservices.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  Company Website <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/sparqitservices/baby-name-generator" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400 transition-colors flex items-center gap-2"
                >
                  GitHub Repository <ExternalLink className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to get updates on new features!</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Subscribe
              </button>
              {subscribed && (
                <p className="text-green-400 text-sm">✓ Successfully subscribed!</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              No copyrights, just good vibes and zero drama.
            </p>
            <p className="text-gray-400 text-center md:text-right">
              Built with ❤️ by{' '}
              <a 
                href="https://x.com/iafzalhameed" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                Afzal
              </a>
              {' '}at{' '}
              <a 
                href="https://sparqitservices.com/?utm_source=babynamegenerator&utm_medium=aitool&utm_campaign=afzal_sparqit&utm_content=bngbabynames" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
              >
                Sparq IT Services
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}