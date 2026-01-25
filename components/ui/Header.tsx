'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { cn } from '@/lib/utils';
import { Navbar } from '../nav/Navbar';

const navItems = [
  { href: '/browse', label: 'Browse' },
  { href: '/about', label: 'About' },
];

export function Header() {
  return (
    <Navbar items={navItems} />
  )

  // return (
  //   <header className="bg-white shadow-sm border-b">
  //     <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
  //       {/* Logo */}
  //       <Link href="/" className="flex items-center gap-2 group">
  //         <span className="text-blue-600 text-2xl font-black tracking-tight group-hover:opacity-80 transition">
  //           🚗 Cars
  //         </span>
  //       </Link>

  //       {/* Navigation */}
  //       <ul className="flex gap-6 text-sm font-medium text-gray-700">
  //         {navItems.map(({ href, label }) => (
  //           <li key={href}>
  //             <Link
  //               href={href}
  //               className={cn(
  //                 'transition-colors hover:text-blue-600',
  //                 pathname === href && 'text-blue-600 font-semibold'
  //               )}
  //               aria-current={pathname === href ? 'page' : undefined}
  //             >
  //               {label}
  //             </Link>
  //           </li>
  //         ))}
  //       </ul>
  //     </nav>
  //   </header>
  // );
}
