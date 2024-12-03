import App from '@/App';
import { ArticleListPage } from '@/pages/ArticleListPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { createBrowserRouter, Navigate } from 'react-router-dom';

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
    ],
  },
]);
