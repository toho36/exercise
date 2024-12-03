import { ButtonDefault } from '@/components/ui/button';
import {
  Card,
  Input,
  Checkbox,
  CardHeader,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';

const TABLE_HEAD = [
  {
    head: 'Article title',
    icon: <Checkbox />,
  },
  {
    head: 'Perex',
  },
  {
    head: 'Author',
  },
  {
    head: '# of Comments', // Updated header to reflect the change
  },
  {
    head: 'Actions',
  },
];

const TABLE_ROWS = [
  {
    id: 1,
    title: 'The Rise of Viking Burrito',
    perex: 'Exploring the unique flavors of Viking Burrito.',
    author: 'John Doe',
    comments: 12, // Number of comments
  },
  {
    id: 2,

    title: 'Stone Tech Zone Innovations',
    perex: 'A deep dive into the latest tech from Stone Tech Zone.',
    author: 'Jane Smith',
    comments: 8, // Number of comments
  },
  {
    id: 3,

    title: 'Fiber Notion: The Future of Connectivity',
    perex: 'How Fiber Notion is changing the internet landscape.',
    author: 'Alice Johnson',
    comments: 15, // Number of comments
  },
  {
    id: 4,

    title: 'Blue Bird: A New Era in Aviation',
    perex: 'Blue Bird’s latest advancements in aviation technology.',
    author: 'Bob Brown',
    comments: 5, // Number of comments
  },
];

export function MyArticlesPage() {
  const [rows, setRows] = useState(TABLE_ROWS);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  const sortTable = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedRows = [...rows].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      // Check if the key is 'date' or 'issued' to parse as Date objects
      if (key === 'date' || key === 'issued') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

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

  const TableCell = ({ children, className }) => (
    <td className={className}>
      <Typography variant="small" className="font-normal text-gray-600">
        {children}
      </Typography>
    </td>
  );

  return (
    <>
      <div className="flex gap-8 my-5">
        <p className="text-5xl">My Articles</p>
        <ButtonDefault color="blue" text="Create new article" />
      </div>
      <Card>
        <table className="table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map(({ head, icon }) => (
                <th
                  key={head}
                  className="border-b border-gray-300 p-4 cursor-pointer"
                  onClick={() =>
                    sortTable(
                      head === '# of Comments'
                        ? 'comments'
                        : head === 'Article title'
                          ? 'title'
                          : head.toLowerCase(),
                    )
                  }
                >
                  <div className="flex items-center gap-1">
                    {icon}
                    <Typography color="blue-gray" variant="small" className="!font-bold">
                      {head} {head !== 'Actions' && <i className="fa-solid fa-sort"></i>}
                    </Typography>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ id, title, perex, author, comments }, index) => {
              const isLast = index === rows.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-gray-300';

              return (
                <tr key={id}>
                  <td className={classes}>
                    <div className="flex items-center gap-1">
                      <Checkbox />
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {title}
                      </Typography>
                    </div>
                  </td>
                  <TableCell className={classes}>{perex}</TableCell>
                  <TableCell className={classes}>{author}</TableCell>
                  <TableCell className={classes}>{comments}</TableCell>
                  <td className={classes}>
                    <span className="cursor-pointer mr-4">
                      <i className="fa-solid fa-pen"></i>
                    </span>
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
