-- Supabase Auth Troubleshooting SQL
-- Run this in your Supabase SQL Editor to fix signup issues

-- 1. Make sure the auth schema is properly configured
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA auth TO postgres, service_role;

-- 2. Fix trigger issues that might prevent user creation
-- Drop the trigger first to ensure it's properly recreated
DROP TRIGGER IF EXISTS create_profile_after_signup ON auth.users;

-- 3. Fix the function to use proper error handling
CREATE OR REPLACE FUNCTION public.create_profile_for_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if profile already exists to prevent errors on duplicate insert
  IF NOT EXISTS (SELECT 1 FROM public.user_profiles WHERE id = new.id) THEN
    BEGIN
      INSERT INTO public.user_profiles (id, email, username)
      VALUES (new.id, new.email, coalesce(new.raw_user_meta_data->>'username', 'user'));
    EXCEPTION 
      WHEN OTHERS THEN
        -- Log error but don't block user creation
        RAISE NOTICE 'Error creating profile: %', SQLERRM;
    END;
  END IF;
  
  -- Always return the new record to complete the trigger
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Recreate the trigger
CREATE TRIGGER create_profile_after_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_profile_for_user();

-- 5. Fix public schema permissions (important for profile creation)
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO postgres, service_role;

-- Grant specific permissions needed for auth flow
GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO anon, authenticated;

-- 6. Check existing users to ensure they have profiles
DO $$
DECLARE
  user_record RECORD;
BEGIN
  FOR user_record IN SELECT * FROM auth.users 
  LOOP
    IF NOT EXISTS (SELECT 1 FROM public.user_profiles WHERE id = user_record.id) THEN
      BEGIN
        INSERT INTO public.user_profiles (id, email, username)
        VALUES (user_record.id, user_record.email, coalesce(user_record.raw_user_meta_data->>'username', 'user'));
        RAISE NOTICE 'Created missing profile for user %', user_record.id;
      EXCEPTION 
        WHEN OTHERS THEN
          RAISE NOTICE 'Error creating profile for user %: %', user_record.id, SQLERRM;
      END;
    END IF;
  END LOOP;
END;
$$; 