"use client";
import React from "react";
import { Wifi, WifiOff } from "lucide-react";

export default function CarSharingHero() {
  return (
    <>
      {/* --- Première section hero --- */}
      <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 bg-white"></div>
        <div className="relative w-full max-w-5xl mx-auto h-[600px] flex items-center">
          <div className="absolute top-0 left-0 w-full md:w-2/5 h-full rounded-3xl overflow-hidden">
            <img
              src="https://getaround-assets.gumlet.io/images/pages/how_it_works/how_it_works_hero.jpg?compress=true&w=600"
              alt="Friends on a road trip"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 w-full md:w-3/5 lg:w-3/5 bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl p-10 md:p-14 ml-auto md:ml-[35%]">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Ayez une voiture sans avoir de voiture
            </h1>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Trouvez toujours une voiture près de chez vous, prête à partir. Partez pour quelques heures ou quelques jours, et revenez à votre point de départ une fois terminé.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3">
                <Wifi className="w-5 h-5" />
                <span>Avec Getaround Connect</span>
              </button>
              <button className="px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 border border-gray-200">
                <WifiOff className="w-5 h-5" />
                <span>Sans Getaround Connect</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Deuxième section : étapes --- */}
      <div className="min-h-screen bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 py-12 relative z-10 max-w-6xl">
          {/* Boutons en haut */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3">
              <Wifi className="w-5 h-5" />
              <span>Avec Getaround Connect</span>
            </button>
            <button className="px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 border border-gray-200">
              <WifiOff className="w-5 h-5" />
              <span>Sans Getaround Connect</span>
            </button>
          </div>

          {/* Carte contenant toutes les étapes */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                Des véhicules en libre-service accessibles 24h/24 et 7j/7<br />
                depuis l'appli
              </h1>
            </div>

            {/* Étapes (inchangées) */}
            {/* Step 1 */}
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6 items-start border-b border-gray-100 pb-12">
                <div className="w-full md:w-48 flex-shrink-0">
                  <div className="bg-purple-50 rounded-2xl p-6 flex items-center justify-center">
                    <svg
                      className="w-32 h-32 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-purple-600">
                      Avant le départ
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Réservez un véhicule Getaround Connect
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Choisissez le véhicule qu'il vous faut parmi nos flottes
                        autour de chez vous.<br />
                        Réservez pour quelques heures ou plusieurs jours et
                        validez directement.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Vérifiez votre profil
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Prenez le temps de vérifier votre permis de conduire et
                        votre pièce d'identité.<br />
                        Cette validation se fera différemment que lors de votre
                        première réservation Getaround Connect.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-6 items-start border-b border-gray-100 pb-12">
                <div className="w-full md:w-48 flex-shrink-0">
                  <div className="bg-blue-50 rounded-2xl p-6 flex items-center justify-center">
                    <svg
                      className="w-32 h-32 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-purple-600">
                      Pendant le trajet
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Accédez au véhicule avec votre smartphone
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Utilisez l'app pour faire l'état des lieux, puis ouvrez
                        le véhicule en un clic. Facile !<br />
                        Les clés se trouvent à l'intérieur.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">En route !</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Votre trajet est entièrement assuré par AXA et couvert
                        par notre assistance 24h/24 et 7j/7.<br />
                        Vous pouvez choisir la protection Plus ou Premium pour
                        plus de sérénité.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-48 flex-shrink-0">
                  <div className="bg-green-50 rounded-2xl p-6 flex items-center justify-center">
                    <svg
                      className="w-32 h-32 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-purple-600">
                      Au retour
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Restituez le véhicule là où vous l'avez pris
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Laissez les clés dans la voiture et verrouillez-la avec
                        votre smartphone.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Gagnez des crédits pour votre prochain trajet
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Partagez votre code de parrainage avec vos amis — ils
                        recevront 15€ de crédit et vous aussi !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Section finale : deux cartes côte à côte --- */}
      <div className="flex flex-col md:flex-row justify-center items-stretch bg-white py-12 gap-8 px-6">
        {/* Carte 1 : Encore des questions ? */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 flex items-center gap-6 max-w-3xl w-full md:w-1/2">
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-[#2e2459]">
              Encore des<br />questions ?
            </h2>
            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-[#d22bd3] text-[#d22bd3] font-medium hover:bg-[#d22bd3] hover:text-white transition"
              >
                <span className="text-sm md:text-base">
                  Jetez un oeil à notre<br className="hidden md:inline" /> Centre
                  d'aide
                </span>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#d22bd3]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div className="w-44 md:w-56 flex-shrink-0">
                 <img
              src="/xx.svg"
              alt="Femme près de voiture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Carte 2 : Envie de louer votre voiture ? */}
        <div className="flex bg-[#0b095c] rounded-2xl overflow-hidden shadow-lg w-full md:w-1/2 max-w-3xl">
          <div className="flex flex-col justify-center p-8 text-white w-1/2">
            <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
              Envie de louer<br />votre voiture ?
            </h2>
          </div>
          <div className="w-1/2">
            <img
              src="/femme2.jpg"
              alt="Femme près de voiture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
