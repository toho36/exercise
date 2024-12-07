import React, { useState } from 'react';
import { ButtonDefault } from '@/components/ui/button';
import { Card, Checkbox, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import axios from 'axios';
import { IArticles } from '@/store/slices/articlesSlice';
import { useStore } from '@/store/store';

interface ITableRow {
  articleId: string;
  title: string;
  perex: string;
  author: string;
  comments: number;
}

const TABLE_HEAD = [
  { head: 'Article title', icon: <Checkbox crossOrigin={undefined} /> },
  { head: 'Perex' },
  { head: 'Author' },
  { head: '# of Comments' },
  { head: 'Actions' },
];

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

export function MyArticlesPage() {
  const { articles, setArticles } = useArticles();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  const [open, setOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const authData = useStore(state => state.authData);

  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    if (!articleToDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/articles/${articleToDelete}`, {
        headers: {
          'Authorization': `Bearer ${authData?.token || ''}`,
          'X-API-KEY': authData?.xApiKey || '',
        },
      });

      if (articles) {
        const updatedArticles = articles.filter(article => article.articleId !== articleToDelete);
        setArticles(updatedArticles);
      }

      setArticleToDelete(null);
    } catch (error: any) {
      console.error('Error deleting article:', error.response?.data || error.message);
    } finally {
      setOpen(false); // Close the modal after deletion.
    }
  };

  const requestDelete = (articleId: string) => {
    setArticleToDelete(articleId);
    handleOpen();
  };

  const sortTable = (key: keyof ITableRow) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedRows = [...(articles || [])].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setArticles(sortedRows);
    setSortConfig({ key, direction });
  };

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

  return (
    <>
      <div className="flex gap-8 my-5">
        <p className="text-5xl">My Articles</p>
        <Link to={'/new'}>
          <ButtonDefault color="blue" text="Create new article" />
        </Link>
      </div>
      <Card>
        <table className="table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map(({ head, icon }) => (
                <th key={head} className="border-b border-gray-300 p-4 ">
                  <div className="flex items-center gap-1">
                    {icon}
                    <Typography
                      color="blue-gray"
                      variant="small"
                      className={`!font-bold ${head !== 'Actions' ? 'cursor-pointer' : ''}`}
                      onClick={() =>
                        sortTable(
                          head === '# of Comments'
                            ? 'comments'
                            : head === 'Article title'
                              ? 'title'
                              : (head.toLowerCase() as keyof ITableRow),
                        )
                      }
                    >
                      {head} {head !== 'Actions' && <i className="fa-solid fa-sort"></i>}
                    </Typography>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articles?.map(({ articleId, title, perex, author, comments }, index) => {
              const isLast = index === articles.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-gray-300';

              return (
                <tr key={articleId}>
                  <td className={classes}>
                    <div className="flex items-center gap-1">
                      <Checkbox crossOrigin={undefined} />
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {title}
                      </Typography>
                    </div>
                  </td>
                  <TableCell className={classes}>{perex}</TableCell>
                  <TableCell className={classes}>{author}</TableCell>
                  <TableCell className={classes}>{comments}</TableCell>
                  <td className={classes}>
                    <Link to={`/edit/${articleId}`}>
                      <span className="cursor-pointer mr-4">
                        <i className="fa-solid fa-pen"></i>
                      </span>
                    </Link>
                    <span className="cursor-pointer" onClick={() => requestDelete(articleId)}>
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Modal */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody>
          Are you sure you want to delete this article? This action cannot be undone.
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleDelete}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
