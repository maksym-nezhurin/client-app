import { cn } from '@/lib/utils';

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        'border-t border-white/10 bg-slate-950/95 px-6 py-6 text-center text-sm text-slate-300 backdrop-blur',
        className
      )}
    >
      © {new Date().getFullYear()} Car Rental Service
    </footer>
  );
}