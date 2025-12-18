"use client";

import { useState, useEffect } from 'react';

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl ${className}`}>
    {children}
  </div>
);

const ConfirmationModal = ({ rental, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    productName: '',
    productType: '',
    price: '',
    startDate: '',
    endDate: '',
    fullName: '',
    address: '',
    phone: '',
    email: '',
    cne: ''
  });

  useEffect(() => {
    if (rental) {
      setFormData(prev => ({
        ...prev,
        productName: rental.productName || '',
        productType: rental.productType || '',
        price: rental.price ? rental.price.toString() : '',
        startDate: rental.startDate ? new Date(rental.startDate).toISOString().split('T')[0] : '',
        endDate: rental.endDate ? new Date(rental.endDate).toISOString().split('T')[0] : '',
      }));
    }
  }, [rental]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission, e.g., send to an API
    console.log("Form Data Submitted:", { rentalId: rental.id, ...formData });
    onSubmit(formData); // Pass data up to parent
    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <GlassCard className="w-full max-w-4xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#302652]">
            Confirmation de la Réservation
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200/50 transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          Veuillez vérifier les détails de la location et remplir vos informations pour finaliser le contrat.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Left Column: Read-only Rental Info as Inputs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#302652] border-b pb-2 mb-4">Détails de la Location</h3>
              
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
                <input
                  type="text" name="productName" id="productName" readOnly
                  value={formData.productName}
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <input
                  type="text" name="productType" id="productType" readOnly
                  value={formData.productType}
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
                <input
                  type="text" name="price" id="price" readOnly
                  value={formData.price ? `${formData.price} €` : ''}
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                <input
                  type="date" name="startDate" id="startDate" readOnly
                  value={formData.startDate}
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                <input
                  type="date" name="endDate" id="endDate" readOnly
                  value={formData.endDate}
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Right Column: User Input Form */}
            <div className="space-y-4">
               <h3 className="text-lg font-semibold text-[#302652] border-b pb-2 mb-4">Vos Informations</h3>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nom et Prénom</label>
                <input
                  type="text" name="fullName" id="fullName" required onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all"
                  placeholder="Ex: Jean Dupont"
                />
              </div>
              
              <div>
                <label htmlFor="cne" className="block text-sm font-medium text-gray-700 mb-1">CNE</label>
                <input
                  type="text" name="cne" id="cne" required onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all"
                  placeholder="Ex: A123456"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adresse Domicile</label>
                <input
                  type="text" name="address" id="address" required onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all"
                  placeholder="123 Rue de la Liberté, Casablanca"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Numéro de Téléphone</label>
                <input
                  type="tel" name="phone" id="phone" required onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all"
                  placeholder="06 00 00 00 00"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse E-mail</label>
                <input
                  type="email" name="email" id="email" required onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all"
                  placeholder="exemple@email.com"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Annuler
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Soumettre et Confirmer
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default ConfirmationModal;
