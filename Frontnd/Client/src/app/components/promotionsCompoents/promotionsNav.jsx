"use client";
import React, { useState } from "react";
import Link from "next/link";

const PromotionsNav = () => {
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);
  const [menuProfilOuvert, setMenuProfilOuvert] = useState(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-[#bb00cc] to-purple-600 shadow-lg sticky top-0 z-50">
        {/* Promo Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 py-2 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="font-bold text-sm animate-pulse">
              🎉 OFFRE SPÉCIALE LIMITÉE ! Jusqu'à 50% de réduction sur nos meilleurs produits ! 
              <span className="ml-2 underline cursor-pointer">Voir les promotions</span>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo avec style promotionnel */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg border-2 border-yellow-400">
                    <svg
                      className="w-7 h-7 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs font-bold">%</span>
                  </div>
                </div>
                <span className="text-3xl font-black text-white drop-shadow-md">
                  RideHub
                  <span className="text-yellow-300 ml-1">Promo</span>
                </span>
              </Link>
            </div>

            {/* Navigation Bureau - Style Boutons */}
            <div className="hidden md:flex items-center space-x-2">
              {[
                { href: "/", label: "Accueil" },
                { href: "/products", label: "Produits" },
                { href: "/contact", label: "Contact" },
                { href: "/promotions", label: "Promotions" },
                { href: "/blogs", label: "Blog" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-5 py-2.5 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    item.href === "/promotions" 
                      ? "bg-yellow-400 text-gray-900 shadow-lg ring-2 ring-yellow-300 ring-opacity-50 hover:shadow-xl" 
                      : " bg-opacity-15 text-white  "
                  }`}
                >
                  <span className="relative z-10 flex items-center">
                    {item.href === "/promotions" && (
                      <span className="mr-2">🔥</span>
                    )}
                    {item.label}
                    {item.href === "/promotions" && (
                      <span className="ml-1 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                        HOT
                      </span>
                    )}
                  </span>
                  
                  {/* Effet de brillance au survol */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Menu profil (bureau) */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => setMenuProfilOuvert(!menuProfilOuvert)}
                  className="relative flex items-center space-x-3 px-4 py-2.5 bg-opacity-15 backdrop-blur-sm  rounded-lg hover:bg-opacity-25 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-4 h-4 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-white font-semibold drop-shadow-md">
                    Jean Dupont
                  </span>
                  <svg
                    className={`w-4 h-4 text-white transition-transform duration-300 ${
                      menuProfilOuvert ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {menuProfilOuvert && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm border border-purple-200 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                    {/* Infos utilisateur */}
                    <div className="px-4 py-3 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#bb00cc] to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Jean Dupont
                          </p>
                          <p className="text-sm text-gray-500">
                            jean.dupont@exemple.com
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Liens du menu */}
                    <div className="py-2">
                      {[
                        {
                          href: "/profile",
                          label: "Mon Profil",
                          icon: "👤",
                        },
                        {
                          href: "/favorites",
                          label: "Mes Favoris",
                          icon: "❤️",
                        },
                        {
                          href: "/bookings",
                          label: "Mes Réservations",
                          icon: "📅",
                        },
                        {
                          href: "/settings",
                          label: "Paramètres",
                          icon: "⚙️",
                        },
                        {
                          href: "/help",
                          label: "Aide & Support",
                          icon: "💬",
                        },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 group"
                          onClick={() => setMenuProfilOuvert(false)}
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Déconnexion */}
                    <div className="px-4 py-3 border-t border-purple-100">
                      <button
                        className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 group"
                        onClick={() => {
                          console.log("Déconnexion...");
                          setMenuProfilOuvert(false);
                        }}
                      >
                        <span>🚪</span>
                        <span className="font-medium">Déconnexion</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Boutons mobile */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Compteur panier/promo */}
              <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                <span>3 OFFRE</span>
              </div>

              {/* Profil */}
              <button
                onClick={() => setMenuProfilOuvert(!menuProfilOuvert)}
                className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </button>

              {/* Menu burger */}
              <button
                onClick={() => setMenuMobileOuvert(!menuMobileOuvert)}
                className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center relative"
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                      menuMobileOuvert ? "top-3 rotate-45" : "top-2"
                    }`}
                  ></span>
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                      menuMobileOuvert ? "top-3 -rotate-45" : "top-3"
                    }`}
                  ></span>
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                      menuMobileOuvert ? "opacity-0" : "top-4 opacity-100"
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden bg-white shadow-xl transition-all duration-500 overflow-hidden ${
            menuMobileOuvert ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-6 space-y-2">
            {[
              { href: "/", label: "Accueil", icon: "🏠" },
              { href: "/products", label: "Produits", icon: "🛍️" },
              { href: "/contact", label: "Contact", icon: "📞" },
              { href: "/promotions", label: "Promotions", icon: "🔥" },
              { href: "/blogs", label: "Blog", icon: "📝" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-4 px-4 py-4 font-semibold rounded-xl transition-all duration-300 group ${
                  item.href === "/promotions"
                    ? "bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-purple-50"
                }`}
                onClick={() => setMenuMobileOuvert(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
                {item.href === "/promotions" && (
                  <span className="ml-auto bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                    HOT
                  </span>
                )}
              </Link>
            ))}

            {/* Profil mobile */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Link
                href="/profile"
                className="flex items-center space-x-4 px-4 py-4 text-gray-700 hover:text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300 group"
                onClick={() => setMenuMobileOuvert(false)}
              >
                <span className="text-xl">👤</span>
                <span>Mon Profil</span>
              </Link>
              <Link
                href="/bookings"
                className="flex items-center space-x-4 px-4 py-4 text-gray-700 hover:text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300 group"
                onClick={() => setMenuMobileOuvert(false)}
              >
                <span className="text-xl">📅</span>
                <span>Mes Réservations</span>
              </Link>
            </div>

            {/* Déconnexion */}
            <div className="pt-4 border-t border-gray-200">
              <button
                className="flex items-center space-x-4 w-full px-4 py-4 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group"
                onClick={() => {
                  console.log("Déconnexion...");
                  setMenuMobileOuvert(false);
                }}
              >
                <span className="text-xl">🚪</span>
                <span className="font-semibold">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay clic extérieur */}
      {menuProfilOuvert && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMenuProfilOuvert(false)}
        ></div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default PromotionsNav;