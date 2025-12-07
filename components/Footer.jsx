'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const year = new Date().getFullYear();


  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      setEmail('');

      if (data.existing) {
        // ✅ Already subscribed: show message, no redirect
        setMessage("You're already subscribed. We'll keep you posted ❤️");
      } else {
        // ✅ New subscriber: redirect to thank you page
        router.push('/thank-you');
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <footer className="relative z-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-white border-top border-gray-200 dark:border-gray-800 py-14 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-10 md:mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              BNG Baby Names
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm sm:text-base">
              AI-powered baby name generator to help parents discover beautiful
              names, meanings and origins – plus tools to secure domains and
              explore baby essentials.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 leading-relaxed">
              Pronunciation powered by <span className="font-medium">ElevenLabs</span>.
              Domain search uses <span className="font-medium">Namecheap</span>, and shop
              links may be Amazon affiliate links at no extra cost to you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Quick links
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              <li>
                <Link
                  href="/"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Home – AI name generator
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Search your names
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Your favourites
                </Link>
              </li>
              <li>
                <Link
                  href="/domains"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Domain search
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Baby shop
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/privacy"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Terms &amp; conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Stay updated
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
              Get occasional updates when we add new features, filters or naming
              tools. No spam, just baby-name goodness.
            </p>
           <form onSubmit={handleSubscribe} className="space-y-3">
    <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter your email"
    required
    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm sm:text-base"
  />
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {loading ? 'Subscribing…' : 'Subscribe'}
  </button>

  {message && (
    <p className="text-xs sm:text-sm mt-1 text-center text-gray-700 dark:text-gray-300">
      {message}
    </p>
  )}
    </form>


            <div className="mt-5 flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4" />
              <a
                href="mailto:info@sparqitservices.com"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Contact: info@sparqitservices.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              © {year} BNG Baby Names. Made with ❤️ for parents-to-be.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 text-center md:text-right">
              This tool is for inspiration only and does not replace personal,
              cultural or religious guidance when choosing a baby name.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
