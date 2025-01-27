import apiClient from './apiClient';
import { fetchImageApi } from '@/api/fetchImageApi';

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
  imgBlob?: string;
}

/**
 * Fetches an article from the API and its corresponding image.
 * @param {string} articleId - The ID of the article to fetch.
 * @returns {Promise<IArticle>} A promise that resolves to an article with an image.
 */
export async function fetchArticleApi(articleId: string): Promise<IArticle> {
  const response = await apiClient.get(`/articles/${articleId}`);
  const article: IArticle = response.data;

  if (article.imageId) {
    const imageBlob = await fetchImageApi(article.imageId);
    article.imgBlob = imageBlob;
  } else {
    article.imgBlob = '';
  }

  return article;
}
