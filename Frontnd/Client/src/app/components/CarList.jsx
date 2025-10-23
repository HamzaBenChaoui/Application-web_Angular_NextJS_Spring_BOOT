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
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-100 text-gray-900">
      
      {/* MODIFICATION ICI : 
        J'ai enlevé "max-w-7xl". 
        "container" va maintenant s'élargir davantage sur les écrans 2xl (1536px), 
        réduisant ainsi les marges latérales.
      */}
      <div className="container mx-auto px-6">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 md:text-4xl mb-12">
          Les moteur au meilleur rapport qualité-prix de Paris
        </h2>

        {/* Liste de cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cars.map((car) => (
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
                  {car.category.toUpperCase()}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
                <div className="flex items-center text-purple-600 text-sm mt-1.5">
                  <FaStar className="mr-1.5" />
                  <span className="font-semibold">{car.rating.toFixed(2)}</span>
                  <span className="text-gray-500 ml-2">({car.reviews} avis)</span>
                </div>

                <p className="text-gray-600 mt-4 text-sm">
                  À partir de{" "}
                  <span className="text-lg font-bold text-gray-900">{car.priceHour}€</span>/h
                  <span className="mx-2">•</span>
                  <span className="text-lg font-bold text-gray-900">{car.priceDay}€</span>/jour
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton Voir tout */}
        <div className="flex justify-center mt-12 md:mt-16">
          <button className="
            flex items-center gap-2 
            bg-purple-600 text-white 
            font-medium px-7 py-3 rounded-full 
            shadow-lg hover:bg-purple-700 
            transition-all duration-300 
            transform hover:-translate-y-0.5
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
          ">
            Voir tout <FaArrowRight />
          </button>
        </div>

      </div>
    </section>
  );
}