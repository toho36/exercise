// components/ui/TableHeader.tsx
import React from 'react';
import { Checkbox, Typography } from '@material-tailwind/react';
import { ITableRow } from '@/pages/MyArticlesPage';

interface TableHeaderProps {
  sortTable: (key: string) => void;
}

const TABLE_HEAD = [
  { head: 'Article title', key: 'title', hasCheckbox: true },
  { head: 'Perex', key: 'perex' },
  { head: 'Author', key: 'author' },
  { head: '# of Comments', key: 'comments' },
  { head: 'Actions' },
];

const TableHeader: React.FC<TableHeaderProps> = ({ sortTable }) => (
  <thead>
    <tr>
      {TABLE_HEAD.map(({ head, key, hasCheckbox }) => (
        <th key={head} className="border-b border-gray-300 p-4">
          <div className="flex items-center gap-1">
            {hasCheckbox && <Checkbox />}
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
              {head} {key && <i className="fa-solid fa-sort"></i>}
            </Typography>
          </div>
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
