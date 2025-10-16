"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: 'Ducati Panigale V4',
    category: 'motorcycle',
    type: 'sport',
    price: 24999,
    image: '/moto.jpg',
    featured: true,
    specs: {
      engine: '1103cc',
      power: '214 HP',
      weight: '175kg'
    }
  },
  {
    id: 2,
    name: 'Harley Davidson Street Glide',
    category: 'motorcycle',
    type: 'cruiser',
    price: 21999,
    image: '/moto.jpg',
    featured: false,
    specs: {
      engine: '1868cc',
      power: '92 HP',
      weight: '385kg'
    }
  },
  {
    id: 3,
    name: 'Trek Domane SL 7',
    category: 'bicycle',
    type: 'road',
    price: 5499,
    image: '/moto.jpg',
    featured: true,
    specs: {
      weight: '8.5kg',
      gears: '22',
      frame: 'Carbon'
    }
  },
  {
    id: 4,
    name: 'Specialized Stumpjumper',
    category: 'bicycle',
    type: 'mountain',
    price: 3299,
    image: '/moto.jpg',
    featured: false,
    specs: {
      weight: '13.2kg',
      suspension: '150mm',
      frame: 'Aluminum'
    }
  },
  {
    id: 5,
    name: 'Yamaha MT-07',
    category: 'motorcycle',
    type: 'naked',
    price: 7699,
    image: '/moto.jpg',
    featured: false,
    specs: {
      engine: '689cc',
      power: '74 HP',
      weight: '184kg'
    }
  },
  {
    id: 6,
    name: 'Giant Defy Advanced 2',
    category: 'bicycle',
    type: 'endurance',
    price: 2899,
    image: '/moto.jpg',
    featured: false,
    specs: {
      weight: '8.9kg',
      gears: '22',
      frame: 'Carbon'
    }
  },
  {
    id: 7,
    name: 'KTM 390 Duke',
    category: 'motorcycle',
    type: 'naked',
    price: 5599,
    image: '/moto.jpg',
    featured: false,
    specs: {
      engine: '373cc',
      power: '44 HP',
      weight: '149kg'
    }
  },
  {
    id: 8,
    name: 'Cannondale Trail 6',
    category: 'bicycle',
    type: 'mountain',
    price: 899,
    image: '/moto.jpg',
    featured: false,
    specs: {
      weight: '14.1kg',
      suspension: '100mm',
      frame: 'Aluminum'
    }
  }
];

