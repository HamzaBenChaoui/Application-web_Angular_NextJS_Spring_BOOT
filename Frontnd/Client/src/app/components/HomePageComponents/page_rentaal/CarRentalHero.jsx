"use client";
import Image from "next/image";
import { useState } from "react";
import CarList from "../../CarList";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from 'next/navigation';

export default function CarRentalHero() {
  const [vehicleType, setVehicleType] = useState("moto"); // moto par défaut

  const router = useRouter();
  const { isLoggedIn, promptLogin } = useAuth();

  // handleSearch
  const handleSearch = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      promptLogin();
      return;
    }

    const categoryMap = {
      moto: 'MOTORCYCLE',
      velo: 'BIKE'
    };

    const category = categoryMap[vehicleType];

    const queryParams = new URLSearchParams({
        category: category,
        status: 'ACTIVE',
        available: 'true'
    });

    // On redirige vers la page des produits avec les filtres
    router.push(`/products?${queryParams.toString()}`);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto p-6 md:p-12 bg-white rounded-3xl shadow-lg mt-10">
        {/* LEFT SIDE */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Louez un véhicule facilement
          </h1>
          <p className="text-lg text-gray-600">
            Choisissez, payez et partez en toute liberté 
          </p>

          {/* Form */}
          <form
            onSubmit={handleSearch}
            className="space-y-4 bg-gray-100 p-6 rounded-2xl"
          >
            {/* Type de véhicule */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Type de véhicule
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full border rounded-full px-4 py-3 bg-white text-gray-700"
              >
                <option value="moto">Moto</option>
                <option value="velo">Vélo</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-4 rounded-full font-semibold transition-all"
            >
              Rechercher un véhicule
            </button>
          </form>

          {/* Footer info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4">
            <p className="text-sm text-gray-500">
              Locations assurées tous risques par{" "}
              <span className="font-semibold">AXA</span>
            </p>
            <div className="flex space-x-4 mt-3 sm:mt-0">
              <Image src="/appstore.png" alt="App Store" width={120} height={40} />
              <Image src="/googleplay.png" alt="Google Play" width={120} height={40} />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE image */}
        <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8">
          <Image
            src="/paris.png"
            alt="Tour Eiffel"
            width={600}
            height={400}
            className="rounded-3xl shadow-md object-cover"
          />
        </div>
      </div>

      {/* CarList: on passe les filters */}
      <div className="mt-8">
        <CarList
          filters={{
            vehicleType,
          }}
        />
      </div>
    </>
  );
}
