import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import { fetchArticleApi, IArticle } from '@/api/fetchArticleApi';

export function useArticle(articleId?: string) {
  const [article, setArticle] = useState<IArticle | null>(null);
  // Add a new state variable for multiple articles
  const authData = useStore(state => state.authData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true); // Set loading to true when starting the fetch
      setError(null); // Reset previous errors
      try {
        const fetchedArticle = await fetchArticleApi(
          authData?.token || '',
          authData?.xApiKey || '',
          articleId || '',
        );
        const articleWithAuthor = {
          ...fetchedArticle,
          author: authData?.tenant || fetchedArticle.author,
        };
        setArticle(articleWithAuthor);
      } catch (error) {
        setError('Failed to load article. Please try again later.'); // Set error message
      } finally {
        setIsLoading(false); // Set loading to false after fetching is done
      }
    };

    if (authData) loadArticles();
  }, [authData, articleId]);
  return { article, isLoading, error };
}
