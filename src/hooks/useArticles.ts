import { useEffect, useState } from 'react';
import { useStore } from '@/store/store';
import { fetchArticles } from '@/api/fetchArticles';

export function useArticles() {
  // Add a new state variable for multiple articles
  const articles = useStore(state => state.articles);
  const setArticles = useStore(state => state.setArticles);
  const authData = useStore(state => state.authData);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const fetchedArticles = await fetchArticles(authData?.token || '', authData?.xApiKey || '');
        const articlesWithAuthor = fetchedArticles.map(article => ({
          ...article,
          author: authData?.tenant || article.author,
        }));
        // Use the new setArticles function here
        setArticles(articlesWithAuthor);
      } catch (error) {
        console.error('Failed to load articles or article:', error);
      }
    };

    if (authData) loadArticles();
  }, [authData]);
  return { articles, setArticles };
}
