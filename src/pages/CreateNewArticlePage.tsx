import { ButtonDefault } from '@/components/ui/button';
import { InputDefault } from '@/components/ui/input';
import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { useStore } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { useImageHandler } from '@/hooks/useImageHandler'; // Import the hook

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

export function CreateNewArticlePage() {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('**Hello world!!!**');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const authData = useStore(state => state.authData);
  const { image, imagePreview, handleImageUpload, handleImageChange } = useImageHandler(undefined);

  const handlePublish = async () => {
    if (!title || !value) {
      alert('Please fill in all fields.');
      return;
    }
    setIsLoading(true);

    let imageId: string | null = null;
    if (image) {
      imageId = await handleImageUpload(image);
      if (!imageId) {
        alert('Failed to upload image. Please try again.');
        setIsLoading(false);
        return;
      }
    }

    try {
      const payload: any = {
        title,
        perex: value,
      };

      if (imageId) {
        payload.imageId = imageId;
      }

      await axios.post(`${API_BASE_URL}/articles`, payload, {
        headers: {
          'Authorization': `Bearer ${authData?.token || ''}`,
          'X-API-KEY': authData?.xApiKey || '',
          'Content-Type': 'application/json',
        },
      });
      navigate('/my');
    } catch (error: any) {
      console.error('Error publishing article:', error.response?.data || error.message);
      alert('Failed to publish article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-5 w-2/4">
      <div className="flex gap-8">
        <p className="text-2xl">Create New Article</p>
        <ButtonDefault
          color="blue"
          text={isLoading ? 'Publishing...' : 'Publish Article'}
          onClick={handlePublish}
          disabled={isLoading}
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
          text="Upload Image"
          onClick={() => document.getElementById('upload-button')?.click()}
        />
        {imagePreview && (
          <div className="mt-3">
            <img src={imagePreview} alt="Image Preview" className="w-32 h-32 object-cover" />
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
