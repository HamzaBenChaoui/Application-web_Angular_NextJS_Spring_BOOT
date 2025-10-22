'use client';

import { useState } from 'react';
import { XMarkIcon, CreditCardIcon, LockClosedIcon } from '@heroicons/react/24/solid';

export default function CheckoutModal({ isOpen, onClose, totalAmount = 85 }) {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ cardName, cardNumber, expDate, cvc });
    alert('Traitement du paiement...');
    setCardName('');
    setCardNumber('');
    setExpDate('');
    setCvc('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-white p-10 shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Titre */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <CreditCardIcon className="h-6 w-6 text-blue-600" />
            Détails de paiement
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Entrez vos informations pour finaliser votre commande.
          </p>
        </div>

        {/* Résumé montant */}
        <div className="mb-6 rounded-lg border bg-gray-50 p-4">
          <div className="flex justify-between text-gray-700 text-base font-medium">
            <span>Total à payer</span>
            <span className="text-blue-700 font-semibold">{totalAmount.toFixed(2)} €</span>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom */}
          <div>
            <label
              htmlFor="cardName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nom sur la carte
            </label>
            <input
              type="text"
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Jean Dupont"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Numéro */}
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Numéro de carte
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="0000 0000 0000 0000"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Expiration & CVC */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="expDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Expiration
              </label>
              <input
                type="text"
                id="expDate"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                placeholder="MM/AA"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="cvc"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="123"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Bouton de paiement */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            <LockClosedIcon className="h-5 w-5 text-white/90" />
            <span>Payer {totalAmount.toFixed(2)} € maintenant</span>
          </button>
        </form>

        {/* Texte sécurisé */}
        <p className="mt-5 text-xs text-gray-500 text-center flex items-center justify-center gap-1">
          <LockClosedIcon className="h-4 w-4 text-gray-400" />
          Paiement sécurisé via connexion chiffrée
        </p>
      </div>
    </div>
  );
}
