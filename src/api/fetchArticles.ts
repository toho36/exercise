import axios from 'axios';
import { fetchImage } from '@/api/fetchImage';

export interface IArticle {
  articleId: string;
  imageId: string;
  category: string;
  title: string;
  author: string;
  createdAt: string;
  perex: string;
  comments: number;
  imgBlob: string;
}

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

/**
 * Fetches articles from the API and their corresponding images.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for authentication.
 * @returns {Promise<Article[]>} A promise that resolves to an array of articles with images.
 * @throws {Error} If there is an error fetching the articles.
 */
export async function fetchArticles(accessToken: string, apiKey: string): Promise<IArticle[]> {
  try {
    const response = await axios.get<{ items: IArticle[] }>(`${API_BASE_URL}/articles`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-API-KEY': apiKey,
      },
      // params: { offset, limit },
    });

    console.log('Articles:', response.data);
    if (!Array.isArray(response.data.items)) {
      throw new Error('API response does not contain an array of articles');
    }
    const articles = response.data.items;

    // Fetches images for each article by calling fetchImage function and adds the image URL to the article object as imgBlob property.
    const articlesWithImages = await Promise.all(
      articles.map(async article => {
        const imageUrl = await fetchImage(article.imageId, accessToken, apiKey);
        return { ...article, imgBlob: imageUrl }; // Add imgBlob property
      }),
    );
    return articlesWithImages;
  } catch (error: any) {
    console.error('Error fetching articles:', error.response?.data || error.message);
    throw error;
  }
}
