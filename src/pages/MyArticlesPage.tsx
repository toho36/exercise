import { useState } from 'react';
import { ButtonDefault } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import { useStore } from '@/store/store';
import DeleteDialog from '@/components/layout/dialog/DeleteDialog';
import { useDeleteArticle } from '@/hooks/useDeleteArticle';
import { useSortTable } from '@/hooks/useSortTable';
import TableCard from '@/components/layout/table/TableCard';
import TableHeader from '@/components/layout/table/TableHeader';
import TableRow from '@/components/layout/table/TableRow';

export interface ITableRow {
  articleId: string;
  title: string;
  perex: string;
  author: string;
  createdAt: string;
  comments?: number;
}

/**
 * MyArticlesPage Component
 * This component displays a list of articles belonging to the authenticated user.
 * It includes functionalities to sort articles, create a new article, and delete existing articles.
 *
 * @returns {JSX.Element} The MyArticlesPage component.
 */
export function MyArticlesPage() {
  const { articles, setArticles } = useArticles();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  const authData = useStore(state => state.authData);
  const validArticles = articles || null;

  const sortTable = useSortTable(validArticles, setArticles, sortConfig, setSortConfig);

  const { open, handleOpen, handleDelete, requestDelete } = useDeleteArticle(
    validArticles,
    setArticles,
    authData,
  );

  if (!articles) return <p className="pt-10">No data to display</p>;

  return (
    <>
      <div className="my-5 flex gap-8">
        <p className="text-5xl">My Articles</p>
        <Link to={'/create-article'}>
          <ButtonDefault color="blue" text="Create new article" />
        </Link>
      </div>
      <TableCard>
        <table className="w-full table-auto text-left">
          <TableHeader sortTable={(key: string) => sortTable(key as keyof ITableRow)} />
          <tbody>
            {articles.map(article => (
              <TableRow key={article.articleId} article={article} requestDelete={requestDelete} />
            ))}
          </tbody>
        </table>
      </TableCard>

      <DeleteDialog open={open} handleOpen={handleOpen} handleDelete={handleDelete} />
    </>
  );
}
