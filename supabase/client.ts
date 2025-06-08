/**
 * Supabase Client Configuration
 *
 * This file initializes and exports the Supabase client for use throughout the application.
 *
 * Local Development Instructions:
 * 1. Run `supabase start` to launch the local Supabase database
 * 2. The local database will be available at http://127.0.0.1:54321
 * 3. Make sure your .env.local file has the correct SUPABASE_URL and SUPABASE_ANON_KEY
 * 4. Generate TypeScript types with: `supabase gen types typescript --local > ../types/supabase.ts`
 *
 * Production Setup:
 * 1. Replace the environment variables in .env.local with your actual Supabase project values
 * 2. Generate types from your production database: `supabase gen types typescript --project-id your-project-id > ../types/supabase.ts`
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

// Get environment variables
const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Missing SUPABASE_URL environment variable");
}

if (!supabaseAnonKey) {
  throw new Error("Missing SUPABASE_ANON_KEY environment variable");
}

// Create and export the Supabase client with TypeScript support
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Export types for use in other parts of the application
export type { Database } from "../types/supabase";

// Helper types for common database operations
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

// Specific table types for easy import
export type User = Tables<"users">;
export type Course = Tables<"courses">;
export type Enrollment = Tables<"enrollments">;
export type Module = Tables<"modules">;
export type ModuleItem = Tables<"module_items">;
export type FlashcardDeck = Tables<"flashcard_decks">;
export type FlashcardItem = Tables<"flashcard_items">;
export type Quiz = Tables<"quizzes">;
export type QuizQuestion = Tables<"quiz_questions">;
export type QuizAttempt = Tables<"quiz_attempts">;
export type File = Tables<"files">;

// Insert types for creating new records
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type CourseInsert = Database["public"]["Tables"]["courses"]["Insert"];
export type EnrollmentInsert =
  Database["public"]["Tables"]["enrollments"]["Insert"];
export type ModuleInsert = Database["public"]["Tables"]["modules"]["Insert"];
export type ModuleItemInsert =
  Database["public"]["Tables"]["module_items"]["Insert"];
export type FlashcardDeckInsert =
  Database["public"]["Tables"]["flashcard_decks"]["Insert"];
export type FlashcardItemInsert =
  Database["public"]["Tables"]["flashcard_items"]["Insert"];
export type QuizInsert = Database["public"]["Tables"]["quizzes"]["Insert"];
export type QuizQuestionInsert =
  Database["public"]["Tables"]["quiz_questions"]["Insert"];
export type QuizAttemptInsert =
  Database["public"]["Tables"]["quiz_attempts"]["Insert"];
export type FileInsert = Database["public"]["Tables"]["files"]["Insert"];

// Update types for updating existing records
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];
export type CourseUpdate = Database["public"]["Tables"]["courses"]["Update"];
export type EnrollmentUpdate =
  Database["public"]["Tables"]["enrollments"]["Update"];
export type ModuleUpdate = Database["public"]["Tables"]["modules"]["Update"];
export type ModuleItemUpdate =
  Database["public"]["Tables"]["module_items"]["Update"];
export type FlashcardDeckUpdate =
  Database["public"]["Tables"]["flashcard_decks"]["Update"];
export type FlashcardItemUpdate =
  Database["public"]["Tables"]["flashcard_items"]["Update"];
export type QuizUpdate = Database["public"]["Tables"]["quizzes"]["Update"];
export type QuizQuestionUpdate =
  Database["public"]["Tables"]["quiz_questions"]["Update"];
export type QuizAttemptUpdate =
  Database["public"]["Tables"]["quiz_attempts"]["Update"];
export type FileUpdate = Database["public"]["Tables"]["files"]["Update"];

// Helper types for complex queries with relations
export type CourseWithModules = Course & {
  modules: Module[];
};

export type ModuleWithItems = Module & {
  module_items: ModuleItem[];
};

export type FlashcardDeckWithItems = FlashcardDeck & {
  flashcard_items: FlashcardItem[];
};

export type QuizWithQuestions = Quiz & {
  quiz_questions: QuizQuestion[];
};

export type QuizWithAttempts = Quiz & {
  quiz_attempts: QuizAttempt[];
  quiz_questions: QuizQuestion[];
};
