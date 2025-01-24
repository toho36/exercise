import { Link } from 'react-router-dom';
import { Checkbox, Typography } from '@material-tailwind/react';
import { ITableRow } from '@/pages/MyArticlesPage';

interface ITableRowProps {
  article: ITableRow;
  requestDelete: (articleId: string) => void;
}
export default function TableRow({ article, requestDelete }: ITableRowProps) {
  return (
    <tr key={article.articleId} className="border-b-2">
      <td className="flex items-center gap-1 p-4">
        <Checkbox />
        <Typography variant="small" color="blue-gray" className="font-bold">
          {article.title}
        </Typography>
      </td>
      <td className="max-w-[420px] p-4">
        <Typography variant="small" className="line-clamp-1 font-normal text-gray-600">
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
          <span className="mr-4 cursor-pointer">
            <i className="fa-solid fa-pen"></i>
          </span>
        </Link>
        <span className="cursor-pointer" onClick={() => requestDelete(article.articleId)}>
          <i className="fa-solid fa-trash"></i>
        </span>
      </td>
    </tr>
  );
}
