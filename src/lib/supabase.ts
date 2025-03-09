import { createClient } from "@supabase/supabase-js";

// Use a valid URL format with protocol to prevent URL construction errors
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MTYyMzkwMjIsImV4cCI6MTkzMTgxNTAyMn0.placeholder";

// Create a mock client when using placeholder values
const isUsingPlaceholders =
  !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Add a warning in development when using placeholder values
if (isUsingPlaceholders && import.meta.env.DEV) {
  console.warn(
    "Using placeholder Supabase credentials. Authentication features will not work properly until you set up your own Supabase project and update the environment variables.",
  );
}
