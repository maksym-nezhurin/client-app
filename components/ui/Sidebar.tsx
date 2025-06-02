import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';

export const Sidebar = ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => {
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-1 h-full w-64 bg-white p-4 shadow-md transition-transform transform',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:static md:shadow-none'
      )}
    >
      {/* Кнопка відкриття/закриття (прикріплена до лівого краю) */}
      <div className="absolute -right-10 top-20 md:hidden">
        <Button
          size="icon"
          variant="secondary"
          className="shadow-md"
          onClick={onToggle}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Навігація */}
      <nav className="flex flex-col space-y-2 mt-12 md:mt-0">
        <Link href="/" className="hover:bg-blue-100 px-3 py-2 rounded">
          Dashboard
        </Link>
        <Link href="/cars" className="hover:bg-blue-100 px-3 py-2 rounded">
          Cars
        </Link>
        <Link href="/about" className="hover:bg-blue-100 px-3 py-2 rounded">
          About
        </Link>

        <Link href="https://admin-liard-pi-71.vercel.app/" className="hover:bg-blue-100 px-3 py-2 rounded">
          Login
        </Link>
      </nav>
    </aside>
  );
};
