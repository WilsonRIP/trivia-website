import { createClient } from '@supabase/supabase-js'

// Make sure we have valid values for Supabase URL and key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Check if we're in the browser environment to avoid SSR issues
const isClientSide = typeof window !== 'undefined'

// Only create the client if we have the required values
const createSupabaseClient = () => {
  // Verify URL is valid to prevent "Invalid URL" errors
  if (!supabaseUrl || !supabaseAnonKey) {
    // In development, show a clear error
    if (process.env.NODE_ENV === 'development') {
      console.error(
        'Supabase URL or anon key is missing. Check your .env.local file.'
      )
    }

    // Return a dummy client that won't throw errors
    return {
      auth: {
        getSession: () =>
          Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () =>
          Promise.resolve({
            data: { session: null },
            error: { message: 'Supabase configuration missing' },
          }),
        signUp: () =>
          Promise.resolve({
            data: { user: null },
            error: { message: 'Supabase configuration missing' },
          }),
        onAuthStateChange: () => ({
          data: { subscription: { unsubscribe: () => {} } },
        }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null }),
          }),
        }),
        insert: () => Promise.resolve({ error: null }),
      }),
    }
  }

  // Create and return the actual client
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: isClientSide,
    },
  })
}

// Export the supabase client
export const supabase = createSupabaseClient()

// Define types for our database tables
export type Tables = {
  user_profiles: {
    id: string
    created_at: string
    username: string
    email: string
  }
  quiz_results: {
    id: string
    created_at: string
    user_id: string
    category_id: string
    score: number
    total_questions: number
  }
}
