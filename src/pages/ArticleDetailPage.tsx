import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '@/store/store';
import { Sidebar } from '@/components/layout/sidebar/Sidebar';
import { CommentSection } from '@/components/layout/commentSection/CommentSection';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';
function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });
  return formatter.format(date);
}
interface Article {
  articleId: string;
  imageId: string;
  category: string;
  title: string;
  author: string;
  createdAt: string;
  perex: string;
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

export function ArticleDetailPage() {
  const { articleId } = useParams(); // Extract articleId from URL parameters
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
  const article = articles.find(article => article.articleId === articleId);

  let imageUrl = '';
  if (articleId) {
    imageUrl = imageUrls[articleId];
  }
  console.log(imageUrls, 'images');
  return (
    <>
      <div>
        <header className="w-full py-4xl px-8xl ">
          <h1 className="text-[32px] font-semibold leading-[40px]">{article?.title}</h1>
          <p className="text-gray-500">
            Author: {article?.author || 'Unknown'} | Date:{' '}
            {article?.createdAt ? formatDate(article.createdAt) : 'Unknown'}
          </p>
        </header>
        <div className="flex">
          <main className="flex flex-col w-3/4 gap-4xl">
            <img src={imageUrl || ''} alt="Article Image" className="w-full h-auto mb-4" />
            <p className="text-lg">{article?.perex}</p>
            <CommentSection />
          </main>
          <div className="w-px bg-gray-300 mx-4"></div>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
