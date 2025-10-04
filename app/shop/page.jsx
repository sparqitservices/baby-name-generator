'use client';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { ShoppingBag, Sparkles } from 'lucide-react';

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
    affiliateLink: 'https://amzn.to/3IEhOAd',
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

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All Products');

  const filteredProducts =
    activeCategory === 'All Products'
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full mb-6">
            <ShoppingBag className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Baby Essentials Shop
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Curated collection of top-rated baby products from Amazon
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span>All products are carefully selected best sellers</span>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            <strong>Disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases. 
            Prices and availability are subject to change. Product images are for illustration purposes.
          </p>
        </div>
      </div>
    </div>
  );
}