import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar } = FiIcons;

const LoadingScreen = ({ message = "Loading your cosmic frequency..." }) => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-20 h-20 bg-brand-energy rounded-full flex items-center justify-center mx-auto mb-8"
            animate={{ 
              rotate: 360,
              boxShadow: [
                '0 0 20px rgba(244, 149, 88, 0.3)',
                '0 0 40px rgba(244, 149, 88, 0.6)',
                '0 0 20px rgba(244, 149, 88, 0.3)'
              ]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
              boxShadow: { duration: 2, repeat: Infinity }
            }}
          >
            <SafeIcon icon={FiStar} className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-bold font-inter text-white mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.h2>
          
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-brand-illumination rounded-full"
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoadingScreen;