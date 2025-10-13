"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function NewWaySection() {
  const images = [
    "/1.avif",
    "/2.avif",
    "/3.avif",
    "/4.avif"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start the transition by updating next image
      setNextImageIndex((currentImageIndex + 1) % images.length);
      
      // Change current image after a very short delay to ensure both are loaded
      setTimeout(() => {
        setCurrentImageIndex((currentImageIndex + 1) % images.length);
      }, 50);
      
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  return (
    <div className="bg-[#f2f2f2] py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl ml-auto">
        <section className="flex flex-col md:flex-row items-start justify-start bg-white p-6 md:p-12 lg:p-16 rounded-2xl shadow-lg relative md:w-[85%]">
          {/* Left side - Image with improved cross-fade */}
          <div className="w-full md:w-2/5 flex items-stretch mb-8 md:mb-0 md:absolute md:-left-16 md:top-1/2 md:transform md:-translate-y-1/2 z-10">
            <div className="relative w-full h-full min-h-[300px] md:min-h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
              {/* Current Image */}
              <div className={`absolute inset-0 transition-opacity duration-1000 ${
                currentImageIndex === nextImageIndex ? 'opacity-100' : 'opacity-0'
              }`}>
                <Image
                  src={images[currentImageIndex]}
                  alt="Famille heureuse louant une voiture"
                  fill
                  className="object-cover"
                  priority={currentImageIndex === 0}
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              
              {/* Next Image */}
              <div className={`absolute inset-0 transition-opacity duration-1000 ${
                currentImageIndex === nextImageIndex ? 'opacity-0' : 'opacity-100'
              }`}>
                <Image
                  src={images[nextImageIndex]}
                  alt="Famille heureuse louant une voiture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="w-full md:ml-[40%] md:w-[60%] text-left flex flex-col justify-between md:py-8">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-gray-900 mb-4">
                Voici la nouvelle manière{" "}
                <span className="text-purple-600 block">de louer une voiture</span>
              </h2>

              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                Choisissez parmi des milliers de voitures disponibles auprès de
                particuliers et professionnels près de chez vous.
              </p>

              {/* Section points */}
              <div className="space-y-6 md:space-y-7">
                <div className="group">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        Des prix par heure ou par jour
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        Votre location sera assurée par AXA. Vous pouvez même ajouter des
                        conducteurs additionnels sans frais supplémentaires.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        Pas d'agence, pas d'attente
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        Réservez une voiture près de chez vous instantanément, même à la
                        dernière minute. Pas de file d'attente. Pas de paperasse.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        Déverrouillez la voiture avec l'application
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        Notre technologie sécurisée Getaround Connect vous permet
                        d'effectuer l'inspection de la voiture à l'aide de l'application.
                        La voiture s'ouvre. Les clés sont à l'intérieur. Et c'est parti !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <button className="mt-8 md:mt-10 px-6 py-3 border-2 border-purple-600 text-purple-600 text-base md:text-lg font-semibold rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 w-fit">
              Voir comment ça marche →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}