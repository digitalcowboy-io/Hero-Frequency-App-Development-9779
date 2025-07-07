import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { humanDesignData } from '@/lib/humanDesign';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiArrowRight, FiHeart, FiZap, FiMessageCircle } = FiIcons;

const AuthorityRevealStage = ({ onContinue, onBack, heroData }) => {
  const authorityData = humanDesignData.authorities[heroData.authority];

  const handleContinue = () => {
    onContinue('gateInput', heroData);
  };

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
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const getAuthorityIcon = () => {
    const icons = {
      emotional: FiHeart,
      sacral: FiZap,
      splenic: FiMessageCircle,
      ego: FiZap,
      selfProjected: FiMessageCircle,
      mentalProjector: FiMessageCircle,
      lunar: FiHeart
    };
    return icons[heroData.authority] || FiZap;
  };

  const AuthorityIcon = getAuthorityIcon();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl font-bold font-inter text-white mb-4">
              Your <span className="text-brand-illumination">Authority</span> Revealed
            </h1>
            <p className="text-xl text-white/80 font-lexend">
              How you're designed to make correct decisions
            </p>
          </motion.div>

          {/* Main Authority Card */}
          <motion.div variants={itemVariants} className="mb-8">
            <Card className="bg-gradient-to-br from-brand-illumination to-brand-energy border-none text-brand-depth relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <CardContent className="p-8 relative z-10">
                <div className="text-center space-y-6">
                  {/* Authority Visual */}
                  <motion.div
                    className="relative mx-auto w-24 h-24"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: heroData.authority === 'lunar' ? [0, 360] : 0
                    }}
                    transition={{
                      scale: {
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      },
                      rotate: {
                        duration: 28,
                        repeat: Infinity,
                        ease: 'linear'
                      }
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full blur-xl opacity-60"
                      style={{ backgroundColor: `${authorityData.color}40` }}
                    />
                    <div
                      className="relative w-full h-full rounded-full flex items-center justify-center shadow-2xl"
                      style={{ backgroundColor: authorityData.color }}
                    >
                      <AuthorityIcon className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold font-inter mb-4">
                      {authorityData.name}
                    </h2>
                    <p className="text-lg font-lexend leading-relaxed mb-6">
                      {authorityData.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Global Navigation */}
          <motion.div variants={itemVariants} className="flex justify-between">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2 text-white border-white hover:bg-white hover:text-brand-depth"
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
              Back
            </Button>
            <Button
              onClick={handleContinue}
              className="flex items-center gap-2"
            >
              Continue
              <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AuthorityRevealStage;