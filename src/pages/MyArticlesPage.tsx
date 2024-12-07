import React, { useState } from 'react';
import { ButtonDefault } from '@/components/ui/button';
import { Card, Checkbox, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import { useStore } from '@/store/store';
import DeleteDialog from '@/components/layout/dialog/DeleteDialog';
import { useDeleteArticle } from '@/hooks/useDeleteArticle';
import { useSortTable } from '@/hooks/useSortTable';
import TableCard from '@/components/ui/TableCard';
import TableHeader from '@/components/ui/TableHeader';
import TableRow from '@/components/ui/TableRow';

export interface ITableRow {
  articleId: string;
  title: string;
  perex: string;
  author: string;
  comments?: number;
}

const TABLE_HEAD = [
  { head: 'Article title', icon: <Checkbox crossOrigin={undefined} /> },
  { head: 'Perex' },
  { head: 'Author' },
  { head: '# of Comments' },
  { head: 'Actions' },
];

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

  const TableCell: React.FC<{ children: React.ReactNode; className: string }> = ({
    children,
    className,
  }) => (
    <td className={className}>
      <Typography variant="small" className="font-normal text-gray-600">
        {children || 'N/A'}
      </Typography>
    </td>
  );
  if (!articles) {
    return <p>no data to display</p>; // or return an error message
  }
  return (
    <>
      <div className="flex gap-8 my-5">
        <p className="text-5xl">My Articles</p>
        <Link to={'/new'}>
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
