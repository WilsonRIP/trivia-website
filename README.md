# Trivia Master

A fun and interactive trivia website featuring unique categories including Trump quotes, world events, and weird facts.

## Features

- Multiple trivia categories with unique questions
- Interactive quiz UI with real-time feedback
- Timed questions with countdown timer
- Score tracking and end-of-quiz summary
- Mobile-responsive design

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion for animations

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

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

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/lib` - Utilities, types, and data

## Customizing Trivia Questions

To add or modify trivia questions, edit the data in `src/lib/data.ts`. Each category contains an array of questions, each with options and a correct answer index.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

[WilsonRIP](https://github.com/WilsonRIP)

## Acknowledgments

- Inspired by various trivia games and the desire to create something fun and unique
- Built with Next.js and a modern UI toolkit
