"use client";
import { getProducts } from '@/app/services/productService';
import Card from './Card'; // Assurez-vous que le chemin est correct
import { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const prods = await getProducts();
        setProducts(prods);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Chargement des produits...</div>;
  }

  if (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return <div>Erreur: Impossible de charger les produits. Veuillez réessayer plus tard.</div>;
  }
  
  if (!products || products.length === 0) {
    return <div>Aucun produit à afficher pour le moment.</div>;
  }

  return (
    <div className="properties">
      {products.map((product) => (
        <Card data={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
