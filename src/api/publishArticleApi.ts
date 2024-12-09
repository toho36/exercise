import axios from 'axios';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

export async function publishArticle(
  title: string,
  value: string,
  imageId: string | null,
  authData: any,
) {
  const payload: any = {
    title,
    perex: value,
  };

  if (imageId) {
    payload.imageId = imageId;
  }

  return await axios.post(`${API_BASE_URL}/articles`, payload, {
    headers: {
      'Authorization': `Bearer ${authData?.token || ''}`,
      'X-API-KEY': authData?.xApiKey || '',
      'Content-Type': 'application/json',
    },
  });
}
