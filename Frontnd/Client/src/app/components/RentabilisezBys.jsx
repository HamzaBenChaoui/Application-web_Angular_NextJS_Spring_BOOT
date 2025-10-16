"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function RentabilisezBys() {
  return (
    <section className="bg-blue-500 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between text-white max-w-7xl mx-auto my-10 shadow-lg">
      
      {/* Texte à gauche */}
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Rentabilisez votre <br /> Bysclet  !
        </h1>
        <p className="text-lg md:text-xl">
          Avec Getaround Connect, votre Bysclet vous rapporte jusqu'à{" "}
          <span className="font-semibold">800€ / mois</span>.
        </p>

        <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-100 transition">
          Louer ma Bysclet
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Image à droite */}
      <div className="flex-1 mt-10 md:mt-0 md:ml-8">
        <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/bysclet.jpg" // remplace par ton image
            alt="Homme au volant"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
