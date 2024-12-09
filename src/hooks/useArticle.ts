import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import { fetchArticleApi, IArticle } from '@/api/fetchArticleApi';

/**
 * A custom hook that fetches and manages the state of a single article.
 * It retrieves the article details based on the provided `articleId` and
 * provides loading and error states during the fetch process.
 *
 * @param {string | undefined} articleId - The ID of the article to fetch. If not provided, an empty string will be used.
 *
 * @returns {object} An object containing the following properties:
 *   - `article`: The article data (or null if not loaded).
 *   - `isLoading`: A boolean indicating if the article is currently being fetched.
 *   - `error`: A string error message if the fetch failed, otherwise null.
 *
 * @example
 * const { article, isLoading, error } = useArticle(articleId);
 *
 * // Display article data or loading/error state
 * if (isLoading) {
 *   return <div>Loading...</div>;
 * }
 * if (error) {
 *   return <div>{error}</div>;
 * }
 * return <div>{article?.title}</div>;
 */
export function useArticle(articleId?: string) {
  const [article, setArticle] = useState<IArticle | null>(null);
  const authData = useStore(state => state.authData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      setError(null);
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
        setError('Failed to load article. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (authData) loadArticles();
  }, [authData, articleId]);
  return { article, isLoading, error };
}
