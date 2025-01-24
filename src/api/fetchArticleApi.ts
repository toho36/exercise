import axios from 'axios';
import { fetchImageApi } from '@/api/fetchImageApi';
import { API_BASE_URL } from '@/config';

export interface IArticle {
  articleId: string;
  imageId?: string;
  category: string;
  title: string;
  author: string;
  content?: string | null;
  createdAt: string;
  perex: string;
  comments: number;
  imgBlob?: string; // Add this optional property
}

/**
 * Fetches articles from the API and their corresponding images.
 * @param {string} accessToken - The access token for authentication.
 * @param {string} apiKey - The API key for authentication.
 * @returns {Promise<Article[]>} A promise that resolves to an array of articles with images.
 * @throws {Error} If there is an error fetching the articles.
 */
export async function fetchArticleApi(
  accessToken: string,
  apiKey: string,
  articleId: string,
): Promise<IArticle> {
  try {
    const response = await axios.get(`${API_BASE_URL}/articles/${articleId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'x-api-key': apiKey,
      },
    });

    const article: IArticle = response.data;
    if (article.imageId) {
      const imageBlob = await fetchImageApi(article.imageId, accessToken, apiKey);
      const fullArticle: IArticle = {
        ...article,
        imgBlob: imageBlob,
      };
      return fullArticle;
    }
    const fullArticle: IArticle = {
      ...article,
      imgBlob: '',
    };
    return fullArticle;
  } catch (error) {
    console.error('Error fetching the article or image:', error);
    throw error;
  }
}
