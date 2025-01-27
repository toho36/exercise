import apiClient from './apiClient';

export async function publishArticleApi(title: string, value: string, imageId: string | null) {
  const payload: any = {
    title,
    perex: value,
  };

  if (imageId) {
    payload.imageId = imageId;
  }

  return await apiClient.post('/articles', payload);
}
