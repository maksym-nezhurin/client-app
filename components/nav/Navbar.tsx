// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui/Button'
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar({ items }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm border-b border-brand-muted sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-brand-primary font-bold text-xl tracking-tight">
          AutoMarket
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-text-primary">
            {items.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    className={cn(
                    'transition-colors hover:text-blue-600',
                    pathname === href && 'text-blue-600 font-semibold'
                    )}
                    aria-current={pathname === href ? 'page' : undefined}
                >
                    {label}
                </Link>
            ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/list"
            className="bg-primary text-white px-4 py-2 rounded-xl font-medium hover:bg-orange-600 transition"
          >
            List Your Car
          </Link>
          <Link
            href="/login"
            className="text-text-secondary hover:text-brand-primary font-medium"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          onClick={() => setOpen(!open)}
          className="md:hidden text-text-primary focus:outline-none"
        >
          ☰
        </Button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t border-brand-muted">
          <Link href="/browse" className="block text-text-primary">
            Browse
          </Link>
          <Link href="/rent" className="block text-text-primary">
            Rent
          </Link>
          <Link href="/sell" className="block text-text-primary">
            Sell
          </Link>
          <Link href="/list" className="block text-brand-secondary font-semibold">
            List Your Car
          </Link>
          <Link href="/login" className="block text-text-secondary">
            Login
          </Link>
        </div>
      )}
    </header>
  )
}
