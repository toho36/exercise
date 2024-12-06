export interface ISortConfig {
  key: string;
  direction: string;
}

export function sortRows<T>(rows: T[], key: keyof T, sortConfig: ISortConfig | null): T[] {
  let direction = 'ascending';
  if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending';
  }

  return [...rows].sort((a, b) => {
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
}
