import { useEffect, useState } from 'react';
import { ButtonDefault } from '@/components/ui/button';
import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react';
import axios from 'axios';
import { useStore } from '@/store/store';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

interface Article {
  articleId: string;
  image: string;
  category: string;
  title: string;
  author: string;
  date: string;
  description: string;
  comments: number;
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

export function ArticleListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const authData = useStore(state => state.authData); // Retrieve auth data from the store
  const navigate = useNavigate();
  useEffect(() => {
    if (!authData) navigate('/login');
    const loadArticles = async () => {
      try {
        console.log(authData, 'dataaa');
        const fetchedArticles = await fetchArticles(authData?.token || '', authData?.xApiKey || '');
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Failed to load articles:', error);
      }
    };

    if (authData) loadArticles();
  }, [authData]);
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
                <img src={article.image} alt="card-image" className="h-full w-full object-cover" />
              </CardHeader>
              <CardBody placeholder="">
                {/* <Typography variant="h6" color="gray" className="mb-4 uppercase" placeholder="">
                  {article.category}
                </Typography> */}
                <Typography variant="h4" color="blue-gray" className="mb-2" placeholder="">
                  {article.title}
                </Typography>
                <Typography color="gray" className="mb-2 font-normal" placeholder="">
                  By {article.author} on {article.date}
                </Typography>
                {/* <Typography color="gray" className="mb-8 font-normal" placeholder="">
                  {article.description}
                </Typography> */}
                <div className="flex justify-between items-center">
                  <a href="/article" className="inline-block">
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
