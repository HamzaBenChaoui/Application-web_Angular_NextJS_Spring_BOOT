
"use client";

import React from "react";
import Image from "next/image";

const motorcycles = Array(15).fill({
  name: "Yamaha MT-07",
  description: "Powerful 689cc motorcycle with modern naked design.",
  price: "89,000 MAD",
  image:
    "/moto.jpg",
});


const Products = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">
        🏍️ Our Motorcycles
      </h1>

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {motorcycles.map((moto, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <div className="relative w-full h-56">
              <Image
                src={moto.image}
                alt={moto.name}
                
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-5 space-y-2">
              <h2 className="text-xl font-semibold">{moto.name}</h2>
              <p className="text-gray-600">{moto.description}</p>
              <p className="text-lg font-bold text-blue-600">{moto.price}</p>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Details
                </button>
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
