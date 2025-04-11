# Fix for 500 Error During Signup

If you're getting a 500 error when trying to sign up, follow these steps to quickly resolve the issue.

## Quick Fix Instructions

1. **Log in to Supabase Dashboard**

   - Go to [https://supabase.com](https://supabase.com)
   - Log in and select your project

2. **Run the Auth Fix Script**
   - Go to the SQL Editor
   - Create a new query
   - Copy and paste the contents of the `auth_fix.sql` file
   - Run the script
3. **Verify Email Settings**
   - Go to Authentication → Email
   - Consider turning off email confirmation for testing:
     - Set "Enable email confirmations" to OFF
4. **Try Signing Up Again**
   - Return to your app and try to sign up
   - This should now work without errors

## Understanding the Issue

The 500 error occurs because:

1. When a user signs up, Supabase creates a record in the `auth.users` table
2. Our trigger should automatically create a record in `public.user_profiles`
3. If the trigger fails (due to permissions or other issues), signup fails

The `auth_fix.sql` script fixes permission issues and makes the trigger more resilient.

Our app also now has a fallback mechanism that tries to create the profile manually if the trigger fails.

## Still Having Issues?

If you're still encountering problems:

1. Check the Database → Logs section in Supabase for specific error messages
2. Make sure all tables exist by going to Table Editor
3. See the `SUPABASE_AUTH_TROUBLESHOOTING.md` file for more advanced solutions
