import { ButtonDefault } from '@/components/ui/button';
import { InputDefault } from '@/components/ui/input';
import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { useStore } from '@/store/store';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

export function CreateNewArticlePage() {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('**Hello world!!!**');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const authData = useStore(state => state.authData);

  const handleImageUpload = async (imageFile: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile); // Append the file with the key 'image'

      const response = await axios.post(`${API_BASE_URL}/images`, formData, {
        headers: {
          'Authorization': `Bearer ${authData?.token || ''}`,
          'X-API-KEY': authData?.xApiKey || '',
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
      return response.data[0].imageId;
    } catch (error: any) {
      console.error('Error uploading image:', error.response?.data || error.message);
      return null;
    }
  };
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
