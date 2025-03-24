import App from '@/App';
import { ArticleListPage } from '@/pages/articles/ArticleListPage';
import { NotFoundPage } from '@/pages/articles/NotFoundPage';
import { createBrowserRouter } from 'react-router-dom';
import { ArticleDetailPage } from '@/pages/articles/ArticleDetailPage';
import LoginPage from '@/pages/auth/LoginPage';
import { MyArticlesPage } from '@/pages/articles/MyArticlesPage';
import { CreateNewArticlePage } from './pages/articles/CreateNewArticlePage';
import { EditArticlePage } from './pages/articles/EditArticlePage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

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
        element: (
          <ProtectedRoute>
            <MyArticlesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/create-article',
        element: (
          <ProtectedRoute>
            <CreateNewArticlePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/edit/:articleId',
        element: (
          <ProtectedRoute>
            <EditArticlePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
