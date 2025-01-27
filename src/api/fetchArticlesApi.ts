import apiClient from './apiClient';
import { fetchImageApi } from '@/api/fetchImageApi';
import { IArticles } from '@/store/slices/articlesSlice';

/**
 * Fetches articles from the API and their corresponding images.
 * @returns {Promise<IArticles[]>} A promise that resolves to an array of articles with images.
 * @throws {Error} If there is an error fetching the articles.
 */
export async function fetchArticlesApi(): Promise<IArticles[]> {
  const response = await apiClient.get<{ items: IArticles[] }>('/articles');

  if (!Array.isArray(response.data.items)) {
    throw new Error('API response does not contain an array of articles');
  }

  const articles = response.data.items;

  // Fetch images and handle missing or failed image fetches.
  const articlesWithImages = await Promise.all(
    articles.map(async (article) => {
      if (!article.imageId) {
        // Skip fetching the image if imageId is null
        return { ...article, imgBlob: '' };
      }
      try {
        const imageUrl = await fetchImageApi(article.imageId);
        return { ...article, imgBlob: imageUrl }; // Add imgBlob property with fetched image URL.
      } catch (error) {
        const err = error as Error; // Explicitly cast the error to type Error.
        console.warn(`Failed to fetch image for article ID ${article.articleId}:`, err.message);
        return { ...article, imgBlob: '' }; // If fetching the image fails, use an empty string.
      }
    }),
  );

  return articlesWithImages;
}