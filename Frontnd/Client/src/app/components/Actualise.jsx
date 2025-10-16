"use client";

import Image from "next/image";

export default function Actualise() {
  const news = [
    {
      tag: "#Propriétaires",
      title: "Lancement du programme de revenus garantis 2025",
      description:
        "Louez votre bicyclette ou moto et gagnez jusqu'à 800€ de revenus garantis.",
      image: "/bike-owner.jpg",
    },
    {
      tag: "#Location",
      title: "Combien coûte la location d'une bicyclette ou d'une moto au mois ?",
      description:
        "Réservez un deux-roues pour vos trajets quotidiens ou vos escapades pendant quelque temps.",
      image: "/scooter-rider.jpg",
    },
    {
      tag: "#Propriétaires",
      title: "Garez votre deux-roues là où il y a de la demande",
      description:
        "Maximisez vos revenus : déposez votre bicyclette ou moto dans les zones les plus demandées.",
      image: "/keys-bike.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 flex flex-col items-center py-16 px-4">
      {/* Section Actualités */}
      <h1 className="text-4xl font-bold text-purple-900 mb-10">Actualités</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {news.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-xl"
          >
            <div className="relative w-full h-56">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <span className="text-sm font-semibold bg-purple-100 text-purple-900 px-3 py-1 rounded-full">
                {item.tag}
              </span>
              <h2 className="mt-3 text-xl font-semibold text-gray-900">
                {item.title}
              </h2>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Section Explications */}
      <section className="mt-16 max-w-4xl w-full text-center">
        <p className="mt-2 text-slate-600">
          En quelques clics vous réservez un deux-roues proche de vous : vélo
          classique, vélo électrique, scooter ou moto. Louer avec Getaround Ride,
          c’est réduire la circulation et simplifier vos déplacements urbains.
        </p>

        {/* Étapes */}
        <div className="grid sm:grid-cols-2 gap-4 mt-8 text-left">
          <div className="p-4 rounded-lg border border-slate-100">
            <h3 className="font-semibold">1. Vérifiez votre profil</h3>
            <p className="mt-2 text-slate-600">
              Photographiez votre pièce d’identité et votre permis (pour les
              motos/scooters) depuis l’application. Une fois validé, vous pouvez
              réserver.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-slate-100">
            <h3 className="font-semibold">2. Choisissez votre deux-roues</h3>
            <p className="mt-2 text-slate-600">
              Filtres par type (vélo, vélo électrique, scooter, moto), autonomie,
              avis et prix — comparez photos et caractéristiques.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-slate-100">
            <h3 className="font-semibold">3. Réservez</h3>
            <p className="mt-2 text-slate-600">
              Voir la localisation, vérifier si le modèle propose l’ouverture
              sans rencontre (Getaround Connect Ride) puis confirmez la
              réservation.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-slate-100">
            <h3 className="font-semibold">4. Restituez</h3>
            <p className="mt-2 text-slate-600">
              Ramenez le deux-roues au point de départ avec le même niveau de
              charge (ou de carburant). Packs kilométriques disponibles selon le
              modèle.
            </p>
          </div>
        </div>

        {/* Pourquoi choisir */}
        <div className="p-4 rounded-lg border border-slate-100 mt-8 text-left">
          <h2 className="text-xl font-semibold">
            Pourquoi choisir Getaround Ride ?
          </h2>
          <ul className="mt-3 space-y-2 text-slate-600 list-disc list-inside">
            <li>
              Tarifs accessibles — à partir de <strong>10 €/jour</strong> pour un
              vélo.
            </li>
            <li>Assurance multirisque incluse et assistance 24/7.</li>
            <li>Large disponibilité — des milliers de deux-roues en Europe.</li>
            <li>
              Solution adaptée aux déplacements professionnels et livraisons.
            </li>
          </ul>
        </div>

        {/* Application et technologie */}
        <div className="p-4 rounded-lg border border-slate-100 mt-8 text-left">
          <h2 className="text-xl font-semibold">Application et technologie</h2>
          <p className="mt-2 text-slate-600">
            Grâce à l’application, vous réservez, ouvrez et restituez certains
            modèles via votre smartphone — tout sans contact pour une expérience
            fluide.
          </p>
        </div>

        {/* Devenir loueur */}
        <div className="p-4 rounded-lg border border-slate-100 mt-8 text-left">
          <h2 className="text-xl font-semibold">Devenez loueur</h2>
          <p className="mt-2 text-slate-600">
            Proposez votre vélo, scooter ou moto à la location et gagnez un
            revenu complémentaire : jusqu’à{" "}
            <strong>250 €/mois</strong> pour un vélo électrique, et davantage
            pour une moto ou un scooter.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            *Tarifs et disponibilités variables selon la ville, la période et le
            modèle.
          </p>
          <div className="mt-4">
            <a
              className="inline-block px-5 py-2 bg-slate-800 text-white rounded-md shadow hover:opacity-95 transition"
              href="#"
            >
              Télécharger l’application
            </a>
          </div>
        </footer>
      </section>
    </main>
  );
}
