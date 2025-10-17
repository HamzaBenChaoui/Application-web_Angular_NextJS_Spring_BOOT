"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Hide header and footer by targeting their classes/IDs
    const hideElements = () => {
      const header = document.querySelector('header, nav, [class*="navbar"], [class*="Navbar"]');
      const footer = document.querySelector('footer, [class*="footer"], [class*="Footer"]');
      
      if (header) header.style.display = 'none';
      if (footer) footer.style.display = 'none';
    };

    hideElements();

    return () => {
      // Show them again when leaving the 404 page
      const header = document.querySelector('header, nav, [class*="navbar"], [class*="Navbar"]');
      const footer = document.querySelector('footer, [class*="footer"], [class*="Footer"]');
      
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
    };
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  // Don't render the button until we're on the client to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[200px] md:text-[280px] font-black bg-gradient-to-r from-[#302652] via-[#bb00cc] to-purple-600 bg-clip-text text-transparent leading-none">
            404
          </div>
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Oups ! Page non trouvée
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Désolé, la page que vous recherchez semble avoir pris une autre route. 
              Elle a peut-être été déplacée ou n'existe plus.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="h-14 w-32 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="h-14 w-40 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <div className="text-[200px] md:text-[280px] font-black bg-gradient-to-r from-[#302652] via-[#bb00cc] to-purple-600 bg-clip-text text-transparent leading-none">
            404
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Oups ! Page non trouvée
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Désolé, la page que vous recherchez semble avoir pris une autre route. 
            Elle a peut-être été déplacée ou n'existe plus.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          {/* Go Back Button */}
          <button
            onClick={handleGoBack}
            className="group relative bg-white text-[#302652] border-2 border-gray-200 px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#bb00cc] flex items-center space-x-3"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span>Retour</span>
          </button>

          {/* Home Button */}
          <Link 
            href="/"
            className="group relative bg-gradient-to-r from-[#bb00cc] to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-3"
          >
            <span>Accueil principal</span>
            <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}