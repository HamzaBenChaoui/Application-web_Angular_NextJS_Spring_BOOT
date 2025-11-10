"use client";
import Image from "next/image";
import { useState } from "react";
import { MapPin, Calendar } from "lucide-react";

export default function FindVehiculeComponent() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ location, startDate, endDate });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-stretch gap-8">
        {/* LEFT: white card */}
        <div className="w-full md:w-[62%] bg-white rounded-3xl shadow-lg p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-3 whitespace-nowrap">
              Louez une voiture entre particuliers
            </h1>
            <p className="text-gray-600 mb-6">
              Déverrouillez des voitures en libre-service 24h/24 avec l'appli et partez.
            </p>

            <form onSubmit={handleSearch} className="space-y-4">
              {/* Location input */}
              <div className="flex items-center border rounded-full px-5 py-5 bg-gray-50 h-16">
                <MapPin className="text-gray-400 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Adresse précise, gare, métro..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent w-full outline-none text-gray-700 text-base"
                />
              </div>

              {/* Date inputs */}
              <div className="flex gap-3">
                <div className="flex items-center border rounded-full px-5 py-5 bg-gray-50 w-1/2 h-16">
                  <Calendar className="text-gray-400 mr-3" size={20} />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-transparent w-full outline-none text-gray-700 text-base"
                  />
                </div>
                <div className="flex items-center border rounded-full px-5 py-5 bg-gray-50 w-1/2 h-16">
                  <Calendar className="text-gray-400 mr-3" size={20} />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-transparent w-full outline-none text-gray-700 text-base"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-4 rounded-lg font-semibold text-lg transition-all"
              >
                Trouver une voiture
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="pt-8">
            <p className="text-sm text-gray-500 mb-2 text-left">
              Locations assurées tous risques par <span className="font-semibold">AXA</span>
            </p>
            <div className="flex space-x-3">
              <Image src="/appstore.png" alt="App Store" width={120} height={40} />
              <Image src="/googleplay.png" alt="Google Play" width={120} height={40} />
            </div>
          </div>
        </div>

        {/* RIGHT: image same height as left section */}
        <div className="w-full md:w-[38%] flex">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-md border border-gray-100">
            <Image
              src="/paris.png"
              alt="Tour Eiffel"
              fill
              className="object-cover h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}