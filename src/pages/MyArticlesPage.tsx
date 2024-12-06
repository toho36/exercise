import React, { useState, useEffect } from 'react';
import { ButtonDefault } from '@/components/ui/button';
import { Card, Checkbox, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/useArticles';

interface ITableRow {
  articleId: string;
  title: string;
  perex: string;
  author: string;
  comments: number;
}

const TABLE_HEAD = [
  {
    head: 'Article title',
    icon: <Checkbox crossOrigin={undefined} />,
  },
  {
    head: 'Perex',
  },
  {
    head: 'Author',
  },
  {
    head: '# of Comments',
  },
  {
    head: 'Actions',
  },
];

export function MyArticlesPage() {
  const { articles, setArticles } = useArticles();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  const sortTable = (key: keyof ITableRow) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedRows = [...articles].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue < bValue) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'ascending' ? 1 : -1;
      }
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
            {articles.map(({ articleId, title, perex, author, comments }, index) => {
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
                    <span className="cursor-pointer">
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}
