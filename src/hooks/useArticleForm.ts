import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/store';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

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
