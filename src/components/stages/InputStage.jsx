import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Progress from '@/components/ui/Progress';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { validateGate, formatGate } from '@/lib/utils';
import { humanDesignData } from '@/lib/humanDesign';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiArrowRight, FiInfo } = FiIcons;

const InputStage = ({ onContinue, onBack, initialData = {} }) => {
  const [formData, setFormData] = useState({
    personalitySun: initialData.personalitySun || '',
    designSun: initialData.designSun || '',
    evolutionGate: initialData.evolutionGate || '',
    purposeGate: initialData.purposeGate || ''
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Auto-calculate programming partners when primary gates are entered
    if (formData.personalitySun && validateGate(formData.personalitySun)) {
      const evolutionGate = humanDesignData.calculateEvolutionGate(parseInt(formData.personalitySun));
      setFormData(prev => ({ ...prev, evolutionGate: evolutionGate.toString() }));
    }

    if (formData.designSun && validateGate(formData.designSun)) {
      const purposeGate = humanDesignData.calculatePurposeGate(parseInt(formData.designSun));
      setFormData(prev => ({ ...prev, purposeGate: purposeGate.toString() }));
    }
  }, [formData.personalitySun, formData.designSun]);

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
      const gateData = {
        personalitySun: parseInt(formData.personalitySun),
        designSun: parseInt(formData.designSun),
        evolutionGate: parseInt(formData.evolutionGate),
        purposeGate: parseInt(formData.purposeGate)
      };
      onContinue('reveal', gateData);
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
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl font-bold font-inter text-white mb-4">
              Enter Your Core <span className="text-brand-illumination">Frequency</span>
            </h1>
            <p className="text-xl text-white/80 font-lexend">
              Input your Personality Sun and Design Sun gates from your Human Design chart
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div variants={itemVariants} className="mb-8">
            <Progress value={25} label="Step 1 of 4" />
          </motion.div>

          {/* Form */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SafeIcon icon={FiInfo} className="w-5 h-5 text-brand-energy" />
                  Your Gate Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Personality Sun Gate"
                      placeholder="e.g., 1"
                      value={formData.personalitySun}
                      onChange={(e) => handleInputChange('personalitySun', e.target.value)}
                      error={errors.personalitySun}
                      helper="Your conscious personality gate"
                    />
                    
                    <Input
                      label="Design Sun Gate"
                      placeholder="e.g., 8"
                      value={formData.designSun}
                      onChange={(e) => handleInputChange('designSun', e.target.value)}
                      error={errors.designSun}
                      helper="Your unconscious design gate"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Evolution Gate"
                      value={formData.evolutionGate}
                      disabled
                      helper="Auto-calculated programming partner"
                    />
                    
                    <Input
                      label="Purpose Gate"
                      value={formData.purposeGate}
                      disabled
                      helper="Auto-calculated programming partner"
                    />
                  </div>

                  <div className="bg-brand-illumination/10 p-4 rounded-lg">
                    <p className="text-sm font-lexend text-brand-depth">
                      <strong>Need help finding your gates?</strong> Look for the "Sun" positions 
                      in your Human Design chart - one in the Personality (conscious) column and 
                      one in the Design (unconscious) column.
                    </p>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onBack}
                      className="flex items-center gap-2"
                    >
                      <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
                      Back
                    </Button>
                    
                    <Button
                      type="submit"
                      disabled={!isValid}
                      className="flex items-center gap-2"
                    >
                      Reveal My Frequency
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

export default InputStage;