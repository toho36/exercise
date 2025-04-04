import React, { useEffect } from 'react';
import { ButtonDefault } from '@/components/ui/button';
import { InputDefault } from '@/components/ui/input';
import MDEditor from '@uiw/react-md-editor';
import { useParams } from 'react-router-dom';
import { useArticle } from '@/hooks/useArticle';
import { useImageHandler } from '@/hooks/useImageHandler';
import { useArticleForm } from '@/hooks/useArticleForm';
import { DefaultSkeleton } from '@/components/layout/skeleton/SkeletonLoader';
/**
 * EditArticlePage Component
 * This component allows users to edit an existing article. It fetches the article data based on the articleId
 * from the URL and displays the current title, content (Markdown editor), and the featured image. Users can update
 * the title, content, and image. The component handles image uploads, image preview, and deletion of the existing image.
 *
 * @returns {JSX.Element} The EditArticlePage component.
 */
export function EditArticlePage() {
  const { articleId } = useParams();
  const { article, isLoading, error } = useArticle(articleId);
  if (!articleId) return <p className="pt-10">No data to display</p>;

  const {
    image,
    imagePreview,
    markedForDeletion,
    setMarkedForDeletion,
    handleImagePreviewDelete,
    setImagePreview,
    handleImageUpload,
    handleImageDelete,
    handleImageChange,
  } = useImageHandler(article?.imageId);

  const { title, setTitle, value, setValue, isSubmitting, handleUpdate } = useArticleForm(
    articleId,
    article?.title || '',
    article?.perex || '',
  );

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setValue(article.perex);
      setImagePreview(article.imgBlob || '');
    }
  }, [article, setTitle, setValue, setImagePreview]);

  const onSaveChanges = async () => {
    if (markedForDeletion && article?.imageId) {
      await handleImageDelete();
    }
    let imageId = undefined;
    if (image) {
      const uploadResult = await handleImageUpload(image);
      if (uploadResult === null) {
        alert('Failed to upload image. Please try again.');
        return;
      } else {
        imageId = uploadResult;
      }
    }
    await handleUpdate(imageId, markedForDeletion);
    setMarkedForDeletion(false);
  };

  if (isLoading) return <DefaultSkeleton />;
  if (error) return <p className="pt-10">{error}</p>;
  if (!article) return <p className="pt-10">No data to display</p>;

  return (
    <div className="my-5 w-2/4">
      <div className="flex gap-8">
        <p className="text-2xl">Edit Article</p>
        <ButtonDefault
          color="blue"
          text={isSubmitting ? 'Saving...' : 'Save Changes'}
          onClick={onSaveChanges}
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
            <img src={imagePreview} alt="Image Preview" className="h-32 w-32 object-cover" />
          </div>
        )}
        {imagePreview && (
          <div className="mt-3">
            <ButtonDefault color="red" text="Delete Image" onClick={handleImagePreviewDelete} />
          </div>
        )}
      </div>

      <div className="my-3">
        <label htmlFor="content" className="block">
          Content
        </label>
        <div data-color-mode="light">
          <MDEditor
            value={value}
            onChange={newValue => setValue(newValue || '')}
            className="min-h-96"
          />
        </div>
      </div>
    </div>
  );
}
