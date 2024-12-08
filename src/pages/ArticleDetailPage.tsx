import { useParams } from 'react-router-dom';
import { Sidebar } from '@/components/layout/sidebar/Sidebar';
import { CommentSection } from '@/components/layout/commentSection/CommentSection';
import { formatDate } from '@/utils/formatDate';
import { DefaultSkeleton } from '@/components/layout/skeleton/skeleton';
import { useArticle } from '@/hooks/useArticle';
import MDEditor from '@uiw/react-md-editor';

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
          <h1 className="text-[32px] font-semibold leading-[40px]">{article?.title}</h1>
          <p className="text-gray-500">
            Author: {article?.author || 'Unknown'} | Date:{' '}
            {article?.createdAt ? formatDate(article.createdAt) : 'Unknown'}
          </p>
        </header>
        <div className="flex">
          <main className="flex flex-col w-3/4 gap-4xl">
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
