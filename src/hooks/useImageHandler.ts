import { useState } from 'react';
import axios from 'axios';
import { useStore } from '@/store/store';
import { API_BASE_URL } from '@/config';

/**
 * A custom hook that handles image upload, preview, and deletion for an article.
 * Provides functionality to upload an image, preview it, mark it for deletion, and delete it from the server.
 *
 * @param {string | undefined} articleImageId - The ID of the article's image to be deleted (optional).
 *
 * @returns {object} - An object containing the following properties and functions:
 *   - `image`: The selected image file for upload.
 *   - `imagePreview`: The preview URL of the image (base64 string).
 *   - `markedForDeletion`: A boolean indicating if the image is marked for deletion.
 *   - `setImagePreview`: A function to manually set the image preview.
 *   - `setMarkedForDeletion`: A function to manually set the deletion flag.
 *   - `handleImagePreviewDelete`: A function to handle the deletion of the image preview and mark it for deletion.
 *   - `handleImageUpload`: A function to upload an image to the server and return the image ID.
 *   - `handleImageDelete`: A function to delete the image from the server.
 *   - `handleImageChange`: A function to handle image selection, update the state, and generate a preview.
 *
 * @example
 * const { image, imagePreview, handleImageUpload, handleImageDelete, handleImageChange } = useImageHandler(articleImageId);
 *
 * // Handle image upload
 * const imageId = await handleImageUpload(image);
 *
 * // Handle image change (e.g., selecting a new image)
 * <input type="file" onChange={handleImageChange} />
 *
 * // Handle image deletion
 * handleImageDelete();
 */
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
