"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { getProducts } from '@/app/services/productService';

export default function CarList({ filters }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError(null);
      try {
        // Here you would typically pass filters to getProducts if your API supports it.
        // For now, getProducts does not take filters, so we'll fetch all and filter client-side if needed
        // Or update getProducts to accept filters.
        const allProducts = await getProducts();
        
        setCars(allProducts);
      } catch (err) {
        console.error("Error fetching products in CarList:", err);
        setError("Impossible de charger les véhicules.");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [filters]); // Re-run effect when filters change

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-700">Chargement des véhicules...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  const displayedCars = cars.slice(0, 4); // Still limit to 4 for display

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-100 text-gray-900 rounded-t-3xl">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 md:text-4xl mb-12">
          Les moteur au meilleur rapport qualité-prix de Paris
        </h2>
        {/* Liste de cartes */}
        {displayedCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {displayedCars.map((car) => (
              <div
                key={car.id}
                className="bg-white shadow-lg rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-white text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                    {car.category ? car.category.toUpperCase() : 'INCONNU'}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
                  <div className="flex items-center text-purple-600 text-sm mt-1.5">
                    <FaStar className="mr-1.5" />
                    <span className="font-semibold">
                      {" "}
                      {car.rating ? car.rating.toFixed(2) : 'N/A'}{" "}
                    </span>
                    <span className="text-gray-500 ml-2">
                      {" "}
                      ({car.reviews || 0} avis){" "}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-4 text-sm">
                    {" "}
                    À partir de{" "}
                    <span className="text-lg font-bold text-gray-900">
                      {" "}
                      {car.priceHour || 'N/A'}€{" "}
                    </span>{" "}
                    /h <span className="mx-2">•</span>{" "}
                    <span className="text-lg font-bold text-gray-900">
                      {" "}
                      {car.priceDay || car.price || 'N/A'}€{" "}
                    </span>{" "}
                    /jour{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">Aucun véhicule disponible pour le moment.</div>
        )}
        {/* Bouton Voir tout → redirige vers /ShowAll */}
        <div className="flex justify-center mt-12 md:mt-16">
          <Link
            href="/components/ShowAll"
            className="flex items-center gap-2 bg-purple-600 text-white font-medium px-7 py-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Voir tout <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}