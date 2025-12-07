'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import {
  ShoppingBag,
  Sparkles,
  ChevronDown,
  Star,
  ShieldCheck,
  Baby,
} from 'lucide-react';

// Product list (same as before)
const products = [
  {
    id: 1,
    title: 'Baby Monitor with Camera and Audio',
    description:
      'HD video baby monitor with night vision, two-way audio, and temperature monitoring.',
    price: '2990',
    originalPrice: '5490',
    discount: 46,
    rating: 3.8,
    reviews: '5,092',
    category: 'Baby Gear',
    image: '/shop/baby-monitor-with-camera-and-audio.jpg',
    affiliateLink: 'https://amzn.to/3KUz5Wl',
    badge: 'Best Seller',
    isPrime: true,
  },
  {
    id: 2,
    title: 'Convertible Baby Crib 4-in-1',
    description:
      'Stylish newborn baby crib with adjustable mattress height and sturdy wooden frame.',
    price: '7798',
    originalPrice: '11997',
    discount: 35,
    rating: 3.9,
    reviews: '172',
    category: 'Nursery Essentials',
    image: '/shop/convertible-baby-cot-and-crib.jpg',
    affiliateLink: 'https://amzn.to/4gZdWq8',
    badge: 'Best Seller',
    isPrime: true,
  },
  {
    id: 3,
    title: 'Electric Breast Pump Double',
    description:
      'Quiet, portable breast pump with rechargeable battery and multiple suction levels.',
    price: '2696',
    originalPrice: '3996',
    discount: 33,
    rating: 4.4,
    reviews: '207',
    category: 'Feeding & Nursing',
    image: '/shop/electric-breast-pump-double.jpg',
    affiliateLink: 'https://amzn.to/4nAzc82',
    badge: 'Top Rated',
    isPrime: true,
  },
  {
    id: 4,
    title: 'Baby Stroller Lightweight Travel System',
    description:
      'One-hand fold stroller with large storage basket, sun canopy and smooth wheels.',
    price: '6199',
    originalPrice: '10079',
    discount: 38,
    rating: 4.6,
    reviews: '29',
    category: 'Baby Gear',
    image: '/shop/baby-stroller-lightweight-travel-system.jpg',
    affiliateLink: 'https://amzn.to/3KyHCOM',
    badge: 'FBA',
    isPrime: true,
  },
  {
    id: 5,
    title: 'Organic Cotton Baby Clothes Set',
    description:
      '5-piece newborn essentials set made from 100% organic cotton, hypoallergenic.',
    price: '999',
    originalPrice: '3500',
    discount: 71,
    rating: 4.8,
    reviews: '1,766',
    category: 'Baby Clothing',
    image: '/shop/organic-cotton-baby-clothes-set.jpg',
    affiliateLink: 'https://amzn.to/3Iz1BMK',
    badge: 'Top Rated',
    isPrime: true,
  },
  {
    id: 6,
    title: 'Baby Play Mat with Activity Gym',
    description:
      'Soft padded play mat with hanging toys, music, and lights for sensory development.',
    price: '519',
    originalPrice: '1399',
    discount: 63,
    rating: 4.2,
    reviews: '323',
    category: 'Toys & Books',
    image: '/shop/baby-play-mat-with-activity-gym.jpg',
    affiliateLink: 'https://amzn.to/48gCbOm',
    badge: 'Best Seller',
    isPrime: true,
  },
  {
    id: 7,
    title: 'Baby Thermometer Digital Forehead',
    description:
      'Non-contact infrared thermometer with fever alarm and memory recall.',
    price: '1155',
    originalPrice: '2661',
    discount: 57,
    rating: 4.1,
    reviews: '5,136',
    category: 'Health & Safety',
    image: '/shop/baby-thermometer-digital-forehead.jpg',
    affiliateLink: 'https://amzn.to/4o2dw4q',
    badge: 'Top Rated',
    isPrime: true,
  },
  {
    id: 8,
    title: 'Baby Bottle Warmer and Sterilizer',
    description:
      'Fast bottle warmer with auto shut-off and steam sterilization function.',
    price: '2199',
    originalPrice: '4999',
    discount: 56,
    rating: 4.6,
    reviews: '128',
    category: 'Feeding & Nursing',
    image: '/shop/baby-bottle-warmer-and-sterilizer.jpg',
    affiliateLink: 'https://amzn.to/48lBp2F',
    badge: 'Best Seller',
    isPrime: true,
  },
  {
    id: 9,
    title: 'Nursery Glider Rocking Chair',
    description:
      'Comfortable glider with smooth rocking motion and padded armrests.',
    price: '3299',
    originalPrice: '6999',
    discount: 53,
    rating: 3.9,
    reviews: '174',
    category: 'Nursery Essentials',
    image: '/shop/nursery-glider-rocking-chair.jpg',
    affiliateLink: 'https://amzn.to/48fnBqn',
    badge: 'New Arrival',
    isPrime: true,
  },
  {
    id: 10,
    title: 'Baby Diaper Bag Backpack',
    description:
      'Multi-functional diaper bag with insulated pockets and USB charging port.',
    price: '1299',
    originalPrice: '1695',
    discount: 23,
    rating: 4.4,
    reviews: '2,156',
    category: 'Baby Gear',
    image: '/shop/baby-diaper-bag-backpack.jpg',
    affiliateLink: 'https://amzn.to/4pTbhlS',
    badge: "Amazon's Choice",
    isPrime: true,
  },
  {
    id: 11,
    title: 'Baby Swing and Bouncer 2-in-1',
    description:
      'Soothing swing with multiple speeds, music, and nature sounds.',
    price: '3240',
    originalPrice: '5499',
    discount: 41,
    rating: 4.1,
    reviews: '5,241',
    category: 'Baby Gear',
    image: '/shop/baby-swing-and-bouncer-2-in-1.jpg',
    affiliateLink: 'https://amzn.to/3IJ317o',
    badge: 'Top Rated',
    isPrime: true,
  },
  {
    id: 12,
    title: 'Baby Bath Tub with Temperature Sensor',
    description:
      'Ergonomic baby bathtub with built-in temperature indicator and drain plug.',
    price: '1791',
    originalPrice: '2979',
    discount: 40,
    rating: 4.3,
    reviews: '609',
    category: 'Health & Safety',
    image: '/shop/baby-bath-tub-with-temperature-sensor.jpg',
    affiliateLink: 'https://amzn.to/3IU1CuB',
    badge: "Amazon's Choice",
    isPrime: true,
  },
  {
    id: 13,
    title: 'Baby High Chair Adjustable',
    description:
      '6-position height adjustable high chair with removable tray and easy clean.',
    price: '2399',
    originalPrice: '3999',
    discount: 40,
    rating: 4.3,
    reviews: '212',
    category: 'Feeding & Nursing',
    image: '/shop/baby-high-chair-adjustable.jpg',
    affiliateLink: 'https://amzn.to/4mVEc69',
    badge: 'New Arrival',
    isPrime: true,
  },
  {
    id: 14,
    title: 'Baby Carrier Ergonomic Wrap',
    description:
      'Soft, breathable baby carrier with lumbar support and multiple carrying positions.',
    price: '1839',
    originalPrice: '2592',
    discount: 29,
    rating: 4.2,
    reviews: '939',
    category: 'Baby Gear',
    image: '/shop/baby-carrier-ergonomic-wrap.jpg',
    affiliateLink: 'https://amzn.to/4nLsmwD',
    badge: 'Best Seller',
    isPrime: true,
  },
  {
    id: 15,
    title: 'Baby Changing Table with Storage',
    description:
      'Sturdy changing table with safety rails and multiple storage shelves.',
    price: '5998',
    originalPrice: '9999',
    discount: 40,
    rating: 4.2,
    reviews: '20',
    category: 'Nursery Essentials',
    image: '/shop/baby-changing-table-with-storage.jpg',
    affiliateLink: 'https://amzn.to/4gScEgq',
    badge: 'New Arrival',
    isPrime: true,
  },
  {
    id: 16,
    title: 'Baby Sound Machine White Noise',
    description:
      'Portable sound machine with 20+ soothing sounds and night light.',
    price: '1329',
    originalPrice: '3999',
    discount: 67,
    rating: 4.2,
    reviews: '2,717',
    category: 'Baby Gear',
    image: '/shop/baby-sound-machine-white-noise.jpg',
    affiliateLink: 'https://amzn.to/46Xrzlf',
    badge: 'Top Rated',
    isPrime: true,
  },
  {
    id: 17,
    title: 'Baby Teething Toys Set',
    description:
      'BPA-free silicone teething toys in various shapes and textures.',
    price: '345',
    originalPrice: '959',
    discount: 64,
    rating: 4.3,
    reviews: '393',
    category: 'Toys & Books',
    image: '/shop/baby-teething-toys-set.jpg',
    affiliateLink: 'https://amzn.to/3Kty9bD',
    badge: 'Best Seller',
    isPrime: false,
  },
  {
    id: 18,
    title: 'Baby Nail Trimmer Electric',
    description:
      'Safe electric nail trimmer with LED light and multiple filing pads.',
    price: '262',
    originalPrice: '999',
    discount: 74,
    rating: 4.6,
    reviews: '1,488',
    category: 'Health & Safety',
    image: '/shop/baby-nail-trimmer-electric.jpg',
    affiliateLink: 'https://amzn.to/3ITlldY',
    badge: 'Best Seller',
    isPrime: true,
  },
  {
    id: 19,
    title: 'Baby Diapers Medium Size (M)',
    description:
      '72-count diapers for 7–12 kg babies with all-night leakage protection.',
    price: '432',
    originalPrice: '899',
    discount: 52,
    rating: 3.9,
    reviews: '9,400',
    category: 'Baby Clothing',
    image: '/shop/baby-diapers-medium-size-m.jpg',
    affiliateLink: 'https://amzn.to/4mTdvPF',
    badge: 'Best Seller',
    isPrime: true,
  },
  {
    id: 20,
    title: 'Sebamed Baby Gentle Wash',
    description:
      "Extra-soft formula with squalane & allantoin to hydrate baby’s delicate skin.",
    price: '988',
    originalPrice: '1040',
    discount: 5,
    rating: 4.5,
    reviews: '7,116',
    category: 'Health & Safety',
    image: '/shop/sebamed-baby-gentle-wash.jpg',
    affiliateLink: 'https://amzn.to/3KBpJyP',
    badge: 'New Arrival',
    isPrime: true,
  },
  {
    id: 21,
    title: 'Mylo Baby Safe Laundry Liquid Detergent',
    description:
      "Baby-safe detergent formulated for delicate clothes, removes stains gently.",
    price: '354',
    originalPrice: '449',
    discount: 21,
    rating: 4.5,
    reviews: '243',
    category: 'Health & Safety',
    image: '/shop/mylo-baby-safe-laundry-liquid-detergent.jpg',
    affiliateLink: 'https://amzn.to/4nHLCv8',
    badge: 'New Arrival',
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

const PRODUCTS_PER_PAGE = 9;

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
    setVisibleCount(PRODUCTS_PER_PAGE);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-6 md:py-12 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full mb-4 md:mb-6">
            <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 md:mb-4 px-2">
            Baby Essentials Shop
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4 md:mb-6 px-4">
            Curated collection of top-rated baby products from Amazon – diapers,
            strollers, baby monitors, toys and more.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 px-4">
            <Sparkles className="w-4 h-4 text-yellow-500 flex-shrink-0" />
            <span>Hand-picked best sellers with strong ratings and reviews</span>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-gray-900/70 px-4 py-2 text-gray-800 dark:text-gray-100 shadow hover:shadow-md hover:bg-white dark:hover:bg-gray-800 transition"
            >
              <Baby className="w-4 h-4" />
              Back to AI baby name generator
            </Link>
            <Link
              href="/domains"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 text-white px-4 py-2 font-semibold shadow hover:bg-indigo-700 transition"
            >
              <ShieldCheck className="w-4 h-4" />
              Secure a domain for your baby
            </Link>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-6 md:mb-8">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </section>

        {/* Results Count */}
        <div className="text-center mb-4 md:mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing{' '}
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {displayedProducts.length}
            </span>{' '}
            of{' '}
            <span className="font-bold">{filteredProducts.length}</span>{' '}
            products in{' '}
            <span className="font-semibold">{activeCategory}</span>
          </p>
        </div>

        {/* Products Grid */}
        <section aria-label="Curated baby products from Amazon">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-8 md:mt-12 animate-fade-in">
            <button
              onClick={handleLoadMore}
              className="group flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 md:px-12 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              <span className="text-base md:text-lg">Load more products</span>
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
                You&apos;ve seen all products in this category!
              </span>
            </div>
          </div>
        )}

        {/* SEO / buying guide section */}
        <section className="mt-10 md:mt-12 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-md p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              How we choose these baby products
            </h2>
          </div>

          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
            This shop is a curated list of baby essentials across categories
            like baby gear, nursery furniture, feeding, clothing and health &
            safety. We look at overall Amazon rating, number of reviews,
            features, and value for money before adding a product to this page.
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold mb-1">Newborn &amp; hospital bag</h3>
              <p>
                Items like diapers, gentle wash, baby clothes and nursing
                products help you prepare your hospital bag and the first few
                weeks at home.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Everyday baby gear</h3>
              <p>
                Strollers, carriers, diaper bags and swings make daily life
                easier when you are on the move or need hands-free time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Safety &amp; comfort</h3>
              <p>
                Thermometers, nail trimmers, bath tubs and sound machines keep
                your baby comfortable and help you monitor their health.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ + Disclosure */}
        <section className="mt-8 md:mt-10 p-4 md:p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Frequently asked questions
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold mb-1">
                Are these products sold by you?
              </h3>
              <p>
                No. All items listed here are sold on Amazon by different
                brands. When you click a product, you are taken to the Amazon
                product page to complete your purchase.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                How often is this list updated?
              </h3>
              <p>
                We periodically review ratings, reviews and availability. If a
                product becomes unavailable or poorly rated, we replace it with
                a better option.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                Does this affect the price I pay?
              </h3>
              <p>
                No. As an Amazon Associate, we earn from qualifying purchases,
                but you pay the same price you would see by going directly to
                Amazon.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed mt-2">
            <strong>Disclosure:</strong> As an Amazon Associate, we earn from
            qualifying purchases. Prices and availability can change at any
            time. Product images are for illustration purposes only; always
            check details on the Amazon page before buying.
          </p>
        </section>
      </div>
    </div>
  );
}
