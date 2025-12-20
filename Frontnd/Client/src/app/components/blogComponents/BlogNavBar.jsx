"use client";
import React, { useState } from "react";
import Link from "next/link";

const BlogNavbar = () => {
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);

  const navLinks = [
    { href: "/blogs/inspiration", label: "Inspiration", icon: "💡" },
    { href: "/blogs/proprietaires", label: "Conseils et Astuces", icon: "👤" },
    { href: "/blogs/actualites", label: "Technologie et  Innovation", icon: "📢" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* --- LOGO --- */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#bb00cc] to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105">
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
                <div className="flex flex-col">
                  <span className="text-2xl font-black bg-gradient-to-r from-[#302652] to-[#bb00cc] bg-clip-text text-transparent leading-6">
                    RideHub
                  </span>
                  <span className="text-2xl font-medium text-gray-500 -mt-1">
                    Blog
                  </span>
                </div>
              </Link>

              {/* --- DESKTOP LINKS --- */}
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-3 text-gray-600 hover:text-[#302652] font-medium transition-all duration-300 group"
                  >
                    <span className="relative z-10 text-lg">{item.label}</span>

                    {/* Hover background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#bb00cc]/5 to-transparent rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>

                    {/* Animated underline */}
                    <div className="absolute bottom-2 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#bb00cc] to-purple-600 group-hover:w-4/5 transition-all duration-300 transform -translate-x-1/2"></div>
                  </Link>
                ))}
              </div>
            </div>

            {/* --- SEARCH BAR (Desktop) --- */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher des articles..."
                  className="pl-10 pr-4 py-2.5 w-64 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bb00cc]/20 focus:border-[#bb00cc] transition-all duration-300"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* --- MOBILE MENU BUTTON --- */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={() => setMenuMobileOuvert(!menuMobileOuvert)}
                className="relative w-12 h-12 bg-white border border-gray-200 rounded-xl hover:border-[#bb00cc]/30 transition-all duration-300 flex items-center justify-center group"
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

        {/* --- MOBILE MENU --- */}
        <div
          className={`md:hidden bg-white border-t border-gray-100 shadow-lg transition-all duration-500 overflow-hidden ${
            menuMobileOuvert ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuMobileOuvert(false)}
                className="flex items-center space-x-4 px-4 py-4 text-gray-700 hover:text-[#302652] font-medium rounded-xl hover:bg-gray-50 transition-all duration-300 group"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
                <svg
                  className="w-4 h-4 text-[#bb00cc] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
            
            {/* Recherche Mobile */}
            <div className="pt-4 border-t border-gray-200">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Rechercher des articles..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bb00cc]/20 focus:border-[#bb00cc] transition-all duration-300"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>
            </div>

            {/* --- Retour au site principal --- */}
            <div className="pt-4 border-t border-gray-200">
              <Link
                href="/"
                onClick={() => setMenuMobileOuvert(false)}
                className="flex items-center space-x-4 px-4 py-4 bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 justify-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Retour au site RideHub</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
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

export default BlogNavbar;
