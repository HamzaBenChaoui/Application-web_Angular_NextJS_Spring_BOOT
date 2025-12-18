// src/app/services/authService.js
import axios from 'axios';


const API_URL = 'http://localhost:8081/api/api/user/auth';



/**
 * Enregistre un nouvel utilisateur via l'API.
 * 
 * 
 * @param {object} userData - Les données de l'utilisateur (ex: { nom, email, password }).
 * @returns {Promise<object>} La réponse de l'API.
 */
export const registerUser = async (userData) => {
  console.log("Données utilisateur envoyées à l'inscription:", userData);
  try {
    const response = await axios.post(`${API_URL}/register`,userData,{ withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erreur complète lors de l'inscription:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Données de la réponse d'erreur:", error.response.data);
      console.error("Statut de la réponse d'erreur:", error.response.status);
      console.error("En-têtes de la réponse d'erreur:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("La requête a été faite mais aucune réponse na été reçue:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Erreur lors de la configuration de la requête:", error.message);
    }
    console.error("Erreur lors de l'inscription via l'API:", error.response?.data || error.message);
    throw error.response?.data || new Error("Une erreur inconnue est survenue lors de l'inscription.");
  }
};

/**
 * 
 * 
 * Connecte un utilisateur via l'API.
 * @param {string} email - L'e-mail de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<object>} Les données de l'utilisateur trouvé.
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
    return response.data;
  } catch (error) {
    // Create a new error object to ensure we always throw an Error instance
    const apiError = new Error(error.response?.data?.message || "Une erreur est survenue lors de la tentative de connexion.");
    apiError.status = error.response?.status; // Attach status code
    apiError.data = error.response?.data; // Attach full data payload
    throw apiError; // Throw the new, structured error
  }
};
