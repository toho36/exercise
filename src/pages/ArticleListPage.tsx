import { useEffect, useState } from 'react';
import { ButtonDefault } from '@/components/ui/button';
import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react';
import axios from 'axios';
import { useStore } from '@/store/store';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

interface Article {
  articleId: string;
  imageId: string; // Update to store imageId instead of image URL
  category: string;
  title: string;
  author: string;
  createdAt: string; // Update to createdAt
  perex: string; // Update to perex
  comments: number;
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });
  return formatter.format(date); // Format as MM/DD/YY
}

async function fetchArticles(
  accessToken: string,
  apiKey: string,
  // offset = 0,
  // limit = 10,
): Promise<Article[]> {
  try {
    const response = await axios.get<{ items: Article[] }>(`${API_BASE_URL}/articles`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-API-KEY': apiKey,
      },
      // params: { offset, limit },
    });

    console.log('Articles:', response.data);
    if (!Array.isArray(response.data.items)) {
      throw new Error('API response does not contain an array of articles');
    }
    return response.data.items;
  } catch (error: any) {
    console.error('Error fetching articles:', error.response?.data || error.message);
    throw error;
  }
}
async function fetchImage(imageId: string, accessToken: string, apiKey: string): Promise<string> {
  try {
    const response = await axios.get(`${API_BASE_URL}/images/${imageId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-API-KEY': apiKey,
      },
      responseType: 'blob', // Ensure the response is a blob
    });
    return URL.createObjectURL(response.data); // Convert blob to object URL
  } catch (error: any) {
    console.error('Error fetching image:', error.response?.data || error.message);
    throw error;
  }
}

export function ArticleListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const authData = useStore(state => state.authData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authData) navigate('/login');
    const loadArticles = async () => {
      try {
        const fetchedArticles = await fetchArticles(authData?.token || '', authData?.xApiKey || '');
        setArticles(fetchedArticles);

        // Fetch images for each article
        const imagePromises = fetchedArticles.map(async article => {
          const imageUrl = await fetchImage(
            article.imageId,
            authData?.token || '',
            authData?.xApiKey || '',
          );
          return { articleId: article.articleId, imageUrl };
        });

        const images = await Promise.all(imagePromises);
        const imageMap = images.reduce(
          (acc, { articleId, imageUrl }) => {
            acc[articleId] = imageUrl;
            return acc;
          },
          {} as { [key: string]: string },
        );
        const articlesWithAuthor = fetchedArticles.map(article => ({
          ...article,
          author: authData?.tenant || article.author, // Use tenant as author
        }));
        setArticles(articlesWithAuthor);
        setImageUrls(imageMap);
      } catch (error) {
        console.error('Failed to load articles or images:', error);
      }
    };

    if (authData) loadArticles();
  }, [authData]);
  console.log(articles);
  return (
    <div>
      <h1 className="text-2xl font-bold my-8">Recent Articles</h1>
      <div className="flex flex-wrap gap-8">
        {Array.isArray(articles) &&
          articles.map(article => (
            <Card key={article.articleId} className="w-full max-w-[48rem] flex-row" placeholder="">
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-2/5 shrink-0 rounded-r-none"
                placeholder=""
              >
                <img
                  src={imageUrls[article.articleId] || ''}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody placeholder="">
                <Typography variant="h4" color="blue-gray" className="mb-2" placeholder="">
                  {article.title}
                </Typography>
                <Typography color="gray" className="mb-2 font-normal" placeholder="">
                  {article.author} • {formatDate(article.createdAt)}
                </Typography>
                <Typography color="gray" className="mb-8 font-normal" placeholder="">
                  {article.perex}
                </Typography>
                <div className="flex justify-between items-center">
                  <a href={`/article/${article.articleId}`} className="inline-block">
                    <Button variant="text" className="flex items-center gap-2" placeholder="">
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
                  </a>
                  <Typography color="gray" className="ml-4" placeholder="">
                    {article.comments} comments
                  </Typography>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
}
