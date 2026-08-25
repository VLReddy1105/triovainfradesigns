type ClassValue = string | false | null | undefined;

/** Minimal class-name joiner — avoids pulling in clsx for a five-line helper. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
