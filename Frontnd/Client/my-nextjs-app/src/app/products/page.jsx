
"use client";

import { useState, useEffect } from 'react';

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
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $1,000', min: 0, max: 1000 },
  { label: '$1,000 - $5,000', min: 1000, max: 5000 },
  { label: '$5,000 - $10,000', min: 5000, max: 10000 },
  { label: 'Over $10,000', min: 10000, max: Infinity }
];

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'All',
    priceRange: 'All Prices',
    sortBy: 'featured'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Filter by type
    if (filters.type !== 'All') {
      filtered = filtered.filter(product => product.type === filters.type);
    }

    // Filter by price range
    const selectedPriceRange = priceRanges.find(range => range.label === filters.priceRange);
    if (selectedPriceRange) {
      filtered = filtered.filter(product =>
        product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
      );
    }

    // Sort products
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
      default: // featured
        filtered.sort((a, b) => b.featured - a.featured);
    }

    setFilteredProducts(filtered);
  }, [filters, searchTerm, products]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#302652] to-[#1a1a2e] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Ride</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our premium collection of motorcycles and bicycles for every adventure
          </p>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-[#302652] mb-4">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute right-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-[#302652] mb-4">Category</h3>
              <div className="space-y-2">
                {['all', 'motorcycle', 'bicycle'].map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={filters.category === category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-4 h-4 text-[#bb00cc] border-gray-300 focus:ring-[#bb00cc]"
                    />
                    <span className="ml-2 text-gray-700 capitalize">{category === 'all' ? 'All Categories' : category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-[#302652] mb-4">Type</h3>
              <div className="space-y-2">
                {getTypeOptions().map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={filters.type === type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      className="w-4 h-4 text-[#bb00cc] border-gray-300 focus:ring-[#bb00cc]"
                    />
                    <span className="ml-2 text-gray-700 capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-[#302652] mb-4">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.label}
                      checked={filters.priceRange === range.label}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className="w-4 h-4 text-[#bb00cc] border-gray-300 focus:ring-[#bb00cc]"
                    />
                    <span className="ml-2 text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-[#302652] mb-4">Sort By</h3>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
<div className="flex-1">
  {/* Results Header */}
  <div className="flex justify-between items-center mb-6">
    <p className="text-gray-600">
      Showing {filteredProducts.length} of {products.length} products
    </p>
    <div className="flex items-center space-x-2">
      <span className="text-gray-600">View:</span>
      <button className="p-2 rounded-lg bg-white border border-gray-300">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
        </svg>
      </button>
      <button className="p-2 rounded-lg bg-[#302652] text-white">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM19 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM19 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z"/>
        </svg>
      </button>
    </div>
  </div>

  {/* Products */}
  {filteredProducts.length === 0 ? (
    <div className="text-center py-12">
      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
      <p className="text-gray-600">Try adjusting your filters to see more results.</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
          {/* Image Section - Fixed Height */}
          <div className="relative h-48 flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.featured && (
              <span className="absolute top-3 left-3 bg-[#bb00cc] text-white px-3 py-1 rounded-full text-sm font-semibold">
                Featured
              </span>
            )}
            <span className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded text-sm font-semibold text-[#302652] capitalize">
              {product.type}
            </span>
          </div>
          
          {/* Content Section - Flexible but with consistent structure */}
          <div className="p-6 flex flex-col flex-grow">
            {/* Product Name and Price - Fixed height with truncation */}
            <div className="flex justify-between items-start mb-3 min-h-[3.5rem]">
              <h3 className="text-xl font-semibold text-gray-900 pr-2 line-clamp-2 flex-1">
                {product.name}
              </h3>
              <span className="text-2xl font-bold text-[#302652] whitespace-nowrap ml-2">
                {formatPrice(product.price)}
              </span>
            </div>
            
            {/* Category Badge */}
            <div className="flex items-center mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                product.category === 'motorcycle' 
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {product.category}
              </span>
            </div>

            {/* Specs Grid - Fixed height */}
            <div className="grid grid-cols-3 gap-2 mb-6 text-sm text-gray-600">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="font-semibold text-[#302652]">{value}</div>
                  <div className="text-xs capitalize">{key}</div>
                </div>
              ))}
            </div>

            {/* Buttons - Always at the bottom */}
            <div className="flex space-x-3 mt-auto pt-4">
              <button className="flex-1 bg-[#bb00cc]  text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-center">
                View Details
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </div>
  );
}