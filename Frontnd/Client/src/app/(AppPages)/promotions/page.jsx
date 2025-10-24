"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Mock data for rental products with promotions
const promotionalRentals = [
  {
    id: 1,
    name: 'Ducati Panigale V4',
    category: 'motorcycle',
    type: 'sport',
    originalPrice: 299,
    promoPrice: 249,
    discount: 17,
    image: '/moto.jpg',
    featured: true,
    promotion: {
      type: 'flash-sale',
      validUntil: '2024-12-31',
      title: 'Offre Flash',
      description: 'Location à prix réduit pour une durée limitée'
    },
    specs: {
      engine: '1103cc',
      power: '214 HP',
      weight: '175kg'
    },
    rentalPeriod: 'per day'
  },
  {
    id: 2,
    name: 'Trek Domane SL 7',
    category: 'bicycle',
    type: 'road',
    originalPrice: 65,
    promoPrice: 55,
    discount: 15,
    image: '/moto.jpg',
    featured: true,
    promotion: {
      type: 'seasonal',
      validUntil: '2024-07-31',
      title: 'Promotion Saisonnière',
      description: 'Profitez de la belle saison avec nos tarifs spéciaux'
    },
    specs: {
      weight: '8.5kg',
      gears: '22',
      frame: 'Carbon'
    },
    rentalPeriod: 'per day'
  },
  {
    id: 3,
    name: 'Harley Davidson Street Glide',
    category: 'motorcycle',
    type: 'cruiser',
    originalPrice: 259,
    promoPrice: 219,
    discount: 15,
    image: '/moto.jpg',
    featured: false,
    promotion: {
      type: 'weekend-special',
      validUntil: '2024-08-31',
      title: 'Spécial Weekend',
      description: 'Parfait pour vos escapades du weekend'
    },
    specs: {
      engine: '1868cc',
      power: '92 HP',
      weight: '385kg'
    },
    rentalPeriod: 'per day'
  },
  {
    id: 4,
    name: 'Specialized Stumpjumper',
    category: 'bicycle',
    type: 'mountain',
    originalPrice: 39,
    promoPrice: 33,
    discount: 15,
    image: '/moto.jpg',
    featured: false,
    promotion: {
      type: 'weekend-special',
      validUntil: '2024-09-30',
      title: 'Spécial Weekend',
      description: 'Idéal pour vos aventures en montagne'
    },
    specs: {
      weight: '13.2kg',
      suspension: '150mm',
      frame: 'Aluminum'
    },
    rentalPeriod: 'per day'
  },
  {
    id: 5,
    name: 'Yamaha MT-07',
    category: 'motorcycle',
    type: 'naked',
    originalPrice: 86,
    promoPrice: 77,
    discount: 10,
    image: '/moto.jpg',
    featured: false,
    promotion: {
      type: 'new-model',
      validUntil: '2024-10-31',
      title: 'Nouveau Modèle',
      description: 'Découvrez notre dernière acquisition à prix promotionnel'
    },
    specs: {
      engine: '689cc',
      power: '74 HP',
      weight: '184kg'
    },
    rentalPeriod: 'per day'
  },
  {
    id: 6,
    name: 'Giant Defy Advanced 2',
    category: 'bicycle',
    type: 'endurance',
    originalPrice: 33,
    promoPrice: 29,
    discount: 12,
    image: '/moto.jpg',
    featured: false,
    promotion: {
      type: 'demo-rental',
      validUntil: '2024-08-15',
      title: 'Véhicule de Démo',
      description: 'Modèle de démonstration en excellent état'
    },
    specs: {
      weight: '8.9kg',
      gears: '22',
      frame: 'Carbon'
    },
    rentalPeriod: 'per day'
  }
];

const categories = ['Tous', 'motorcycle', 'bicycle'];
const motorcycleTypes = ['Tous', 'sport', 'cruiser', 'naked', 'adventure'];
const bicycleTypes = ['Tous', 'road', 'mountain', 'endurance', 'gravel'];
const promotionTypes = ['Tous', 'flash-sale', 'seasonal', 'weekend-special', 'new-model', 'demo-rental'];

