import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { validateGate, formatGate } from '@/lib/utils';
import { humanDesignData } from '@/lib/humanDesign';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiArrowRight, FiSun, FiMoon, FiInfo } = FiIcons;

const GateInputStage = ({ onContinue, onBack, heroData }) => {
  const [formData, setFormData] = useState({
    personalitySun: '',
    designSun: ''
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validate form
    const newErrors = {};
    if (!formData.personalitySun) {
      newErrors.personalitySun = 'Personality Sun gate is required';
    } else if (!validateGate(formData.personalitySun)) {
      newErrors.personalitySun = 'Please enter a valid gate number (1-64)';
    }

    if (!formData.designSun) {
      newErrors.designSun = 'Design Sun gate is required';
    } else if (!validateGate(formData.designSun)) {
      newErrors.designSun = 'Please enter a valid gate number (1-64)';
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0 && formData.personalitySun && formData.designSun);
  }, [formData]);

  const handleInputChange = (field, value) => {
    const formattedValue = formatGate(value);
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const completeHeroData = {
        ...heroData,
        personalitySun: parseInt(formData.personalitySun),
        designSun: parseInt(formData.designSun)
      };
      onContinue('finalReveal', completeHeroData);
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl font-bold font-inter text-white mb-4">
              Enter Your <span className="text-brand-illumination">Frequency Gates</span>
            </h1>
            <p className="text-xl text-white/80 font-lexend">
              Your Personality Sun & Design Sun gates - the final pieces of your cosmic blueprint
            </p>
          </motion.div>

          {/* Form */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SafeIcon icon={FiSun} className="w-5 h-5 text-brand-energy" />
                  Your Core Frequency Gates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Gates Input */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <SafeIcon icon={FiSun} className="w-5 h-5 text-brand-energy" />
                        <span className="text-sm font-medium font-inter text-brand-depth">
                          Personality Sun Gate (1-64)
                        </span>
                      </div>
                      <Input
                        placeholder="e.g., 1"
                        value={formData.personalitySun}
                        onChange={(e) => handleInputChange('personalitySun', e.target.value)}
                        error={errors.personalitySun}
                        className="text-center text-lg font-bold"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <SafeIcon icon={FiMoon} className="w-5 h-5 text-brand-expansion" />
                        <span className="text-sm font-medium font-inter text-brand-depth">
                          Design Sun Gate (1-64)
                        </span>
                      </div>
                      <Input
                        placeholder="e.g., 8"
                        value={formData.designSun}
                        onChange={(e) => handleInputChange('designSun', e.target.value)}
                        error={errors.designSun}
                        className="text-center text-lg font-bold"
                      />
                    </div>
                  </div>

                  {/* Gate Information */}
                  {(formData.personalitySun && validateGate(formData.personalitySun)) ||
                  (formData.designSun && validateGate(formData.designSun)) ? (
                    <div className="space-y-4">
                      {formData.personalitySun && validateGate(formData.personalitySun) && (
                        <div className="bg-brand-energy/10 p-4 rounded-lg flex items-start gap-3">
                          <SafeIcon icon={FiSun} className="w-6 h-6 text-brand-energy mt-1" />
                          <div>
                            <h4 className="font-bold font-inter text-brand-depth mb-1">
                              Gate {formData.personalitySun}: {humanDesignData.gates[parseInt(formData.personalitySun)]?.name}
                            </h4>
                            <p className="text-sm text-brand-depth/80 font-lexend">
                              {humanDesignData.gates[parseInt(formData.personalitySun)]?.description}
                            </p>
                          </div>
                        </div>
                      )}
                      {formData.designSun && validateGate(formData.designSun) && (
                        <div className="bg-brand-expansion/10 p-4 rounded-lg flex items-start gap-3">
                          <SafeIcon icon={FiMoon} className="w-6 h-6 text-brand-expansion mt-1" />
                          <div>
                            <h4 className="font-bold font-inter text-brand-depth mb-1">
                              Gate {formData.designSun}: {humanDesignData.gates[parseInt(formData.designSun)]?.name}
                            </h4>
                            <p className="text-sm text-brand-depth/80 font-lexend">
                              {humanDesignData.gates[parseInt(formData.designSun)]?.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}

                  {/* Help Text */}
                  <div className="bg-brand-illumination/10 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <SafeIcon icon={FiInfo} className="w-5 h-5 text-brand-energy mt-0.5" />
                      <div>
                        <p className="text-sm font-lexend text-brand-depth">
                          <strong>Finding Your Gates:</strong> Look for the "Sun" positions in your Human Design chart. You'll find one in the Personality (conscious/black) column and one in the Design (unconscious/red) column.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Global Navigation */}
                  <div className="flex justify-between pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onBack}
                      className="flex items-center gap-2 text-white border-white hover:bg-white hover:text-brand-depth"
                    >
                      <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isValid}
                      className="flex items-center gap-2"
                    >
                      Continue
                      <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default GateInputStage;