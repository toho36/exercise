import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/store';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

/**
 * A custom hook that manages the state and submission logic for updating an article.
 * It provides functionality to handle form input for the article's title and perex,
 * and it submits updates to the backend API.
 *
 * @param {string} articleId - The ID of the article to update.
 * @param {string} initialTitle - The initial title of the article.
 * @param {string} initialPerex - The initial perex (summary) of the article.
 *
 * @returns {object} An object containing the following properties and functions:
 *   - `title`: The current value of the article's title.
 *   - `setTitle`: A function to update the title in the form.
 *   - `value`: The current value of the article's perex (summary).
 *   - `setValue`: A function to update the perex in the form.
 *   - `isSubmitting`: A boolean indicating if the form is in the process of submitting.
 *   - `handleUpdate`: A function that submits the updated article information to the API.
 *
 * @example
 * const { title, setTitle, value, setValue, isSubmitting, handleUpdate } = useArticleForm(articleId, initialTitle, initialPerex);
 *
 * // Handle form submit
 * const onSubmit = () => {
 *   handleUpdate(imageId, markedForDeletion);
 * };
 */
export function useArticleForm(articleId: string, initialTitle: string, initialPerex: string) {
  const [title, setTitle] = useState(initialTitle);
  const [value, setValue] = useState(initialPerex);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const authData = useStore(state => state.authData);

  const handleUpdate = async (imageId: string | undefined, markedForDeletion: boolean) => {
    if (!title || !value) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.patch(
        `${API_BASE_URL}/articles/${articleId}`,
        {
          title,
          perex: value,
          imageId: markedForDeletion ? undefined : imageId,
        },
        {
          headers: {
            'Authorization': `Bearer ${authData?.token || ''}`,
            'X-API-KEY': authData?.xApiKey || '',
            'Content-Type': 'application/json',
          },
        },
      );
      navigate('/my');
    } catch (error: any) {
      console.error('Error updating article:', error.response?.data || error.message);
      alert('Failed to update article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title,
    setTitle,
    value,
    setValue,
    isSubmitting,
    handleUpdate,
  };
}
