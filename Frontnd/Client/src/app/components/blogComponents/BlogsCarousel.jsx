'use client'

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BlogsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      badge: '★ Mis en avant',
      title: "L'Adventure Lab' Getaround : en route vers votre prochaine...",
      description: "Nous sommes convaincus que chaque micro-escapade peut devenir un souvenir inoubliable. Du week-end au jour férié, chaque moment est une occasion d'explorer. Et parce que la vie est bien trop courte pour ne pas tout tester, nous avons créé notre laboratoire à micro-aventures."
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
      badge: '★ Mis en avant',
      title: "Explorez de nouveaux horizons avec Adventure Lab",
      description: "Chaque destination est une porte ouverte vers l'aventure. Que vous recherchiez des paysages époustouflants ou des expériences authentiques, notre laboratoire vous guide vers des moments exceptionnels."
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?w=800&q=80',
      badge: '★ Mis en avant',
      title: "Des micro-aventures pour tous les voyageurs",
      description: "L'aventure n'attend pas. Découvrez comment transformer un simple week-end en une expérience mémorable. Notre mission : rendre chaque escapade inoubliable."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full mx-auto">
      {/* Carousel with hover effects */}
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden h-96 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Image Section with hover effect */}
          <div className="relative w-full lg:w-1/2 h-full overflow-hidden">
            <img
              src={slides[currentSlide].image}
              alt="Adventure"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-gray-50 h-full overflow-y-auto">
            <div className="mb-4">
              <span className="inline-block text-sm text-black font-medium transition-colors duration-300 hover:text-gray-800">
                {slides[currentSlide].badge}
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight transition-colors duration-300 hover:text-gray-900">
              {slides[currentSlide].title}
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg transition-colors duration-300 hover:text-gray-700">
              {slides[currentSlide].description}
            </p>

            <button className="flex items-center gap-2 text-gray-800 font-semibold hover:gap-4 hover:text-gray-900 transition-all duration-300 text-lg group">
              <span>Découvrir</span>
              <span className="text-xl transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 hover:bg-gray-600 ${
                index === currentSlide
                  ? 'bg-gray-800 w-8'
                  : 'bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}