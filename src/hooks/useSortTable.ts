import { ITableRow } from '@/pages/my-articlesArticlesPage';
import { IArticles } from '@/store/slices/articlesSlice';

/**
 * A custom hook that handles sorting of articles in a table.
 * It sorts the articles based on a specified key and toggles between ascending and descending order.
 *
 * @param {IArticles[] | null} articles - The list of articles to be sorted. Can be `null`, in which case no sorting occurs.
 * @param {Function} setArticles - The setter function used to update the sorted articles state.
 * @param {object | null} sortConfig - The current sorting configuration, containing a key (field) and direction ('ascending' | 'descending').
 * @param {Function} setSortConfig - The setter function used to update the sorting configuration state.
 *
 * @returns {Function} - A function that triggers sorting of articles by a specified key when called.
 *   The function toggles the sort direction (ascending/descending) and updates both the articles and sorting configuration.
 *
 * @example
 * const sortTable = useSortTable(articles, setArticles, sortConfig, setSortConfig);
 * sortTable('title'); // Sorts articles by 'title'
 */
export function useSortTable(
  articles: IArticles[] | null,
  setArticles: (articles: IArticles[]) => void,
  sortConfig: { key: string; direction: string } | null,
  setSortConfig: React.Dispatch<React.SetStateAction<{ key: string; direction: string } | null>>,
) {
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
}
