import React, { useState, useEffect } from 'react';
import { ButtonDefault } from '@/components/ui/button';
import {
  Card,
  Input,
  Checkbox,
  CardHeader,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useStore } from '@/store/store';

const API_BASE_URL = 'https://fullstack.exercise.applifting.cz';

type TableRow = {
  articleId: string;
  title: string;
  perex: string;
  author: string;
  comments: number;
};

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

// Fetch articles function
async function fetchArticles(accessToken: string, apiKey: string): Promise<TableRow[]> {
  try {
    const response = await axios.get<{ items: TableRow[] }>(`${API_BASE_URL}/articles`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-API-KEY': apiKey,
      },
    });

    if (!Array.isArray(response.data.items)) {
      throw new Error('API response does not contain an array of articles');
    }
    return response.data.items;
  } catch (error: any) {
    console.error('Error fetching articles:', error.response?.data || error.message);
    throw error;
  }
}

export function MyArticlesPage() {
  const [rows, setRows] = useState<TableRow[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  const authData = useStore(state => state.authData);
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const fetchedArticles = await fetchArticles(authData?.token || '', authData?.xApiKey || '');
        // Ensure each article has the correct author from authData
        const articlesWithAuthor = fetchedArticles.map(article => ({
          ...article,
          author: authData?.tenant || article.author, // Use tenant as author
        }));
        setRows(articlesWithAuthor);
      } catch (error) {
        console.error('Failed to load articles:', error);
      }
    };

    if (authData) loadArticles();
  }, [authData]);

  const sortTable = (key: keyof TableRow) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedRows = [...rows].sort((a, b) => {
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

    setRows(sortedRows);
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
                              : (head.toLowerCase() as keyof TableRow),
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
            {rows.map(({ articleId, title, perex, author, comments }, index) => {
              const isLast = index === rows.length - 1;
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
                    <Link to={'/edit'}>
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
