import { categories } from '@/lib/data'
import { notFound } from 'next/navigation'
import TriviaGame from '@/components/TriviaGame'

interface PageProps {
  params: {
    categoryId: string
  }
}

export function generateStaticParams() {
  return categories.map((category) => ({
    categoryId: category.id,
  }))
}

export default function TriviaPage({ params }: PageProps) {
  const categoryId = params.categoryId
  const category = categories.find((c) => c.id === categoryId)

  if (!category) {
    notFound()
  }

  return (
    <div className="from-background to-muted min-h-screen bg-gradient-to-b px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <TriviaGame category={category} />
      </div>
    </div>
  )
}
