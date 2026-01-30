import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva(
  'mx-auto w-full',
  {
    variants: {
      size: {
        sm: 'max-w-3xl',
        default: 'max-w-7xl',
        lg: 'max-w-[90rem]',
        full: 'max-w-full',
      },
      padding: {
        none: '',
        default: 'px-4 md:px-8',
        sm: 'px-4',
        lg: 'px-6 md:px-12',
      },
    },
    defaultVariants: {
      size: 'default',
      padding: 'default',
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, padding }), className)}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';

export { Container, containerVariants };
