import { Card, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';

/**
 * A functional React component that renders a sidebar displaying a list of related articles.
 * The sidebar fetches articles using a custom hook (`useArticles`) and displays the article titles
 * and descriptions (`perex`). Clicking on an article navigates to its detailed view.
 *
 * @example
 * // Render the Sidebar component
 * <Sidebar />
 *
 * @returns {JSX.Element} A sidebar component with related articles.
 */
export function Sidebar() {
  const { articles } = useArticles();

  return (
    <Card className="h-[calc(100vh-2rem)] w-2/6 p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray" children={'Related articles'}></Typography>
      </div>
      {articles?.map((article, index) => (
        <Link to={`/article/${article.articleId}`} key={index}>
          <div className="mb-4 pl-4">
            <Typography variant="h6" color="blue-gray" children={article.title}></Typography>
            <Typography
              color="blue-gray"
              className=" line-clamp-3"
              children={article.perex}
            ></Typography>
          </div>
        </Link>
      ))}
    </Card>
  );
}
