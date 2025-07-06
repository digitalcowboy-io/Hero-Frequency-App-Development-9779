import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { dbHelpers } from '@/lib/supabase';

// Stages
import WelcomeStage from '@/components/stages/WelcomeStage';
import InputStage from '@/components/stages/InputStage';
import RevealStage from '@/components/stages/RevealStage';
import MythosStage from '@/components/stages/MythosStage';
import FinalStage from '@/components/stages/FinalStage';

// Auth Components
import AuthModal from '@/components/auth/AuthModal';
import LoadingScreen from '@/components/ui/LoadingScreen';

import './App.css';

const App = () => {
  const { user, loading: authLoading } = useAuth();
  const [currentStage, setCurrentStage] = useState('welcome');
  const [heroData, setHeroData] = useState({});
  const [sessionData, setSessionData] = useLocalStorage('heroFrequencySession', {});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    // Check if user is returning
    if (user) {
      checkReturningUser();
    }
  }, [user]);

  const checkReturningUser = async () => {
    try {
      const session = await dbHelpers.getSession(user.id);
      if (session) {
        setIsReturning(true);
        setCurrentStage(session.active_step || 'welcome');
        setHeroData(session.hero_data || {});
      }
    } catch (error) {
      console.error('Error checking returning user:', error);
    }
  };

  const saveSession = async (stage, data = {}) => {
    const updatedHeroData = { ...heroData, ...data };
    setHeroData(updatedHeroData);
    
    const sessionInfo = {
      activeStep: stage,
      heroData: updatedHeroData
    };
    
    setSessionData(sessionInfo);
    
    if (user) {
      try {
        await dbHelpers.saveSession(user.id, sessionInfo);
      } catch (error) {
        console.error('Error saving session:', error);
      }
    }
  };

  const handleStageChange = async (nextStage, data = {}) => {
    await saveSession(nextStage, data);
    setCurrentStage(nextStage);
  };

  const handleBack = () => {
    const stageOrder = ['welcome', 'input', 'reveal', 'mythos', 'final'];
    const currentIndex = stageOrder.indexOf(currentStage);
    if (currentIndex > 0) {
      setCurrentStage(stageOrder[currentIndex - 1]);
    }
  };

  const handleRestart = () => {
    setCurrentStage('welcome');
    setHeroData({});
    setSessionData({});
    setIsReturning(false);
  };

  const handleAuthRequired = () => {
    setShowAuthModal(true);
  };

  if (authLoading) {
    return <LoadingScreen />;
  }

  const renderStage = () => {
    switch (currentStage) {
      case 'welcome':
        return (
          <WelcomeStage
            onContinue={handleStageChange}
            user={user}
            isReturning={isReturning}
            onAuthRequired={handleAuthRequired}
          />
        );
      case 'input':
        return (
          <InputStage
            onContinue={handleStageChange}
            onBack={handleBack}
            initialData={heroData.gateData}
          />
        );
      case 'reveal':
        return (
          <RevealStage
            onContinue={handleStageChange}
            onBack={handleBack}
            gateData={heroData.gateData}
          />
        );
      case 'mythos':
        return (
          <MythosStage
            onContinue={handleStageChange}
            onBack={handleBack}
            heroData={heroData}
          />
        );
      case 'final':
        return (
          <FinalStage
            onRestart={handleRestart}
            heroData={heroData}
          />
        );
      default:
        return <Navigate to="/" replace />;
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={renderStage()} />
          <Route path="/shared/:data" element={<SharedFrequency />} />
        </Routes>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#244A49',
              color: '#fff',
              borderRadius: '8px',
              fontFamily: 'Lexend, sans-serif'
            },
            success: {
              iconTheme: {
                primary: '#F49558',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#D35E0E',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
};

// Shared Frequency Component
const SharedFrequency = () => {
  const [sharedData, setSharedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSharedData = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedData = urlParams.get('data');
        if (encodedData) {
          const decoded = JSON.parse(atob(encodedData));
          setSharedData(decoded);
        }
      } catch (error) {
        console.error('Error loading shared data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSharedData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!sharedData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-depth">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Shared Frequency Not Found</h1>
          <p className="mb-8">This Hero Frequency link appears to be invalid.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-brand-energy hover:bg-brand-action text-white px-6 py-3 rounded-lg"
          >
            Discover Your Own Frequency
          </button>
        </div>
      </div>
    );
  }

  return (
    <FinalStage
      heroData={sharedData}
      onRestart={() => window.location.href = '/'}
      isShared={true}
    />
  );
};

export default App;