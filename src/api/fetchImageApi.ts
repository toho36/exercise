import apiClient from './apiClient';

/**
 * Fetches an image from the API based on the provided image ID.
 * @param {string} imageId - The ID of the image to fetch.
 * @returns {Promise<string>} A Promise that resolves to the URL of the fetched image.
 */
export async function fetchImageApi(imageId: string): Promise<string> {
  const response = await apiClient.get(`/images/${imageId}`, {
    responseType: 'blob', // Ensure the response is a blob
  });
  return URL.createObjectURL(response.data); // Convert blob to object URL
}
