import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Progress from '@/components/ui/Progress';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { humanDesignData } from '@/lib/humanDesign';
import { openaiHelpers } from '@/lib/openai';
import { pdfHelpers } from '@/lib/pdf';
import { copyToClipboard, shareContent } from '@/lib/utils';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { 
  FiStar, FiZap, FiHeart, FiTarget, FiBookOpen, 
  FiDownload, FiShare2, FiRefreshCw, FiExternalLink,
  FiArrowRight, FiCheck 
} = FiIcons;

const GrandRevealStage = ({ onRestart, heroData }) => {
  const [currentReveal, setCurrentReveal] = useState(0);
  const [identity, setIdentity] = useState(null);
  const [mantras, setMantras] = useState([]);
  const [story, setStory] = useState(null);
  const [generating, setGenerating] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);

  const reveals = ['identity', 'mantras', 'story'];

  useEffect(() => {
    generateContent();
  }, []);

  const generateContent = async () => {
    try {
      setGenerating(true);
      
      // Generate superhero identity
      const superheroIdentity = humanDesignData.generateSuperheroIdentity(heroData);
      setIdentity(superheroIdentity);
      
      // Generate mantras
      const generatedMantras = await openaiHelpers.generateMantras(heroData);
      setMantras(generatedMantras);
      
      // Generate personal mythos
      const personalMythos = await openaiHelpers.generatePersonalMythos(heroData);
      setStory(personalMythos);
      
    } catch (error) {
      console.error('Error generating content:', error);
      
      // Fallback content
      setIdentity(humanDesignData.generateSuperheroIdentity(heroData));
      setMantras([
        "I am aligned with my unique Hero Frequency",
        "I embody my authentic power with cosmic purpose", 
        "I illuminate the path for others through my example",
        "I transmit wisdom through aligned action"
      ]);
      setStory({
        "Ordinary Matrix": "You lived in a world of expectations, following conventional paths.",
        "The Glitch": "Something shifted when you realized the conventional rules didn't apply to you.",
        "Taking the Pill": "You chose to dive deep into your authentic self.",
        "Blueprint Revealed": "Your unique gates illuminated your cosmic blueprint.",
        "Integration Challenges": "Learning to trust your inner authority while navigating the world.",
        "Frequency Mastery": "You learned to embody your gifts fully.",
        "Transmission Mode": "Now you serve as a lighthouse for other heroes."
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleNextReveal = () => {
    if (currentReveal < reveals.length - 1) {
      setCurrentReveal(currentReveal + 1);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setDownloading(true);
      const completeData = { ...heroData, identity, mantras, story };
      await pdfHelpers.downloadPDF(completeData, `hero-frequency-${Date.now()}.pdf`);
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
      const completeData = { ...heroData, identity, mantras, story };
      const shareableLink = await pdfHelpers.generateShareableLink(completeData);
      
      const shareData = {
        title: `My Hero Frequency: ${identity?.title}`,
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

  const handleChatGPTExplore = () => {
    const prompt = `Continue exploring my Hero Frequency blueprint:

Type: ${humanDesignData.types[heroData.type].name}
Profile: ${heroData.profile} 
Authority: ${humanDesignData.authorities[heroData.authority].name}
Gates: ${heroData.personalitySun}, ${heroData.designSun}, ${heroData.evolutionGate}, ${heroData.purposeGate}

Identity: ${identity?.title}
Story Arc: ${Object.entries(story || {}).map(([stage, content]) => `${stage}: ${content}`).join('\n\n')}

Help me dive deeper into understanding my unique frequency and how to live it fully.`;
    
    const encodedPrompt = encodeURIComponent(prompt);
    window.open(`https://chatgpt.com/?q=${encodedPrompt}`, '_blank');
  };

  const storyStages = [
    { key: 'Ordinary Matrix', icon: FiBookOpen, color: 'bg-gray-500' },
    { key: 'The Glitch', icon: FiStar, color: 'bg-brand-energy' },
    { key: 'Taking the Pill', icon: FiArrowRight, color: 'bg-brand-action' },
    { key: 'Blueprint Revealed', icon: FiStar, color: 'bg-brand-illumination' },
    { key: 'Integration Challenges', icon: FiTarget, color: 'bg-brand-foundation' },
    { key: 'Frequency Mastery', icon: FiStar, color: 'bg-brand-expansion' },
    { key: 'Transmission Mode', icon: FiZap, color: 'bg-brand-energy' }
  ];

  if (generating) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Progress value={99} label="Step 9 of 9" className="mb-8" />
            
            <motion.div
              className="w-24 h-24 bg-brand-energy rounded-full flex items-center justify-center mx-auto mb-8"
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <SafeIcon icon={FiStar} className="w-12 h-12 text-white" />
            </motion.div>
            
            <h2 className="text-3xl font-bold font-inter text-white mb-4">
              Channeling Your Complete Hero Frequency...
            </h2>
            <p className="text-white/80 font-lexend text-lg">
              The cosmic algorithms are weaving your final blueprint
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold font-inter text-white mb-4">
              Your <span className="text-brand-illumination">Hero Frequency</span> Revealed
            </h1>
            <Progress value={100} label="Complete" />
          </div>

          <AnimatePresence mode="wait">
            {/* Identity Reveal */}
            {currentReveal >= 0 && (
              <motion.div
                key="identity"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <Card className="bg-gradient-to-br from-brand-energy to-brand-action border-none text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <CardContent className="p-8 relative z-10">
                    <div className="text-center space-y-6">
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
                        <h2 className="text-4xl font-bold font-inter mb-2">
                          {identity?.title}
                        </h2>
                        <p className="text-white/90 font-lexend text-lg mb-4">
                          {identity?.type} • {identity?.profile} • {identity?.authority}
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm max-w-2xl mx-auto">
                          <div className="bg-white/10 rounded-lg p-3">
                            <p className="font-lexend text-white/70">Life's Work</p>
                            <p className="font-inter font-semibold">{identity?.lifeWork}</p>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3">
                            <p className="font-lexend text-white/70">Radiance</p>
                            <p className="font-inter font-semibold">{identity?.radiance}</p>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3">
                            <p className="font-lexend text-white/70">Evolution</p>
                            <p className="font-inter font-semibold">{identity?.evolution}</p>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3">
                            <p className="font-lexend text-white/70">Purpose</p>
                            <p className="font-inter font-semibold">{identity?.purpose}</p>
                          </div>
                        </div>
                      </div>
                      
                      {currentReveal === 0 && (
                        <Button
                          onClick={handleNextReveal}
                          size="lg"
                          className="bg-white/20 hover:bg-white/30 border border-white/30"
                        >
                          Reveal My Mantras <SafeIcon icon={FiArrowRight} className="w-5 h-5 ml-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Mantras Reveal */}
            {currentReveal >= 1 && (
              <motion.div
                key="mantras"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <Card className="bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-center justify-center">
                      <SafeIcon icon={FiZap} className="w-6 h-6 text-brand-energy" />
                      Your AI-Generated Hero Mantras
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {mantras.map((mantra, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.3 }}
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
                    
                    {currentReveal === 1 && (
                      <div className="text-center mt-6">
                        <Button
                          onClick={handleNextReveal}
                          size="lg"
                        >
                          Reveal My Personal Mythos <SafeIcon icon={FiArrowRight} className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Story Reveal */}
            {currentReveal >= 2 && story && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <Card className="bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-center justify-center">
                      <SafeIcon icon={FiBookOpen} className="w-6 h-6 text-brand-energy" />
                      Your 7-Part Blueprint Discovery Arc
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-energy via-brand-illumination to-brand-expansion" />
                      
                      <div className="space-y-6">
                        {storyStages.map((stage, index) => (
                          <motion.div
                            key={stage.key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="relative flex items-start gap-6"
                          >
                            <div className={`relative z-10 w-16 h-16 ${stage.color} rounded-full flex items-center justify-center shadow-lg`}>
                              <SafeIcon icon={stage.icon} className="w-6 h-6 text-white" />
                            </div>
                            
                            <div className="flex-1">
                              <h4 className="text-lg font-bold font-inter text-brand-depth mb-2">
                                {stage.key}
                              </h4>
                              <p className="font-lexend text-brand-depth/80 leading-relaxed">
                                {story[stage.key]}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Actions */}
          {currentReveal >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-brand-depth to-brand-foundation border-none text-white mb-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold font-inter mb-4">
                    <SafeIcon icon={FiCheck} className="w-8 h-8 inline mr-3" />
                    Frequency Activated!
                  </h3>
                  <p className="text-white/90 font-lexend text-lg mb-6">
                    Your Hero Frequency is now fully revealed. Take your blueprint into the world.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <Button
                      onClick={handleDownloadPDF}
                      loading={downloading}
                      className="bg-white/20 hover:bg-white/30 border border-white/30"
                    >
                      <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
                      Download Full Blueprint
                    </Button>
                    
                    <Button
                      onClick={handleShare}
                      loading={sharing}
                      className="bg-white/20 hover:bg-white/30 border border-white/30"
                    >
                      <SafeIcon icon={FiShare2} className="w-4 h-4 mr-2" />
                      Share My Frequency
                    </Button>
                    
                    <Button
                      onClick={handleChatGPTExplore}
                      className="bg-white/20 hover:bg-white/30 border border-white/30"
                    >
                      <SafeIcon icon={FiExternalLink} className="w-4 h-4 mr-2" />
                      Open in ChatGPT
                    </Button>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={onRestart}
                    className="border-white/50 text-white hover:bg-white hover:text-brand-depth"
                  >
                    <SafeIcon icon={FiRefreshCw} className="w-4 h-4 mr-2" />
                    Discover Another Frequency
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GrandRevealStage;