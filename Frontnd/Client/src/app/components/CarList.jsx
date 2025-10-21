"use client";
import { FaStar, FaArrowRight } from "react-icons/fa";

export default function CarList() {
  const cars = [
    {
      id: 1,
      name: "Toyota Corolla",
      category: "Berline",
      rating: 4.61,
      reviews: 36,
      priceHour: 6,
      priceDay: 46,
      image: "https://moto.honda.fr/content/dam/central/motorcycles/range/25ym-coming-soon/25YM_CB1000%20HORNET_COMING_SOON_MOBILE_4.jpg/_jcr_content/renditions/m_r.jpg",
    },
    {
      id: 2,
      name: "Renault Clio",
      category: "Citadine",
      rating: 4.73,
      reviews: 59,
      priceHour: 4,
      priceDay: 30,
      image: "https://mister-occaz.com/wp-content/uploads/2022/05/IMG-20240711-WA0006.jpg",
    },
    {
      id: 3,
      name: "Peugeot 2008",
      category: "SUV",
      rating: 4.73,
      reviews: 43,
      priceHour: 7,
      priceDay: 50,
      image: "https://www.easymonneret.com/media/cache/monsieurbiz_rich_editor_image/3abf74719b4840b59cb679cc1ad7e141_1_201_a-654cdc06011c7.jpg",
    },
    {
      id: 4,
      name: "Renault Kangoo Express",
      category: "Utilitaire",
      rating: 4.94,
      reviews: 17,
      priceHour: 6,
      priceDay: 51,
      image: "https://www.adventure-bmw.com/wp-content/uploads/2022/10/img_5074.jpg",
    },
  ];

  return (
    <section className="px-6 py-12 bg-gray-200 text-gray-900">
      <h2 className="text-3xl font-bold text-center mb-10">
        Les moteur  au meilleur rapport qualité-prix de Paris
      </h2>

      {/* Liste de cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="relative">
              <img
                src={car.image}
                alt={car.name}
                className="h-40 w-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-white text-purple-700 text-sm font-semibold px-3 py-1 rounded-full shadow">
                {car.category.toUpperCase()}
              </span>
            </div>

            <div className="p-3">
              <h3 className="text-lg font-semibold">{car.name}</h3>
              <div className="flex items-center text-purple-600 text-sm mt-1">
                <FaStar className="mr-1" />
                <span>{car.rating.toFixed(2)}</span>
                <span className="text-gray-500 ml-1">({car.reviews})</span>
              </div>

              <p className="text-gray-700 mt-2">
                À partir de{" "}
                <span className="font-semibold">{car.priceHour}€</span>/h •{" "}
                <span className="font-semibold">{car.priceDay}€</span>/jour
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton Voir tout */}
      <div className="flex justify-center mt-10">
        <button className="flex items-center gap-2 bg-purple-600 text-white font-medium px-6 py-3 rounded-full hover:bg-purple-700 transition-all duration-200">
          Voir tout <FaArrowRight />
        </button>
      </div>
    </section>
  );
}
