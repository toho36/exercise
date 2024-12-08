import { useArticles } from '@/hooks/useArticles';
import { useStore } from '@/store/store';
import { DefaultSkeleton } from '@/components/layout/skeleton/Skeleton';
import { Article } from '@/components/layout/articleList/Article';
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

  if (!authData || !authData.token) {
    return <p>Please log in and create an article to view the list of articles.</p>; // Message for not logged in users
  }
  if (isLoading) {
    return <DefaultSkeleton />; // Show loading skeleton while articles are loading
  }

  if (error) {
    return <p>{error}</p>; // Show error message if an error occurred
  }

  if (!articles || articles.length === 0) {
    return <p>no data to display</p>; // If there are no articles or they are empty
  }
  return (
    <div>
      <h1 className="text-2xl font-bold my-8">Recent Articles</h1>
      <div className="flex flex-wrap gap-8">
        {articles &&
          articles.length > 0 &&
          Array.isArray(articles) &&
          articles.map(article => (
            <Article key={article.articleId} {...article} /> // Use the Article component
          ))}
      </div>
    </div>
  );
}
