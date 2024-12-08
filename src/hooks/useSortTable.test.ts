import { test } from 'vitest';
import { useSortTable } from './useSortTable';
import { IArticles } from '@/store/slices/articlesSlice';

test('useSortTable should sort articles by title in ascending order', () => {
  // Mock dates
  const date1 = JSON.stringify(new Date());
  const date2 = JSON.stringify(new Date());
  const date3 = JSON.stringify(new Date());

  // Mock articles data
  const articles: IArticles[] = [
    {
      articleId: '1',
      category: 'Category A',
      author: 'Author A',
      createdAt: date1,
      title: 'Article C',
      perex: 'Content B',
      comments: 5,
    },
    {
      articleId: '2',
      category: 'Category B',
      author: 'Author B',
      createdAt: date2,
      title: 'Article A',
      perex: 'Content B',
      comments: 5,
    },
    {
      articleId: '3',
      category: 'Category C',
      author: 'Author C',
      createdAt: date3,
      title: 'Article B',
      perex: 'Content B',
      comments: 5,
    },
  ];

  // Mock setArticles and setSortConfig functions
  let sortedArticles: IArticles[] = [];
  let sortConfig: { key: string; direction: string } | null = null;
  const setArticles = (articles: IArticles[]) => {
    sortedArticles = articles;
  };
  const setSortConfig = (
    config: React.SetStateAction<{ key: string; direction: string } | null>,
  ) => {
    if (typeof config === 'function') {
      sortConfig = config(sortConfig);
    } else {
      sortConfig = config;
    }
  };

  // Initialize useSortTable hook
  const sortTable = useSortTable(articles, setArticles, sortConfig, setSortConfig);

  // Trigger sorting by 'title'
  sortTable('title');

  // Check if setArticles was called with correctly sorted articles
  if (
    JSON.stringify(sortedArticles) !==
    JSON.stringify([
      {
        articleId: '2',
        category: 'Category B',
        author: 'Author B',
        createdAt: date2,
        title: 'Article A',
        perex: 'Content B',
        comments: 5,
      },
      {
        articleId: '3',
        category: 'Category C',
        author: 'Author C',
        createdAt: date3,
        title: 'Article B',
        perex: 'Content B',
        comments: 5,
      },
      {
        articleId: '1',
        category: 'Category A',
        author: 'Author A',
        createdAt: date1,
        title: 'Article C',
        perex: 'Content B',
        comments: 5,
      },
    ])
  ) {
    throw new Error('setArticles was not called with correctly sorted articles');
  }

  // Check if setSortConfig was called with correct sort configuration
  if (JSON.stringify(sortConfig) !== JSON.stringify({ key: 'title', direction: 'ascending' })) {
    throw new Error('setSortConfig was not called with correct sort configuration');
  }
});
