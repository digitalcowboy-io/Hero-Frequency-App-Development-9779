import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { pdfHelpers } from '@/lib/pdf';
import { copyToClipboard, shareContent } from '@/lib/utils';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiDownload, FiShare2, FiRefreshCw, FiCheck, FiStar, FiHeart } = FiIcons;

const FinalStage = ({ onRestart, heroData }) => {
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setDownloading(true);
      await pdfHelpers.downloadPDF(heroData, `hero-frequency-${Date.now()}.pdf`);
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF');
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    try {
      setSharing(true);
      const shareableLink = await pdfHelpers.generateShareableLink(heroData);
      
      const shareData = {
        title: `My Hero Frequency: ${heroData.identity.title}`,
        text: `I just discovered my Hero Frequency! Check out my cosmic blueprint.`,
        url: shareableLink
      };

      await shareContent(shareData);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share');
    } finally {
      setSharing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const celebrationVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { 
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.5
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Celebration Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.div
              variants={celebrationVariants}
              className="w-32 h-32 bg-gradient-to-br from-brand-energy to-brand-action rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <SafeIcon icon={FiCheck} className="w-16 h-16 text-white" />
            </motion.div>
            
            <h1 className="text-5xl font-bold font-inter text-white mb-4">
              <span className="text-brand-illumination">Frequency</span> Activated!
            </h1>
            <p className="text-xl text-white/80 font-lexend max-w-2xl mx-auto">
              Your Hero Frequency is now fully revealed. You are ready to transmit your unique 
              cosmic blueprint to the world.
            </p>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {/* Identity Summary */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-brand-energy to-brand-action border-none text-white h-full">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <SafeIcon icon={FiStar} className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold font-inter">Your Identity</h3>
                    <p className="text-white/90 font-lexend">
                      {heroData.identity.title}
                    </p>
                    <div className="text-sm text-white/80 font-lexend">
                      Gates {heroData.gateData.personalitySun} • {heroData.gateData.designSun}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mantras Summary */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-brand-expansion to-brand-foundation border-none text-white h-full">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <SafeIcon icon={FiHeart} className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold font-inter">Your Mantras</h3>
                    <p className="text-white/90 font-lexend">
                      {heroData.mantras.length} personalized affirmations
                    </p>
                    <div className="text-sm text-white/80 font-lexend">
                      Ready to empower your daily practice
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Story Summary */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-brand-illumination to-brand-energy border-none text-white h-full">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <SafeIcon icon={FiStar} className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold font-inter">Your Mythos</h3>
                    <p className="text-white/90 font-lexend">
                      7-stage Hero's Journey
                    </p>
                    <div className="text-sm text-white/80 font-lexend">
                      Your personal transformation story
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-center">
                  Take Your Frequency Into The World
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <Button
                    onClick={handleDownloadPDF}
                    loading={downloading}
                    className="flex items-center justify-center gap-2 h-14"
                  >
                    <SafeIcon icon={FiDownload} className="w-5 h-5" />
                    Download Complete PDF
                  </Button>
                  
                  <Button
                    variant="secondary"
                    onClick={handleShare}
                    loading={sharing}
                    className="flex items-center justify-center gap-2 h-14"
                  >
                    <SafeIcon icon={FiShare2} className="w-5 h-5" />
                    Share Your Frequency
                  </Button>
                </div>
                
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={onRestart}
                    className="flex items-center gap-2"
                  >
                    <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                    Discover Another Frequency
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transmission Message */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Card className="bg-gradient-to-r from-brand-depth to-brand-foundation border-none text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold font-inter mb-4">
                  You Are Now In <span className="text-brand-illumination">Transmission Mode</span>
                </h3>
                <p className="text-white/90 font-lexend text-lg leading-relaxed">
                  Your Hero Frequency is activated and ready to serve. Share your unique blueprint 
                  with the world and help others discover their own cosmic purpose. The universe 
                  is waiting for your transmission.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default FinalStage;