import { ITableRow } from '@/pages/MyArticlesPage';
import { IArticles } from '@/store/slices/articlesSlice';

export const useSortTable = (
  articles: IArticles[] | null,
  setArticles: (articles: IArticles[]) => void,
  sortConfig: { key: string; direction: string } | null,
  setSortConfig: React.Dispatch<React.SetStateAction<{ key: string; direction: string } | null>>,
) => {
  return (key: keyof ITableRow) => {
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
};
