// Import necessary components and data
import Link from 'next/link'
import { Button } from '@/components/ui/button' // Assuming shadcn/ui Button
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card' // Assuming shadcn/ui Card components
import { categories } from '@/lib/data' // Assuming categories data is imported

/**
 * Home component: Renders the main landing page for the Trivia Master application.
 * Displays a hero section, category selection, and instructions on how to play.
 */
export default function Home() {
  return (
    // Main container with gradient background and padding
    <div className="from-background to-muted min-h-screen bg-gradient-to-b px-4 py-8 sm:px-6 lg:px-8">
      <main className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <section aria-labelledby="hero-title" className="mb-16 text-center">
          <h1
            id="hero-title"
            className="text-foreground mb-4 text-4xl font-bold tracking-tight sm:text-6xl"
          >
            {/* Highlight "Trivia" with primary color */}
            <span className="text-primary">Trivia</span> Master
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Test your knowledge with our unique collection of trivia topics from
            Trump quotes to world events.
          </p>
        </section>

        {/* Categories Section */}
        <section
          aria-labelledby="categories-title"
          className="mt-12 scroll-mt-20"
          id="categories"
        >
          <h2
            id="categories-title"
            className="mb-8 text-center text-2xl font-bold"
          >
            Choose a Category
          </h2>
          {/* Grid layout for category cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Map through categories data to create cards */}
            {categories.map((category) => (
              <Card
                key={category.id}
                // Added flex column layout to ensure footer is at the bottom
                // Added overflow hidden for better rendering consistency
                className="flex h-full transform flex-col overflow-hidden rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <CardHeader className="flex-grow">
                  {' '}
                  {/* flex-grow pushes footer down */}
                  {/* Display category icon */}
                  <div className="mb-4 text-4xl">{category.icon}</div>
                  {/* Display category title */}
                  <CardTitle>{category.title}</CardTitle>
                  {/* Display category description */}
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  {/* Link to the specific trivia category page */}
                  <Link
                    href={`/trivia/${category.id}`}
                    className="w-full"
                    passHref
                  >
                    <Button className="w-full">Start Quiz</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* How to Play Section */}
        <section
          aria-labelledby="how-to-play-title"
          className="mt-24 scroll-mt-20 text-center"
          id="how-to-play"
        >
          <h2 id="how-to-play-title" className="mb-4 text-2xl font-bold">
            How to Play
          </h2>
          <div className="text-muted-foreground mx-auto max-w-3xl">
            <p className="mb-4">
              Select a category that interests you, answer multiple-choice
              questions, and see how you score! Each quiz has 10 questions with
              a 30-second time limit per question.
            </p>
            <p>Challenge your friends to beat your high score!</p>
          </div>
          {/* Button to quickly start a quiz (links to categories section) */}
          <div className="mt-8">
            <Link href="#categories">
              {' '}
              {/* Link to the categories section ID */}
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Choose Category
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Optional: Add a Footer component here */}
      {/* <footer className="mt-32 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Trivia Master. All rights reserved.</p>
      </footer> */}
    </div>
  )
}
