import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Progress from '@/components/ui/Progress';
import { Card, CardContent } from '@/components/ui/Card';
import { humanDesignData } from '@/lib/humanDesign';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiArrowRight } = FiIcons;

const ProfileSelectionStage = ({ onContinue, onBack, heroData }) => {
  const [selectedLine1, setSelectedLine1] = useState(null);
  const [selectedLine2, setSelectedLine2] = useState(null);

  const handleContinue = () => {
    if (selectedLine1 && selectedLine2) {
      const profile = `${selectedLine1}/${selectedLine2}`;
      onContinue('authoritySelection', { ...heroData, profile });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  const isValidProfile = () => {
    if (!selectedLine1 || !selectedLine2) return false;
    const profile = `${selectedLine1}/${selectedLine2}`;
    return humanDesignData.profiles[profile] !== undefined;
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
              Choose Your <span className="text-brand-illumination">Profile Lines</span>
            </h1>
            <p className="text-xl text-white/80 font-lexend">
              Select between the two profile lines that define your life theme
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div variants={itemVariants} className="mb-8">
            <Progress value={50} label="Step 2 of 4" />
          </motion.div>

          {/* Profile Line Selection */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* First Line Selection */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/95 backdrop-blur-sm h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold font-inter text-brand-depth mb-4 text-center">
                    First Line (Conscious)
                  </h3>
                  <p className="text-sm text-gray-600 font-lexend mb-6 text-center">
                    How you see yourself
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((line) => (
                      <motion.div
                        key={line}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-200 border-2 ${
                            selectedLine1 === line
                              ? 'border-brand-energy bg-brand-energy/5 shadow-lg'
                              : 'border-gray-200 hover:border-brand-energy/50'
                          }`}
                          onClick={() => setSelectedLine1(line)}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="space-y-2">
                              <div
                                className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-sm font-bold ${
                                  selectedLine1 === line
                                    ? 'bg-brand-energy text-white'
                                    : 'bg-gray-200 text-gray-600'
                                }`}
                              >
                                {line}
                              </div>
                              <div>
                                <p className="text-sm font-bold font-inter text-brand-depth">
                                  {humanDesignData.profileLines[line].name}
                                </p>
                                <p className="text-xs text-gray-600 font-lexend">
                                  {humanDesignData.profileLines[line].description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Second Line Selection */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/95 backdrop-blur-sm h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold font-inter text-brand-depth mb-4 text-center">
                    Second Line (Unconscious)
                  </h3>
                  <p className="text-sm text-gray-600 font-lexend mb-6 text-center">
                    How others see you
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((line) => (
                      <motion.div
                        key={line}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-200 border-2 ${
                            selectedLine2 === line
                              ? 'border-brand-expansion bg-brand-expansion/5 shadow-lg'
                              : 'border-gray-200 hover:border-brand-expansion/50'
                          }`}
                          onClick={() => setSelectedLine2(line)}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="space-y-2">
                              <div
                                className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-sm font-bold ${
                                  selectedLine2 === line
                                    ? 'bg-brand-expansion text-white'
                                    : 'bg-gray-200 text-gray-600'
                                }`}
                              >
                                {line}
                              </div>
                              <div>
                                <p className="text-sm font-bold font-inter text-brand-depth">
                                  {humanDesignData.profileLines[line].name}
                                </p>
                                <p className="text-xs text-gray-600 font-lexend">
                                  {humanDesignData.profileLines[line].description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Selected Profile Preview */}
          {selectedLine1 && selectedLine2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card
                className={`border-2 ${
                  isValidProfile()
                    ? 'border-brand-energy bg-brand-energy/5'
                    : 'border-red-300 bg-red-50'
                }`}
              >
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold font-inter text-brand-depth mb-2">
                    Profile {selectedLine1}/{selectedLine2}
                  </h3>
                  {isValidProfile() ? (
                    <p className="text-brand-depth/80 font-lexend">
                      {humanDesignData.profiles[`${selectedLine1}/${selectedLine2}`].name}
                    </p>
                  ) : (
                    <p className="text-red-600 font-lexend">
                      This profile combination doesn't exist in Human Design. Please select a valid combination.
                    </p>
                  )}
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
              disabled={!isValidProfile()}
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

export default ProfileSelectionStage;