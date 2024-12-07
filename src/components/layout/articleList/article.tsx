import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react';
import { formatDate } from '@/utils/formatDate';
import { Link } from 'react-router-dom';
import { IArticle } from '@/api/fetchArticleApi';

export function Article(article: IArticle) {
  return (
    <Card key={article.articleId} className="w-full max-w-[48rem] flex-row">
      <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
        <img src={article.imgBlob} alt="card-image" className="h-full w-full object-cover" />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {article.title}
        </Typography>
        <Typography color="gray" className="mb-2 font-normal">
          {article.author} • {formatDate(article.createdAt)}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {article.perex}
        </Typography>
        <div className="flex justify-between items-center">
          <Link to={`/article/${article.articleId}`}>
            <Button variant="text" className="flex items-center gap-2">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </Link>
          <Typography color="gray" className="ml-4">
            {article.comments} comments
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}
