"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Footer from '../components/Footer';

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg ${className}`}>
    {children}
  </div>
);

export default function FavoritesPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Mock favorites data
  const mockFavorites = [
    {
      id: 1,
      name: 'Ducati Panigale V4',
      category: 'motorcycle',
      type: 'sport',
      dailyPrice: 199,
      weeklyPrice: 1199,
      monthlyPrice: 3999,
      image: '/moto.jpg',
      featured: true,
      specs: {
        engine: '1103cc',
        power: '214 HP',
        weight: '175kg'
      },
      availability: 'available'
    },
    {
      id: 2,
      name: 'Trek Domane SL 7',
      category: 'bicycle',
      type: 'road',
      dailyPrice: 45,
      weeklyPrice: 250,
      monthlyPrice: 899,
      image: '/moto.jpg',
      featured: true,
      specs: {
        weight: '8.5kg',
        gears: '22',
        frame: 'Carbon'
      },
      availability: 'available'
    },
    {
      id: 3,
      name: 'Harley Davidson Street Glide',
      category: 'motorcycle',
      type: 'cruiser',
      dailyPrice: 179,
      weeklyPrice: 999,
      monthlyPrice: 3299,
      image: '/moto.jpg',
      featured: false,
      specs: {
        engine: '1868cc',
        power: '92 HP',
        weight: '385kg'
      },
      availability: 'unavailable'
    },
    {
      id: 4,
      name: 'Specialized Stumpjumper',
      category: 'bicycle',
      type: 'mountain',
      dailyPrice: 35,
      weeklyPrice: 199,
      monthlyPrice: 699,
      image: '/moto.jpg',
      featured: false,
      specs: {
        weight: '13.2kg',
        suspension: '150mm',
        frame: 'Aluminum'
      },
      availability: 'available'
    },
    {
      id: 5,
      name: 'BMW S1000RR',
      category: 'motorcycle',
      type: 'sport',
      dailyPrice: 189,
      weeklyPrice: 1099,
      monthlyPrice: 3699,
      image: '/moto.jpg',
      featured: false,
      specs: {
        engine: '999cc',
        power: '207 HP',
        weight: '197kg'
      },
      availability: 'available'
    }
  ];

  useEffect(() => {
    setIsMounted(true);
    // Simulate loading favorites from localStorage or API
    setFavorites(mockFavorites);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const removeFromFavorites = (productId) => {
    setFavorites(prev => prev.filter(product => product.id !== productId));
    // In a real app, you would also update localStorage/API here
    console.log(`Product ${productId} removed from favorites`);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    // In a real app, you would also update localStorage/API here
    console.log('All favorites cleared');
  };

  const getAvailabilityColor = (status) => {
    return status === 'available' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getAvailabilityText = (status) => {
    return status === 'available' ? 'Available Now' : 'Currently Rented';
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading your favorites...</div>
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#bb00cc] to-purple-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Favorite Rides</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your curated collection of dream motorcycles and bicycles ready for your next adventure
          </p>
        </div>

        {/* Stats and Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#302652]">{favorites.length}</div>
              <div className="text-sm text-gray-600">Total Favorites</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {favorites.filter(fav => fav.availability === 'available').length}
              </div>
              <div className="text-sm text-gray-600">Available Now</div>
            </div>
          </div>

          {favorites.length > 0 && (
            <button
              onClick={clearAllFavorites}
              className="flex items-center space-x-2 px-6 py-3 border-2 border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              <span>Clear All Favorites</span>
            </button>
          )}
        </div>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          // Empty State
          <GlassCard className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="w-24 h-24 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No favorites yet</h3>
              <p className="text-gray-600 mb-8">
                Start building your dream garage by adding some amazing rides to your favorites!
              </p>
              <button
                onClick={() => router.push('/products')}
                className="bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Explore Rentals
              </button>
            </div>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {favorites.map((product) => (
              <GlassCard key={product.id} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="p-6">
                  {/* Header with Image and Actions */}
                  <div className="flex space-x-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900 pr-2">{product.name}</h3>
                        <button
                          onClick={() => removeFromFavorites(product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 hover:scale-110"
                          title="Remove from favorites"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${
                          product.category === 'motorcycle' 
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-green-100 text-green-800 border border-green-200'
                        }`}>
                          {product.category}
                        </span>
                        <span className="text-xs text-gray-600 capitalize bg-gray-100 px-2 py-1 rounded-full border">
                          {product.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                    {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="font-bold text-[#302652]">{value}</div>
                        <div className="text-gray-600 capitalize mt-1">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-[#302652] mb-1">
                      {formatPrice(product.dailyPrice)}<span className="text-sm font-normal text-gray-600">/day</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Weekly: {formatPrice(product.weeklyPrice)}</span>
                      <span>Monthly: {formatPrice(product.monthlyPrice)}</span>
                    </div>
                  </div>

                  {/* Availability and Actions */}
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                      getAvailabilityColor(product.availability)
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        product.availability === 'available' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      {getAvailabilityText(product.availability)}
                    </div>

                    <div className="flex space-x-2">
                        <Link href="/productPage">
                      <button
                       // onClick={() => router.push(`/product/${product.id}`)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium text-sm"
                      >
                        View Details
                      </button>
                      </Link>
                      <button
                        onClick={() => console.log('Rent requested:', product.id)}
                        disabled={product.availability !== 'available'}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          product.availability === 'available'
                            ? 'bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white hover:shadow-lg hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Rent Now
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

      <Footer/>
      </div>
    </div>
  );
}