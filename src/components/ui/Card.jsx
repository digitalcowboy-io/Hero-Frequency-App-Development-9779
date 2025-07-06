import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Card = React.forwardRef(({
  className,
  animate = true,
  children,
  ...props
}, ref) => {
  const cardClasses = cn(
    'rounded-xl border border-gray-200 bg-white p-6 shadow-lg',
    className
  );

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={cardClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={cardClasses} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

const CardHeader = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-2 pb-4', className)}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <h3
    ref={ref}
    className={cn('text-xl font-bold font-inter text-brand-depth', className)}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-600 font-lexend', className)}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({
  className,
  ...props
}, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
));

CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardDescription, CardContent };