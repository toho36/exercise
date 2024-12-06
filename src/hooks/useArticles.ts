import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import { IArticle, fetchArticles } from '@/api/fetchArticles';

export function useArticles() {
  const [articles, setArticles] = useState<IArticle[]>([]);
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
  return { articles, setArticles };
}
