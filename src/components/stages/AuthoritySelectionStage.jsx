import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Progress from '@/components/ui/Progress';
import { Card, CardContent } from '@/components/ui/Card';
import { humanDesignData } from '@/lib/humanDesign';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiArrowRight, FiHeart, FiZap, FiBrain, FiClock } = FiIcons;

const AuthoritySelectionStage = ({ onContinue, onBack, heroData }) => {
  const [selectedAuthority, setSelectedAuthority] = useState(null);

  const handleContinue = () => {
    if (selectedAuthority) {
      onContinue('gateInput', { ...heroData, authority: selectedAuthority });
    }
  };

  const getAuthorityIcon = (authorityKey) => {
    const icons = {
      emotional: FiHeart,
      sacral: FiZap,
      splenic: FiBrain,
      ego: FiZap,
      selfProjected: FiBrain,
      mentalProjector: FiBrain,
      lunar: FiClock
    };
    return icons[authorityKey] || FiZap;
  };

  const getAuthorityAnimation = (authorityKey) => {
    const animations = {
      emotional: { scale: [1, 1.1, 1], transition: { duration: 3, repeat: Infinity } },
      sacral: { y: [0, -5, 0], transition: { duration: 1, repeat: Infinity } },
      splenic: { opacity: [1, 0.7, 1], transition: { duration: 2, repeat: Infinity } },
      ego: { rotate: [0, 360], transition: { duration: 4, repeat: Infinity } },
      selfProjected: { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity } },
      mentalProjector: { x: [0, 3, 0], transition: { duration: 2, repeat: Infinity } },
      lunar: { rotate: [0, 360], transition: { duration: 8, repeat: Infinity } }
    };
    return animations[authorityKey] || { scale: [1, 1.05, 1] };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
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
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl font-bold font-inter text-white mb-4">
              Select Your <span className="text-brand-illumination">Decision-Making Authority</span>
            </h1>
            <p className="text-xl text-white/80 font-lexend">
              Your Authority is your inner compass for making correct decisions
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div variants={itemVariants} className="mb-8">
            <Progress value={75} label="Step 3 of 4" />
          </motion.div>

          {/* Authority Cards */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Object.entries(humanDesignData.authorities).map(([authorityKey, authorityData]) => {
              const IconComponent = getAuthorityIcon(authorityKey);
              return (
                <motion.div
                  key={authorityKey}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 border-2 h-full ${
                      selectedAuthority === authorityKey
                        ? 'border-brand-energy bg-brand-energy/5 shadow-xl'
                        : 'border-gray-200 hover:border-brand-energy/50 hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedAuthority(authorityKey)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="space-y-4">
                        {/* Authority Animation */}
                        <motion.div
                          className="w-16 h-16 mx-auto rounded-full flex items-center justify-center relative"
                          style={{ backgroundColor: `${authorityData.color}20` }}
                          animate={selectedAuthority === authorityKey ? getAuthorityAnimation(authorityKey) : {}}
                        >
                          <IconComponent
                            className="w-8 h-8"
                            style={{ color: authorityData.color }}
                          />
                          {selectedAuthority === authorityKey && (
                            <motion.div
                              className="absolute inset-0 rounded-full border-2"
                              style={{ borderColor: authorityData.color }}
                              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.3, 0.8] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-bold font-inter text-brand-depth mb-2">
                            {authorityData.name}
                          </h3>
                          <p className="text-sm text-gray-600 font-lexend mb-3">
                            {authorityData.description}
                          </p>
                        </div>
                        {selectedAuthority === authorityKey && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-6 h-6 bg-brand-energy rounded-full mx-auto flex items-center justify-center"
                          >
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Selected Authority Info */}
          {selectedAuthority && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="bg-gradient-to-r from-brand-energy/10 to-brand-illumination/10 border border-brand-energy/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold font-inter text-brand-depth mb-3">
                    {humanDesignData.authorities[selectedAuthority].name} Selected
                  </h3>
                  <p className="text-brand-depth font-lexend italic text-lg">
                    Decision Strategy: {humanDesignData.authorities[selectedAuthority].description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div variants={itemVariants} className="flex justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 border-2 border-brand-foundation text-brand-foundation hover:bg-brand-foundation hover:text-white"
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedAuthority}
              className="flex items-center gap-2 bg-brand-energy hover:bg-brand-action text-white font-bold font-inter px-8 py-3"
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

export default AuthoritySelectionStage;