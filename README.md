# Trivia Master

A fun and interactive trivia website featuring unique categories including Trump quotes, world events, and weird facts.

## Features

- Multiple trivia categories with unique questions
- Interactive quiz UI with real-time feedback
- Timed questions with countdown timer
- Score tracking and end-of-quiz summary
- Mobile-responsive design
- User authentication (sign up/login)
- Save and track quiz results
- User profiles with quiz history

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Supabase for authentication and database

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Supabase account (for authentication and database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/trivia-website.git
   cd trivia-website
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory and add your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
   ```

4. Set up Supabase tables and policies:

   Follow the instructions in `SUPABASE_SETUP.md` to create the required tables and security policies in your Supabase project.

5. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/lib` - Utilities, types, and data
- `/src/components/auth` - Authentication components

## Customizing Trivia Questions

To add or modify trivia questions, edit the data in `src/lib/data.ts`. Each category contains an array of questions, each with options and a correct answer index.

## Authentication

The website uses Supabase for authentication:

- Users can sign up with email and password
- User profiles are created automatically on signup
- Quiz results are saved to the database for logged-in users
- Users can view their quiz history on their profile page

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

[WilsonRIP](https://github.com/WilsonRIP)

## Acknowledgments

- Inspired by various trivia games and the desire to create something fun and unique
- Built with Next.js and a modern UI toolkit
