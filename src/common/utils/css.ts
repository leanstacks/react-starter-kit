import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Conditionally construct `className` strings. Merge Tailwind CSS classes
 * without conflicts.
 * @param inputs - Class values used to calculate the `className` value.
 * @returns {string} - A consolidated string containing CSS class names.
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
