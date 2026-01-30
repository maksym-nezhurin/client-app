import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: {
    track: 'h-5 w-9',
    thumb: 'h-3 w-3',
    translate: { on: 'translate-x-5', off: 'translate-x-1' },
  },
  md: {
    track: 'h-6 w-11',
    thumb: 'h-4 w-4',
    translate: { on: 'translate-x-6', off: 'translate-x-1' },
  },
  lg: {
    track: 'h-7 w-14',
    thumb: 'h-5 w-5',
    translate: { on: 'translate-x-8', off: 'translate-x-1' },
  },
};

export function Toggle({
  enabled,
  onChange,
  disabled = false,
  size = 'md',
  className,
}: ToggleProps) {
  const sizes = sizeStyles[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={onChange}
      className={cn(
        'relative inline-flex items-center shrink-0 rounded-full transition-colors duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        sizes.track,
        enabled
          ? 'bg-primary'
          : 'bg-slate-300 dark:bg-slate-700',
        className
      )}
    >
      <span className="sr-only">Toggle</span>
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
          sizes.thumb,
          enabled ? sizes.translate.on : sizes.translate.off
        )}
      />
    </button>
  );
}
