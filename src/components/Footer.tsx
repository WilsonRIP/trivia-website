'use client'

import Link from 'next/link'
import { Github } from 'lucide-react' // Add other icons here if needed
import { motion } from 'framer-motion'
import React from 'react' // Import React for type definitions if using TypeScript

// --- Data for Links ---
// Makes it easier to add/remove/modify links without touching JSX structure much

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/#categories', label: 'Categories' },
  { href: '/#how-to-play', label: 'How to Play' },
  // Add more quick links here if needed
]

const connectLinks = [
  {
    href: 'https://github.com/WilsonRIP',
    label: 'GitHub',
    icon: Github, // Reference the imported icon component
  },
  // Add more social/connect links here (e.g., Twitter, LinkedIn)
  // { href: 'https://twitter.com/yourprofile', label: 'Twitter', icon: TwitterIconComponent },
]

// --- Reusable Styles ---
const commonLinkClasses =
  'text-muted-foreground hover:text-primary text-sm transition-colors'
const footerHeadingClasses = 'text-base font-semibold'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="border-border/40 bg-background border-t"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }} // Keep animation if desired
    >
      <div className="container mx-auto px-4 py-8 md:py-12">
        {' '}
        {/* Added mx-auto and px-4 for container standard */}
        {/* Top section: Info, Quick Links, Connect */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold">Trivia Master</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Test your knowledge with unique trivia questions about Trump
              quotes, world events, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={footerHeadingClasses}>Quick Links</h3>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={commonLinkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className={footerHeadingClasses}>Connect</h3>
            <div className="mt-3 flex space-x-4">
              {connectLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors" // Keep specific style or use commonLinkClasses if appropriate
                  aria-label={link.label} // Add aria-label for accessibility
                >
                  <link.icon className="h-5 w-5" aria-hidden="true" />
                  {/* Screen reader text remains important */}
                  <span className="sr-only">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom section: Copyright & Attribution */}
        <div className="border-border/40 mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          {' '}
          {/* Use sm breakpoint for row layout */}
          <p className="text-muted-foreground text-center text-sm sm:text-left">
            &copy; {currentYear} Trivia Master. All rights reserved.
          </p>
          <p className="text-muted-foreground text-center text-sm sm:text-right">
            Built by{' '}
            <Link
              href="https://github.com/WilsonRIP"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary font-medium" // Slightly different style for attribution link maybe? Or use commonLinkClasses
            >
              WilsonRIP
            </Link>
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
