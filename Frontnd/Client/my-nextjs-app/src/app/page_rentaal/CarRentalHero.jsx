"use client";
import Image from "next/image";
import { useState } from "react";
import { MapPin, Calendar } from "lucide-react";

export default function CarRentalHero() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ location, startDate, endDate });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto p-6 md:p-12 bg-white rounded-3xl shadow-lg mt-10">
      {/* LEFT SIDE */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Louez une moteur  à Paris entre particuliers
        </h1>
        <p className="text-lg text-gray-600">
          Déverrouillez des voitures en libre-service 24h/24 avec l'appli et partez.
        </p>

        {/* Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex items-center border rounded-full px-4 py-3 bg-gray-50">
            <MapPin className="text-gray-400 mr-3" size={20} />
            <input
              type="text"
              placeholder="Adresse précise, gare, métro..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent w-full outline-none text-gray-700"
            />
          </div>

          <div className="flex space-x-3">
            <div className="flex items-center border rounded-full px-4 py-3 bg-gray-50 w-1/2">
              <Calendar className="text-gray-400 mr-3" size={20} />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent w-full outline-none text-gray-700"
              />
            </div>
            <div className="flex items-center border rounded-full px-4 py-3 bg-gray-50 w-1/2">
              <Calendar className="text-gray-400 mr-3" size={20} />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent w-full outline-none text-gray-700"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-4 rounded-full font-semibold transition-all"
          >
            Trouver une voiture
          </button>
        </form>

        {/* Footer small info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4">
          <p className="text-sm text-gray-500">
            Locations assurées tous risques par <span className="font-semibold">AXA</span>
          </p>
          <div className="flex space-x-4 mt-3 sm:mt-0">
            <Image src="/appstore.png" alt="App Store" width={120} height={40} />
            <Image src="/googleplay.png" alt="Google Play" width={120} height={40} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (image) */}
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
  );
}
