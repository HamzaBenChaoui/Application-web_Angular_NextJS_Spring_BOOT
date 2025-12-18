"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-lg ${className}`}>
    {children}
  </div>
);



export default function ProfilePage() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize with mock data structure, but empty values for personal info
  const [userData, setUserData] = useState({
    personalInfo: {
      fullName: '', // Will be mapped from 'nom'
      email: '',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1990-05-15',
      address: '123 Main Street, City, State 12345'
    },
    preferences: {
      favoriteCategory: 'motorcycle',
      notificationEmail: true,
      notificationSMS: false,
      newsletter: true,
      language: 'french' // Default to French
    },
    stats: {
      totalRentals: 12,
      favoriteType: 'Sport Motorcycles',
      memberSince: '2022-03-15',
      loyaltyPoints: 2450
    },
    recentActivity: [
      { id: 1, type: 'rental', description: 'Ducati Panigale V4 rental', date: '2024-01-15', status: 'completed' },
      { id: 2, type: 'favorite', description: 'Added BMW S1000RR to favorites', date: '2024-01-12', status: 'active' },
      { id: 3, type: 'review', description: 'Posted a review for Trek Domane', date: '2024-01-10', status: 'completed' },
      { id: 4, type: 'rental', description: 'Harley Davidson Street Glide', date: '2024-01-08', status: 'completed' }
    ]
  });
  
  useEffect(() => {
    setIsMounted(true);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (user) {
      setUserData(prevData => ({
        ...prevData,
        personalInfo: {
          ...prevData.personalInfo,
          fullName: user.nom || '', // Use 'nom' for fullName
          email: user.email || '',
        }
      }));
    }
  }, [user]);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to API here
    console.log('Saving user data:', { nom: userData.personalInfo.fullName, email: userData.personalInfo.email });
  };
  


  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isMounted || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Chargement du profil...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#302652] to-[#1a1a2e] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#bb00cc] to-purple-600 rounded-full mb-6 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Bienvenue, {userData.personalInfo.fullName}! 👋</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Gérez votre profil, suivez vos locations et personnalisez votre expérience RideHub
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6 sticky top-8">
              <nav className="space-y-2">
                {[
                  { id: 'profile', label: 'Informations du profil', icon: '👤' },
                  { id: 'preferences', label: 'Préférences', icon: '⚙️' },
                  { id: 'rentals', label: 'Mes locations', icon: '🏍️' },
                  { id: 'favorites', label: 'Mes favoris', icon: '❤️' },
                  { id: 'security', label: 'Sécurité', icon: '🔒' },
                  { id: 'billing', label: 'Facturation et paiements', icon: '💳' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#bb00cc]/10 to-purple-600/10 text-[#302652] border border-[#bb00cc]/20'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Statistiques rapides</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total des locations</span>
                    <span className="font-bold text-[#302652]">{userData.stats.totalRentals}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Points de fidélité</span>
                    <span className="font-bold text-[#302652]">{userData.stats.loyaltyPoints}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Membre depuis</span>
                    <span className="font-bold text-[#302652]">{new Date(userData.stats.memberSince).getFullYear()}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Information Tab */}
            {activeTab === 'profile' && (
              <GlassCard className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Informations du profil</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    <span>{isEditing ? 'Annuler la modification' : 'Modifier le profil'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={userData.personalInfo.fullName}
                        onChange={(e) => setUserData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [e.target.name]: e.target.value } }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                        {userData.personalInfo.fullName}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={userData.personalInfo.email}
                        onChange={(e) => setUserData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [e.target.name]: e.target.value } }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                        {userData.personalInfo.email}
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-8 py-3 bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Enregistrer les modifications
                    </button>
                  </div>
                )}
              </GlassCard>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Préférences et paramètres</h2>
                
                <div className="space-y-8">
                  {/* Notification Preferences */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Préférences de notification</h3>
                    <div className="space-y-4">
                      {Object.entries(userData.preferences).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div>
                            <div className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </div>
                            <div className="text-sm text-gray-600">
                              {typeof value === 'boolean' 
                                ? value ? 'Activé' : 'Désactivé'
                                : value
                              }
                            </div>
                          </div>
                          {typeof value === 'boolean' ? (
                            <button
                              onClick={() => setUserData(prev => ({
                                ...prev,
                                preferences: { ...prev.preferences, [key]: !value }
                              }))}
                              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                                value ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                            >
                              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                                value ? 'transform translate-x-7' : 'transform translate-x-1'
                              }`} />
                            </button>
                          ) : (
                            <select
                              value={value}
                              onChange={(e) => setUserData(prev => ({
                                ...prev,
                                preferences: { ...prev.preferences, [key]: e.target.value }
                              }))}
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#bb00cc] focus:border-transparent"
                            >
                              <option value="english">Anglais</option>
                              <option value="spanish">Espagnol</option>
                              <option value="french">Français</option>
                            </select>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Recent Activity */}
            {activeTab === 'rentals' && (
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Activité récente</h2>
                <div className="space-y-4">
                  {userData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-white transition-all duration-300 group">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#bb00cc] to-purple-600 rounded-lg flex items-center justify-center text-white">
                          {activity.type === 'rental' && '🏍️'}
                          {activity.type === 'favorite' && '❤️'}
                          {activity.type === 'review' && '⭐'}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{activity.description}</div>
                          <div className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Loyalty Program */}
            {activeTab === 'billing' && ( // Reusing billing tab for Loyalty Program
              <GlassCard className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Programme de fidélité</h2>
                    <p className="text-gray-600">Gagnez des points à chaque location et débloquez des avantages exclusifs</p>
                  </div>
                  <div className="text-center mt-4 md:mt-0">
                    <div className="text-3xl font-bold text-[#302652] mb-1">{userData.stats.loyaltyPoints}</div>
                    <div className="text-sm text-gray-600">Points de fidélité</div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-[#bb00cc] to-purple-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((userData.stats.loyaltyPoints / 5000) * 100, 100)}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Niveau Argent</span>
                  <span>Niveau Or à 5 000 points</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {[
                    { benefit: 'Support prioritaire', status: 'active' },
                    { benefit: 'Location de casque gratuite', status: 'active' },
                    { benefit: 'Réductions exclusives', status: 'next' }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                        item.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {item.status === 'active' ? '✓' : '🔒'}
                      </div>
                      <div className="font-medium text-gray-900">{item.benefit}</div>
                      <div className="text-sm text-gray-600">{item.status === 'active' ? 'Actif' : 'Débloquer au niveau Or'}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
               
     
    </div>
  );
}