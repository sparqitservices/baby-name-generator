'use client';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { ShoppingBag, Sparkles, ChevronDown } from 'lucide-react';

// Sample products - Replace with your actual Amazon affiliate links
const products = [
  {
    id: 1,
    title: 'Baby Monitor with Camera and Audio',
    description: 'HD video baby monitor with night vision, two-way audio, and temperature monitoring.',
    price: '89.99',
    originalPrice: '129.99',
    discount: 31,
    rating: 4.5,
    reviews: '2,345',
    category: 'Baby Gear',
    image: 'https://placehold.co/400x400/e0e7ff/4f46e5?text=Baby+Monitor',
    affiliateLink: 'https://amazon.com/your-affiliate-link-1',
    badge: 'Best Seller',
    isPrime: true,
  },
  {
    id: 2,
    title: 'Convertible Baby Crib 4-in-1',
    description: 'Grows with your baby from crib to toddler bed, daybed, and full-size bed.',
    price: '249.99',
    originalPrice: '349.99',
    discount: 29,
    rating: 4.8,
    reviews: '1,892',
    category: 'Nursery Essentials',
    image: 'https://placehold.co/400x400/fce7f3/ec4899?text=Baby+Crib',
    affiliateLink: 'https://amazon.com/your-affiliate-link-2',
    badge: 'Top Rated',
    isPrime: true,
  },
  {
    id: 3,
    title: 'Electric Breast Pump Double',
    description: 'Quiet, portable breast pump with rechargeable battery and multiple suction levels.',
    price: '159.99',
    originalPrice: '199.99',
    discount: 20,
    rating: 4.6,
    reviews: '3,421',
    category: 'Feeding & Nursing',
    image: 'https://placehold.co/400x400/ddd6fe/8b5cf6?text=Breast+Pump',
    affiliateLink: 'https://amazon.com/your-affiliate-link-3',
    isPrime: true,
  },
  {
    id: 4,
    title: 'Baby Stroller Lightweight Travel System',
    description: 'One-hand fold stroller with car seat adapter, large storage basket, and sun canopy.',
    price: '199.99',
    originalPrice: '299.99',
    discount: 33,
    rating: 4.7,
    reviews: '1,567',
    category: 'Baby Gear',
    image: 'https://placehold.co/400x400/e0e7ff/4f46e5?text=Baby+Stroller',
    affiliateLink: 'https://amazon.com/your-affiliate-link-4',
    badge: 'Best Seller',
    isPrime: true,
  },
  {
    id: 5,
    title: 'Organic Cotton Baby Clothes Set',
    description: '5-piece newborn essentials set made from 100% organic cotton, hypoallergenic.',
    price: '34.99',
    originalPrice: '49.99',
    discount: 30,
    rating: 4.9,
    reviews: '4,123',
    category: 'Baby Clothing',
    image: 'https://placehold.co/400x400/fce7f3/ec4899?text=Baby+Clothes',
    affiliateLink: 'https://amazon.com/your-affiliate-link-5',
    isPrime: true,
  },
  {
    id: 6,
    title: 'Baby Play Mat with Activity Gym',
    description: 'Soft padded play mat with hanging toys, music, and lights for sensory development.',
    price: '59.99',
    originalPrice: '89.99',
    discount: 33,
    rating: 4.4,
    reviews: '987',
    category: 'Toys & Books',
    image: 'https://placehold.co/400x400/ddd6fe/8b5cf6?text=Play+Mat',
    affiliateLink: 'https://amazon.com/your-affiliate-link-6',
    isPrime: true,
  },
  {
    id: 7,
    title: 'Baby Thermometer Digital Forehead',
    description: 'Non-contact infrared thermometer with fever alarm and memory recall.',
    price: '29.99',
    originalPrice: '44.99',
    discount: 33,
    rating: 4.5,
    reviews: '2,156',
    category: 'Health & Safety',
    image: 'https://placehold.co/400x400/e0e7ff/4f46e5?text=Thermometer',
    affiliateLink: 'https://amazon.com/your-affiliate-link-7',
    isPrime: true,
  },
  {
    id: 8,
    title: 'Baby Bottle Warmer and Sterilizer',
    description: 'Fast bottle warmer with auto shut-off and steam sterilization function.',
    price: '39.99',
    originalPrice: '59.99',
    discount: 33,
    rating: 4.6,
    reviews: '1,432',
    category: 'Feeding & Nursing',
    image: 'https://placehold.co/400x400/fce7f3/ec4899?text=Bottle+Warmer',
    affiliateLink: 'https://amazon.com/your-affiliate-link-8',
    isPrime: true,
  },
  {
    id: 9,
    title: 'Nursery Glider Rocking Chair',
    description: 'Comfortable glider with smooth rocking motion and padded armrests.',
    price: '279.99',
    originalPrice: '399.99',
    discount: 30,
    rating: 4.7,
    reviews: '876',
    category: 'Nursery Essentials',
    image: 'https://placehold.co/400x400/ddd6fe/8b5cf6?text=Glider+Chair',
    affiliateLink: 'https://amazon.com/your-affiliate-link-9',
    badge: 'Top Rated',
    isPrime: true,
  },
  {
    id: 10,
    title: 'Baby Diaper Bag Backpack',
    description: 'Multi-functional diaper bag with insulated pockets and USB charging port.',
    price: '49.99',
    originalPrice: '79.99',
    discount: 38,
    rating: 4.6,
    reviews: '1,234',
    category: 'Baby Gear',
    image: 'https://placehold.co/400x400/e0e7ff/4f46e5?text=Diaper+Bag',
    affiliateLink: 'https://amazon.com/your-affiliate-link-10',
    isPrime: true,
  },
  {
    id: 11,
    title: 'Baby Swing and Bouncer 2-in-1',
    description: 'Soothing swing with multiple speeds, music, and nature sounds.',
    price: '129.99',
    originalPrice: '179.99',
    discount: 28,
    rating: 4.5,
    reviews: '2,567',
    category: 'Baby Gear',
    image: 'https://placehold.co/400x400/fce7f3/ec4899?text=Baby+Swing',
    affiliateLink: 'https://amazon.com/your-affiliate-link-11',
    badge: 'Best Seller',
    isPrime: true,
  },
  {
    id: 12,
    title: 'Baby Bath Tub with Temperature Sensor',
    description: 'Ergonomic baby bathtub with built-in temperature indicator and drain plug.',
    price: '34.99',
    originalPrice: '49.99',
    discount: 30,
    rating: 4.7,
    reviews: '1,890',
    category: 'Health & Safety',
    image: 'https://placehold.co/400x400/ddd6fe/8b5cf6?text=Bath+Tub',
    affiliateLink: 'https://amazon.com/your-affiliate-link-12',
    isPrime: true,
  },
  {
    id: 13,
    title: 'Baby High Chair Adjustable',
    description: '6-position height adjustable high chair with removable tray and easy clean.',
    price: '89.99',
    originalPrice: '129.99',
    discount: 31,
    rating: 4.8,
    reviews: '3,456',
    category: 'Feeding & Nursing',
    image: 'https://placehold.co/400x400/e0e7ff/4f46e5?text=High+Chair',
    affiliateLink: 'https://amazon.com/your-affiliate-link-13',
    badge: 'Top Rated',
    isPrime: true,
  },
  {
    id: 14,
    title: 'Baby Carrier Ergonomic Wrap',
    description: 'Soft, breathable baby carrier with lumbar support and multiple carrying positions.',
    price: '44.99',
    originalPrice: '69.99',
    discount: 36,
    rating: 4.6,
    reviews: '2,789',
    category: 'Baby Gear',
    image: 'https://placehold.co/400x400/fce7f3/ec4899?text=Baby+Carrier',
    affiliateLink: 'https://amazon.com/your-affiliate-link-14',
    isPrime: true,
  },
  {
    id: 15,
    title: 'Baby Changing Table with Storage',
    description: 'Sturdy changing table with safety rails and multiple storage shelves.',
    price: '149.99',
    originalPrice: '219.99',
    discount: 32,
    rating: 4.5,
    reviews: '987',
    category: 'Nursery Essentials',
    image: 'https://placehold.co/400x400/ddd6fe/8b5cf6?text=Changing+Table',
    affiliateLink: 'https://amazon.com/your-affiliate-link-15',
    isPrime: true,
  },
  {
    id: 16,
    title: 'Baby Sound Machine White Noise',
    description: 'Portable sound machine with 20+ soothing sounds and night light.',
    price: '29.99',
    originalPrice: '44.99',
    discount: 33,
    rating: 4.7,
    reviews: '4,567',
    category: 'Nursery Essentials',
    image: 'https://placehold.co/400x400/e0e7ff/4f46e5?text=Sound+Machine',
    affiliateLink: 'https://amazon.com/your-affiliate-link-16',
    badge: 'Best Seller',
    isPrime: true,
  },
  {
    id: 17,
    title: 'Baby Teething Toys Set',
    description: 'BPA-free silicone teething toys in various shapes and textures.',
    price: '19.99',
    originalPrice: '29.99',
    discount: 33,
    rating: 4.8,
    reviews: '3,210',
    category: 'Toys & Books',
    image: 'https://placehold.co/400x400/fce7f3/ec4899?text=Teething+Toys',
    affiliateLink: 'https://amazon.com/your-affiliate-link-17',
    isPrime: true,
  },
  {
    id: 18,
    title: 'Baby Nail Trimmer Electric',
    description: 'Safe electric nail trimmer with LED light and multiple filing pads.',
    price: '24.99',
    originalPrice: '39.99',
    discount: 38,
    rating: 4.5,
    reviews: '1,567',
    category: 'Health & Safety',
    image: 'https://placehold.co/400x400/ddd6fe/8b5cf6?text=Nail+Trimmer',
    affiliateLink: 'https://amazon.com/your-affiliate-link-18',
    isPrime: true,
  },
];

