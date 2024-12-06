import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import { fetchArticle, IArticle } from '@/api/fetchArticle';

export function useArticle(articleId?: string) {
  const [article, setArticle] = useState<IArticle | null>(null);
  // Add a new state variable for multiple articles
  const authData = useStore(state => state.authData);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const fetchedArticle = await fetchArticle(
          authData?.token || '',
          authData?.xApiKey || '',
          articleId || '',
        );

        setArticle(fetchedArticle);
      } catch (error) {
        console.error('Failed to load articles or article:', error);
      }
    };

    if (authData) loadArticles();
  }, [authData, articleId]);
  return { article };
}
