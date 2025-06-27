import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions for dark/light mode classes
export const themeClasses = {
  bg: (isDark: boolean) => isDark ? 'bg-gray-800' : 'bg-white',
  text: (isDark: boolean) => isDark ? 'text-white' : 'text-gray-900',
  textSecondary: (isDark: boolean) => isDark ? 'text-gray-300' : 'text-gray-600',
  textMuted: (isDark: boolean) => isDark ? 'text-gray-400' : 'text-gray-500',
  border: (isDark: boolean) => isDark ? 'border-gray-600' : 'border-gray-300',
  input: (isDark: boolean) => isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
  button: (isDark: boolean) => isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
}
