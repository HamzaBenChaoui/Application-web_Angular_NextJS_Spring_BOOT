import api from './api';

const API_URL = '/api/products'; // The base is now in api.js

export const getProducts = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    // We throw the error to be handled by the component
    throw new Error('Impossible de récupérer les produits.');
  }
};
export const getProductsByType = async (type = null) => {
  try {
    let url = API_URL;

    if (type) {
      url = `${API_URL}/search?type=${type}`;
    }

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Erreur récupération produits:", error);
    throw new Error("Impossible de récupérer les produits.");
  }
};


export const getProductById = async (id) => {
  console.log(`Fetching product with ID: ${id}`); // Added for debugging
  try {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du produit ${id}:`, error); // Log the full error
    throw new Error(`Impossible de récupérer le produit ${id}.`);
  }
};
