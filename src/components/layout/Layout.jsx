import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Layout = ({ children, className, showBackground = true }) => {
  return (
    <div className={cn(
      'min-h-screen',
      showBackground && 'bg-gradient-to-br from-brand-depth via-brand-foundation to-brand-expansion',
      className
    )}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
      
      {showBackground && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-energy/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-illumination/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-expansion/10 rounded-full blur-3xl animate-pulse-slow" />
        </div>
      )}
    </div>
  );
};

export default Layout;