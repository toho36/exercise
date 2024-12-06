import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStore } from '@/store/store';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

export interface Article {
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

async function fetchArticles(accessToken: string, apiKey: string): Promise<Article[]> {
  try {
    const response = await axios.get<{ items: Article[] }>(`${API_BASE_URL}/articles`, {
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

async function fetchImage(imageId: string, accessToken: string, apiKey: string): Promise<string> {
  try {
    const response = await axios.get(`${API_BASE_URL}/images/${imageId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-API-KEY': apiKey,
      },
      responseType: 'blob', // Ensure the response is a blob
    });
    return URL.createObjectURL(response.data); // Convert blob to object URL
  } catch (error: any) {
    console.error('Error fetching image:', error.response?.data || error.message);
    throw error;
  }
}

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const authData = useStore(state => state.authData);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const fetchedArticles = await fetchArticles(authData?.token || '', authData?.xApiKey || '');

        const articlesWithAuthor = fetchedArticles.map(article => ({
          ...article,
          author: authData?.tenant || article.author,
        }));
        setArticles(articlesWithAuthor);
      } catch (error) {
        console.error('Failed to load articles or images:', error);
      }
    };

    if (authData) loadArticles();
  }, [authData]);
  console.log(articles, 'hello');
  return { articles };
}
