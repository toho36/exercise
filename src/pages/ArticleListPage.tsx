import { useArticles } from '@/hooks/useArticles';
import { DefaultSkeleton } from '@/components/layout/skeleton/skeleton';
import { Article } from '@/components/layout/articleList/article';
import { useStore } from '@/store/store';

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
