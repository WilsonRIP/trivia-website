# Supabase Authentication Troubleshooting

If you're experiencing issues with authentication in your Supabase-powered application, follow this guide to diagnose and fix common problems.

## Common Authentication Issues

### 1. 500 Error on Signup

If you're getting a 500 error when trying to sign up, it's typically due to one of these issues:

- The trigger that creates user profiles is failing
- Permission issues between schemas
- Database constraint violations

### 2. Unable to Login After Signup

This could be caused by:

- Email confirmation requirements
- Missing user profile record
- Authentication policies not properly configured

## Step 1: Run the Authentication Fix Script

The fastest way to resolve most authentication issues is to run the `auth_fix.sql` script in your Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the contents of the `sql/auth_fix.sql` file
5. Run the script

This script addresses common authentication issues by:

- Fixing schema permissions
- Enhancing the trigger that creates user profiles
- Adding error handling to prevent failed signups
- Granting proper permissions for the authentication flow

## Step 2: Verify Supabase Configuration

If the script doesn't resolve your issues, check these Supabase settings:

### Email Confirmation Settings

1. In your Supabase dashboard, go to Authentication → Email
2. Consider disabling email confirmation for testing:
   - Set "Enable email confirmations" to OFF during development
   - Or use a test email service that allows you to easily access confirmation emails

### Password Policies

1. Go to Authentication → Policies
2. Make sure your password requirements aren't too strict for testing:
   - Minimum password length
   - Password strength requirements

## Step 3: Check Logs

To identify specific issues:

1. Go to your Supabase dashboard
2. Navigate to Database → Logs
3. Look for errors related to the `create_profile_for_user` function or authentication

## Step 4: Advanced Troubleshooting

If you're still having issues:

### Check for Conflicting Triggers

```sql
SELECT * FROM pg_trigger
WHERE tgrelid = 'auth.users'::regclass;
```

### Inspect Failed User Creations

```sql
-- Find users without profiles
SELECT u.id, u.email
FROM auth.users u
LEFT JOIN public.user_profiles p ON u.id = p.id
WHERE p.id IS NULL;
```

### Test Trigger Function Manually

```sql
-- Manually run the profile creation for a specific user
DO $$
DECLARE
  user_id UUID := 'paste-user-id-here';
  user_email TEXT := 'user@example.com';
BEGIN
  INSERT INTO public.user_profiles (id, email, username)
  VALUES (user_id, user_email, 'test_user');
  RAISE NOTICE 'Profile created successfully';
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error: %', SQLERRM;
END;
$$;
```

### Verify Permissions

```sql
-- Check policy configuration
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd
FROM
  pg_policies
WHERE
  tablename = 'user_profiles';
```

## Quick Fixes for Specific Errors

### "duplicate key value violates unique constraint"

This happens when the profile creation trigger tries to create a profile that already exists:

```sql
-- Fix duplicate key errors
DROP TRIGGER IF EXISTS create_profile_after_signup ON auth.users;
CREATE OR REPLACE FUNCTION public.create_profile_for_user()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_profiles WHERE id = new.id) THEN
    INSERT INTO public.user_profiles (id, email, username)
    VALUES (new.id, new.email, coalesce(new.raw_user_meta_data->>'username', 'user'));
  END IF;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER create_profile_after_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_profile_for_user();
```

### "permission denied" Errors

```sql
-- Fix permission issues
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.user_profiles TO anon, authenticated;
```

## Contact Supabase Support

If none of these solutions work, you may need to contact Supabase support with:

1. Exact error messages from logs
2. Your table structure and policies
3. Steps to reproduce the issue

## Switching to API-Only Mode (Last Resort)

If you can't resolve the issues with the trigger, you can switch to API-only profile creation:

1. Remove the automatic trigger
2. Create user profiles manually after signup in your application code

```js
// In your signup handler
const { data: authData, error: signUpError } = await supabase.auth.signUp({
  email,
  password,
})

if (authData.user) {
  // Manually create profile
  await supabase.from('user_profiles').insert({
    id: authData.user.id,
    email: email,
    username: username || 'user',
  })
}
```
