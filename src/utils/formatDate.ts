/**
 * Formats a given ISO 8601 date string into a human-readable date string.
 * The function converts the provided date to the format 'M.DD.YYYY'.
 *
 * @param {string} isoDate - The ISO 8601 date string to be formatted.
 *   Example: '2024-12-08T00:00:00Z'
 *
 * @returns {string} A formatted date string in the 'M.DD.YYYY' format.
 *   Example: '5.28.2024'
 *
 * @example
 * const formattedDate = formatDate('2024-05-28T00:00:00Z');
 * console.log(formattedDate); // Output: '5.28.2024'
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}.${day}.${year}`;
}
