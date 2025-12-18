"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { getRentals } from '@/app/services/rentalService';
import { getProductById } from '@/app/services/productService';
import Link from 'next/link';
import ConfirmationModal from '../../components/ConfirmationModal';
import { requestAllocation } from '@/app/services/allocationService';

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg ${className}`}>
    {children}
  </div>
);

export default function BookingsPage() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading: isAuthLoading } = useAuth();
  
  const [rentals, setRentals] = useState([]);
  const [isRentalsLoading, setIsRentalsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the modal and detail fetching
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  useEffect(() => {
    // Wait for authentication check to complete
    if (isAuthLoading) {
      return;
    }

    // Redirect if not logged in
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    if (user?.id) {
      const fetchUserRentals = async () => {
        setIsRentalsLoading(true);
        setError(null);
        try {
          // The backend now filters by userId, so we pass it directly.
          const userRentals = await getRentals(user.id);
          setRentals(userRentals);
        } catch (err) {
          console.error("Failed to fetch rentals:", err);
          setError("Impossible de charger vos réservations.");
        } finally {
          setIsRentalsLoading(false);
        }
      };
      fetchUserRentals();
    } else {
      // If there's no user ID even after auth check, stop loading.
      setIsRentalsLoading(false);
    }
  }, [isAuthLoading, isLoggedIn, user, router]);

  const handleOpenModal = async (rental) => {
    setIsFetchingDetails(true);
    try {
      const productDetails = await getProductById(rental.productId);
      
      const rentalDetails = {
        ...rental,
        productName: productDetails.nameProducts,
        productType: productDetails.type,
        price: productDetails.stack, // Assuming 'stack' is the price
      };

      setSelectedRental(rentalDetails);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch product details for modal:", err);
      alert("Impossible de charger les détails du produit. Veuillez réessayer.");
    } finally {
      setIsFetchingDetails(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRental(null);
  };

  const handleFormSubmit = async (formData) => {
    if (!selectedRental) {
      console.error("No rental selected for allocation request.");
      return;
    }

    const requestData = {
      rentalId: selectedRental.id,
      ...formData
    };

    try {
      const result = await requestAllocation(requestData);
      console.log("Allocation request successful:", result);
      alert("Votre demande de contrat a été soumise avec succès !");
      handleCloseModal(); // Close modal on success
    } catch (error) {
      console.error("Allocation request failed:", error);
      alert("Échec de la soumission de la demande de contrat. Veuillez réessayer.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'FINISHED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  if (isAuthLoading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <p className="text-lg text-gray-700">Vérification de l'authentification...</p>
        </div>
    );
  }

  if (!isLoggedIn) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <p className="text-lg text-gray-700">Redirection vers la page de connexion...</p>
          </div>
      );
  }

  if (isRentalsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Chargement de vos réservations...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#bb00cc] rounded-full mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Mes Réservations</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Retrouvez ici l'historique de toutes vos locations passées et actuelles.
            </p>
          </div>

          {/* Bookings List */}
          {rentals.length === 0 ? (
            <GlassCard className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Aucune réservation trouvée</h3>
                <p className="text-gray-600 mb-8">
                  Vous n'avez pas encore effectué de location.
                </p>
                <button
                  onClick={() => router.push('/products')}
                  className="bg-[#bb00cc] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Découvrir les véhicules
                </button>
              </div>
            </GlassCard>
          ) : (
            <div className="space-y-4">
              {rentals.map((rental) => (
                <GlassCard key={rental.id} className="p-4 md:p-6 group hover:shadow-xl transition-shadow duration-300">
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
                    <div className="md:col-span-2">
                      <p className="font-bold text-lg text-gray-900">Produit ID: {rental.productId}</p>
                      <p className="text-sm text-gray-600">Référence: {rental.productReference || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Début</p>
                      <p className="font-medium text-gray-800">{new Date(rental.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fin</p>
                      <p className="font-medium text-gray-800">{rental.endDate ? new Date(rental.endDate).toLocaleDateString() : 'En cours'}</p>
                    </div>
                    <div className="text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(rental.status)}`}>
                          {rental.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <button 
                        className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-400"
                        onClick={() => handleOpenModal(rental)}
                        disabled={isFetchingDetails}
                      >
                        {isFetchingDetails ? 'Chargement...' : 'Confirmer'}
                      </button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        rental={selectedRental}
      />
    </>
  );
}