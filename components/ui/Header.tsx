import { Navbar } from '../nav/Navbar';

const navItems = [
  { href: '/browse', label: 'Browse' },
  { href: '/about ', label: 'About' },
];

export function Header() {
  return (
    <Navbar items={navItems} />
  )
}
