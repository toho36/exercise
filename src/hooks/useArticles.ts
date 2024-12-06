import { useEffect, useState } from 'react';
import axios from 'axios';
import { useStore } from '@/store/store';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

interface Article {
  articleId: string;
  imageId: string;
  category: string;
  title: string;
  author: string;
  createdAt: string;
  perex: string;
  comments: number;
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
    return response.data.items;
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
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const authData = useStore(state => state.authData);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const fetchedArticles = await fetchArticles(authData?.token || '', authData?.xApiKey || '');
        setArticles(fetchedArticles);

        // Fetch images for each article
        const imagePromises = fetchedArticles.map(async article => {
          const imageUrl = await fetchImage(
            article.imageId,
            authData?.token || '',
            authData?.xApiKey || '',
          );
          return { articleId: article.articleId, imageUrl };
        });

        const images = await Promise.all(imagePromises);
        const imageMap = images.reduce(
          (acc, { articleId, imageUrl }) => {
            acc[articleId] = imageUrl;
            return acc;
          },
          {} as { [key: string]: string },
        );
        const articlesWithAuthor = fetchedArticles.map(article => ({
          ...article,
          author: authData?.tenant || article.author, // Use tenant as author
        }));
        setArticles(articlesWithAuthor);
        setImageUrls(imageMap);
      } catch (error) {
        console.error('Failed to load articles or images:', error);
      }
    };

    if (authData) loadArticles();
  }, [authData]);

  return { articles, imageUrls };
}
