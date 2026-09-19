import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap border border-transparent text-sm font-medium transition-[color,background-color,border-color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)] disabled:pointer-events-none disabled:border-[var(--disabled-border)] disabled:bg-[var(--disabled-bg)] disabled:text-[var(--disabled-fg)] disabled:opacity-100',
  {
    variants: {
      variant: {
        default: 'bg-[var(--action)] text-[var(--action-text)] hover:bg-[var(--action-hover)]',
        secondary: 'border-[var(--border-strong)] bg-[var(--surface-muted)] text-[var(--text)] hover:bg-[var(--surface-hover)]',
        outline: 'border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--text)] hover:bg-[var(--surface-hover)]',
        ghost: 'bg-transparent text-[var(--text)] hover:bg-[var(--surface-hover)]',
        selected: 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-text)] hover:bg-[var(--accent-hover)]',
      },
      size: { default: 'h-11 px-5 py-2', sm: 'h-9 px-3', icon: 'size-10' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);
function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) { const Comp = asChild ? Slot : 'button'; return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />; }
export { Button, buttonVariants };
