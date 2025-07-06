import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Card, CardContent } from '@/components/ui/Card';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar, FiExternalLink, FiUser } = FiIcons;

const WelcomeStage = ({ onContinue, user, isReturning }) => {
  const [showChartModal, setShowChartModal] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="relative inline-block mb-8">
              <motion.div
                className="w-24 h-24 bg-brand-energy rounded-full flex items-center justify-center mx-auto"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(244, 149, 88, 0.3)',
                    '0 0 40px rgba(244, 149, 88, 0.6)',
                    '0 0 20px rgba(244, 149, 88, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <SafeIcon icon={FiStar} className="w-12 h-12 text-white" />
              </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold font-inter text-white mb-6">
              {isReturning ? (
                <>
                  Welcome Back, <span className="text-brand-illumination">Trailblazer</span>
                </>
              ) : (
                <>
                  Your <span className="text-brand-illumination">Hero Frequency</span>
                </>
              )}
            </h1>
            
            <p className="text-xl text-white/80 font-lexend max-w-2xl mx-auto leading-relaxed">
              {isReturning ? (
                "Ready to dive deeper into your cosmic blueprint? Your journey continues..."
              ) : (
                "Discover your unique energetic blueprint and unlock the cosmic frequency that makes you unstoppable."
              )}
            </p>
          </motion.div>

          {/* Pills Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Orange Pill */}
              <Card className="bg-gradient-to-br from-brand-energy to-brand-action border-none text-white hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <SafeIcon icon={FiStar} className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold font-inter">The Orange Pill</h3>
                    <p className="text-white/90 font-lexend">
                      I have my Human Design chart and I'm ready to discover my Hero Frequency
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-brand-energy"
                      onClick={() => onContinue('input')}
                    >
                      Take the Orange Pill →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Teal Pill */}
              <Card className="bg-gradient-to-br from-brand-expansion to-brand-foundation border-none text-white hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <SafeIcon icon={FiUser} className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold font-inter">The Teal Pill</h3>
                    <p className="text-white/90 font-lexend">
                      I need to get my Human Design chart first
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-brand-expansion"
                      onClick={() => setShowChartModal(true)}
                    >
                      I Need My Blueprint First
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Info */}
            {user && (
              <motion.div
                variants={itemVariants}
                className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm max-w-md mx-auto"
              >
                <p className="text-white/80 font-lexend">
                  Welcome back, {user.email}
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Chart Modal */}
      <Modal
        isOpen={showChartModal}
        onClose={() => setShowChartModal(false)}
        title="Get Your Human Design Chart"
        size="lg"
      >
        <div className="space-y-6">
          <p className="text-gray-600 font-lexend">
            To discover your Hero Frequency, you'll need your Human Design chart. 
            We recommend these trusted sources:
          </p>
          
          <div className="grid gap-4">
            <a
              href="https://www.jovianarchive.com/get_your_chart"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-brand-energy transition-colors"
            >
              <div>
                <h4 className="font-inter font-semibold text-brand-depth">Jovian Archive</h4>
                <p className="text-sm text-gray-600">Official Human Design chart</p>
              </div>
              <SafeIcon icon={FiExternalLink} className="w-5 h-5 text-brand-energy" />
            </a>
            
            <a
              href="https://www.myhumandesign.com/get-your-chart/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-brand-energy transition-colors"
            >
              <div>
                <h4 className="font-inter font-semibold text-brand-depth">My Human Design</h4>
                <p className="text-sm text-gray-600">Free comprehensive chart</p>
              </div>
              <SafeIcon icon={FiExternalLink} className="w-5 h-5 text-brand-energy" />
            </a>
          </div>
          
          <div className="bg-brand-illumination/10 p-4 rounded-lg">
            <p className="text-sm font-lexend text-brand-depth">
              <strong>What you'll need:</strong> Your birth date, time, and location. 
              Look for your "Personality Sun" and "Design Sun" gates on your chart.
            </p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowChartModal(false)}
            >
              I'll Get My Chart
            </Button>
            <Button
              onClick={() => {
                setShowChartModal(false);
                onContinue('input');
              }}
            >
              I Have My Chart
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default WelcomeStage;