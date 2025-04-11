'use client'

import Link from 'next/link'
import { Github } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="border-border/40 bg-background border-t"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold">Trivia Master</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Test your knowledge with unique trivia questions about Trump
              quotes, world events, and more.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#categories"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-to-play"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  How to Play
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold">Connect</h3>
            <div className="mt-3 flex space-x-4">
              <Link
                href="https://github.com/WilsonRIP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-border/40 mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-center text-sm md:text-left">
            &copy; {currentYear} Trivia Master. All rights reserved.
          </p>
          <p className="text-muted-foreground text-center text-sm md:text-right">
            Built by{' '}
            <Link
              href="https://github.com/WilsonRIP"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              WilsonRIP
            </Link>
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
