import App from '@/App';
import { ArticleListPage } from '@/pages/ArticleListPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ArticleDetailPage } from '@/pages/ArticleDetailPage';
import { LoginPage } from '@/pages/LoginPage';
import { MyArticlesPage } from '@/pages/MyArticlesPage';
import { CreateNewArticlePage } from './pages/CreateNewArticlePage';
import { EditArticlePage } from './pages/EditArticlePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <ArticleListPage />,
      },
      {
        path: '/404',
        element: <NotFoundPage />,
      },
      {
        path: '/article/:articleId', // Updated path to include articleId as a parameter
        element: <ArticleDetailPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/my-articles',
        element: <MyArticlesPage />,
      },
      {
        path: '/create-article',
        element: <CreateNewArticlePage />,
      },
      {
        path: '/edit/:articleId',
        element: <EditArticlePage />,
      },
    ],
  },
]);
