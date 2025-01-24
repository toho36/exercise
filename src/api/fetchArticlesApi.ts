import axios from 'axios';
import { fetchImageApi } from '@/api/fetchImageApi';
import { IArticles } from '@/store/slices/articlesSlice';
import { API_BASE_URL } from '@/config';

/**
 * Fetches articles from the API and their corresponding images.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for authentication.
 * @returns {Promise<IArticles[]>} A promise that resolves to an array of articles with images.
 * @throws {Error} If there is an error fetching the articles.
 */
export async function fetchArticlesApi(accessToken: string, apiKey: string): Promise<IArticles[]> {
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
    console.log(articles, 'response?');
    const articlesWithImages = await Promise.all(
      articles.map(async article => {
        if (!article.imageId) {
          // Skip fetching the image if imageId is null
          return { ...article, imgBlob: '' };
        }
        try {
          const imageUrl = await fetchImageApi(article.imageId, accessToken, apiKey);
          return { ...article, imgBlob: imageUrl }; // Add imgBlob property with fetched image URL.
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
