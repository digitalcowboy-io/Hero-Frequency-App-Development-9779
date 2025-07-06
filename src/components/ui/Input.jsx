import React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({
  className,
  type = 'text',
  error,
  label,
  helper,
  ...props
}, ref) => {
  const inputClasses = cn(
    'flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-lexend placeholder:text-gray-400 focus:border-brand-energy focus:outline-none focus:ring-2 focus:ring-brand-energy/20 disabled:cursor-not-allowed disabled:opacity-50',
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
    className
  );

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium font-inter text-brand-depth">
          {label}
        </label>
      )}
      <input
        type={type}
        className={inputClasses}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 font-lexend">{error}</p>
      )}
      {helper && !error && (
        <p className="text-sm text-gray-500 font-lexend">{helper}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;