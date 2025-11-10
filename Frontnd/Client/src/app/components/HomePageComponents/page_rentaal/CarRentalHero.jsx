"use client";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPin, Calendar } from "lucide-react";
import CarList from "../../CarList";
import { useRouter } from 'next/navigation';

export default function CarRentalHero() {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // champs ajoutés
  const [vehicleType, setVehicleType] = useState("moto"); // moto par défaut
  const [engineSize, setEngineSize] = useState(""); // volume moteur
  const [bikeType, setBikeType] = useState(""); // normal / electrique (si vélo)
  const [model, setModel] = useState(""); // modèle précis du vélo
  const [delivery, setDelivery] = useState("pickup"); // pickup / delivery
  const [deliveryDateTime, setDeliveryDateTime] = useState(""); // date+heure livraison

  // suggestions location
  const [suggestions, setSuggestions] = useState([]);

  const router = useRouter();

  // listes de modèles (exemples hardcodés — tu peux remplacer par API)
  const normalBikeModels = [
    { id: "nb-1", name: "Vélo Urbain - Classic" },
    { id: "nb-2", name: "Vélo Tout-Terrain - Trail" },
    { id: "nb-3", name: "Vélo Course - Speed" },
  ];
  const electricBikeModels = [
    { id: "eb-1", name: "E-Bike City - Comfort" },
    { id: "eb-2", name: "E-MTB - PowerTrail" },
    { id: "eb-3", name: "E-Scooter (grand modèle)" },
  ];

  // récupérer la bonne liste selon bikeType
  const availableBikeModels =
    vehicleType === "velo"
      ? bikeType === "electrique"
        ? electricBikeModels
        : bikeType === "normal"
        ? normalBikeModels
        : []
      : [];

  const fetchNominatim = async (query) => {
    try {
      const viewbox = "-17.2, 27.5, -0.8, 36.0"; // cadre Maroc
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&limit=5&countrycodes=ma&viewbox=${viewbox}&bounded=1`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Erreur f Nominatim:", error);
    }
  };

  // debouncing location
  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.length > 2) fetchNominatim(location);
      else setSuggestions([]);
    }, 500);
    return () => clearTimeout(timer);
  }, [location]);

  // handleSearch
  const handleSearch = (e) => {
    e.preventDefault();

    const categoryMap = {
      moto: 'motorcycle',
      velo: 'bicycle'
    };

    const category = categoryMap[vehicleType];

    router.push(`/products?category=${category}`);
  };

  // map dynamic
  const Map = useMemo(
    () =>
      dynamic(() => import("./MyMap"), {
        loading: () => <p>Kharitta kat't'charga...</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto p-6 md:p-12 bg-white rounded-3xl shadow-lg mt-10">
        {/* LEFT SIDE */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Louez un véhicule facilement
          </h1>
          <p className="text-lg text-gray-600">
            Choisissez, payez et partez en toute liberté 🚗🏍️🚲
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
                onChange={(e) => {
                  setVehicleType(e.target.value);
                  // reset liés
                  setEngineSize("");
                  setBikeType("");
                  setModel("");
                }}
                className="w-full border rounded-full px-4 py-3 bg-white text-gray-700"
              >
                <option value="moto">Moto</option>
                <option value="velo">Vélo</option>
              </select>
            </div>

            {/* Volume moteur (si moto) */}
            {vehicleType === "moto" && (
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Volume moteur
                </label>
                <select
                  value={engineSize}
                  onChange={(e) => setEngineSize(e.target.value)}
                  className="w-full border rounded-full px-4 py-3 bg-white text-gray-700"
                >
                  <option value="">-- Choisir --</option>
                  <option value="50cc">50cc</option>
                  <option value="125cc">125cc</option>
                  <option value="250cc">250cc</option>
                  <option value="500cc">500cc +</option>
                </select>
              </div>
            )}

            {/* Si Vélo => choisir normal / électrique */}
            {vehicleType === "velo" && (
              <>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Type de vélo
                  </label>
                  <select
                    value={bikeType}
                    onChange={(e) => {
                      setBikeType(e.target.value);
                      setModel(""); // reset model quand change bikeType
                    }}
                    className="w-full border rounded-full px-4 py-3 bg-white text-gray-700"
                  >
                    <option value="">-- Choisir --</option>
                    <option value="normal">Vélo normal</option>
                    <option value="electrique">Vélo électrique</option>
                  </select>
                </div>

                {/* Liste des modèles (selon bikeType) */}
                {bikeType && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Modèle
                    </label>
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full border rounded-full px-4 py-3 bg-white text-gray-700"
                    >
                      <option value="">-- Choisir un modèle --</option>
                      {availableBikeModels.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            {/* Adresse */}
            <div className="relative">
              <div className="flex items-center border rounded-full px-4 py-3 bg-white">
                <MapPin className="text-gray-400 mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Adresse précise, quartier, gare..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent w-full outline-none text-gray-700"
                  autoComplete="off"
                />
              </div>

              {/* suggestions */}
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {suggestions.map((s) => (
                    <li
                      key={s.place_id}
                      onClick={() => {
                        setLocation(s.display_name);
                        setSuggestions([]);
                      }}
                      className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {s.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Livraison */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Méthode de réception
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="pickup"
                    checked={delivery === "pickup"}
                    onChange={(e) => setDelivery(e.target.value)}
                  />
                  <span>Récupération sur place</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="delivery"
                    checked={delivery === "delivery"}
                    onChange={(e) => setDelivery(e.target.value)}
                  />
                  <span>Livraison à domicile</span>
                </label>
              </div>
            </div>

            {/* Date + heure livraison si nécessaire */}
            {delivery === "delivery" && (
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Date et heure de livraison
                </label>
                <input
                  type="datetime-local"
                  value={deliveryDateTime}
                  onChange={(e) => setDeliveryDateTime(e.target.value)}
                  className="w-full border rounded-full px-4 py-3 bg-white text-gray-700"
                />
              </div>
            )}

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

      {/* CarList: on passe les filters (tu peux utiliser ces props pour filtrer côté CarList) */}
      <div className="mt-8">
        <CarList
          filters={{
            vehicleType,
            bikeType,
            model,
            startDate,
            endDate,
            location,
          }}
        />
      </div>

      {/* Map
      <div className="max-w-6xl mx-auto p-6 mt-16">
        <h2 className="text-3xl font-bold mb-4">Chof L'Blassa f'l'Kharitta</h2>
        <Map />
      </div> */}
    </>
  );
}
