import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Trivia Master - Test Your Knowledge',
  description:
    'Challenge yourself with unique trivia about Trump quotes, world events, and more!',
  keywords: [
    'trivia',
    'quiz',
    'trump quotes',
    'world events',
    'facts',
    'knowledge test',
  ],
  authors: [{ name: 'WilsonRIP', url: 'https://github.com/WilsonRIP' }],
  creator: 'WilsonRIP',
  openGraph: {
    title: 'Trivia Master - Test Your Knowledge',
    description:
      'Challenge yourself with unique trivia about Trump quotes, world events, and more!',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trivia Master - Test Your Knowledge',
    description:
      'Challenge yourself with unique trivia about Trump quotes, world events, and more!',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="focus:bg-background sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
