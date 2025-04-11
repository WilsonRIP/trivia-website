'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthForm from '@/components/auth/AuthForm'
import { useAuth } from '@/components/auth/AuthContext'

export default function AuthPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If user is already logged in, redirect to profile
    if (user && !isLoading) {
      router.push('/profile')
    }
  }, [user, isLoading, router])

  return (
    <main className="container max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Welcome to Trivia Challenge</h1>
        <p className="text-muted-foreground">
          Sign in or create an account to track your quiz results and compete
          with friends
        </p>
      </div>
      <AuthForm />
    </main>
  )
}
