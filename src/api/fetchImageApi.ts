import axios from 'axios';
import { API_BASE_URL } from '@/config';

/**
 * Fetches an image from the API based on the provided image ID.
 * @param {string} imageId - The ID of the image to fetch.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for authorization.
 * @returns {Promise<string>} A Promise that resolves to the URL of the fetched image.
 */
export async function fetchImageApi(
  imageId: string,
  accessToken: string,
  apiKey: string,
): Promise<string> {
  try {
    const response = await axios.get(`${API_BASE_URL}/images/${imageId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-API-KEY': apiKey,
      },
      responseType: 'blob', // Ensure the response is a blob
    });
    return URL.createObjectURL(response.data); // Convert blob to object URL
  } catch (error: any) {
    console.error('Error fetching image:', error.response?.data || error.message);
    throw error;
  }
}
