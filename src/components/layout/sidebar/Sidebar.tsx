import { Card, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';

export function Sidebar() {
  const { articles } = useArticles();

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray" children={'Related articles'}></Typography>
      </div>
      {articles?.map((article, index) => (
        <Link to={`/article/${article.articleId}`} key={index}>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" children={article.title}></Typography>
            <Typography color="blue-gray" children={article.perex}></Typography>
          </div>
        </Link>
      ))}
    </Card>
  );
}
