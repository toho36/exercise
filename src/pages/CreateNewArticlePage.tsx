import { ButtonDefault } from '@/components/ui/button';
import { InputDefault } from '@/components/ui/input';
import React from 'react';

export function CreateNewArticlePage() {
  return (
    <div className="my-5 w-2/4">
      <div className="flex gap-8">
        <p className="text-2xl">Create New Article</p>
        <ButtonDefault color="blue" text="Publish Article" />
      </div>

      <div className="my-3">
        <label htmlFor="articleTitle" className="block">
          Article Title
        </label>
        <InputDefault placeholder="Enter article title" type="text" />
      </div>
      <div className="my-3">
        <label htmlFor="featuredImage" className="block">
          Featured Image
        </label>
        <ButtonDefault color="blue-gray" text="Upload an Image" /> {/* Button for image upload */}
      </div>
      <div className="my-3">
        <label htmlFor="content" className="block">
          Content
        </label>
        <textarea
          id="content"
          className="w-full h-40 border rounded"
          placeholder="Write your content here..."
        ></textarea>{' '}
        {/* Textarea for content */}
      </div>
    </div>
  );
}
