import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(request: NextRequest) {
  try {
    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({
      req: request,
      res: NextResponse.next(),
    })

    // Refresh session if expired - required for Server Components
    await supabase.auth.getSession()
  } catch (error) {
    console.error('Middleware error:', error)
    // Continue without authentication if there's an error
  }

  return NextResponse.next()
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - auth and api routes (to prevent authentication loops)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|auth/|api/).*)',
  ],
}
