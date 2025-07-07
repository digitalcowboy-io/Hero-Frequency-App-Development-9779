import React from 'react';
import {motion} from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Progress from '@/components/ui/Progress';
import {Card,CardContent} from '@/components/ui/Card';
import {humanDesignData} from '@/lib/humanDesign';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {FiArrowLeft,FiArrowRight,FiZap,FiStar,FiUser,FiTrendingUp,FiAlertCircle}=FiIcons;

const TypeRevealStage=({onContinue,onBack,heroData})=> {
  const typeData=humanDesignData.types[heroData.type];

  // Detailed descriptions for each type (from the provided content)
  const typeDetails={
    generator: {
      whoYouAre: "You're the world's battery pack! When you follow your YES, you light up the room (and maybe half the city). If it makes you go \"mmhm!\"—go for it!",
      strengths: "Steady, sustainable, and oh-so-satisfying when you're doing what you love. People can feel your energy—it's like free Wi-Fi for the soul.",
      watchOut: "Saying \"yes\" out of obligation? Danger! That's the shortcut to grump town. Trust your gut; \"meh\" is your warning siren.",
      famous: "Oprah. The Rock. That super-enthusiastic barista. You're in very good company!"
    },
    manifestingGenerator: {
      whoYouAre: "You're the human ping-pong ball—zipping from one thing to the next, blending power with speed. You're here to do it all (sometimes all at once)!",
      strengths: "Master multitasker. Pivot pro. You skip the boring parts and turn life into a choose-your-own-adventure.",
      watchOut: "Skipping steps? Oops! Sometimes you gotta double back. And don't forget to inform others—otherwise, they can't keep up with your sparkle.",
      famous: "Madonna. Jim Carrey. That friend who has three side hustles and still shows up for brunch."
    },
    projector: {
      whoYouAre: "You're the wise owl in the Human Design forest. You see the patterns nobody else can. Your magic? Waiting for the right invitation before you swoop in with your brilliance.",
      strengths: "Superpower: Insight! People feel seen around you. You're the secret ingredient to every dream team.",
      watchOut: "Trying to guide before you're recognized = instant energy drain. Wait for the nod, then drop your wisdom bombs.",
      famous: "Barack Obama. Taylor Swift. The world's best teachers and coaches."
    },
    manifestor: {
      whoYouAre: "You're the spark that lights the bonfire. You're here to get things started—initiating ideas, movements, and maybe even dance parties.",
      strengths: "You're bold, you're fast, you make things HAPPEN. Others are just trying to keep up with your vibe.",
      watchOut: "Forgetting to inform = drama llamas chasing you. Tell people what's up before you bolt for the next big thing.",
      famous: "Frida Kahlo. Maya Angelou. The person who starts group chats and then mutes them."
    },
    reflector: {
      whoYouAre: "You're the moonlit mirror—sampling the vibes, reflecting the world back. You're here to show us who we really are (and occasionally surprise yourself, too).",
      strengths: "Chameleon power! You're deeply in tune with your environment. Community is your cosmic power-up.",
      watchOut: "Don't rush big decisions! Give yourself a whole lunar cycle (yep, the moon is your BFF) to really feel what's right.",
      famous: "Sandra Bullock. Amma (the hugging saint). The friend who changes their hairstyle with every season."
    }
  };

  const details=typeDetails[heroData.type];

  const handleContinue=()=> {
    onContinue('profileSelection',heroData);
  };

  const containerVariants={
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants={
    hidden: {opacity: 0,y: 30},
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
              Your <span className="text-brand-illumination">Type</span> Revealed
            </h1>
            <p className="text-xl text-white/80 font-lexend">
              Understanding your {typeData.name} blueprint
            </p>
          </motion.div>

          {/* Progress */}
          <motion.div variants={itemVariants} className="mb-8">
            <Progress value={40} label="Step 2 of 5" />
          </motion.div>

          {/* Main Type Card */}
          <motion.div variants={itemVariants} className="mb-8">
            <Card className="bg-gradient-to-br from-brand-energy to-brand-action border-none text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <CardContent className="p-8 relative z-10">
                <div className="text-center space-y-6">
                  {/* Animated Type Visual */}
                  <motion.div
                    className="relative mx-auto w-24 h-24"
                    animate={{
                      rotate: heroData.type==='manifestingGenerator' ? 360 : 0,
                      scale: [1,1.05,1]
                    }}
                    transition={{
                      rotate: {duration: 20,repeat: Infinity,ease: 'linear'},
                      scale: {duration: 4,repeat: Infinity,ease: 'easeInOut'}
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full blur-xl opacity-60"
                      style={{backgroundColor: `${typeData.color}40`}}
                    />
                    <div
                      className="relative w-full h-full rounded-full flex items-center justify-center shadow-2xl"
                      style={{backgroundColor: typeData.color}}
                    >
                      <SafeIcon icon={FiZap} className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold font-inter mb-2">
                      {typeData.name}
                    </h2>
                    <p className="text-white/90 font-lexend text-lg mb-4">
                      {typeData.strategy}
                    </p>
                    <p className="text-white/80 font-lexend text-sm">
                      {typeData.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Type Details */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Who You Are */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-energy/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={FiUser} className="w-6 h-6 text-brand-energy" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-inter text-brand-depth mb-2">
                      1. Who You Are:
                    </h3>
                    <p className="text-brand-depth/80 font-lexend">
                      {details.whoYouAre}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Strengths */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-illumination/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-brand-illumination" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-inter text-brand-depth mb-2">
                      2. Strengths:
                    </h3>
                    <p className="text-brand-depth/80 font-lexend">
                      {details.strengths}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Watch Out */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-foundation/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={FiAlertCircle} className="w-6 h-6 text-brand-foundation" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-inter text-brand-depth mb-2">
                      3. Watch Out:
                    </h3>
                    <p className="text-brand-depth/80 font-lexend">
                      {details.watchOut}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Famous People */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-expansion/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={FiStar} className="w-6 h-6 text-brand-expansion" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-inter text-brand-depth mb-2">
                      4. Famous {typeData.name}s:
                    </h3>
                    <p className="text-brand-depth/80 font-lexend">
                      {details.famous}
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

export default TypeRevealStage;