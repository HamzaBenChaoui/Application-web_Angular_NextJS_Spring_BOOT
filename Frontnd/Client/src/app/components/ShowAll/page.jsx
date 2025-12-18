"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/app/services/productService";

export default function Example() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur récupération produits :", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ⏳ Loading
  if (loading) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          Chargement des produits...
        </div>
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center text-red-600">
          Erreur : Impossible de charger les produits. Veuillez réessayer.
        </div>
      </div>
    );
  }

  // 📭 Aucun produit
  if (products.length === 0) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          Aucun produit à afficher pour le moment.
        </div>
      </div>
    );
  }

  // ✅ Affichage produits
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <a
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
            >
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={product.image}
                  alt={product.nameProducts}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>

              <h3 className="mt-4 text-sm text-gray-700">
                {product.nameProducts}
              </h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.stack} €/jour
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
