"use client";

import Link from 'next/link';
import { getProducts } from '@/app/services/productService';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '../../components/footer/Footer';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';



// Données ne sont plus fictives, elles proviennent de l'API

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);

// Composant Curseur de Plage de Prix
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
    <div className="space-y-3">
      {/* Affichage du Prix */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Plage de prix</span>
        <span className="text-base font-bold text-[#302652]">
          ${localValue.toLocaleString()}
        </span>
      </div>

      {/* Conteneur du Curseur */}
      <div className="relative py-2">
        {/* Arrière-plan de la piste */}
        <div className="h-1.5 bg-gray-200 rounded-full relative">
          {/* Piste remplie */}
          <div 
            className="h-1.5 bg-gradient-to-r from-[#bb00cc] to-purple-600 rounded-full absolute top-0 left-0 transition-all duration-200"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Input Curseur - Caché mais fonctionnel */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={localValue}
          onChange={handleChange}
          className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 opacity-0 cursor-pointer z-20"
        />
        
        {/* Curseur personnalisé - Positionné correctement */}
        <div 
          className="absolute top-1/2 w-4 h-4 bg-white border-2 border-[#bb00cc] rounded-full shadow-lg transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-200 z-10"
          style={{ 
            left: `calc(${percentage}% - 8px)`
          }}
        />
      </div>

      {/* Labels Min/Max */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>${minPrice.toLocaleString()}</span>
        <span>${maxPrice.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default function ProductsPage() {
  const { isLoggedIn, isLoading, favorites, addFavorite, removeFavorite } = useAuth(); // Get auth and favorites state
  const router = useRouter(); // Get router for redirection
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    type: 'Tous',
    priceRange: 25000,
    sortBy: 'featured',
    status: searchParams.get('status') || null,
    available: searchParams.get('available') || null
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [errorLoadingProducts, setErrorLoadingProducts] = useState(null);

  // A set of favorite IDs for quick lookups
  const likedProductIds = new Set(favorites.map(p => p.id));

  useEffect(() => {
    // Wait until auth check is complete
    if (isLoading) {
      return;
    }

    // Redirect if not logged in
    if (!isLoggedIn) {
      router.push('/login');
      return; // Stop further execution
    }

    const fetchProductsData = async () => {
      setIsLoadingProducts(true);
      setErrorLoadingProducts(null);
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
        
        const maxPrice = Math.max(...data.map(product => product.stack));
        const defaultMaxPrice = Math.ceil(maxPrice / 1000) * 1000;
        
        setFilters(prev => ({
          ...prev,
          priceRange: defaultMaxPrice
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrorLoadingProducts("Impossible de charger les produits.");
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProductsData();
  }, [isLoggedIn, isLoading, router]); // Re-run effect if auth state changes

  // ... (existing isLoadingProducts and errorLoadingProducts checks)


  useEffect(() => {
    if (isLoadingProducts) return;
    
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status) {
      // Assurez-vous que le produit a un statut, puis comparez en MAJUSCULES
      filtered = filtered.filter(product => {
        return product.status && product.status.toUpperCase() === filters.status;
      });
    }

    // **Optionnellement, pour le filtre de catégorie :**
    // NOUVEAU : product.categoryName
      if (filters.category !== 'all') {
        filtered = filtered.filter(product => product.categoryName && product.categoryName.toUpperCase() === filters.category);
      }

    if (filters.available) {
      filtered = filtered.filter(product => String(product.available) === filters.available);
    }

    if (filters.type !== 'Tous') {
      filtered = filtered.filter(product => product.type === filters.type);
    }

    filtered = filtered.filter(product => product.stack <= filters.priceRange);

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.stack - b.stack);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.stack - a.stack);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [filters, searchTerm, products, isLoadingProducts]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700">Vérification de l'authentification...</p>
      </div>
    );
  }

  // ... (rest of the component, including the return statement with the conditional rendering)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700">Redirection vers la page de connexion...</p>
      </div>
    );
  }

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

  const toggleLike = (product) => {
    if (likedProductIds.has(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const getTypeOptions = () => {
    if (filters.category === 'all') {
      const allTypes = products.map(p => p.type).filter((value, index, self) => self.indexOf(value) === index);
      return ['Tous', ...allTypes];
    }
    // NOUVEAU : Utilisation dans getTypeOptions
    const typesForCategory = products
      .filter(p => p.categoryName === filters.category) // <--- CORRIGÉ
      .map(p => p.type)
      .filter((value, index, self) => self.indexOf(value) === index);
    return ['Tous', ...typesForCategory];
      };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (isLoadingProducts) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Chargement des produits...</div>
          </div>
        </div>
      </div>
    );
  }

  if (errorLoadingProducts) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64 text-red-500">
            <div className="text-lg">{errorLoadingProducts}</div>
          </div>
        </div>
      </div>
    );
  }
console.log(products);
  // Calculer les prix min et max, en gérant le cas où le tableau des produits est vide
  const minPrice = 0;
  const maxPrice = products.length > 0 ? Math.max(...products.map(product => product.stack)) : 0;
  const defaultMaxPrice = products.length > 0 ? Math.ceil(maxPrice / 1000) * 1000 : 1000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Section Hero */}
      <div className="relative bg-gradient-to-r from-[#302652] to-[#1a1a2e] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #bb00cc 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Trouvez Votre Véhicule Idéal
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre collection premium de motos et vélos pour chaque aventure
          </p>
        </div>
      </div>



      {/* Filtres et Produits */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Grille de Produits - Maintenant à gauche */}
          <div className="flex-1">
            {/* En-tête des Résultats */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-600 text-lg font-medium">
                Affichage de <span className="text-[#302652] font-bold">{filteredProducts.length}</span> sur{" "}
                <span className="text-[#302652] font-bold">{products.length}</span> produits
              </p>
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 font-medium">Vue :</span>
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

            {/* Séparateur */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#bb00cc] to-transparent my-8" />

            {/* Produits */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Aucun produit trouvé</h3>
                <p className="text-gray-600 text-lg">Essayez d'ajuster vos filtres pour voir plus de résultats.</p>
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
                    {/* Section Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {product.featured && (
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          En Vedette
                        </span>
                      )}
                      
                      <span className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-[#302652] capitalize shadow-lg">
                        {product.type}
                      </span>
                    </div>
                    
                    {/* Section Contenu */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900 pr-2 line-clamp-2 flex-1">
                          {product.nameProducts}
                        </h3>
                        <span className="text-2xl font-bold text-[#302652] whitespace-nowrap ml-2">
                          {formatPrice(product.stack)}
                        </span>
                      </div>
                      
                    

                      <div className="grid grid-cols-3 gap-2 mb-6 text-sm">
                        {product.specs && Object.entries(product.specs).map(([key, value]) => (
                          <div key={key} className="text-center p-2 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="font-bold text-[#302652]">{value}</div>
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

                      <div className="flex space-x-3 mt-auto pt-4">
                        <Link href={`/productPage/${product.id}`} >
                        <button className="flex-1 bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white py-3 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                          Voir les Détails
                        </button>
                        </Link>
                        <button
                          className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 flex items-center justify-center"
                          onClick={() => toggleLike(product)}
                        >
                          <svg
                            className={`w-6 h-6 transition-all duration-300 ${
                              likedProductIds.has(product.id)
                                ? 'text-red-500 fill-red-500 scale-110'
                                : 'text-gray-600 hover:text-red-500'
                            }`}
                            fill={likedProductIds.has(product.id) ? "currentColor" : "none"}
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

          {/* Barre latérale des Filtres - Maintenant à droite et plus petite */}
          <div className="lg:w-64 space-y-4">
            {/* Recherche */}
        

            {/* Filtre Catégorie */}
      
            
            {/* Filtre Statut */}
            <GlassCard className="p-4">
              <h3 className="font-semibold text-[#302652] mb-3 text-base">État</h3>
              <div className="space-y-2">
                {['all', 'ACTIVE', 'INACTIVE'].map((status) => (
                  <label key={status} className="flex items-center group cursor-pointer transition-all duration-200 hover:translate-x-1">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={filters.status === status || (status === 'all' && !filters.status)}
                      onChange={(e) => handleFilterChange('status', e.target.value === 'all' ? null : e.target.value)}
                      className="w-3.5 h-3.5 text-[#bb00cc] border-gray-300 focus:ring-[#bb00cc]"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize font-medium group-hover:text-[#302652] transition-colors">
                      {status === 'all' ? 'Tous les états' : 
                       status === 'ACTIVE' ? 'Actif' : 'Inactif'}
                    </span>
                  </label>
                ))}
              </div>
            </GlassCard>

            {/* Filtre Disponibilité */}
            <GlassCard className="p-4">
                <label className="flex items-center group cursor-pointer transition-all duration-200">
                    <input
                        type="checkbox"
                        checked={!!filters.available}
                        onChange={(e) => handleFilterChange('available', e.target.checked ? 'true' : false)}
                        className="w-4 h-4 text-[#bb00cc] border-gray-300 rounded focus:ring-[#bb00cc]"
                    />
                    <span className="ml-2 text-sm text-gray-700 font-medium group-hover:text-[#302652] transition-colors">
                        Disponible maintenant
                    </span>
                </label>
            </GlassCard>

            {/* Filtre Type */}
            <GlassCard className="p-4">
              <h3 className="font-semibold text-[#302652] mb-3 text-base">Type</h3>
              <div className="space-y-2">
                {getTypeOptions().map((type) => (
                  <label key={type} className="flex items-center group cursor-pointer transition-all duration-200 hover:translate-x-1">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={filters.type === type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      className="w-3.5 h-3.5 text-[#bb00cc] border-gray-300 focus:ring-[#bb00cc]"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize font-medium group-hover:text-[#302652] transition-colors">
                      {type === 'All' ? 'Tous' : 
                       type === 'sport' ? 'sport' :
                       type === 'cruiser' ? 'cruiser' :
                       type === 'naked' ? 'naked' :
                       type === 'adventure' ? 'aventure' :
                       type === 'road' ? 'route' :
                       type === 'mountain' ? 'montagne' :
                       type === 'endurance' ? 'endurance' :
                       type === 'gravel' ? 'gravel' : type}
                    </span>
                  </label>
                ))}
              </div>
            </GlassCard>

            {/* Curseur de Plage de Prix */}
            <GlassCard className="p-4">
              <h3 className="font-semibold text-[#302652] mb-3 text-base">Plage de prix</h3>
              <PriceRangeSlider
                minPrice={minPrice}
                maxPrice={defaultMaxPrice}
                value={filters.priceRange}
                onChange={handlePriceRangeChange}
              />
              <div className="mt-3 text-center">
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  Jusqu'à {formatPrice(filters.priceRange)}
                </span>
              </div>
            </GlassCard>

            {/* Trier par */}
            <GlassCard className="p-4">
              <h3 className="font-semibold text-[#302652] mb-3 text-base">Trier par</h3>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white/70 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all duration-200"
              >
                <option value="featured">En vedette</option>
                <option value="price-low">Prix : Croissant</option>
                <option value="price-high">Prix : Décroissant</option>
              </select>
            </GlassCard>
          </div>
        </div>
      </div>
     
    </div>
  );
}