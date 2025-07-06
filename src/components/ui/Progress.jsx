import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Progress = ({
  value = 0,
  max = 100,
  className,
  showLabel = true,
  label,
  size = 'default'
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizes = {
    sm: 'h-2',
    default: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={cn('w-full space-y-2', className)}>
      {showLabel && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium font-inter text-brand-depth">
            {label || 'Progress'}
          </span>
          <span className="text-sm font-medium font-lexend text-brand-energy">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={cn(
        'w-full bg-gray-200 rounded-full overflow-hidden',
        sizes[size]
      )}>
        <motion.div
          className="h-full bg-gradient-to-r from-brand-energy to-brand-action rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default Progress;