import axios from 'axios';
import { fetchImage } from '@/api/fetchImage';
import { IArticles } from '@/store/slices/articlesSlice';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

/**
 * Fetches articles from the API and their corresponding images.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for authentication.
 * @returns {Promise<IArticles[]>} A promise that resolves to an array of articles with images.
 * @throws {Error} If there is an error fetching the articles.
 */
export async function fetchArticles(accessToken: string, apiKey: string): Promise<IArticles[]> {
  try {
    const response = await axios.get<{ items: IArticles[] }>(`${API_BASE_URL}/articles`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-API-KEY': apiKey,
      },
    });

    if (!Array.isArray(response.data.items)) {
      throw new Error('API response does not contain an array of articles');
    }

    const articles = response.data.items;

    // Fetch images and handle missing or failed image fetches.
    const articlesWithImages = await Promise.all(
      articles.map(async article => {
        try {
          if (article.imageId) {
            const imageUrl = await fetchImage(article.imageId, accessToken, apiKey);
            return { ...article, imgBlob: imageUrl }; // Add imgBlob property with fetched image URL.
          }
          return { ...article, imgBlob: '' }; // No imageId, set imgBlob to an empty string.
        } catch (error) {
          const err = error as Error; // Explicitly cast the error to type Error.
          console.warn(`Failed to fetch image for article ID ${article.articleId}:`, err.message);
          return { ...article, imgBlob: '' }; // If fetching the image fails, use an empty string.
        }
      }),
    );

    return articlesWithImages;
  } catch (error: any) {
    console.error('Error fetching articles:', error.response?.data || error.message);
    throw error;
  }
}