const categories = [
  'All Products',
  'Baby Gear',
  'Nursery Essentials',
  'Feeding & Nursing',
  'Baby Clothing',
  'Toys & Books',
  'Health & Safety',
];

const PRODUCTS_PER_PAGE = 9; // 3x3 grid on desktop, perfect for mobile too

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  const filteredProducts =
    activeCategory === 'All Products'
      ? products
      : products.filter((product) => product.category === activeCategory);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(PRODUCTS_PER_PAGE); // Reset to initial count when category changes
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 md:py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full mb-4 md:mb-6">
            <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 md:mb-4 px-2">
            Baby Essentials Shop
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4 md:mb-6 px-4">
            Curated collection of top-rated baby products from Amazon
          </p>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-4">
            <Sparkles className="w-4 h-4 text-yellow-500 flex-shrink-0" />
            <span>All products are carefully selected best sellers</span>
          </div>
        </div>

        {/* Category Filter - Mobile Optimized */}
        <div className="mb-6 md:mb-8">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {/* Results Count */}
        <div className="text-center mb-4 md:mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-bold text-indigo-600 dark:text-indigo-400">{displayedProducts.length}</span> of{' '}
            <span className="font-bold">{filteredProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-8 md:mt-12 animate-fade-in">
            <button
              onClick={handleLoadMore}
              className="group flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 md:px-12 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              <span className="text-base md:text-lg">Load More Products</span>
              <ChevronDown className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        )}

        {/* No More Products Message */}
        {!hasMore && filteredProducts.length > PRODUCTS_PER_PAGE && (
          <div className="text-center mt-8 md:mt-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                You've seen all products in this category!
              </span>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-10 md:mt-12 p-4 md:p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
            <strong>Disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases. 
            Prices and availability are subject to change. Product images are for illustration purposes.
          </p>
        </div>
      </div>
    </div>
  );
}