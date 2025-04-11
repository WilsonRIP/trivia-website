-- quiz_results.sql
-- Creates and configures the quiz_results table

-- Create the table
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id TEXT NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policies

-- Users can view their own quiz results
CREATE POLICY "Users can view their own quiz results" 
  ON quiz_results FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can insert their own quiz results
CREATE POLICY "Users can insert their own quiz results" 
  ON quiz_results FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster querying
CREATE INDEX idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX idx_quiz_results_category_id ON quiz_results(category_id); 