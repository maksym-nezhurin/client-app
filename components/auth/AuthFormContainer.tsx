import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AuthFormContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  footer?: {
    text: string;
    linkText: string;
    linkHref: string;
  };
  className?: string;
}

export function AuthFormContainer({
  children,
  title,
  subtitle,
  footer,
  className,
}: AuthFormContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-md', className)}>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95">
        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-purple-500/5" />
        
        <div className="relative space-y-6 p-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="bg-linear-to-br from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-slate-300">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {/* Form content */}
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-border/50 bg-muted/30 px-8 py-4 text-center">
            <p className="text-sm text-muted-foreground">
              {footer.text}{' '}
              <Link
                href={footer.linkHref}
                className="font-medium text-primary hover:underline"
              >
                {footer.linkText}
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
