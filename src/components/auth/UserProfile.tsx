'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthContext'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tables } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

type UserProfile = Tables['user_profiles']
type QuizResult = Tables['quiz_results']

export default function UserProfile() {
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [results, setResults] = useState<QuizResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    async function loadProfile() {
      setIsLoading(true)
      try {
        // Get user profile
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user?.id)
          .single()

        if (profileError) {
          console.error('Error loading profile:', profileError)
        } else if (profileData) {
          setProfile(profileData)
        }

        // Get quiz results
        const { data: resultsData, error: resultsError } = await supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false })

        if (resultsError) {
          console.error('Error loading results:', resultsError)
        } else if (resultsData) {
          setResults(resultsData)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [user])

  if (!user) {
    return null
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Username
              </p>
              <p className="text-lg">{profile?.username || 'Not set'}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">Email</p>
              <p className="text-lg">{user?.email}</p>
            </div>
            <Button onClick={signOut} variant="outline">
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quiz History</CardTitle>
        </CardHeader>
        <CardContent>
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.id} className="rounded-md border p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">
                        Score: {result.score}/{result.total_questions}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {new Date(result.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-right text-sm">
                        {Math.round(
                          (result.score / result.total_questions) * 100
                        )}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              You haven&apos;t completed any quizzes yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
