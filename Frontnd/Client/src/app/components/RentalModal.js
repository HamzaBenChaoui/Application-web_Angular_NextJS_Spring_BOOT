// components/RentalModal.js
"use client";

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard.jsx';
import { FaCalendarAlt, FaMotorcycle, FaTimes, FaSpinner, FaCheckCircle } from 'react-icons/fa';

import { rentProduct } from '@/app/services/rentalService';

const RentalModal = ({ product, userId, onClose }) => {
    const today = new Date().toISOString().split('T')[0];
    
    // État pour les dates (pour future extension de la logique de disponibilité/prix)
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState('');
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    // Fonction de formatage du prix pour cohérence
    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'MAD', 
            minimumFractionDigits: 0
        }).format(price);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation basique des dates
        if (!startDate || !endDate) {
            setSubmissionError("Les dates de début et de fin sont requises.");
            return;
        }
        if (new Date(startDate) < new Date(today)) {
             setSubmissionError("La date de début ne peut pas être dans le passé.");
             return;
        }

        setIsSubmitting(true);
        setSubmissionError(null);
        setSubmissionSuccess(false);

        const rentalRequestDTO = {
            productId: product.id,
            userId: userId, 
            startDate: startDate, 
            endDate: endDate,
        };

        console.log("Submitting rental DTO:", rentalRequestDTO); // For debugging

        try {
            await rentProduct(rentalRequestDTO);
            setSubmissionSuccess(true);
            // Fermer après un court délai
            setTimeout(onClose, 2500); 

        } catch (error) {
            console.error("Rental error:", error);
            if (error.message === "PRODUCT_UNAVAILABLE") {
                setSubmissionError("Ce produit n'est pas disponible pour la location. Il a peut-être déjà été réservé.");
            } else if (error.message === "FORBIDDEN") {
                setSubmissionError("Vous n'êtes pas autorisé à effectuer cette action. Veuillez vous reconnecter et réessayer.");
            } else {
                setSubmissionError("Une erreur inconnue est survenue lors de la location.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submissionSuccess) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
                <GlassCard className="p-8 max-w-lg w-full text-center border-green-300 bg-green-50/90">
                    <FaCheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-green-800 mb-3">Location Réussie !</h2>
                    <p className="text-gray-700">
                        Votre demande de location pour le **{product.nameProducts}** a été enregistrée. 
                    </p>
                    <button 
                        onClick={onClose} 
                        className="mt-6 py-2 px-6 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition"
                    >
                        Fermer
                    </button>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
            <GlassCard className="p-8 max-w-2xl w-full relative">
                
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition"
                >
                    <FaTimes className="w-6 h-6" />
                </button>

                <h2 className="text-3xl font-bold text-[#302652] mb-6 border-b pb-3">
                    <FaCalendarAlt className="inline-block mr-3" />
                    Réserver votre {product.category?.name}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Récapitulatif du Produit */}
                    <div className="flex items-center space-x-4 p-4 border rounded-xl bg-gray-50">
                        <img src={product.image} alt={product.nameProducts} className="w-20 h-20 object-cover rounded-lg"/>
                        <div>
                            <p className="font-semibold text-xl text-gray-900">{product.nameProducts}</p>
                            <p className="text-sm text-gray-600">Référence: {product.reference}</p>
                        </div>
                        <div className="ml-auto text-right">
                             <span className="text-2xl font-bold text-[#bb00cc]">{formatPrice(product.stack)}</span>
                             <span className="block text-sm text-gray-500"> / jour (est.)</span>
                        </div>
                    </div>

                    {/* Sélecteurs de Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Date de Début Souhaitée</label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                min={today}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#bb00cc] focus:border-[#bb00cc]"
                            />
                        </div>
                         <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Date de Fin Prévue</label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                min={startDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#bb00cc] focus:border-[#bb00cc]"
                            />
                        </div>
                    </div>
                    
                    {/* Message d'erreur */}
                    {submissionError && (
                        <div className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg font-medium">
                            Erreur: {submissionError}
                        </div>
                    )}

                    {/* Bouton de Soumission */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-8 rounded-xl font-bold shadow-lg 
                                   bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white 
                                   hover:shadow-xl hover:scale-[1.01] transition duration-300 
                                   disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {isSubmitting ? (
                            <><FaSpinner className="animate-spin mr-3" /> Traitement...</>
                        ) : (
                            <>Confirmer la Demande de Location</>
                        )}
                    </button>
                </form>

            </GlassCard>
        </div>
    );
};

export default RentalModal;