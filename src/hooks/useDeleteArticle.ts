import { useState } from 'react';
import { IArticles } from '@/store/slices/articlesSlice';
import { deleteArticleApi } from '@/api/deleteArticleApi';

/**
 * A custom hook that handles the deletion of an article.
 * It provides the logic for opening a confirmation modal, performing the delete action, and updating the article list.
 *
 * @param {IArticles[] | null} articles - The list of articles that may need to be updated after deletion.
 * @param {Function} setArticles - The setter function used to update the articles state after an article is deleted.
 * @param {object} authData - The authentication data containing the token and API key for authorization.
 * @param {string} authData.token - The authentication token for authorization.
 * @param {string} authData.xApiKey - The API key for authentication.
 *
 * @returns {object} - An object containing the following properties and functions:
 *   - `open`: A boolean indicating if the delete confirmation modal is open.
 *   - `handleOpen`: A function to toggle the open state of the delete confirmation modal.
 *   - `handleDelete`: A function to delete the selected article and update the articles list.
 *   - `requestDelete`: A function to request the deletion of an article by setting the article ID to be deleted and opening the confirmation modal.
 *
 * @example
 * const { open, handleOpen, handleDelete, requestDelete } = useDeleteArticle(articles, setArticles, authData);
 *
 * // Request article deletion
 * requestDelete('articleId'); // Sets the article to be deleted and opens the confirmation modal
 *
 * // Handle article deletion
 * handleDelete(); // Deletes the article and updates the list
 */
export function useDeleteArticle(
  articles: IArticles[] | null,
  setArticles: (articles: IArticles[]) => void,
  authData: any,
) {
  const [open, setOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    if (!articleToDelete) return;

    try {
      await deleteArticleApi(articleToDelete);

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
}
