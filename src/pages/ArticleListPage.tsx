import { useArticles } from '@/hooks/useArticles';
import { DefaultSkeleton } from '@/components/layout/skeleton/skeleton';
import { Article } from '@/components/layout/articleList/article';

export function ArticleListPage() {
  const { articles } = useArticles();
  return (
    <div>
      <h1 className="text-2xl font-bold my-8">Recent Articles</h1>
      <div className="flex flex-wrap gap-8">
        {articles?.length === 0 && <DefaultSkeleton />}
        {!articles && <p>no data to display</p>}
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
