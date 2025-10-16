"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../components/Footer';

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg ${className}`}>
    {children}
  </div>
);

export default function ProductDetailPage() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('red');
  const [rentalPeriod, setRentalPeriod] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFavoriteMessage, setShowFavoriteMessage] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [relatedFavorites, setRelatedFavorites] = useState(new Set());

  // Mock product data for rental
  const product = {
    id: 1,
    name: 'Ducati Panigale V4',
    category: 'motorcycle',
    type: 'sport',
    dailyPrice: 199,
    weeklyPrice: 1199,
    monthlyPrice: 3999,
    images: [
      '/moto.jpg',
      '/moto.jpg',
      '/moto.jpg',
      '/moto.jpg'
    ],
    featured: true,
    availability: {
      status: 'available',
      availableFrom: 'Immediate',
      nextAvailable: '2024-02-01'
    },
    colors: [
      { name: 'Ducati Red', value: 'red', class: 'bg-red-600' },
      { name: 'Racing Black', value: 'black', class: 'bg-gray-900' },
      { name: 'Pearl White', value: 'white', class: 'bg-white border border-gray-300' },
    ],
    specs: {
      engine: '1103cc V4',
      power: '214 HP @ 13,000 RPM',
      torque: '124 Nm @ 9,500 RPM',
      weight: '175kg (dry)',
      topSpeed: '305 km/h',
      fuelCapacity: '16L',
      seatHeight: '835mm',
      rentalIncludes: 'Full insurance, Helmet, Gloves'
    },
    features: [
      'Ducati Traction Control (DTC) EVO 2',
      'Ducati Wheelie Control (DWC) EVO',
      'Engine Brake Control (EBC) EVO',
      'Power Launch',
      'Cornering ABS EVO',
      'LED lighting system',
      'TFT color display',
      'Riding modes (Race, Sport, Street)',
      'Quick shifter up/down'
    ],
    description: "Experience the thrill of riding a true Italian superbike. The Ducati Panigale V4 is available for rental and delivers professional-level performance with advanced electronics and razor-sharp handling. Perfect for track days, special occasions, or simply experiencing the pinnacle of motorcycle engineering.",
    rentalTerms: [
      'Minimum rental period: 1 day',
      'Security deposit: $500 (refundable)',
      'Must be 25+ years with valid motorcycle license',
      '500km daily limit (additional $0.50/km)',
      'Full comprehensive insurance included',
      '24/7 roadside assistance',
      'Free delivery within 50km'
    ],
    reviews: [
      { id: 1, user: 'Alex R.', rating: 5, comment: 'Unbelievable experience! The Panigale was in perfect condition and the rental process was seamless. Will definitely rent again for my next track day.', date: '2024-01-15' },
      { id: 2, user: 'Sarah M.', rating: 4, comment: 'Amazing bike for a weekend ride. The power is incredible but manageable. Customer service was excellent.', date: '2024-01-10' },
      { id: 3, user: 'Mike T.', rating: 5, comment: 'Best rental experience ever. The bike was pristine and the included gear was top quality. Made my birthday unforgettable!', date: '2024-01-05' }
    ]
  };

  const relatedProducts = [
    {
      id: 2,
      name: 'Ducati Streetfighter V4',
      category: 'motorcycle',
      type: 'naked',
      dailyPrice: 179,
      image: '/moto.jpg'
    },
    {
      id: 3,
      name: 'BMW S1000RR',
      category: 'motorcycle',
      type: 'sport',
      dailyPrice: 189,
      image: '/moto.jpg'
    },
    {
      id: 4,
      name: 'Trek Domane SL 7',
      category: 'bicycle',
      type: 'road',
      dailyPrice: 45,
      image: '/moto.jpg'
    }
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (showFavoriteMessage) {
      const timer = setTimeout(() => {
        setShowFavoriteMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showFavoriteMessage]);

  const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

  const calculateTotalPrice = () => {
    switch (rentalPeriod) {
      case 1: return product.dailyPrice;
      case 7: return product.weeklyPrice;
      case 30: return product.monthlyPrice;
      default: return product.dailyPrice * rentalPeriod;
    }
  };

  const getRentalPeriodLabel = () => {
    switch (rentalPeriod) {
      case 1: return 'day';
      case 7: return 'week';
      case 30: return 'month';
      default: return 'days';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleRentalRequest = () => {
    console.log('Rental request:', { 
      product, 
      color: selectedColor, 
      period: rentalPeriod,
      total: calculateTotalPrice()
    });
  };

  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    
    if (newFavoriteStatus) {
      setShowFavoriteMessage(true);
    }
    
    console.log(`${product.name} ${newFavoriteStatus ? 'added to' : 'removed from'} favorites`);
  };

  const toggleRelatedFavorite = (productId) => {
    setRelatedFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-[#302652] transition-colors duration-200 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Rentals
          </button>
        </div>
      </nav>

      {/* Favorite Success Message */}
      {showFavoriteMessage && (
        <div className="fixed top-20 right-4 z-50 animate-fade-in">
          <GlassCard className="p-4 border-green-200 bg-green-50/80">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span className="text-green-800 font-medium">Added to favorites!</span>
            </div>
          </GlassCard>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <GlassCard className="overflow-hidden">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Favorite Button on Image */}
                <button
                  onClick={toggleFavorite}
                  className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                >
                  <svg 
                    className={`w-6 h-6 transition-all duration-300 ${
                      isFavorite 
                        ? 'text-red-500 fill-red-500 scale-110' 
                        : 'text-gray-600 group-hover:text-red-500'
                    }`}
                    fill={isFavorite ? "currentColor" : "none"}
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>
              </div>
            </GlassCard>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-[#bb00cc] scale-105' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Rental Info */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold border border-blue-200 mb-3">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="inline-block ml-2 px-3 py-1 bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white rounded-full text-sm font-bold">
                    Featured
                  </span>
                )}
                <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${
                          star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600">({product.reviews.length} reviews)</span>
                  </div>
                </div>
              </div>
              
              {/* Desktop Favorite Button */}
              <button
                onClick={toggleFavorite}
                className="hidden lg:flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-300 group"
              >
                <svg 
                  className={`w-6 h-6 transition-all duration-300 ${
                    isFavorite 
                      ? 'text-red-500 fill-red-500 scale-110' 
                      : 'text-gray-600 group-hover:text-red-500'
                  }`}
                  fill={isFavorite ? "currentColor" : "none"}
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                <span className={`font-semibold transition-colors duration-300 ${
                  isFavorite ? 'text-red-600' : 'text-gray-700 group-hover:text-red-600'
                }`}>
                  {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
                </span>
              </button>
            </div>

            {/* Mobile Favorite Button */}
            <button
              onClick={toggleFavorite}
              className="lg:hidden w-full flex items-center justify-center space-x-2 px-6 py-4 border-2 border-gray-300 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-300 group"
            >
              <svg 
                className={`w-6 h-6 transition-all duration-300 ${
                  isFavorite 
                    ? 'text-red-500 fill-red-500 scale-110' 
                    : 'text-gray-600 group-hover:text-red-500'
                }`}
                fill={isFavorite ? "currentColor" : "none"}
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <span className={`font-semibold transition-colors duration-300 ${
                isFavorite ? 'text-red-600' : 'text-gray-700 group-hover:text-red-600'
              }`}>
                {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
              </span>
            </button>

            {/* Availability Status */}
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${
              product.availability.status === 'available' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                product.availability.status === 'available' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              {product.availability.status === 'available' ? 'Available Now' : 'Currently Rented'}
            </div>

            {/* Rental Pricing */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">Rental Rates</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-2xl font-bold text-[#302652]">{formatPrice(product.dailyPrice)}</div>
                  <div className="text-sm text-gray-600">per day</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-2xl font-bold text-[#302652]">{formatPrice(product.weeklyPrice)}</div>
                  <div className="text-sm text-gray-600">per week</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-2xl font-bold text-[#302652]">{formatPrice(product.monthlyPrice)}</div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Preferred Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      selectedColor === color.value 
                        ? 'border-[#bb00cc] scale-110' 
                        : 'border-gray-300 hover:border-gray-400'
                    } ${color.class}`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Rental Period Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Rental Period</h3>
              <div className="flex space-x-3">
                {[1, 7, 30].map((period) => (
                  <button
                    key={period}
                    onClick={() => setRentalPeriod(period)}
                    className={`px-6 py-3 rounded-xl border-2 transition-all duration-300 font-semibold ${
                      rentalPeriod === period
                        ? 'border-[#bb00cc] bg-[#302652] text-white scale-105'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {period === 1 ? '1 Day' : period === 7 ? '1 Week' : '1 Month'}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-3 mt-4">
                <span className="font-semibold text-gray-900">Custom Period:</span>
                <div className="flex items-center border border-gray-300 rounded-xl">
                  <button
                    onClick={() => setRentalPeriod(Math.max(1, rentalPeriod - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-[#302652] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-semibold text-gray-900 min-w-12 text-center">
                    {rentalPeriod} {getRentalPeriodLabel()}
                  </span>
                  <button
                    onClick={() => setRentalPeriod(rentalPeriod + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-[#302652] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Total Price and Rent Button */}
            <div className="bg-gradient-to-r from-[#302652] to-[#1a1a2e] p-6 rounded-2xl text-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">Total Rental Cost:</span>
                <span className="text-3xl font-bold">{formatPrice(calculateTotalPrice())}</span>
              </div>
              <button
                onClick={handleRentalRequest}
                disabled={product.availability.status !== 'available'}
                className={`w-full py-4 px-8 rounded-xl font-bold shadow-lg transition-all duration-300 ${
                  product.availability.status === 'available'
                    ? 'bg-gradient-to-r from-[#bb00cc] to-purple-600 hover:shadow-xl hover:scale-105'
                    : 'bg-gray-500 cursor-not-allowed'
                }`}
              >
                {product.availability.status === 'available' 
                  ? 'Request to Rent Now' 
                  : 'Currently Unavailable'}
              </button>
            </div>

            {/* Rental Includes */}
            <GlassCard className="p-6">
              <h4 className="font-semibold text-[#302652] mb-3">Rental Includes</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Full Comprehensive Insurance
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Helmet & Gloves
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  24/7 Roadside Assistance
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Free Delivery (50km)
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <GlassCard className="mb-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'specs', name: 'Specifications' },
                { id: 'features', name: 'Features' },
                { id: 'terms', name: 'Rental Terms' },
                { id: 'reviews', name: `Reviews (${product.reviews.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 font-medium text-lg border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-[#bb00cc] text-[#302652]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Specifications Tab */}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="font-semibold text-[#302652] text-right">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-[#bb00cc] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rental Terms Tab */}
            {activeTab === 'terms' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.rentalTerms.map((term, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-[#302652] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="text-gray-700">{term}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#302652]">{averageRating.toFixed(1)}</div>
                    <div className="flex justify-center mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{product.reviews.length} reviews</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.user}</h4>
                          <div className="flex items-center mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Related Rentals */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Other Available Rides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Favorite Button on Related Product */}
                  <button 
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                    onClick={() => toggleRelatedFavorite(relatedProduct.id)}
                  >
                    <svg 
                      className={`w-5 h-5 transition-all duration-300 ${
                        relatedFavorites.has(relatedProduct.id) 
                          ? 'text-red-500 fill-red-500 scale-110' 
                          : 'text-gray-600 group-hover:text-red-500'
                      }`}
                      fill={relatedFavorites.has(relatedProduct.id) ? "currentColor" : "none"}
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </button>
                  
                  <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-[#302652] capitalize shadow-lg">
                    {relatedProduct.type}
                  </span>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{relatedProduct.name}</h3>
                  
                  <div className="flex items-center mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                      relatedProduct.category === 'motorcycle' 
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-green-100 text-green-800 border border-green-200'
                    }`}>
                      {relatedProduct.category}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-bold text-[#302652]">
                      {formatPrice(relatedProduct.dailyPrice)}<span className="text-sm font-normal text-gray-600">/day</span>
                    </span>
                    <button className="bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white px-6 py-2 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer/>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}