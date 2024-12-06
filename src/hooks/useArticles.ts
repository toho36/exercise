import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import { fetchArticles } from '@/api/fetchArticles';
import { fetchArticle, IArticle } from '@/api/fetchArticle';
import { IArticles } from '@/store/slices/articlesSlice';

export function useArticles(articleId?: string) {
  const [article, setArticle] = useState<IArticle | null>(null);
  // Add a new state variable for multiple articles
  const [articles, setArticles] = useState<IArticles[]>([]);
  const authData = useStore(state => state.authData);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        if (articleId) {
          const fetchedArticle = await fetchArticle(
            authData?.token || '',
            authData?.xApiKey || '',
            articleId,
          );

          setArticle(fetchedArticle);
        } else {
          const fetchedArticles = await fetchArticles(
            authData?.token || '',
            authData?.xApiKey || '',
          );
          const articlesWithAuthor = fetchedArticles.map(article => ({
            ...article,
            author: authData?.tenant || article.author,
          }));
          // Use the new setArticles function here
          setArticles(articlesWithAuthor);
        }
      } catch (error) {
        console.error('Failed to load articles or article:', error);
      }
    };

    if (authData) loadArticles();
  }, [authData, articleId]);
  return { articles, setArticles, article };
}
