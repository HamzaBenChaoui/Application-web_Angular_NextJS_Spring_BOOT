import api from './api';

const API_URL = '/api/allocations';

/**
 * Submits a request for allocation with client data.
 * @param {object} requestData - The data for the allocation request.
 *   (e.g., { rentalId, fullName, cne, address, phone, email })
 * @returns {Promise<object>} The response from the API.
 */
export const requestAllocation = async (requestData) => {
  try {
    const response = await api.post(`${API_URL}/request`, requestData);
    return response.data;
  } catch (error) {
    console.error('Error during allocation request via API:', error.response?.data || error.message);
    throw error.response?.data || new Error('An unknown error occurred during the allocation request.');
  }
};
