"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext'; // Import useAuth

// Importez votre service API (assurez-vous que le chemin est correct)
import { getProductById, getProducts } from '@/app/services/productService'; 

// Importez le nouveau composant Modale
import RentalModal from '@/app/components/RentalModal'; 

// --- Composant de style GlassCard ---
import { GlassCard } from '@/components/ui/GlassCard.jsx';

export default function ProductDetailPage({ params }) {
  const actualParams = use(params);  
  const router = useRouter();
  const { user, isLoggedIn } = useAuth(); // Get user and login status

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFavoriteMessage, setShowFavoriteMessage] = useState(false);
  
  // NOUVEL ÉTAT pour la modale de location
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false); 
   console.log();
  useEffect(() => {
    if (actualParams.id) {
      const fetchProduct = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const productData = await getProductById(actualParams.id);
          setProduct(productData);

          // Fetch related products
          const allProducts = await getProducts();
          // Filter out the current product and take a few
          const related = allProducts.filter(p => p.id !== productData.id).slice(0, 3);
          setRelatedProducts(related);

        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    }
  }, [actualParams.id]);

  useEffect(() => {
    if (showFavoriteMessage) {
      const timer = setTimeout(() => {
        setShowFavoriteMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showFavoriteMessage]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      setShowFavoriteMessage(true);
    }
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MAD', 
      minimumFractionDigits: 0
    }).format(price);
  };

  // --- Fonctions de gestion de la Modale ---
  const handleOpenRentalModal = () => {
      if (!isLoggedIn) {
          router.push('/login');
          return;
      }
      setIsRentalModalOpen(true);
  };

  const handleCloseRentalModal = () => {
      setIsRentalModalOpen(false);
  };

  // --- Affichage du Loading et de l'Erreur ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex justify-center items-center">
        <div className="text-lg text-gray-600">Chargement du produit...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex justify-center items-center">
        <div className="text-lg text-red-500">{error || "Produit non trouvé."}</div>
      </div>
    );
  }

  // Adapt to the new data structure
  const images = product.image ? [product.image, product.image, product.image, product.image] : []; // Replicate image for gallery
  
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
            Retour
          </button>
        </div>
      </nav>

      {/* Favorite Message */}
      {showFavoriteMessage && (
        <div className="fixed top-20 right-4 z-50">
          <GlassCard className="p-4 border-green-200 bg-green-50/80">
            <span className="text-green-800 font-medium">Ajouté aux favoris !</span>
          </GlassCard>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <GlassCard className="overflow-hidden">
              <img src={images[selectedImage]} alt={product.nameProducts} className="w-full h-full object-cover"/>
            </GlassCard>
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, index) => (
                <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-square overflow-hidden rounded-xl border-2 ${selectedImage === index ? 'border-[#bb00cc]' : 'border-gray-200'}`}>
                  <img src={img} alt={`${product.nameProducts} vue ${index + 1}`} className="w-full h-full object-cover"/>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info & Rental */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold border border-blue-200 mb-3">
                {product.category?.name}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.nameProducts}</h1>
              <p className="text-gray-700 text-lg leading-relaxed">{product.pureList}</p>
            </div>

            {/* Zone de Location */}
            <div className="bg-gradient-to-r from-[#302652] to-[#1a1a2e] p-6 rounded-2xl text-white">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg">Prix estimé par jour :</span>
                    <span className="text-3xl font-bold">{formatPrice(product.stack)}</span>
                </div>
                {/* Nouveau Bouton qui ouvre la modale */}
                <button 
                    onClick={handleOpenRentalModal} 
                    className="w-full py-4 px-8 rounded-xl font-bold shadow-lg 
                               bg-gradient-to-r from-[#bb00cc] to-purple-600 
                               hover:shadow-xl hover:scale-105 transition duration-300"
                >
                    Réserver maintenant
                </button>
            </div>
            
            {/* Détails du Produit */}
            {product.reference && (
                 <GlassCard className="p-6">
                    <h4 className="font-semibold text-[#302652] mb-3">Détails</h4>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Référence:</span>
                        <span className="font-semibold text-[#302652]">{product.reference}</span>
                    </div>
                     <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Type:</span>
                        <span className="font-semibold text-[#302652]">{product.type}</span>
                    </div>
                </GlassCard>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
            <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Autres véhicules disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProd) => (
                <div key={relatedProd.id} className="group bg-white rounded-2xl shadow-lg">
                   <img src={relatedProd.image} alt={relatedProd.nameProducts} className="w-full h-48 object-cover rounded-t-2xl"/>
                   <div className="p-6">
                     <h3 className="text-xl font-bold text-gray-900 mb-2">{relatedProd.nameProducts}</h3>
                     <div className="flex justify-between items-center mt-4">
                        <span className="text-2xl font-bold text-[#302652]">{formatPrice(relatedProd.stack)}</span>
                        <Link href={`/productPage/${relatedProd.id}`} className="bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white px-6 py-2 rounded-xl font-bold">
                            Voir
                          </Link>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* La Modale de Location */}
      {isRentalModalOpen && (
          <RentalModal 
              product={product} 
              userId={user?.id} // Pass the actual user ID
              onClose={handleCloseRentalModal} 
          />
      )}
    </div>
  );
}