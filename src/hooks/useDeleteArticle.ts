import { useState } from 'react';
import { IArticles } from '@/store/slices/articlesSlice';
import { deleteArticleApi } from '@/api/deleteArticleApi';

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
      await deleteArticleApi(articleToDelete, authData);

      if (articles) {
        const updatedArticles = articles.filter(article => article.articleId !== articleToDelete);
        setArticles(updatedArticles);
      }

      setArticleToDelete(null);
    } catch (error: any) {
      console.error('Error deleting article:', error.message);
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
