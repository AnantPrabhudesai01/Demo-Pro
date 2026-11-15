import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to conditionally combine CSS classes and intelligently resolve Tailwind conflicts.
 * Combines clsx for conditional class objects/arrays and twMerge to resolve specificity.
 *
 * @param {...any} inputs - Class names, expressions, or conditional objects.
 * @returns {string} - Merged, deduplicated class string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
