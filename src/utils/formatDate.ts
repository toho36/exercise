/**
 * Formats a given ISO 8601 date string into a human-readable date string.
 * The function converts the provided date to the format 'MM/DD/YY'.
 *
 * @param {string} isoDate - The ISO 8601 date string to be formatted.
 *   Example: '2024-12-08T00:00:00Z'
 *
 * @returns {string} A formatted date string in the 'MM/DD/YY' format.
 *   Example: '12/08/24'
 *
 * @example
 * const formattedDate = formatDate('2024-12-08T00:00:00Z');
 * console.log(formattedDate); // Output: '12/08/24'
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });
  return formatter.format(date);
}
