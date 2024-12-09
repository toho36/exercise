import { formatDate } from '@/utils/formatDate';
import { test, expect } from 'vitest';

test('formatDate should format ISO 8601 date string into MM/DD/YY format', () => {
  const isoDate = '2024-12-08T00:00:00Z';
  const expectedFormattedDate = '12.8.2024';

  const actualFormattedDate = formatDate(isoDate);

  expect(actualFormattedDate).toBe(expectedFormattedDate);
});
