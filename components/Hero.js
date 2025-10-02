import Logo from './Logo';

export default function Hero() {
  return (
    <header className="text-center mb-16 space-y-6">
      <div className="flex justify-center mb-6 animate-fade-in">
        <Logo size="large" />
      </div>
      
      <h1 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 animate-fade-in-up">
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
          AI Baby Name Generator
        </span>
      </h1>
      
      {/* Baby Image */}
      <figure className="flex justify-center my-8 animate-fade-in-up animation-delay-200">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse" aria-hidden="true"></div>
          <img 
            src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop" 
            alt="Cute smiling baby representing the joy of finding the perfect baby name" 
            className="relative w-48 h-48 rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800 transform hover:scale-105 transition-transform duration-300"
            width="192"
            height="192"
            loading="eager"
          />
        </div>
      </figure>
      
      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
        Discover beautiful, meaningful names for your baby with{' '}
        <strong className="font-bold text-indigo-600 dark:text-indigo-400">AI-powered suggestions</strong>{' '}
        tailored to your preferences across Muslim, Hindu, Christian, Sikh, Buddhist, Jain, and Jewish traditions
      </p>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in-up animation-delay-600" role="list" aria-label="Baby name generator statistics">
        <div className="text-center" role="listitem">
          <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400" aria-label="20 plus names per search">20+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Names per search</div>
        </div>
        <div className="text-center" role="listitem">
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400" aria-label="7 religions supported">7</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Religions</div>
        </div>
        <div className="text-center" role="listitem">
          <div className="text-4xl font-bold text-pink-600 dark:text-pink-400" aria-label="Infinite possibilities">∞</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Possibilities</div>
        </div>
      </div>
    </header>
  );
}