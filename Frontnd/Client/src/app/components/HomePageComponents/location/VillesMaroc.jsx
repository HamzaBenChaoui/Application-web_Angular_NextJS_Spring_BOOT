import Image from 'next/image'

export default function VillesMaroc() {
  const villes = [
    { nom: 'Casablanca', image: '/villes/casablanca.jpg' },
    { nom: 'Marrakech', image: '/villes/marrakech.jpg' },
    { nom: 'Agadir', image: '/villes/agadir.webp' },
    { nom: 'Tanger', image: '/villes/tanger.jpeg' },
    { nom: 'Rabat', image: '/villes/rabat.jpg' },
    { nom: 'Taroudant', image: '/villes/taroudant.jpg' },
  ]

  const liens = [
    'Location de voiture à l’aéroport',
    'Location de voiture à la gare',
    'Marque et modèle',
    'Location voiture Espagne',
    'Location voiture Portugal',
    'Location voiture Algérie',
  ]

  return (
    <section className="bg-[#F8F8FA] py-20 text-center">
      <h2 className="text-4xl font-semibold text-[#2B1C50] mb-16">
        Disponible partout au Maroc
      </h2>

      {/* Section des villes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-8 justify-items-center">
        {villes.map((ville) => (
          <div
            key={ville.nom}
            className="flex flex-col items-center space-y-3"
          >
            <div className="w-[100px] h-[100px] rounded-md overflow-hidden shadow-lg">
              <Image
                src={ville.image}
                alt={ville.nom}
                width={100}
                height={100}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-lg font-medium text-[#2B1C50]">{ville.nom}</p>
          </div>
        ))}
      </div>

      {/* Boutons */}
      <div className="flex flex-wrap justify-center gap-4 mt-20">
        {liens.map((lien, index) => (
          <button
            key={index}
            className="px-5 py-2 border border-gray-300 rounded-full text-sm text-[#2B1C50] hover:bg-[#2B1C50] hover:text-white transition duration-200"
          >
            {lien}
          </button>
        ))}
      </div>
    </section>
  )
}
