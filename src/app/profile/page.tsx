'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import UserProfile from '@/components/auth/UserProfile'
import { useAuth } from '@/components/auth/AuthContext'
import { Loader2 } from 'lucide-react'

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If user is not logged in and we're done loading, redirect to auth page
    if (!user && !isLoading) {
      router.push('/auth')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null // This will redirect in the useEffect
  }

  return (
    <main className="container max-w-4xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">
          View your profile information and quiz history
        </p>
      </div>
      <UserProfile />
    </main>
  )
}
