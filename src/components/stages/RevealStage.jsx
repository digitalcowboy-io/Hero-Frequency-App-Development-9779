import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Progress from '@/components/ui/Progress';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { humanDesignData } from '@/lib/humanDesign';
import { openaiHelpers } from '@/lib/openai';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiArrowRight, FiStar, FiZap, FiHeart, FiTarget } = FiIcons;

const RevealStage = ({ onContinue, onBack, gateData }) => {
  const [identity, setIdentity] = useState(null);
  const [mantras, setMantras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateContent = async () => {
      try {
        setLoading(true);
        
        // Generate superhero identity
        const superheroIdentity = humanDesignData.generateSuperheroIdentity(gateData);
        setIdentity(superheroIdentity);
        
        // Generate mantras
        const generatedMantras = await openaiHelpers.generateMantras(gateData);
        setMantras(generatedMantras);
        
      } catch (error) {
        console.error('Error generating content:', error);
        // Fallback content
        setIdentity({
          title: 'The Cosmic Architect',
          type: 'Individual',
          strategy: 'To Inform',
          profile: '1/3',
          authority: 'Emotional',
          theme: 'Self-Expression',
          auraColor: '#F49558'
        });
        setMantras([
          'I am aligned with my unique Hero Frequency',
          'I embody my authentic power with cosmic purpose',
          'I illuminate the path for others through my example',
          'I transmit wisdom through aligned action'
        ]);
      } finally {
        setLoading(false);
      }
    };

    generateContent();
  }, [gateData]);

  const handleContinue = () => {
    onContinue('mythos', { gateData, identity, mantras });
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
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const mantraVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Progress value={50} label="Step 2 of 4" />
            </div>
            <motion.div
              className="w-20 h-20 bg-brand-energy rounded-full flex items-center justify-center mx-auto mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <SafeIcon icon={FiStar} className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold font-inter text-white mb-4">
              Channeling Your Hero Frequency...
            </h2>
            <p className="text-white/80 font-lexend">
              The cosmic algorithms are analyzing your unique blueprint
            </p>
          </div>
        </div>
      </Layout>
    );
  }

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
              Your <span className="text-brand-illumination">Hero Identity</span> Revealed
            </h1>
            <p className="text-xl text-white/80 font-lexend">
              Behold your cosmic superhero blueprint
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div variants={itemVariants} className="mb-8">
            <Progress value={50} label="Step 2 of 4" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Identity Card */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-brand-energy to-brand-action border-none text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <CardContent className="p-8 relative z-10">
                  <div className="text-center space-y-6">
                    {/* Aura Animation */}
                    <motion.div
                      className="relative mx-auto w-32 h-32"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <div
                        className="absolute inset-0 rounded-full blur-xl"
                        style={{
                          background: `radial-gradient(circle, ${identity?.auraColor}40, transparent)`,
                          animation: 'pulse 3s ease-in-out infinite'
                        }}
                      />
                      <div className="absolute inset-4 bg-white/20 rounded-full flex items-center justify-center">
                        <SafeIcon icon={FiStar} className="w-12 h-12 text-white" />
                      </div>
                    </motion.div>

                    <div>
                      <h2 className="text-3xl font-bold font-inter mb-2">
                        {identity?.title}
                      </h2>
                      <p className="text-white/80 font-lexend">
                        Gates {gateData.personalitySun} • {gateData.designSun}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="font-lexend text-white/70">Type</p>
                        <p className="font-inter font-semibold">{identity?.type}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="font-lexend text-white/70">Strategy</p>
                        <p className="font-inter font-semibold">{identity?.strategy}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="font-lexend text-white/70">Profile</p>
                        <p className="font-inter font-semibold">{identity?.profile}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="font-lexend text-white/70">Authority</p>
                        <p className="font-inter font-semibold">{identity?.authority}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mantras */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white/95 backdrop-blur-sm h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SafeIcon icon={FiZap} className="w-5 h-5 text-brand-energy" />
                    Your Hero Mantras
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mantras.map((mantra, index) => (
                      <motion.div
                        key={index}
                        variants={mantraVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.2 }}
                        className="flex items-start gap-3 p-4 bg-gradient-to-r from-brand-energy/5 to-brand-illumination/5 rounded-lg border border-brand-energy/10"
                      >
                        <div className="w-8 h-8 bg-brand-energy rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <SafeIcon 
                            icon={[FiHeart, FiTarget, FiStar, FiZap][index]} 
                            className="w-4 h-4 text-white" 
                          />
                        </div>
                        <p className="font-lexend text-brand-depth leading-relaxed">
                          {mantra}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="flex justify-between pt-8">
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
              Discover My Mythos
              <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default RevealStage;