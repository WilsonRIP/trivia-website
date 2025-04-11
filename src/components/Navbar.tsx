/**
 * Navbar Component
 *
 * Displays the main navigation bar for the application.
 * Features:
 * - Responsive design (adapts to desktop and mobile screens).
 * - Sticky header that appears on scroll down.
 * - Animated logo and navigation links using Framer Motion.
 * - Dynamic navigation items based on routes.
 * - Conditional rendering of authentication links (Sign In/Sign Up, Profile/Sign Out) based on user status.
 * - Mobile menu toggle functionality.
 * - Theme toggle integration.
 */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
// Assuming ThemeToggle is correctly imported from its path
import { ThemeToggle } from './ThemeToggle' // Adjust path as needed
import { useState, useEffect } from 'react'
import { Menu, X, Brain, LightbulbIcon, Home, User } from 'lucide-react'
// Assuming Button is correctly imported from its path (e.g., shadcn/ui)
import { Button } from '@/components/ui/button' // Adjust path as needed
// Assuming useAuth is correctly imported from its path
import { useAuth } from '@/components/auth/AuthContext' // Adjust path as needed

// Define the structure for navigation items
interface NavItem {
  label: string
  href: string
  icon: React.ReactNode // Use React.ReactNode for JSX elements
}

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Get user authentication status and methods from context
  const { user, signOut } = useAuth()

  // Define navigation items - easier to manage and map
  const navItems: NavItem[] = [
    { label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
    {
      label: 'Categories',
      href: '/#categories', // Hash link for scrolling on the same page
      icon: <Brain className="h-4 w-4" />,
    },
    {
      label: 'How to Play',
      href: '/#how-to-play', // Hash link for scrolling on the same page
      icon: <LightbulbIcon className="h-4 w-4" />,
    },
  ]

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Function to close the mobile menu (used when a link is clicked)
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Effect to close the mobile menu if the window is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        // 768px is the default 'md' breakpoint in Tailwind
        closeMenu()
      }
    }
    window.addEventListener('resize', handleResize)
    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen]) // Rerun effect if isMenuOpen changes

  // Header animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  // Logo animation variants
  const logoVariants = {
    hover: { scale: 1.05 },
  }

  // Nav item animation variants
  const navItemVariants = {
    hover: { y: -2 },
  }

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 },
  }

  return (
    <motion.header
      className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      // Add role for accessibility
      role="banner"
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2" passHref>
            <motion.span
              className="from-primary bg-gradient-to-r to-pink-600 bg-clip-text text-2xl font-bold text-transparent"
              variants={logoVariants}
              whileHover="hover"
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              Trivia<span className="text-foreground">Master</span>
            </motion.span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Main Navigation"
        >
          <ul className="flex gap-6">
            {navItems.map((item) => {
              // Determine if the current nav item is active
              // Exact match for '/' or startsWith for other paths
              const isActive =
                item.href === '/'
                  ? pathname === item.href
                  : pathname.startsWith(item.href) && item.href !== '/'

              return (
                <motion.li
                  key={item.href}
                  variants={navItemVariants}
                  whileHover="hover"
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={item.href}
                    className={`hover:text-primary flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary font-semibold' // Active link style
                        : 'text-muted-foreground' // Inactive link style
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </motion.li>
              )
            })}
          </ul>

          {/* Desktop Auth Links & Theme Toggle */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/profile" passHref>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/auth" passHref>
                <Button size="sm">Sign In</Button>
              </Link>
            )}
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9" // Consistent icon button size
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} // Dynamic aria-label
            aria-expanded={isMenuOpen} // Indicate menu state for screen readers
            aria-controls="mobile-menu" // Link button to the menu it controls
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div
        id="mobile-menu" // ID for aria-controls
        className="overflow-hidden md:hidden" // Use class instead of inline style for hidden state if possible
        initial="hidden"
        animate={isMenuOpen ? 'visible' : 'hidden'}
        variants={mobileMenuVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Ensure content doesn't jump when menu opens/closes by rendering the container */}
        <div className="container mx-auto px-4 pt-2 pb-4 sm:px-6 lg:px-8">
          <nav aria-label="Mobile Navigation">
            <ul className="flex flex-col gap-4">
              {/* Map through nav items for mobile */}
              {navItems.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === item.href
                    : pathname.startsWith(item.href) && item.href !== '/'

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`hover:text-primary flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-muted text-primary font-semibold' // Style active mobile link
                          : 'text-muted-foreground'
                      }`}
                      onClick={closeMenu} // Close menu on link click
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                )
              })}

              {/* Mobile Auth Links */}
              {user ? (
                <>
                  <li>
                    <Link
                      href="/profile"
                      className="hover:text-primary text-muted-foreground flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium transition-colors"
                      onClick={closeMenu}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    {/* Use a button for the sign out action */}
                    <Button
                      variant="ghost"
                      className="text-muted-foreground hover:text-primary w-full justify-start gap-2 rounded-md px-3 py-2 text-base font-medium"
                      onClick={() => {
                        signOut()
                        closeMenu() // Close menu after signing out
                      }}
                    >
                      {/* Consider adding a Sign Out icon */}
                      Sign Out
                    </Button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/auth"
                    className="hover:text-primary text-muted-foreground flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium transition-colors"
                    onClick={closeMenu}
                  >
                    {/* Consider adding an icon */}
                    Sign In / Sign Up
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </motion.div>
    </motion.header>
  )
}
