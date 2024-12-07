import axios from 'axios';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

/**
 * Deletes an article from the API.
 * @param {string} articleId - The ID of the article to be deleted.
 * @param {object} authData - The authentication data containing the token and API key.
 * @param {string} authData.token - The authentication token for authorization.
 * @param {string} authData.xApiKey - The API key for authentication.
 * @throws {Error} If there is an error deleting the article.
 */
export async function deleteArticleApi(articleId: string, authData: any) {
  try {
    await axios.delete(`${API_BASE_URL}/articles/${articleId}`, {
      headers: {
        'Authorization': `Bearer ${authData?.token || ''}`,
        'X-API-KEY': authData?.xApiKey || '',
      },
    });
  } catch (error: any) {
    throw new Error(error.response?.data || error.message);
  }
}
