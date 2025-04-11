-- setup.sql
-- Main setup script that runs all the individual SQL files

-- Reset (drop all existing tables if needed - comment out in production)
-- DROP TABLE IF EXISTS quiz_results;
-- DROP TABLE IF EXISTS user_profiles CASCADE;
-- DROP FUNCTION IF EXISTS create_profile_for_user();

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create and configure the tables
\i user_profiles.sql
\i quiz_results.sql

-- Verify the setup by listing tables and policies
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- List RLS policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM
  pg_policies
WHERE
  schemaname = 'public';

-- Note: Run this script in the Supabase SQL editor or using psql 