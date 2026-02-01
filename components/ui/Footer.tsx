import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        'border-t border-white/10 bg-slate-950/95 px-6 py-6 backdrop-blur relative z-10',
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl flex items-center justify-between">
        <div className="text-sm text-slate-300">
          © {new Date().getFullYear()} Car Rental Service
        </div>
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}