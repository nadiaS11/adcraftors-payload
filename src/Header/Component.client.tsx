'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import type { Header } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { Settings, X, Menu } from 'lucide-react'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const navigationItems = data.navItems
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
      <div className="container-full">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-serif font-bold text-primary hover:text-accent transition-colors"
            >
              AdCraftors
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems?.map(({ link, id }) => (
                <CMSLink
                  key={id}
                  className={cn(
                    'transition-colors duration-200 relative py-2',
                    isActive(`${link?.url}`)
                      ? 'text-primary font-medium'
                      : 'text-foreground hover:text-primary',
                  )}
                  appearance={'inline'}
                  {...link}
                >
                  {isActive(`${link?.url}`) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </CMSLink>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Admin
              </Link>
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-accent transition-colors duration-200"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              {navigationItems?.map(({ link, id }) => (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <li key={id} onClick={() => setIsOpen(false)}>
                  <CMSLink
                    className={cn(
                      'block px-3 py-2 transition-colors duration-200',
                      isActive(`${link?.url}`)
                        ? 'text-primary font-medium bg-primary/10 rounded-md'
                        : 'text-foreground hover:text-primary hover:bg-primary/5 rounded-md',
                    )}
                    {...link}
                    appearance={'inline'}
                  />
                </li>
              ))}
              <Link
                href="/auth/login"
                className="flex items-center gap-2 px-3 py-2 text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-4 w-4" />
                Admin
              </Link>
              <div className="px-3 py-2">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Get Started
                </Button>
              </div>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
