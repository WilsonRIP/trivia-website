import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { categories } from '@/lib/data'

export default function Home() {
  return (
    <div className="from-background to-muted min-h-screen bg-gradient-to-b px-4 py-8 sm:px-6 lg:px-8">
      <main className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="text-primary">Trivia</span> Master
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Test your knowledge with our unique collection of trivia topics from
            Trump quotes to world events
          </p>
        </div>

        <div className="mt-12" id="categories">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Choose a Category
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="h-full transform transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className="mb-4 text-4xl">{category.icon}</div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href={`/trivia/${category.id}`} className="w-full">
                    <Button className="w-full">Start Quiz</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center" id="how-to-play">
          <h2 className="mb-4 text-2xl font-bold">How to Play</h2>
          <div className="text-muted-foreground mx-auto max-w-3xl">
            <p className="mb-4">
              Select a category that interests you, answer multiple-choice
              questions, and see how you score! Each quiz has 10 questions with
              a 30-second time limit per question.
            </p>
            <p>Challenge your friends to beat your high score!</p>
          </div>
          <div className="mt-8">
            <Link href={`/trivia/${categories[0].id}`}>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Now
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
