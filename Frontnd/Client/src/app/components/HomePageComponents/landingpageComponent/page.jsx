"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NewWaySection() {
  const images = ["/1.avif", "/2.avif", "/3.webp", "/4.avif"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextImageIndex((currentImageIndex + 1) % images.length);

      setTimeout(() => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
      }, 50);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  return (
    <div className="bg-[#f2f2f2] py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <section className="flex flex-col md:flex-row items-start justify-start bg-white p-6 md:p-12 lg:p-16 rounded-2xl shadow-lg relative md:w-[100%]">
          
          {/* Left side - Image slider */}
          <div className="w-full md:w-2/5 flex items-stretch mb-8 md:mb-0 md:absolute md:-left-16 md:top-1/2 md:-translate-y-1/2 z-10">
            <div className="relative w-full h-full min-h-[300px] md:min-h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
              
              {/* Current Image */}
              <div className="absolute inset-0 transition-opacity duration-1000">
                <Image
                  src={images[currentImageIndex]}
                  alt="Location de vélo"
                  fill
                  className="object-cover"
                  priority={currentImageIndex === 0}
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>

              {/* Next Image */}
              <div className="absolute inset-0 opacity-0">
                <Image
                  src={images[nextImageIndex]}
                  alt="Location de vélo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="w-full md:ml-[40%] text-left flex flex-col justify-between md:py-8">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-gray-900 mb-4">
                Voici une nouvelle manière{" "}
                <span className="text-purple-600 block">
                  de louer un vélo
                </span>
              </h2>

              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                Louez facilement des vélos urbains, électriques ou sportifs
                auprès de particuliers et de professionnels proches de chez vous.
              </p>

              {/* Feature points */}
              <div className="space-y-6 md:space-y-7">
                
                {/* 1 */}
                <div className="group flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 mr-4"></div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600">
                      Des tarifs flexibles
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Louez un vélo à l’heure, à la journée ou pour plusieurs jours,
                      selon vos besoins et votre budget.
                    </p>
                  </div>
                </div>

                {/* 2 */}
                <div className="group flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 mr-4"></div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600">
                      Écologique et pratique
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Déplacez-vous facilement en ville tout en réduisant votre
                      empreinte carbone et en évitant les embouteillages.
                    </p>
                  </div>
                </div>

                {/* 3 */}
                <div className="group flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 mr-4"></div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600">
                      Réservation rapide via l’application
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Réservez votre vélo en quelques clics, récupérez-le près de
                      chez vous et profitez de votre trajet en toute liberté.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Button */}
            <Link href="/How_works">
              <button className="md:mt-3 px-6 py-3 border-2 border-purple-600 text-purple-600 text-base md:text-lg font-semibold rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300">
                Voir comment ça marche →
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
