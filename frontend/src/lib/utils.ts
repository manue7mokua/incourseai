import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple ID generator for annotations
export function nanoid() {
  return Math.random().toString(36).substring(2, 10)
}
