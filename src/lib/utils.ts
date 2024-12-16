type ClassValue = string | undefined | null | false | { [key: string]: boolean };

export function cn(...classes: ClassValue[]): string {
  return classes
    .filter(Boolean)
    .map(c => {
      if (typeof c === 'object') {
        return Object.entries(c)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return c;
    })
    .join(' ');
}