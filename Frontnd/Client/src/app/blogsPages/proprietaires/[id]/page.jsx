"use client";  // <-- ajoute ça tout en haut

import React, { useState, useEffect } from 'react';
import { ArrowUp, Twitter, Facebook } from 'lucide-react';

const BlogPage = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif] text-gray-800">
      <main className="max-w-3xl mx-auto px-6 sm:px-8 py-16">
        
        {/* Header Image + Title */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] font-bold text-gray-900 leading-tight mb-2">
            Road Trip depuis Mulhouse : Explorer les charmes de l'Alsace, des Vosges et de la Forêt-Noire
          </h1>

          {/* Date & Reading time */}
          <p className="text-sm text-blue-400 mb-6">
            10 oct. 2025 • 14 min de lecture
          </p>

          <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 mb-10">
            <img 
              src="/Casablanca_search.jpg"
              alt="Maisons colorées au bord du canal à Colmar"
              className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Intro Text */}
        <article className="prose prose-lg max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-h2:font-bold prose-h2:text-gray-900 prose-h3:text-gray-800 mb-10">
          <p>
            Plus de 70% des Français préfèrent la voiture pour leurs vacances, et pour cause : la liberté qu'offre un road trip est incomparable, surtout dans des régions aussi diversifiées que l'Alsace, les Vosges et la Forêt-Noire.
          </p>
          <p>
            Partir de Mulhouse pour explorer ces trois territoires d'exception vous permet de combiner, en un seul voyage de 5 à 7 jours, une immersion culturelle riche, des paysages à couper le souffle et des expériences gastronomiques mémorables. Ce circuit franco-allemand offre un condensé parfait d'Europe centrale : des villages pittoresques aux sommets montagneux, en passant par des forêts mystérieuses.
          </p>
          <p>
            Prêt à découvrir l'un des itinéraires les plus variés du nord-est de la France ? Suivez notre guide pratique pour organiser votre escapade sur les routes sinueuses entre l'Alsace, les Vosges et la magnifique Forêt-Noire.
          </p>
        </article>

        {/* Nouvelle photo et texte Strasbourg */}
        <div className="mb-10">
          <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 mb-6">
            <img 
              src="/casavelo.jpg"
              alt="Strasbourg" 
              className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <article className="prose prose-lg max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-h2:font-bold prose-h2:text-gray-900 prose-h3:text-gray-800">
            <p>
              Strasbourg, c'est bien plus que sa célèbre cathédrale. La capitale alsacienne se découvre aussi à travers ses quartiers moins connus, où l'ambiance est résolument plus authentique.
            </p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">
              Les incontournables de Strasbourg
            </h3>
            <p>
              La Petite France reste le quartier emblématique avec ses maisons à colombages et ses canaux pittoresques. Mais ne vous contentez pas de suivre la foule ! Explorez également :
            </p>
            <ul className="space-y-2">
              <li>🏘️ Le quartier de la Krutenau pour son ambiance bohème et ses fresques street-art</li>
              <li>☕ La place du marché Gayot et ses terrasses animées</li>
              <li>🕍 La plateforme panoramique de la Cathédrale Notre-Dame pour une vue imprenable (12€ l'accès)</li>
            </ul>
            <p>
              Ne faites pas l'erreur de vous limiter à la Grande Île. Traversez l'Ill pour découvrir le quartier allemand et ses imposants bâtiments du XIXe siècle, témoins d'une histoire mouvementée.
            </p>
          </article>
        </div>

        {/* Ici tu peux continuer avec les jours du road trip (Jour 1 à 5) */}
      </main>

      {/* Floating Buttons + Scroll Circle */}
      <div className="fixed right-4 top-1/3 flex flex-col gap-3 z-50 items-center">
        {/* Scroll Circle */}
        <div className="relative w-12 h-12">
          <svg className="absolute -rotate-90" width="48" height="48">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#e5e7eb"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#3b82f6"
              strokeWidth="4"
              fill="none"
              strokeDasharray={125.6}
              strokeDashoffset={125.6 - (125.6 * scrollPercent) / 100}
              strokeLinecap="round"
            />
          </svg>
          <button
            className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-purple-200 hover:border-purple-400 transition-all"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUp className="w-5 h-5 text-purple-600" />
          </button>
        </div>

        {/* Twitter */}
        <button className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-blue-100 hover:border-blue-400 transition-all">
          <Twitter className="w-5 h-5 text-blue-500" />
        </button>

        {/* Facebook */}
        <button className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-blue-200 hover:border-blue-600 transition-all">
          <Facebook className="w-5 h-5 text-blue-600" />
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
