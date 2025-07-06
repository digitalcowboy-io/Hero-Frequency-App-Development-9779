import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Button = React.forwardRef(({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  children,
  disabled,
  loading,
  ...props
}, ref) => {
  const variants = {
    default: 'bg-brand-energy hover:bg-brand-action text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-brand-expansion hover:bg-brand-foundation text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-brand-energy text-brand-energy hover:bg-brand-energy hover:text-white',
    ghost: 'text-brand-energy hover:bg-brand-energy/10',
    pill: 'bg-gradient-to-r from-brand-energy to-brand-action text-white shadow-lg hover:shadow-xl hover:scale-105',
    teal: 'bg-brand-expansion hover:bg-brand-foundation text-white shadow-lg hover:shadow-xl'
  };

  const sizes = {
    default: 'h-12 px-6 py-3',
    sm: 'h-9 px-4 py-2 text-sm',
    lg: 'h-14 px-8 py-4 text-lg',
    icon: 'h-10 w-10'
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-energy focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className
  );

  const Component = asChild ? motion.div : motion.button;

  return (
    <Component
      className={baseClasses}
      ref={ref}
      disabled={disabled || loading}
      whileHover={{ scale: variant === 'pill' ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {children}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;