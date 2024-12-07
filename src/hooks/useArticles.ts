import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import { fetchArticles } from '@/api/fetchArticles';

export function useArticles() {
  // Add a new state variable for multiple articles
  const articles = useStore(state => state.articles);
  const setArticles = useStore(state => state.setArticles);
  const authData = useStore(state => state.authData);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true); // Set loading to true when starting the fetch
      setError(null); // Reset previous errors
      try {
        const fetchedArticles = await fetchArticles(authData?.token || '', authData?.xApiKey || '');
        const articlesWithAuthor = fetchedArticles.map(article => ({
          ...article,
          author: authData?.tenant || article.author,
        }));
        setArticles(articlesWithAuthor); // Save the articles in the store
      } catch (error) {
        console.error('Failed to load articles:', error);
        setError('Failed to load articles. Please try again later.'); // Set error message
      } finally {
        setIsLoading(false); // Set loading to false after fetching is done
      }
    };

    if (authData) loadArticles();
  }, [authData, setArticles]); // Dependency on authData
  return { articles, setArticles, isLoading, error };
}
