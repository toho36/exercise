import { ButtonDefault } from '@/components/ui/button';
import { InputDefault } from '@/components/ui/input';
import React, { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { useArticle } from '@/hooks/useArticle';
import { useParams, useNavigate } from 'react-router-dom';
import { DefaultSkeleton } from '@/components/layout/skeleton/skeleton';
import { useStore } from '@/store/store';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

export function EditArticlePage() {
  const { articleId } = useParams();
  const { article } = useArticle(articleId);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [markedForDeletion, setMarkedForDeletion] = useState(false);

  const navigate = useNavigate();
  const authData = useStore(state => state.authData);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setValue(article.perex);
      setImagePreview(article.imgBlob);
    }
  }, [article]);

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

  const handleImageDelete = () => {
    setImagePreview(null); // Clear the preview
    setMarkedForDeletion(true); // Mark the image for deletion
  };

  const handleUpdate = async () => {
    if (!title || !value) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    if (markedForDeletion) {
      if (article?.imageId) {
        try {
          await axios.delete(`${API_BASE_URL}/images/${article.imageId}`, {
            headers: {
              'Authorization': `Bearer ${authData?.token || ''}`,
              'X-API-KEY': authData?.xApiKey || '',
            },
          });

          // After deleting the image, update the article object and set imageId to undefined
          await axios.patch(
            `${API_BASE_URL}/articles/${articleId}`,
            {
              imageId: undefined,
            },
            {
              headers: {
                'Authorization': `Bearer ${authData?.token || ''}`,
                'X-API-KEY': authData?.xApiKey || '',
                'Content-Type': 'application/json',
              },
            },
          );
          setImagePreview(null); // Clear image preview
        } catch (error: any) {
          console.error('Error deleting image:', error.response?.data || error.message);
          alert('Failed to delete image. Please try again.');
        }
      }
    }
    let imageId = undefined;
    if (image) {
      const uploadResult = await handleImageUpload(image);
      if (uploadResult === null) {
        alert('Failed to upload image. Please try again.');
        setIsSubmitting(false);
        return;
      } else {
        imageId = uploadResult;
      }
    }
    try {
      await axios.patch(
        `${API_BASE_URL}/articles/${articleId}`,
        {
          title,
          perex: value,
          imageId,
        },
        {
          headers: {
            'Authorization': `Bearer ${authData?.token || ''}`,
            'X-API-KEY': authData?.xApiKey || '',
            'Content-Type': 'application/json',
          },
        },
      );
      navigate('/my'); // Navigate back to the articles list or a success page
    } catch (error: any) {
      console.error('Error updating article:', error.response?.data || error.message);
      alert('Failed to update article. Please try again.');
    } finally {
      setIsSubmitting(false);
      setMarkedForDeletion(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  if (!article) {
    return <DefaultSkeleton />;
  }

  return (
    <div className="my-5 w-2/4">
      <div className="flex gap-8">
        <p className="text-2xl">Edit Article</p>
        <ButtonDefault
          color="blue"
          text={isSubmitting ? 'Saving...' : 'Save Changes'}
          onClick={handleUpdate}
          disabled={isSubmitting}
        />
      </div>

      <div className="my-3">
        <label htmlFor="articleTitle" className="block">
          Article Title
        </label>
        <InputDefault
          placeholder="Enter article title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className="my-3">
        <label htmlFor="featuredImage" className="block">
          Featured Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="upload-button"
        />
        <ButtonDefault
          color="blue-gray"
          text="Upload New Image"
          onClick={() => document.getElementById('upload-button')?.click()}
        />
        {imagePreview && (
          <div className="mt-3">
            <img src={imagePreview} alt="Image Preview" className="w-32 h-32 object-cover" />
          </div>
        )}
        {imagePreview && (
          <div className="mt-3">
            <ButtonDefault color="red" text="Delete Image" onClick={handleImageDelete} />
          </div>
        )}
      </div>

      <div className="my-3">
        <label htmlFor="content" className="block">
          Content
        </label>
        <div data-color-mode="light">
          <div className="wmde-markdown-var"> </div>
          <MDEditor value={value} onChange={newValue => setValue(newValue || '')} />
        </div>
      </div>
    </div>
  );
}
