import apiClient from './apiClient';

/**
 * Deletes an article from the API.
 * @param {string} articleId - The ID of the article to be deleted.
 * @throws {Error} If there is an error deleting the article.
 */
export async function deleteArticleApi(articleId: string) {
  await apiClient.delete(`/articles/${articleId}`);
}
