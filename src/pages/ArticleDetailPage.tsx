import { useParams } from 'react-router-dom';
import { Sidebar } from '@/components/layout/sidebar/Sidebar';
import { CommentSection } from '@/components/layout/commentSection/CommentSection';
import { formatDate } from '@/utils/formatDate';
import { useArticle } from '@/hooks/useArticle';
import MDEditor from '@uiw/react-md-editor';
import { DefaultSkeleton } from '@/components/layout/skeleton/SkeletonLoader';

/**
 * ArticleDetailPage Component
 * This component displays the details of a single article, including the title, author, creation date, image, and content.
 * It also includes a sidebar with related articles and a comment section for user interaction.
 * If the article data is not yet loaded, a skeleton loader is shown.
 *
 * @returns {JSX.Element} The ArticleDetailPage component.
 */
export function ArticleDetailPage() {
  const { articleId } = useParams();
  const { article } = useArticle(articleId);

  if (!article) {
    return <DefaultSkeleton />;
  }
  return (
    <>
      <div>
        <header className="w-full py-4xl px-8xl ">
          <h1 className="text-[32px] font-semibold leading-[40px] py-8">{article?.title}</h1>
          <p className="text-gray-500 pb-4">
            {article?.author || 'Unknown'} ·{' '}
            {article?.createdAt ? formatDate(article.createdAt) : 'Unknown'}
          </p>
        </header>
        <div className="flex">
          <main className="flex flex-col w-4/6 gap-4xl">
            <img src={article?.imgBlob} alt="Article Image" className="w-full h-auto mb-4" />
            <div data-color-mode="light">
              <MDEditor.Markdown source={article?.perex || ''} className="text-lg" />
            </div>

            <CommentSection />
          </main>
          <div className="w-px bg-gray-300 mx-4"></div>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
