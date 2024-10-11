import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const imagePlaceholder =
  'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80';

export function makeInitials(firstName: string, lastName: string) {
  return (
    (firstName.charAt(0) || '').toUpperCase() +
      lastName?.charAt(0)?.toUpperCase() || ''
  );
}