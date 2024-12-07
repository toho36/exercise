import axios from 'axios';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

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
