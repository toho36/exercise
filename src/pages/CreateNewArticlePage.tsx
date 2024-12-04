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
  const navigate = useNavigate();

  const authData = useStore(state => state.authData); // Retrieve auth data from the store

  const handleImageUpload = async (imageFile: File): Promise<string | null> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/images`, imageFile, {
        headers: {
          'Authorization': `Bearer ${authData?.token || ''}`, // Ensure token is correct
          'X-API-KEY': authData?.xApiKey || '', // Ensure xApiKey is correct
          'Content-Type': imageFile.type, // Set the content type to the file's MIME type
        },
      });

      return response.data.imageId;
    } catch (error: any) {
      console.error('Error uploading image:', error.response?.data || error.message);
      return null;
    }
  };

  const handlePublish = async () => {
    if (!image) {
      console.error('No image selected');
      return;
    }
    const imageId = await handleImageUpload(image);
    if (!imageId) {
      console.error('Failed to upload image');
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/articles`,
        {
          title: title,
          perex: value,
          imageId: imageId,
        },
        {
          headers: {
            'Authorization': `Bearer ${authData?.token || ''}`, // Ensure token is correct
            'X-API-KEY': authData?.xApiKey || '', // Ensure xApiKey is correct
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Article published with image:', response.data);
      navigate('/my');
    } catch (error: any) {
      console.error('Error publishing article with image:', error.response?.data || error.message);
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
        <ButtonDefault color="blue" text="Publish Article" onClick={handlePublish} />
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
