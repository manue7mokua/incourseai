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

// Insert types for creating new records
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type CourseInsert = Database["public"]["Tables"]["courses"]["Insert"];
export type EnrollmentInsert =
  Database["public"]["Tables"]["enrollments"]["Insert"];

// Update types for updating existing records
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];
export type CourseUpdate = Database["public"]["Tables"]["courses"]["Update"];
export type EnrollmentUpdate =
  Database["public"]["Tables"]["enrollments"]["Update"];
