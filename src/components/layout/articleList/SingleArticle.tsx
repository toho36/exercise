import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react';
import { formatDate } from '@/utils/formatDate';
import { Link } from 'react-router-dom';
import { IArticle } from '@/api/fetchArticleApi';

/**
 * A functional React component that renders a single article card with its details.
 * It displays the article's image, title, metadata (author and date), summary (perex),
 * and includes navigation to the full article along with a comment count.
 *
 * @param {IArticle} article - The article object containing the following properties:
 *   - `articleId` (string): The unique ID of the article.
 *   - `title` (string): The title of the article.
 *   - `author` (string): The author's name.
 *   - `createdAt` (string): The publication date of the article (ISO 8601 format).
 *   - `perex` (string): A brief summary or teaser text for the article.
 *   - `imgBlob` (string): A URL or blob representing the article's main image.
 *   - `comments` (number): The number of comments on the article.
 *
 * @returns {JSX.Element} A styled card component displaying the article details.
 */
export function Article(article: IArticle) {
  return (
    <Card key={article.articleId} className="w-[48rem] flex-row">
      <CardHeader shadow={false} floated={false} className="w-auto rounded-sm">
        <img
          src={article.imgBlob}
          alt="article image"
          className="max-h-[244px] min-w-[244px] max-w-[244px]"
        />
      </CardHeader>
      <CardBody className="w-2/3 p-0">
        <Typography variant="h4" color="blue-gray" className="my-2 ml-5">
          {article.title}
        </Typography>
        <Typography color="gray" className="mb-2 ml-5 font-normal">
          {article.author} • {formatDate(article.createdAt)}
        </Typography>
        <Typography color="gray" className="mx-5 mb-8 line-clamp-4 font-normal">
          {article.perex}
        </Typography>
        <div className="mb-5 mr-5 flex items-center">
          <Link to={`/article/${article.articleId}`}>
            <Button variant="text" className="flex items-center gap-2" color="blue">
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
