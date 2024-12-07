import { useState } from 'react';
import axios from 'axios';
import { IArticles } from '@/store/slices/articlesSlice';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

export const useDeleteArticle = (
  articles: IArticles[] | null,
  setArticles: (articles: IArticles[]) => void,
  authData: any,
) => {
  const [open, setOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    if (!articleToDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/articles/${articleToDelete}`, {
        headers: {
          'Authorization': `Bearer ${authData?.token || ''}`,
          'X-API-KEY': authData?.xApiKey || '',
        },
      });

      if (articles) {
        const updatedArticles = articles.filter(article => article.articleId !== articleToDelete);
        setArticles(updatedArticles);
      }

      setArticleToDelete(null);
    } catch (error: any) {
      console.error('Error deleting article:', error.response?.data || error.message);
    } finally {
      setOpen(false);
    }
  };

  const requestDelete = (articleId: string) => {
    setArticleToDelete(articleId);
    handleOpen();
  };

  return { open, handleOpen, handleDelete, requestDelete };
};
