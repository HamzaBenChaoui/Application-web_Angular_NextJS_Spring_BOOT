import Image from "next/image";
import FloatingDock from "@/app/components/FloatingDock";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="bg-white rounded-3xl shadow-sm p-10 grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo + À propos */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-purple-700 font-bold text-2xl">G</span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">À propos</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              En tant que plateforme de location de deux-roues leader en Europe,
              notre mission est d'apporter une bouffée d'air frais aux citadins
              en proposant un accès 24h/24 et 7j/7 à des bicyclettes et motos en
              libre-service proches de vous. Réservez simplement, ouvrez avec
              votre smartphone et partez.
            </p>
          </div>

          {/* En savoir plus */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
              En savoir plus
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>Comment ça marche ?</li>
              <li>Un service de confiance</li>
              <li>Appli mobile</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
              Ressources
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>Assurance</li>
              <li>Loueurs professionnels</li>
              <li>Collectivités</li>
              <li>Aide</li>
            </ul>
          </div>

          {/* Location de vélo / moto */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
              Location de vélo & moto
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>Louer un vélo électrique</li>
              <li>Louer une moto par marque</li>
              <li>Location scooter</li>
              <li>Location tandem</li>
              <li>Location moto de route</li>
              <li>Location vélo tout-terrain</li>
            </ul>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex justify-center mt-8">
          <FloatingDock />
        </div>

        {/* Mentions légales */}
        <div className="mt-8 text-center text-gray-500 text-sm space-x-3">
          <span>CGU</span>•<span>Politique de confidentialité</span>•
          <span>Cookies</span>•<span>Carrières</span>•
          <span>Relations investisseurs</span>
          <div className="mt-3">
            © Location Deux-Roues 2025 – Tous droits réservés
          </div>
        </div>
      </div>
    </footer>
  );
}
