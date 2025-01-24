import { ButtonDefault } from '@/components/ui/button';
import { InputDefault } from '@/components/ui/input';
import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { useStore } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { useImageHandler } from '@/hooks/useImageHandler';
import { publishArticle } from '@/api/publishArticleApi';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

/**
 * CreateNewArticlePage Component
 * This component allows the user to create a new article. It includes inputs for the article title,
 * featured image, and content, with the option to upload an image. The content editor uses Markdown.
 * The article is published via an API request after all fields are filled in.
 *
 * The component performs validation to ensure all fields are filled before publishing.
 * If there is an image, it is uploaded first, and then the article is submitted.
 *
 * @returns {JSX.Element} The CreateNewArticlePage component.
 */
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

      await publishArticle(title, value, imageId, authData);
      navigate('/my-articles');
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
            <img src={imagePreview} alt="Image Preview" className="h-32 w-32 object-cover" />
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
