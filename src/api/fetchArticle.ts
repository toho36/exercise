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
export async function fetchArticle(
  accessToken: string,
  apiKey: string,
  articleId: string,
): Promise<IArticle> {
  console.log(accessToken, 'token');
  console.log(apiKey, 'key');
  console.log(articleId, ' iddd');
  try {
    const response = await axios.get<{
      [x: string]: any;
      item: IArticle;
    }>(`${API_BASE_URL}/articles/${articleId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-API-KEY': apiKey,
      },
    });

    const article = response.data;

    // Fetches image for the article by calling fetchImage function and adds the image URL to the article object as imgBlob property.
    console.log(article.imageId, 'img id');

    const imageBlob = await fetchImage(article.imageId, accessToken, apiKey);
    const fullArticle: IArticle = {
      ...article.item,
      imgBlob: imageBlob,
    };

    return fullArticle;
  } catch (error: any) {
    console.error('Error fetching article:', error.response?.data || error.message);
    throw error;
  }
}
