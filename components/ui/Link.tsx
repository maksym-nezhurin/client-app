import * as React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const linkVariants = cva(
  'inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-primary hover:text-primary/80 underline-offset-4 hover:underline',
        button: 'rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90',
        ghost: 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
        nav: 'text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
        menu: 'block rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground',
      },
      size: {
        default: '',
        sm: 'text-sm',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface LinkProps
  extends Omit<NextLinkProps, 'as'>,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof linkVariants> {
  external?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, external, children, ...props }, ref) => {
    if (external) {
      return (
        <a
          ref={ref}
          className={cn(linkVariants({ variant, size }), className)}
          target="_blank"
          rel="noopener noreferrer"
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <NextLink
        ref={ref}
        className={cn(linkVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);
Link.displayName = 'Link';

export { Link, linkVariants };
