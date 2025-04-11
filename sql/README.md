# Supabase SQL Setup Files

This directory contains SQL files for setting up the necessary database tables and security policies for the Trivia application in Supabase.

## Files Overview

- `user_profiles.sql` - Creates the user profiles table and automatic profile creation trigger
- `quiz_results.sql` - Creates the quiz results table for storing user quiz histories
- `setup.sql` - Main script that combines all individual table creation scripts

## How to Use These Files

### Option 1: Run Individual Scripts in Supabase SQL Editor

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the contents of each SQL file individually
5. Run the scripts in this order:
   - `user_profiles.sql`
   - `quiz_results.sql`

### Option 2: Use the Combined Setup Script

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the content of `setup.sql`
5. **Important**: You'll need to modify it to include the full SQL commands from each file since Supabase SQL Editor doesn't support the `\i` command

### Option 3: Use psql (Advanced)

If you have direct PostgreSQL access to your Supabase database:

```bash
# Connect to your Supabase PostgreSQL instance
psql postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-REF].supabase.co:5432/postgres

# Run the setup script (which will include the other scripts)
\i setup.sql
```

## Verifying the Setup

After running the scripts, you can verify the setup by running these queries in the SQL Editor:

```sql
-- List all tables
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- List RLS policies
SELECT
  schemaname,
  tablename,
  policyname
FROM
  pg_policies
WHERE
  schemaname = 'public';
```

## Schema Details

### User Profiles Table

- `id` - UUID, primary key, references auth.users
- `created_at` - Timestamp with timezone
- `username` - Text
- `email` - Text

### Quiz Results Table

- `id` - UUID, primary key
- `created_at` - Timestamp with timezone
- `user_id` - UUID, references auth.users
- `category_id` - Text, identifies the quiz category
- `score` - Integer
- `total_questions` - Integer
