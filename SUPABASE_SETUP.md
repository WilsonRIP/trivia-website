# Supabase Setup for Trivia Website

This guide will walk you through setting up the necessary tables and configurations in Supabase for the Trivia Website.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project and note down the URL and anon key
3. Add these credentials to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 2. Set Up Authentication

Supabase provides authentication out of the box. For this project, we're using email/password authentication.

1. Go to Authentication → Settings → Email Auth
2. Make sure Email Auth is enabled
3. Configure other settings as needed (like redirect URLs)

## 3. Create Database Tables

You'll need to create the following tables in your Supabase database.

### User Profiles Table

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  username TEXT NOT NULL,
  email TEXT NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create a trigger to create a profile when a user signs up
CREATE OR REPLACE FUNCTION create_profile_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, username)
  VALUES (new.id, new.email, coalesce(new.raw_user_meta_data->>'username', 'user'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER create_profile_after_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE create_profile_for_user();
```

### Quiz Results Table

```sql
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL
);

-- Enable RLS
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own quiz results"
  ON quiz_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz results"
  ON quiz_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## 4. Storage (Optional)

If you want to add profile pictures or other files:

1. Go to Storage
2. Create a new bucket called "avatars"
3. Set up the appropriate security policies

## 5. Testing

After setting up these tables and policies, you should test:

1. User registration and login
2. Saving quiz results
3. Viewing profile information
4. Viewing quiz history

## Troubleshooting

- Check the browser console for errors
- Verify your environment variables are set correctly
- Make sure your database tables and policies are properly configured
- If you're having issues with RLS policies, temporarily disable them for testing (not recommended for production)
