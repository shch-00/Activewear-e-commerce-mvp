import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Утилита для объединения классов (базис для shadcn/ui компонентов).
 * Использование: cn("base classes", conditionalClasses, className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
