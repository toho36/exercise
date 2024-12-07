export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });
  return formatter.format(date);
}
