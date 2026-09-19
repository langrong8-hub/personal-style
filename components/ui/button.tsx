import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const buttonVariants = cva('inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 disabled:pointer-events-none disabled:opacity-50', { variants: { variant: { default: 'bg-stone-800 text-white hover:bg-stone-700', outline: 'border border-stone-300 bg-transparent hover:bg-stone-100', ghost: 'hover:bg-stone-200/50' }, size: { default: 'h-11 px-5 py-2', sm: 'h-9 px-3', icon: 'size-10' } }, defaultVariants: { variant: 'default', size: 'default' } });
function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) { const Comp = asChild ? Slot : 'button'; return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />; }
export { Button, buttonVariants };
