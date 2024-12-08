import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import { fetchArticlesApi } from '@/api/fetchArticlesApi';

/**
 * A custom hook that fetches a list of articles from an API, handles loading and error states,
 * and saves the articles in a global store. It also adds the author's information based on
 * the tenant from the authentication data.
 *
 * @returns {object} - An object containing the following properties and functions:
 *   - `articles`: The list of articles fetched from the API and stored in the global store.
 *   - `setArticles`: A function to update the articles in the global store.
 *   - `isLoading`: A boolean indicating whether the articles are still being loaded.
 *   - `error`: An error message if there was an issue loading the articles, or `null` if there was no error.
 *
 * @example
 * const { articles, isLoading, error } = useArticles();
 *
 * // Display loading state
 * if (isLoading) return <div>Loading...</div>;
 *
 * // Display error state
 * if (error) return <div>{error}</div>;
 *
 * // Display the list of articles
 * return <div>{articles.map(article => <Article key={article.articleId} {...article} />)}</div>;
 */
export function useArticles() {
  const articles = useStore(state => state.articles);
  const setArticles = useStore(state => state.setArticles);
  const authData = useStore(state => state.authData);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true); // Set loading to true when starting the fetch
      setError(null); // Reset previous errors
      try {
        const fetchedArticles = await fetchArticlesApi(
          authData?.token || '',
          authData?.xApiKey || '',
        );
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
