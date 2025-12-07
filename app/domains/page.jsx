import DomainSearch from '@/components/DomainSearch';
import Link from 'next/link';
import { Globe, Sparkles, ShieldCheck, Search, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Baby Domain Name Search – Secure Your Baby’s Name as a Domain',
  description:
    'Search and register a domain name for your baby. Use our baby domain name search to secure firstname.com, babyfirstname.com, firstname.family and more using Namecheap.',
};

export default function DomainsPage() {
  const ideaDomains = [
    'firstname.com',
    'firstnamelastname.com',
    'babyfirstname.com',
    'firstname.baby',
    'firstname.family',
    'littlefirstname.com',
    'firstname.online',
    'helloFirstname.com',
    'Firstname.world',
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-10 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-gray-900/70 px-4 py-1 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 shadow">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Baby name → instant domain check
          </div>

          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Secure Your Baby&apos;s Digital Identity
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Turn your favourite baby name into a domain for future email,
            website, portfolio or business. Check availability instantly using
            Namecheap.
          </p>

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Works perfectly with our{' '}
            <Link
              href="/"
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              AI baby name generator
            </Link>
            .
          </p>
        </section>

        {/* Domain Search Widget */}
        <section className="mb-12 md:mb-16">
          <div className="bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 border border-white/60 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div className="text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                  Baby domain name search
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Type your baby&apos;s name (for example: <em>Aarav</em> or{' '}
                  <em>Zoya</em>) and we&apos;ll send you to Namecheap to check
                  domain availability.
                </p>
              </div>
            </div>

            <DomainSearch />

            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
              You&apos;ll be redirected to Namecheap (our domain partner) using
              an affiliate link. Prices and availability are shown on
              Namecheap&apos;s website.
            </p>
          </div>
        </section>

        {/* Why Register Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Why register a domain for your baby?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎁</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                Unique gift
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A memorable, personalised gift that your child can keep and use
                for life.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900 dark:to-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📧</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                Personal email
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create a professional email address like{' '}
                <span className="font-mono">name@firstname.com</span> instead of
                generic inboxes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌐</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                Future portfolio
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use the domain later for school projects, portfolios, blogs or
                a small business.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                Name protection
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Lock the domain now so nobody else takes your child&apos;s exact
                name online.
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="mt-10 grid md:grid-cols-3 gap-6 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-full bg-indigo-600 text-white w-6 h-6 flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Pick a baby name</h3>
                <p>
                  Use our{' '}
                  <Link
                    href="/"
                    className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                  >
                    AI baby name generator
                  </Link>{' '}
                  to find names you love.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-full bg-indigo-600 text-white w-6 h-6 flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Search the domain</h3>
                <p>
                  Type the name (with or without surname) into the search box
                  above and open the Namecheap results page.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-full bg-indigo-600 text-white w-6 h-6 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Register &amp; relax</h3>
                <p>
                  If it&apos;s available, register the domain and renew it each
                  year so your baby&apos;s name stays safe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Baby Domains */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Popular baby domain ideas
          </h2>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto mb-6">
            Combine your baby&apos;s first name, surname, nickname or initials
            with different domain extensions. Here are some patterns that often
            work well:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {ideaDomains.map((domain, index) => (
              <div
                key={domain + index}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
                  {domain}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ + Affiliate disclosure */}
        <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              Questions about baby domains
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold mb-1">
                Do I need to register the domain immediately after birth?
              </h3>
              <p>
                No, but popular names and short domains are taken quickly. If
                you have already shortlisted a name, registering the domain
                early ensures it&apos;s not taken by someone else.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">
                Which extensions are best for baby names?
              </h3>
              <p>
                Classic options like <strong>.com</strong> are always strong.
                You can also try <strong>.baby</strong>, <strong>.family</strong>
                , <strong>.online</strong>, <strong>.me</strong> or regional
                extensions like <strong>.in</strong> depending on where your
                child will live.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1">
                Can I change how I use the domain later?
              </h3>
              <p>
                Yes. You might start by simply forwarding the domain to a photo
                album, then later build a personal website, portfolio, blog or
                business on the same domain.
              </p>
            </div>

            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center">
                <strong>Affiliate disclosure:</strong> When you click the
                Namecheap link and buy a domain, we may earn a small commission
                at no extra cost to you. This helps keep our baby name generator
                and tools free.
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Go back to baby name generator
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
