import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Progress from '@/components/ui/Progress';
import { Card, CardContent } from '@/components/ui/Card';
import { humanDesignData } from '@/lib/humanDesign';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiArrowRight, FiCircle } = FiIcons;

const TypeSelectionStage = ({ onContinue, onBack }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleContinue = () => {
    if (selectedType) {
      // Changed to go to TypeRevealStage instead of directly to profile selection
      onContinue('typeReveal', { type: selectedType });
    }
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

  const typeData = {
    generator: {
      name: "Generator",
      strategy: "To Respond",
      percentage: "70%",
      aura: "Enveloping",
      color: "#F49558"
    },
    manifestingGenerator: {
      name: "Manifesting Generator",
      strategy: "To Respond & Inform",
      percentage: "33%",
      aura: "Enveloping & Repelling",
      color: "#D35E0E"
    },
    projector: {
      name: "Projector",
      strategy: "Wait for Invitation",
      percentage: "20%",
      aura: "Focused & Absorbing",
      color: "#409FA1"
    },
    manifestor: {
      name: "Manifestor",
      strategy: "To Inform",
      percentage: "9%",
      aura: "Repelling",
      color: "#F6D541"
    },
    reflector: {
      name: "Reflector",
      strategy: "Wait a Lunar Cycle",
      percentage: "1%",
      aura: "Sampling",
      color: "#244A49"
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-inter text-white mb-4">
              Choose Your <span className="text-brand-illumination">Human Design Type</span>
            </h1>
            <p className="text-xl text-white/80 font-lexend max-w-3xl mx-auto">
              Your Type determines your aura, strategy, and how you're designed to interact with the world
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div variants={itemVariants} className="mb-12">
            <Progress value={25} label="Step 1 of 4" />
          </motion.div>

          {/* Type Selection Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {Object.entries(typeData).map(([typeKey, data]) => (
              <motion.div
                key={typeKey}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`transition-all duration-300 ${
                  selectedType && selectedType !== typeKey ? 'opacity-90' : 'opacity-100'
                }`}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 border-2 h-full ${
                    selectedType === typeKey
                      ? 'border-brand-energy bg-brand-energy/5 shadow-xl'
                      : 'border-gray-200 hover:border-brand-energy/50 hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedType(typeKey)}
                >
                  <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Aura Icon */}
                      <motion.div
                        className="w-16 h-16 mx-auto rounded-full flex items-center justify-center relative"
                        style={{ backgroundColor: `${data.color}20` }}
                        animate={selectedType === typeKey ? { 
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            `0 0 0 0 ${data.color}40`,
                            `0 0 0 10px ${data.color}20`,
                            `0 0 0 0 ${data.color}40`
                          ]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div
                          className="w-10 h-10 rounded-full border-2 border-brand-illumination"
                          style={{ backgroundColor: data.color }}
                        />
                        {selectedType === typeKey && (
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-brand-energy"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.3, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.div>

                      {/* Type Info */}
                      <div>
                        <h3 className="text-lg font-bold font-inter text-brand-depth mb-2">
                          {data.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-lexend mb-3 leading-relaxed">
                          {data.strategy}
                        </p>
                        <div className="text-xs text-gray-500 font-lexend">
                          <p><strong>Population:</strong> {data.percentage}</p>
                        </div>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {selectedType === typeKey && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 w-6 h-6 bg-brand-energy rounded-full mx-auto flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Type Summary */}
          {selectedType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <Card className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-sm border border-brand-energy/20">
                <CardContent className="p-6">
                  <div className="text-center space-y-3">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
                      <div className="flex items-center gap-2">
                        <span className="text-brand-expansion font-inter font-semibold">
                          {typeData[selectedType].name} aura:
                        </span>
                        <span className="font-lexend text-brand-depth">
                          {typeData[selectedType].aura}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-brand-action font-inter font-semibold">
                          Strategy:
                        </span>
                        <span className="font-lexend text-brand-depth">
                          {typeData[selectedType].strategy}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div variants={itemVariants} className="flex justify-between items-center">
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
              disabled={!selectedType}
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

export default TypeSelectionStage;