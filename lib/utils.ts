import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ListingPageProps {
  searchParams: {
    searchQuery?: string;
    propertyType?: string;
    state?: string;
    page?: string;
  };
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export const formatDateToStr = (rawDate: Date): string => {
  const dayOfWeek = rawDate.toLocaleString('en-US', { weekday: 'short' });
  const day = ('0' + rawDate.getDate()).slice(-2);
  const month = rawDate.toLocaleString('en-US', { month: 'short' });
  const year = rawDate.getFullYear();

  const formattedDate = `${day} ${month} ${year} (${dayOfWeek})`;

  return formattedDate;
};

export const formatDateToStr2 = (rawDate: Date): string => {
  const day = ('0' + rawDate.getDate()).slice(-2);
  const month = ('0' + (rawDate.getMonth() + 1)).slice(-2);
  const year = rawDate.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export function parseDate(dateString: string) {
  const [day, month, year] = dateString.toString().split('-');
  return new Date(`${year}-${month}-${day}`);
}