const motorcycleTypes = ['All', 'sport', 'cruiser', 'naked', 'adventure'];
const bicycleTypes = ['All', 'road', 'mountain', 'endurance', 'gravel'];

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg ${className}`}>
    {children}
  </div>
);

// Price Range Slider Component
const PriceRangeSlider = ({ minPrice, maxPrice, value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);
  
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setLocalValue(newValue);
    onChange(newValue);
  };

  const percentage = ((localValue - minPrice) / (maxPrice - minPrice)) * 100;

  return (
    <div className="space-y-4">
      {/* Price Display */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Price Range</span>
        <span className="text-lg font-bold text-[#302652]">
          ${localValue.toLocaleString()}
        </span>
      </div>

      {/* Slider Container */}
      <div className="relative py-3">
        {/* Track Background */}
        <div className="h-2 bg-gray-200 rounded-full relative">
          {/* Filled Track */}
          <div 
            className="h-2 bg-gradient-to-r from-[#bb00cc] to-purple-600 rounded-full absolute top-0 left-0 transition-all duration-200"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Slider Input - Hidden but functional */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={localValue}
          onChange={handleChange}
          className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 opacity-0 cursor-pointer z-20"
        />
        
        {/* Custom Thumb - Positioned properly */}
        <div 
          className="absolute top-1/2 w-6 h-6 bg-white border-2 border-[#bb00cc] rounded-full shadow-lg transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-200 z-10"
          style={{ 
            left: `calc(${percentage}% - 12px)`
          }}
        />
      </div>

      {/* Min/Max Labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>${minPrice.toLocaleString()}</span>
        <span>${maxPrice.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'All',
    priceRange: 25000,
    sortBy: 'featured'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [isMounted, setIsMounted] = useState(false);

  // Initialize on client side only
  useEffect(() => {
    setIsMounted(true);
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    
    // Calculate max price and set initial filter
    const maxPrice = Math.max(...mockProducts.map(product => product.price));
    const defaultMaxPrice = Math.ceil(maxPrice / 1000) * 1000;
    
    setFilters(prev => ({
      ...prev,
      priceRange: defaultMaxPrice
    }));
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    if (filters.type !== 'All') {
      filtered = filtered.filter(product => product.type === filters.type);
    }

    filtered = filtered.filter(product => product.price <= filters.priceRange);

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [filters, searchTerm, products, isMounted]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePriceRangeChange = (value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: value
    }));
  };

  const toggleLike = (productId) => {
    setLikedProducts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      return newLiked;
    });
  };

  const getTypeOptions = () => {
    if (filters.category === 'motorcycle') return motorcycleTypes;
    if (filters.category === 'bicycle') return bicycleTypes;
    return ['All'];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Don't render anything until mounted on client
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate min and max prices
  const minPrice = 0;
  const maxPrice = Math.max(...products.map(product => product.price));
  const defaultMaxPrice = Math.ceil(maxPrice / 1000) * 1000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#302652] to-[#1a1a2e] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #bb00cc 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Find Your Perfect Ride
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our premium collection of motorcycles and bicycles for every adventure
          </p>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Search */}
            <GlassCard className="p-6">
              <h3 className="font-semibold text-[#302652] mb-4 text-lg">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all duration-200"
                />
                <svg className="w-5 h-5 text-gray-400 absolute right-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </GlassCard>

            {/* Category Filter */}
            <GlassCard className="p-6">
              <h3 className="font-semibold text-[#302652] mb-4 text-lg">Category</h3>
              <div className="space-y-3">
                {['all', 'motorcycle', 'bicycle'].map((category) => (
                  <label key={category} className="flex items-center group cursor-pointer transition-all duration-200 hover:translate-x-1">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={filters.category === category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-4 h-4 text-[#bb00cc] border-gray-300 focus:ring-[#bb00cc]"
                    />
                    <span className="ml-3 text-gray-700 capitalize font-medium group-hover:text-[#302652] transition-colors">
                      {category === 'all' ? 'All Categories' : category}
                    </span>
                  </label>
                ))}
              </div>
            </GlassCard>

            {/* Type Filter */}
            <GlassCard className="p-6">
              <h3 className="font-semibold text-[#302652] mb-4 text-lg">Type</h3>
              <div className="space-y-3">
                {getTypeOptions().map((type) => (
                  <label key={type} className="flex items-center group cursor-pointer transition-all duration-200 hover:translate-x-1">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={filters.type === type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      className="w-4 h-4 text-[#bb00cc] border-gray-300 focus:ring-[#bb00cc]"
                    />
                    <span className="ml-3 text-gray-700 capitalize font-medium group-hover:text-[#302652] transition-colors">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </GlassCard>

            {/* Price Range Slider */}
            <GlassCard className="p-6">
              <h3 className="font-semibold text-[#302652] mb-4 text-lg">Price Range</h3>
              <PriceRangeSlider
                minPrice={minPrice}
                maxPrice={defaultMaxPrice}
                value={filters.priceRange}
                onChange={handlePriceRangeChange}
              />
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Showing products up to {formatPrice(filters.priceRange)}
                </span>
              </div>
            </GlassCard>

            {/* Sort By */}
            <GlassCard className="p-6">
              <h3 className="font-semibold text-[#302652] mb-4 text-lg">Sort By</h3>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all duration-200"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </GlassCard>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-600 text-lg font-medium">
                Showing <span className="text-[#302652] font-bold">{filteredProducts.length}</span> of{" "}
                <span className="text-[#302652] font-bold">{products.length}</span> products
              </p>
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 font-medium">View:</span>
                <button 
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    !isGridView 
                      ? 'bg-white border-gray-300 shadow-lg hover:shadow-xl' 
                      : 'bg-transparent border-transparent hover:bg-gray-100'
                  }`}
                  onClick={() => setIsGridView(false)}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                  </svg>
                </button>
                <button 
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    isGridView 
                      ? 'bg-[#302652] text-white shadow-lg hover:shadow-xl' 
                      : 'bg-transparent border-transparent hover:bg-gray-100'
                  }`}
                  onClick={() => setIsGridView(true)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM19 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM19 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#bb00cc] to-transparent my-8" />

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">No products found</h3>
                <p className="text-gray-600 text-lg">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                isGridView 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                  >
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {product.featured && (
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          Featured
                        </span>
                      )}
                      
                      <span className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-[#302652] capitalize shadow-lg">
                        {product.type}
                      </span>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900 pr-2 line-clamp-2 flex-1">
                          {product.name}
                        </h3>
                        <span className="text-2xl font-bold text-[#302652] whitespace-nowrap ml-2">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                          product.category === 'motorcycle' 
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-green-100 text-green-800 border border-green-200'
                        }`}>
                          {product.category}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-6 text-sm">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <div key={key} className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="font-bold text-[#302652]">{value}</div>
                            <div className="text-xs text-gray-600 capitalize mt-1">{key}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-3 mt-auto pt-4">
                        <Link href="/productPage" >
                        <button className="flex-1 bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white py-3 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                          View Details
                        </button>
                        </Link>
                        <button 
                          className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                          onClick={() => toggleLike(product.id)}
                        >
                          <svg 
                            className={`w-6 h-6 transition-all duration-300 ${
                              likedProducts.has(product.id) 
                                ? 'text-red-500 fill-red-500 scale-110' 
                                : 'text-gray-600 hover:text-red-500'
                            }`}
                            fill={likedProducts.has(product.id) ? "currentColor" : "none"} 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}