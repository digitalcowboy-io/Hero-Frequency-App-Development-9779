import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Progress from '@/components/ui/Progress';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { openaiHelpers } from '@/lib/openai';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiArrowRight, FiBookOpen, FiExternalLink, FiStar } = FiIcons;

const MythosStage = ({ onContinue, onBack, heroData }) => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStage, setSelectedStage] = useState(null);

  const storyStages = [
    { key: 'Ordinary Matrix', icon: FiBookOpen, color: 'bg-gray-500' },
    { key: 'The Glitch', icon: FiStar, color: 'bg-brand-energy' },
    { key: 'Taking the Pill', icon: FiArrowRight, color: 'bg-brand-action' },
    { key: 'Blueprint Revealed', icon: FiStar, color: 'bg-brand-illumination' },
    { key: 'Integration Challenges', icon: FiArrowLeft, color: 'bg-brand-foundation' },
    { key: 'Frequency Mastery', icon: FiStar, color: 'bg-brand-expansion' },
    { key: 'Transmission Mode', icon: FiExternalLink, color: 'bg-brand-energy' }
  ];

  useEffect(() => {
    const generateStory = async () => {
      try {
        setLoading(true);
        const personalMythos = await openaiHelpers.generatePersonalMythos(heroData.gateData);
        setStory(personalMythos);
      } catch (error) {
        console.error('Error generating story:', error);
        // Fallback story
        setStory({
          "Ordinary Matrix": "You lived in a world of expectations, following conventional paths that others laid out for you.",
          "The Glitch": "Something shifted when you realized the conventional rules didn't apply to your unique design.",
          "Taking the Pill": "You chose to dive deep into your authentic self, embracing the unknown rather than the familiar.",
          "Blueprint Revealed": "Your unique gates illuminated your cosmic blueprint, showing you how your frequency serves the world.",
          "Integration Challenges": "Learning to trust your inner authority while navigating a world that doesn't always understand your frequency.",
          "Frequency Mastery": "You learned to embody your gifts fully, using your unique combination to create meaningful impact.",
          "Transmission Mode": "Now you serve as a lighthouse for other heroes beginning their own journey of discovery."
        });
      } finally {
        setLoading(false);
      }
    };

    generateStory();
  }, [heroData]);

  const handleContinue = () => {
    onContinue('final', { ...heroData, story });
  };

  const handleChatGPTExplore = () => {
    const prompt = `Continue exploring this Hero's Journey story:\n\n${Object.entries(story).map(([stage, content]) => `${stage}: ${content}`).join('\n\n')}`;
    const encodedPrompt = encodeURIComponent(prompt);
    window.open(`https://chatgpt.com/?q=${encodedPrompt}`, '_blank');
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
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Progress value={75} label="Step 3 of 4" />
            </div>
            <motion.div
              className="w-20 h-20 bg-brand-illumination rounded-full flex items-center justify-center mx-auto mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <SafeIcon icon={FiBookOpen} className="w-10 h-10 text-brand-depth" />
            </motion.div>
            <h2 className="text-2xl font-bold font-inter text-white mb-4">
              Weaving Your Personal Mythos...
            </h2>
            <p className="text-white/80 font-lexend">
              The cosmic storytellers are crafting your Hero's Journey
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
              Your Personal <span className="text-brand-illumination">Mythos</span>
            </h1>
            <p className="text-xl text-white/80 font-lexend">
              The Hero's Journey of your unique frequency
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div variants={itemVariants} className="mb-8">
            <Progress value={75} label="Step 3 of 4" />
          </motion.div>

          {/* Story Timeline */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-energy via-brand-illumination to-brand-expansion" />
              
              <div className="space-y-6">
                {storyStages.map((stage, index) => (
                  <motion.div
                    key={stage.key}
                    variants={itemVariants}
                    className="relative flex items-start gap-6"
                  >
                    {/* Timeline Node */}
                    <div className={`relative z-10 w-16 h-16 ${stage.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <SafeIcon icon={stage.icon} className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Story Content */}
                    <Card 
                      className={`flex-1 bg-white/95 backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                        selectedStage === stage.key ? 'ring-2 ring-brand-energy shadow-xl' : 'hover:shadow-lg'
                      }`}
                      onClick={() => setSelectedStage(selectedStage === stage.key ? null : stage.key)}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-inter text-brand-depth">
                          {stage.key}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="font-lexend text-brand-depth/80 leading-relaxed">
                          {story[stage.key]}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Explore Further */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <Card className="bg-gradient-to-r from-brand-expansion to-brand-foundation border-none text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-inter mb-2">
                  Want to explore deeper?
                </h3>
                <p className="text-white/90 font-lexend mb-4">
                  Take your story to ChatGPT for further exploration and personalization
                </p>
                <Button
                  variant="outline"
                  onClick={handleChatGPTExplore}
                  className="border-white text-white hover:bg-white hover:text-brand-expansion"
                >
                  <SafeIcon icon={FiExternalLink} className="w-4 h-4 mr-2" />
                  Explore in ChatGPT
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation */}
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
              Complete Journey
              <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default MythosStage;