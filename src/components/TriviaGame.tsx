'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { Category } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Clock, Trophy, Home } from 'lucide-react'

interface TriviaGameProps {
  category: Category
}

export default function TriviaGame({ category }: TriviaGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameStarted, setGameStarted] = useState(false)

  const currentQuestion = category.questions[currentQuestionIndex]

  useEffect(() => {
    if (!gameStarted || gameComplete) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          if (selectedOption === null) {
            handleNextQuestion()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, selectedOption, currentQuestionIndex, gameComplete])

  const handleStartGame = () => {
    setGameStarted(true)
  }

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return // Prevent changing answer

    setSelectedOption(optionIndex)
    const correct = optionIndex === currentQuestion.correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
    }

    // Wait 1.5 seconds before moving to next question
    setTimeout(handleNextQuestion, 1500)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex >= category.questions.length - 1) {
      setGameComplete(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setIsCorrect(null)
      setTimeLeft(30)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setIsCorrect(null)
    setScore(0)
    setGameComplete(false)
    setTimeLeft(30)
  }

  if (!gameStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <motion.div
                className="mb-2 text-4xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                {category.icon}
              </motion.div>
              <CardTitle className="text-2xl">{category.title}</CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.p
              className="mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {category.description}
            </motion.p>
            <motion.p
              className="mb-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              You&apos;ll have 30 seconds to answer each question. Ready to test
              your knowledge?
            </motion.p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button onClick={handleStartGame} size="lg" className="px-8">
                Start Quiz
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }

  if (gameComplete) {
    const percentage = Math.round((score / category.questions.length) * 100)
    let message = ''

    if (percentage >= 90) {
      message = 'Amazing! You&apos;re a true trivia master!'
    } else if (percentage >= 70) {
      message = 'Great job! You really know your stuff!'
    } else if (percentage >= 50) {
      message = 'Not bad! You&apos;ve got some trivia knowledge!'
    } else {
      message = 'Keep learning! You&apos;ll do better next time!'
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <motion.div
              className="mb-6 flex justify-center"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
            >
              <Trophy className="h-24 w-24 text-yellow-500" />
            </motion.div>
            <motion.div
              className="mb-4 text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {score} / {category.questions.length}
            </motion.div>
            <motion.div
              className="mb-6 text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="break-words">{message}</p>
            </motion.div>
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Button
                onClick={handleRestart}
                variant="outline"
                className="gap-1"
              >
                Try Again
              </Button>
              <Link href="/">
                <Button className="gap-1">
                  <Home className="h-4 w-4" />
                  Back to Categories
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Exit Quiz
          </Button>
        </Link>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-muted-foreground text-sm">Question</span>
          <h2 className="text-xl font-bold">
            {currentQuestionIndex + 1} of {category.questions.length}
          </h2>
        </motion.div>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-muted-foreground text-sm">Score</span>
          <h2 className="text-center text-xl font-bold">{score}</h2>
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-1"
        >
          <Clock className={`h-4 w-4 ${timeLeft <= 5 ? 'text-red-500' : ''}`} />
          <div>
            <span className="text-muted-foreground text-sm">Time Left</span>
            <h2
              className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-500' : ''}`}
            >
              {timeLeft}s
            </h2>
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="break-words">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <AnimatePresence>
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: selectedOption === null ? 1.02 : 1 }}
                    >
                      <Button
                        className="mb-2 h-auto w-full justify-start px-6 py-4 text-left break-words whitespace-normal"
                        variant={
                          selectedOption === null
                            ? 'outline'
                            : selectedOption === index
                              ? index === currentQuestion.correctAnswer
                                ? 'default'
                                : 'destructive'
                              : index === currentQuestion.correctAnswer &&
                                  selectedOption !== null
                                ? 'default'
                                : 'outline'
                        }
                        onClick={() => handleOptionSelect(index)}
                        disabled={selectedOption !== null}
                      >
                        <span className="mr-2 flex-shrink-0">
                          {String.fromCharCode(65 + index)}.
                        </span>{' '}
                        <span className="inline-block">{option}</span>
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
            {selectedOption !== null && (
              <CardFooter className="flex justify-center">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isCorrect ? (
                    <p className="text-lg font-bold text-green-500">Correct!</p>
                  ) : (
                    <p className="text-lg font-bold text-red-500">
                      Incorrect! The correct answer is{' '}
                      {String.fromCharCode(65 + currentQuestion.correctAnswer)}.
                    </p>
                  )}
                </motion.div>
              </CardFooter>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
