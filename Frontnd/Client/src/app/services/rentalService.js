import api from './api';

const API_URL = '/api/rentals'; // The base is now in api.js

/**
 * Creates a new rental request via the API.
 * @param {object} rentalData - The rental request data (e.g., { productId, userId, startDate, endDate }).
 * @returns {Promise<object>} The response from the API.
 */
export const rentProduct = async (rentalData) => {
  try {
    // Use the 'api' instance which has the interceptor
    const response = await api.post(`${API_URL}/rent`, rentalData);
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error("FORBIDDEN");
    }

    const errorMessage = error.response?.data?.message || error.response?.data || error.message;
    if (typeof errorMessage === 'string' && errorMessage.includes("Product is not available for rent")) {
      throw new Error("PRODUCT_UNAVAILABLE");
    }

    throw new Error('An unknown error occurred during rental.');
  }
};

/**
 * Ends an active rental via the API.
 * @param {number} rentalId - The ID of the rental to end.
 * @returns {Promise<object>} The response from the API.
 */
export const endRental = async (rentalId) => {
  try {
    // Use the 'api' instance
    const response = await api.put(`${API_URL}/${rentalId}/end`);
    return response.data;
  } catch (error) {
    console.error(`Error ending rental ${rentalId} via API:`, error.response?.data || error.message);
    throw error.response?.data || new Error('An unknown error occurred while ending the rental.');
  }
};

/**
 * Retrieves a list of all rentals via the API, optionally filtered by user ID.
 * @param {number} [userId] - Optional user ID to filter rentals.
 * @returns {Promise<Array<object>>} An array of rental objects.
 */
export const getRentals = async (userId) => {
  try {
    const url = userId ? `${API_URL}/user/${userId}` : API_URL;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching rentals via API:', error.response?.data || error.message);
    throw error.response?.data || new Error('An unknown error occurred while fetching rentals.');
  }
};


