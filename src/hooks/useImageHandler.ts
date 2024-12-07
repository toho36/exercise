import { useState } from 'react';
import axios from 'axios';
import { useStore } from '@/store/store';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

export function useImageHandler(articleImageId: string | undefined) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [markedForDeletion, setMarkedForDeletion] = useState(false);
  const authData = useStore(state => state.authData);

  const handleImageUpload = async (imageFile: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await axios.post(`${API_BASE_URL}/images`, formData, {
        headers: {
          'Authorization': `Bearer ${authData?.token || ''}`,
          'X-API-KEY': authData?.xApiKey || '',
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data[0].imageId;
    } catch (error: any) {
      console.error('Error uploading image:', error.response?.data || error.message);
      return null;
    }
  };

  const handleImagePreviewDelete = async () => {
    setImagePreview(null);
    setMarkedForDeletion(true);
  };

  const handleImageDelete = async () => {
    if (articleImageId) {
      try {
        await axios.delete(`${API_BASE_URL}/images/${articleImageId}`, {
          headers: {
            'Authorization': `Bearer ${authData?.token || ''}`,
            'X-API-KEY': authData?.xApiKey || '',
          },
        });
        setImagePreview(null);
        setMarkedForDeletion(true);
      } catch (error: any) {
        console.error('Error deleting image:', error.response?.data || error.message);
        alert('Failed to delete image. Please try again.');
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarkedForDeletion(false);

    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return {
    image,
    imagePreview,
    markedForDeletion,
    setImagePreview,
    setMarkedForDeletion,
    handleImagePreviewDelete,
    handleImageUpload,
    handleImageDelete,
    handleImageChange,
  };
}
