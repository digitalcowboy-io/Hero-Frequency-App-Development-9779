import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Progress from '@/components/ui/Progress';
import { Card, CardContent } from '@/components/ui/Card';
import { humanDesignData } from '@/lib/humanDesign';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiArrowRight } = FiIcons;

const ProfileRevealStage = ({ onContinue, onBack, heroData }) => {
  const profileData = humanDesignData.profiles[heroData.profile];
  const [line1, line2] = heroData.profile.split('/').map(Number);
  const line1Data = humanDesignData.profileLines[line1];
  const line2Data = humanDesignData.profileLines[line2];

  const handleContinue = () => {
    onContinue('authoritySelection', heroData);
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

  // Determine if this is an explorer/heretic profile
  const isExplorerHeretic = line2 === 3 || line2 === 5;

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
              Your <span className="text-brand-illumination">Profile</span> Revealed
            </h1>
            <p className="text-xl text-white/80 font-lexend">
              The {heroData.profile} {profileData.name}
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div variants={itemVariants} className="mb-8">
            <Progress value={80} label="Step 4 of 5" />
          </motion.div>

          {/* Main Profile Card */}
          <motion.div variants={itemVariants} className="mb-8">
            <Card className="bg-gradient-to-br from-brand-expansion to-brand-foundation border-none text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <CardContent className="p-8 relative z-10">
                <div className="text-center space-y-6">
                  {/* Profile Visual */}
                  <div className="flex justify-center items-center space-x-6">
                    <motion.div
                      className="w-16 h-16 bg-brand-energy rounded-full flex items-center justify-center text-xl font-bold text-white"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {line1}
                    </motion.div>
                    <div className="text-3xl text-white/60 font-bold">/</div>
                    <motion.div
                      className="w-16 h-16 bg-brand-illumination rounded-full flex items-center justify-center text-xl font-bold text-brand-depth"
                      animate={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    >
                      {line2}
                    </motion.div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold font-inter mb-4">
                      The {profileData.name}
                    </h2>
                    <p className="text-white/90 font-lexend text-lg leading-relaxed mb-4">
                      {profileData.description}
                    </p>
                    {/* Explorer/Heretic Traits */}
                    {isExplorerHeretic && (
                      <div className="bg-white/10 rounded-lg p-4">
                        <h3 className="text-lg font-bold font-inter mb-2">
                          {line2 === 3 ? 'Explorer' : 'Heretic'} Traits
                        </h3>
                        <p className="text-white/80 font-lexend text-sm">
                          {line2 === 3
                            ? 'You learn through trial and error, experimenting to find what works.'
                            : 'You provide universal solutions and are often projected upon by others.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Lines Meaning */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold font-inter text-brand-depth mb-2">
                    Line {line1}: {line1Data.name}
                  </h3>
                  <p className="text-sm text-brand-depth/70 font-lexend">
                    {line1Data.description}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold font-inter text-brand-depth mb-2">
                    Line {line2}: {line2Data.name}
                  </h3>
                  <p className="text-sm text-brand-depth/70 font-lexend">
                    {line2Data.description}
                  </p>
                </CardContent>
              </Card>
            </div>
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

export default ProfileRevealStage;