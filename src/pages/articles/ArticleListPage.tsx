import { useArticles } from '@/hooks/useArticles';
import { useStore } from '@/store/store';
import { DefaultSkeleton } from '@/components/layout/skeleton/SkeletonLoader';
import { Article } from '@/components/layout/articleList/SingleArticle';
/**
 * ArticleListPage Component
 * This component displays a list of recent articles. It checks if the user is logged in
 * and if there are articles available. It shows a loading skeleton while articles are being fetched
 * and an error message if something goes wrong. If no articles are available, it displays a message.
 *
 * @returns {JSX.Element} The ArticleListPage component.
 */
export function ArticleListPage() {
  const { articles, isLoading, error } = useArticles();
  const authData = useStore(state => state.authData);

  if (!authData || !authData.token)
    return (
      <p className="pt-10">Please log in and create an article to view the list of articles.</p>
    );

  if (isLoading) return <DefaultSkeleton />;
  if (error) return <p className="pt-10">{error}</p>;
  if (!articles || articles.length === 0) return <p className="pt-10">No data to display</p>;

  return (
    <div>
      <h1 className="my-8 text-2xl font-bold">Recent Articles</h1>
      <div className="flex flex-wrap gap-8">
        {articles && articles.map(article => <Article key={article.articleId} {...article} />)}
      </div>
    </div>
  );
}
