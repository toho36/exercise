import { ButtonDefault } from '@/components/ui/button';
import { InputDefault } from '@/components/ui/input';
import React from 'react';
import MDEditor from '@uiw/react-md-editor';
export function CreateNewArticlePage() {
  const [value, setValue] = React.useState('**Hello world!!!**');
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
        <div data-color-mode="light">
          <div className="wmde-markdown-var"> </div>
          <MDEditor value={value} onChange={newValue => setValue(newValue || '')} />
        </div>
        {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
        {/* Textarea for content */}
      </div>
    </div>
  );
}
