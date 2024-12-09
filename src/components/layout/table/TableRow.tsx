import React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Typography } from '@material-tailwind/react';
import { ITableRow } from '@/pages/MyArticlesPage';

interface TableRowProps {
  article: ITableRow;
  requestDelete: (articleId: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({ article, requestDelete }) => (
  <tr key={article.articleId} className="border-b-2">
    <td className="p-4 flex items-center gap-1">
      <Checkbox />
      <Typography variant="small" color="blue-gray" className="font-bold">
        {article.title}
      </Typography>
    </td>
    <td className="p-4 max-w-[420px]">
      <Typography
        variant="small"
        className="font-normal 
      
              line-clamp-1
      text-gray-600"
      >
        {article.perex}
      </Typography>
    </td>
    <td className="p-4">
      <Typography variant="small" className="font-normal text-gray-600">
        {article.author}
      </Typography>
    </td>
    <td className="p-4">
      <Typography variant="small" className="font-normal text-gray-600">
        {article.comments !== undefined ? article.comments : 'N/A'}
      </Typography>
    </td>
    <td className="p-4">
      <Link to={`/edit/${article.articleId}`}>
        <span className="cursor-pointer mr-4">
          <i className="fa-solid fa-pen"></i>
        </span>
      </Link>
      <span className="cursor-pointer" onClick={() => requestDelete(article.articleId)}>
        <i className="fa-solid fa-trash"></i>
      </span>
    </td>
  </tr>
);

export default TableRow;
