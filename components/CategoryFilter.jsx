'use client';

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex gap-2 sm:gap-3 justify-start sm:justify-center min-w-max sm:min-w-0 px-2 sm:px-0">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm sm:text-base ${
              activeCategory === category
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}