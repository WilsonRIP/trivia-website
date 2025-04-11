# Database Setup Guide for Trivia App

This guide explains how to set up the database tables for the Trivia App in Supabase.

## Overview

The application requires two main tables:

1. `user_profiles` - Stores user profile information
2. `quiz_results` - Stores quiz attempt history for each user

## Prerequisites

- A Supabase project (create one at [supabase.com](https://supabase.com))
- Your Supabase URL and anon key (found in the project settings)

## Step 1: Access the SQL Editor

1. Log in to your Supabase dashboard
2. Select your project
3. Navigate to the "SQL Editor" section in the left sidebar

## Step 2: Create the Tables

### Option A: Run the combined script

For the easiest setup, use the combined SQL script:

1. Open a new SQL query in the SQL Editor
2. Copy the entire contents of the `sql/supabase_combined_setup.sql` file
3. Run the script

### Option B: Run individual scripts

If you prefer to run the scripts separately:

1. First run `sql/supabase_user_profiles.sql`
2. Then run `sql/supabase_quiz_results.sql`

## Step 3: Verify the Setup

After running the scripts, you can verify that everything was set up correctly:

1. In the SQL Editor, run:

   ```sql
   -- Check tables
   SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

   -- Check policies
   SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public';
   ```

2. Or, you can visually check:
   - Go to "Table Editor" in the sidebar to see the created tables
   - Go to "Authentication" → "Policies" to see the Row Level Security policies

## Step 4: Set Up Environment Variables

Add your Supabase credentials to the `.env.local` file in your project:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Database Schema Details

### User Profiles Table

| Column     | Type      | Description                      |
| ---------- | --------- | -------------------------------- |
| id         | UUID      | Primary key, links to auth.users |
| created_at | Timestamp | When the profile was created     |
| username   | Text      | User's display name              |
| email      | Text      | User's email address             |

The user_profiles table has:

- Row Level Security enabled
- Policies allowing users to only view and edit their own profiles
- An automatic trigger that creates a profile when a user signs up

### Quiz Results Table

| Column          | Type      | Description                 |
| --------------- | --------- | --------------------------- |
| id              | UUID      | Primary key                 |
| created_at      | Timestamp | When the quiz was completed |
| user_id         | UUID      | References auth.users       |
| category_id     | Text      | ID of the quiz category     |
| score           | Integer   | Number of correct answers   |
| total_questions | Integer   | Total number of questions   |

The quiz_results table has:

- Row Level Security enabled
- Policies allowing users to only view their own results
- Policies allowing users to insert their own results
- Indexes on user_id and category_id for faster queries

## Troubleshooting

### Common Issues

1. **Permission denied errors**: Make sure you're running the SQL as the Postgres role in Supabase

2. **Function/trigger errors**: If you're recreating the database and get errors about existing functions or triggers, you may need to drop them first:

   ```sql
   DROP FUNCTION IF EXISTS public.create_profile_for_user() CASCADE;
   ```

3. **Missing UUID extension**: If you see errors about uuid_generate_v4, make sure the UUID extension is enabled:
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```

### Testing Authentication

To test if authentication is working properly:

1. Create a new user through your application's signup form
2. Check if a corresponding entry appears in the user_profiles table
3. Complete a quiz while logged in
4. Verify that the quiz result is saved to the quiz_results table