export default function PromotionsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'Tous',
    type: 'Tous',
    promotionType: 'Tous',
    discountRange: 'Tous',
    sortBy: 'discount-high'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setProducts(promotionalRentals);
    setFilteredProducts(promotionalRentals);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'Tous') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Type filter
    if (filters.type !== 'Tous') {
      filtered = filtered.filter(product => product.type === filters.type);
    }

    // Promotion type filter
    if (filters.promotionType !== 'Tous') {
      filtered = filtered.filter(product => product.promotion.type === filters.promotionType);
    }

    // Discount range filter
    if (filters.discountRange !== 'Tous') {
      const ranges = {
        '10+': product => product.discount >= 10 && product.discount < 15,
        '15+': product => product.discount >= 15 && product.discount < 20,
        '20+': product => product.discount >= 20
      };
      if (ranges[filters.discountRange]) {
        filtered = filtered.filter(ranges[filters.discountRange]);
      }
    }

    // Sort
    switch (filters.sortBy) {
      case 'discount-high':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case 'discount-low':
        filtered.sort((a, b) => a.discount - b.discount);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.promoPrice - b.promoPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.promoPrice - a.promoPrice);
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

  const getTypeOptions = () => {
    if (filters.category === 'motorcycle') return motorcycleTypes;
    if (filters.category === 'bicycle') return bicycleTypes;
    return ['Tous'];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getPromotionLabel = (type) => {
    const labels = {
      'flash-sale': 'Offre Flash',
      'seasonal': 'Saisonnier',
      'weekend-special': 'Spécial Weekend',
      'new-model': 'Nouveau Modèle',
      'demo-rental': 'Véhicule de Démo'
    };
    return labels[type] || type;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Chargement...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Locations en Promotion
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Profitez de nos offres spéciales sur la location de motos et vélos. Des tarifs réduits pour des aventures inoubliables.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Rechercher un véhicule en promotion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-[#bb00cc] transition-all duration-200"
              />
              <svg className="w-5 h-5 text-gray-400 absolute right-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#bb00cc] focus:border-[#bb00cc] text-sm"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'Tous' ? 'Toutes catégories' : 
                     category === 'motorcycle' ? 'Motos' : 'Vélos'}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#bb00cc] focus:border-[#bb00cc] text-sm"
              >
                {getTypeOptions().map(type => (
                  <option key={type} value={type}>
                    {type === 'Tous' ? 'Tous types' : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Promotion Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type de promotion</label>
              <select
                value={filters.promotionType}
                onChange={(e) => handleFilterChange('promotionType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#bb00cc] focus:border-[#bb00cc] text-sm"
              >
                {promotionTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'Tous' ? 'Toutes promotions' : getPromotionLabel(type)}
                  </option>
                ))}
              </select>
            </div>

            {/* Discount Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Réduction</label>
              <select
                value={filters.discountRange}
                onChange={(e) => handleFilterChange('discountRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#bb00cc] focus:border-[#bb00cc] text-sm"
              >
                <option value="Tous">Toutes réductions</option>
                <option value="10+">10% et plus</option>
                <option value="15+">15% et plus</option>
                <option value="20+">20% et plus</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trier par</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#bb00cc] focus:border-[#bb00cc] text-sm"
              >
                <option value="discount-high">Réduction élevée</option>
                <option value="discount-low">Réduction faible</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
                <option value="name">Nom A-Z</option>
              </select>
            </div>
          </div>

          {/* Results Count & Reset */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filteredProducts.length}</span> véhicule(s) en promotion
            </p>
            {(filters.category !== 'Tous' || filters.type !== 'Tous' || filters.promotionType !== 'Tous' || filters.discountRange !== 'Tous' || searchTerm) && (
              <button
                onClick={() => {
                  setFilters({
                    category: 'Tous',
                    type: 'Tous',
                    promotionType: 'Tous',
                    discountRange: 'Tous',
                    sortBy: 'discount-high'
                  });
                  setSearchTerm('');
                }}
                className="text-sm text-[#bb00cc] hover:text-purple-700 font-medium"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Rental Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun véhicule trouvé</h3>
            <p className="text-gray-600 mb-6">Aucun véhicule ne correspond à vos critères de recherche.</p>
            <button
              onClick={() => {
                setFilters({
                  category: 'Tous',
                  type: 'Tous',
                  promotionType: 'Tous',
                  discountRange: 'Tous',
                  sortBy: 'discount-high'
                });
                setSearchTerm('');
              }}
              className="bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white px-6 py-2 rounded-md hover:shadow-lg transition-all duration-300 font-medium"
            >
              Voir toutes les promotions
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{product.discount}%
                    </span>
                  </div>

                  {/* Promotion Type */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-medium border">
                      {product.promotion.title}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      product.category === 'motorcycle' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.category === 'motorcycle' ? 'Moto' : 'Vélo'}
                    </span>
                  </div>
                </div>
                
                {/* Product Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 pr-2">
                      {product.name}
                    </h3>
                    <span className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                      {product.type}
                    </span>
                  </div>

                  {/* Rental Price Section */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(product.promoPrice)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-sm text-gray-500">/jour</span>
                    </div>
                    <p className="text-sm text-green-600 font-medium">
                      Économisez {formatPrice(product.originalPrice - product.promoPrice)}/jour
                    </p>
                  </div>

                  {/* Specifications */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="text-center p-2 bg-gray-50 rounded border">
                        <div className="font-semibold text-gray-900">{value}</div>
                        <div className="text-xs text-gray-600 capitalize mt-1">
                          {key === 'engine' ? 'moteur' : 
                           key === 'power' ? 'puissance' : 
                           key === 'weight' ? 'poids' : 
                           key === 'gears' ? 'vitesses' : 
                           key === 'frame' ? 'cadre' : 
                           key === 'suspension' ? 'suspension' : key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promotion Information */}
                  <div className="border-l-4 border-[#bb00cc] bg-purple-50 rounded-r-md p-3 mb-4">
                    <div className="space-y-2 text-sm">
                      <div className="font-semibold text-purple-900">
                        {product.promotion.title}
                      </div>
                      <p className="text-purple-700">
                        {product.promotion.description}
                      </p>
                      <div className="flex items-center text-purple-600 pt-2 border-t border-purple-200">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>Valable jusqu'au {formatDate(product.promotion.validUntil)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link href="/products" className="flex-1">
                      <button className="w-full bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white py-3 px-4 rounded-md hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium text-sm">
                        Louer maintenant
                      </button>
                    </Link>
                    <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
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
  );
}