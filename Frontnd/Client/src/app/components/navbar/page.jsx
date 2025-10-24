"use client";
import React, { useState } from "react";
import Link from "next/link";

const BarreNavigation = () => {
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);
  const [menuProfilOuvert, setMenuProfilOuvert] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#bb00cc] to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-3xl font-black bg-gradient-to-r from-[#302652] to-[#bb00cc] bg-clip-text text-transparent">
                  RideHub
                </span>
              </Link>
            </div>

            {/* Navigation Bureau */}
            <div className="hidden md:flex items-center space-x-1">
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
                  className="relative px-6 py-3 text-gray-700 hover:text-[#302652] font-semibold transition-all duration-300 group"
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Effet survol */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#bb00cc]/5 to-transparent rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>

                  {/* Soulignement animé */}
                  <div className="absolute bottom-2 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#bb00cc] to-purple-600 group-hover:w-4/5 group-hover:left-1/10 transition-all duration-300 transform -translate-x-1/2 group-hover:translate-x-0"></div>
                </Link>
              ))}
            </div>

            {/* Menu profil (bureau) */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => setMenuProfilOuvert(!menuProfilOuvert)}
                  className="relative flex items-center space-x-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-[#bb00cc]/30 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#bb00cc] to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-4 h-4 text-white"
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
                  <span className="text-gray-700 font-semibold group-hover:text-[#302652] transition-colors duration-300">
                    Jean Dupont
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
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
                  <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl py-2 z-50 animate-fade-in">
                    {/* Infos utilisateur */}
                    <div className="px-4 py-3 border-b border-gray-100">
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
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-[#302652] hover:bg-gradient-to-r hover:from-[#bb00cc]/5 hover:to-purple-600/5 transition-all duration-300 group"
                          onClick={() => setMenuProfilOuvert(false)}
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Déconnexion */}
                    <div className="px-4 py-3 border-t border-gray-100">
                      <button
                        className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group"
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
              {/* Profil */}
              <button
                onClick={() => setMenuProfilOuvert(!menuProfilOuvert)}
                className="w-12 h-12 bg-white border border-gray-200 rounded-xl hover:border-[#bb00cc]/30 transition-all duration-300 flex items-center justify-center"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#bb00cc] to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-4 h-4 text-white"
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
                className="w-12 h-12 bg-white border border-gray-200 rounded-xl hover:border-[#bb00cc]/30 transition-all duration-300 flex items-center justify-center relative"
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                      menuMobileOuvert ? "top-3 rotate-45" : "top-2"
                    }`}
                  ></span>
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                      menuMobileOuvert ? "top-3 -rotate-45" : "top-3"
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden bg-white border-t border-gray-100 shadow-lg transition-all duration-500 overflow-hidden ${
            menuMobileOuvert ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-6 space-y-2">
            {[
              { href: "/", label: "Accueil", icon: "🏠" },
              { href: "/AppPages/products", label: "Produits", icon: "🛍️" },
              {
                href: "/AppPages/products?category=motorcycle",
                label: "Motos",
                icon: "🏍️",
              },
              {
                href: "/AppPages/products?category=bicycle",
                label: "Vélos",
                icon: "🚲",
              },
              { href: "/AppPages/favorites", label: "Favoris", icon: "❤️" },
              { href: "/AppPages/contact", label: "Contact", icon: "📞" },
              { href: "/blogsPage", label: "Blog", icon: "📝" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-4 px-4 py-4 text-gray-700 hover:text-[#302652] font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                onClick={() => setMenuMobileOuvert(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Profil mobile */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Link
                href="/AppPages/profile"
                className="flex items-center space-x-4 px-4 py-4 text-gray-700 hover:text-[#302652] font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                onClick={() => setMenuMobileOuvert(false)}
              >
                <span className="text-xl">👤</span>
                <span>Mon Profil</span>
              </Link>
              <Link
                href="/AppPages/bookings"
                className="flex items-center space-x-4 px-4 py-4 text-gray-700 hover:text-[#302652] font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                onClick={() => setMenuMobileOuvert(false)}
              >
                <span className="text-xl">📅</span>
                <span>Mes Réservations</span>
              </Link>
              <Link
                href="/AppPages/settings"
                className="flex items-center space-x-4 px-4 py-4 text-gray-700 hover:text-[#302652] font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                onClick={() => setMenuMobileOuvert(false)}
              >
                <span className="text-xl">⚙️</span>
                <span>Paramètres</span>
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

export default BarreNavigation;
