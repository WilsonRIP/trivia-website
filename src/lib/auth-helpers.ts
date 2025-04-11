import { supabase } from './supabase'

/**
 * Creates a user profile in the database if it doesn't exist.
 * This is a fallback for when the database trigger fails.
 * @param userId The user's ID
 * @param email The user's email
 * @param username The user's username
 * @returns Success or error message
 */
export async function ensureUserProfile(
  userId: string,
  email: string,
  username: string
) {
  try {
    // First check if profile already exists
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', userId)
      .single()

    // If profile already exists, return success
    if (existingProfile) {
      return { success: true, message: 'Profile already exists' }
    }

    // Create profile if it doesn't exist
    const { error } = await supabase.from('user_profiles').insert({
      id: userId,
      email,
      username: username || 'user',
    })

    if (error) {
      console.error('Error creating user profile:', error)
      // For duplicate key errors, return success (profile was created by trigger)
      if (error.message.includes('duplicate key')) {
        return { success: true, message: 'Profile created by trigger' }
      }
      return { success: false, message: error.message }
    }

    return { success: true, message: 'Profile created successfully' }
  } catch (error) {
    console.error('Error in ensureUserProfile:', error)
    return { success: false, message: 'Unknown error creating profile' }
  }
}

/**
 * Gets the current user and ensures they have a profile
 * @returns User object with profile, or null if not logged in
 */
export async function getCurrentUser() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session?.user) return null

    const user = session.user

    // Ensure user has a profile
    await ensureUserProfile(
      user.id,
      user.email || '',
      user.user_metadata?.username || ''
    )

    // Get user profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return { user, profile }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Signs up a user and ensures they have a profile
 */
export async function signUpUser(
  email: string,
  password: string,
  username: string
) {
  try {
    // Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    })

    if (error) throw error

    if (data.user) {
      // Ensure profile exists
      await ensureUserProfile(data.user.id, email, username)
    }

    return { success: true, data }
  } catch (error: unknown) {
    console.error('Error signing up:', error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'An error occurred during signup',
    }
  }
}
