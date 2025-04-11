'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { useState } from 'react'
import { Menu, X, Brain, LightbulbIcon, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
    {
      label: 'Categories',
      href: '/#categories',
      icon: <Brain className="h-4 w-4" />,
    },
    {
      label: 'How to Play',
      href: '/#how-to-play',
      icon: <LightbulbIcon className="h-4 w-4" />,
    },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <motion.header
      className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <motion.span
              className="from-primary bg-gradient-to-r to-pink-600 bg-clip-text text-2xl font-bold text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Trivia<span className="text-foreground">Master</span>
            </motion.span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <ul className="flex gap-6">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))

              return (
                <motion.li
                  key={item.href}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={item.href}
                    className={`hover:text-primary flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </motion.li>
              )
            })}
          </ul>
          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className={`overflow-hidden md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container py-4">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`hover:text-primary flex items-center gap-2 py-2 text-base font-medium transition-colors ${
                      isActive
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </motion.div>
    </motion.header>
  )
}
