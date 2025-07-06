import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import SafeIcon from '@/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import toast from 'react-hot-toast';

const { FiMail, FiLock, FiUser } = FiIcons;

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('signin'); // 'signin', 'signup', 'reset'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { signIn, signUp, resetPassword } = useAuth();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (mode !== 'reset') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (mode === 'signup' && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      let result;
      
      switch (mode) {
        case 'signin':
          result = await signIn(formData.email, formData.password);
          if (result.error) throw result.error;
          toast.success('Welcome back, Hero!');
          onClose();
          break;
          
        case 'signup':
          result = await signUp(formData.email, formData.password);
          if (result.error) throw result.error;
          toast.success('Account created! Check your email to verify.');
          onClose();
          break;
          
        case 'reset':
          result = await resetPassword(formData.email);
          if (result.error) throw result.error;
          toast.success('Password reset email sent!');
          setMode('signin');
          break;
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    resetForm();
  };

  const getTitle = () => {
    switch (mode) {
      case 'signin': return 'Welcome Back, Hero';
      case 'signup': return 'Begin Your Journey';
      case 'reset': return 'Reset Your Password';
      default: return 'Authentication';
    }
  };

  const getDescription = () => {
    switch (mode) {
      case 'signin': return 'Sign in to continue your Hero Frequency journey';
      case 'signup': return 'Create your account to save and share your frequency';
      case 'reset': return 'Enter your email to receive a password reset link';
      default: return '';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()}>
      <div className="space-y-6">
        <p className="text-gray-600 font-lexend">
          {getDescription()}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            placeholder="your@email.com"
            icon={<SafeIcon icon={FiMail} className="w-5 h-5" />}
          />

          {mode !== 'reset' && (
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              placeholder="Your password"
              icon={<SafeIcon icon={FiLock} className="w-5 h-5" />}
            />
          )}

          {mode === 'signup' && (
            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              placeholder="Confirm your password"
              icon={<SafeIcon icon={FiLock} className="w-5 h-5" />}
            />
          )}

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            {mode === 'signin' && 'Sign In'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'reset' && 'Send Reset Email'}
          </Button>
        </form>

        <div className="space-y-3 text-center">
          {mode === 'signin' && (
            <>
              <button
                type="button"
                onClick={() => switchMode('reset')}
                className="text-sm text-brand-energy hover:text-brand-action font-lexend"
              >
                Forgot your password?
              </button>
              <p className="text-sm text-gray-600 font-lexend">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="text-brand-energy hover:text-brand-action font-medium"
                >
                  Sign up
                </button>
              </p>
            </>
          )}

          {mode === 'signup' && (
            <p className="text-sm text-gray-600 font-lexend">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="text-brand-energy hover:text-brand-action font-medium"
              >
                Sign in
              </button>
            </p>
          )}

          {mode === 'reset' && (
            <p className="text-sm text-gray-600 font-lexend">
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className="text-brand-energy hover:text-brand-action font-medium"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;