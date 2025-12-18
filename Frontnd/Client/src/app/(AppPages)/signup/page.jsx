'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Assurez-vous que le chemin vers registerUser est correct pour votre structure
import { registerUser } from '../../services/authService'; 

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState('');

  // --- 1. Gestionnaire de Changement (Corrige la ReferenceError) ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Efface l'erreur du champ dès que l'utilisateur commence à taper
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  // --- 2. Validation du Formulaire ---
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nom.trim()) {
      newErrors.nom = 'Nom complet est requis';
    }
    
    if (!formData.email) {
      newErrors.email = "L'adresse e-mail est requise";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'adresse e-mail est invalide";
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir des majuscules, des minuscules et des chiffres';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- 3. Gestionnaire de Soumission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupError(''); // Réinitialise l'erreur d'inscription précédente
    
    if (validateForm()) {
      try {
        await registerUser({
          nom: formData.nom,
          email: formData.email,
          password: formData.password,
        });
        // Redirection après succès
        router.push('/login'); 
      } catch (error) {
        // Gérer l'erreur de l'API (ex: 409 Conflict - Utilisateur déjà existant)
        const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription.';
        setSignupError(errorMessage);
      }
    }
  };

  // --- 4. Rendu JSX (Syntaxe corrigée) ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#302652]">Créer un compte</h1>
            <p className="text-gray-600 mt-2">Rejoignez notre communauté de passionnés dès aujourd'hui</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {signupError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{signupError}</span>
              </div>
            )}
            
            {/* Champ Nom Complet */}
            <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input
                  id="nom"
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all ${
                    errors.nom ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Votre nom complet"
                  required
                />
                {errors.nom && (
                  <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
                )}
              </div>

            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse e-mail
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                                  onChange={handleChange}                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Entrez votre adresse e-mail"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Champ Mot de Passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                                  onChange={handleChange}                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Créez un mot de passe"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#bb00cc] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#a500b8] transition-all duration-200 text-lg"
            >
              Créer un compte
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Vous avez déjà un compte ?{' '}
              <a href="/login" className="text-[#bb00cc] font-semibold hover:text-[#302652] transition-colors">
                Connectez-vous ici
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="w-64 h-64 mx-auto mb-8 bg-[#bb00cc] bg-opacity-10 rounded-full flex items-center justify-center">
            <svg className="w-32 h-32 text-[#bb00cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#302652] mb-4">Commencez votre aventure à vélo !</h2>
          <p className="text-gray-600 text-lg mb-6">
            Rejoignez des milliers de cyclistes qui nous font confiance pour leurs besoins en moto et vélo.
          </p>
          
          {/* Benefits List */}
          <div className="space-y-4 text-left">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-[#bb00cc] bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-[#bb00cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-gray-700">Remises exclusives pour les membres</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-[#bb00cc] bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-[#bb00cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-gray-700">Accès anticipé aux nouveautés</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-[#bb00cc] bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-[#bb00cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-gray-700">Recommandations personnalisées</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-[#bb00cc] bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-[#bb00cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-gray-700">Support client 24h/24 et 7j/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}