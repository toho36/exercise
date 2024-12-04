import { CommentSection } from '@/components/layout/commentSection/CommentSection';
import { Sidebar } from '@/components/layout/sidebar/Sidebar';
import { useParams, useNavigate } from 'react-router-dom';

export function ArticleDetailPage() {
  const { articleId } = useParams(); // Extract articleId from URL parameters

  const navigate = useNavigate();

  return (
    <>
      <div>
        <header className="w-full py-4xl px-8xl ">
          <h1 className="text-[32px] font-semibold leading-[40px]">Detailed article {articleId}</h1>
          <p className="text-gray-500">Author: John Doe | Date: January 1, 2023</p>
        </header>
        <div className="flex">
          <main className=" flex flex-col w-3/4 gap-4xl">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80
   "
              alt="Article Image"
              className="w-full h-auto mb-4"
            />
            <p className="text-lg">
              This is the text under the image that provides more context about the article.
            </p>
            <CommentSection />
          </main>
          <div className="w-px bg-gray-300 mx-4"></div>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
