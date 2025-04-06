
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#a4d765] to-[#7aba34] text-center">
      <main className="flex-1 flex flex-col items-center justify-between p-6">
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto">
          {/* Logo and Title Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 mt-10"
          >
            <img 
              src="/lovable-uploads/32c2b3a5-bb3d-4561-b297-f359fb664bf6.png" 
              alt="ई-Yukta Logo" 
              className="w-52 h-52 mx-auto"
            />
          </motion.div>
          
          {/* Tagline */}
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-3xl font-semibold mb-8 text-[#2c3e50]"
          >
            {t('welcome.heading') || 'Your E-Waste, our responsibility'}
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-[#2c3e50] mb-16 max-w-md px-4"
          >
            {t('welcome.description') || 'Join us in making the world cleaner, one device at a time. Together we can create a sustainable future for generations to come.'}
          </motion.p>
          
          {/* Get Started Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-full max-w-xs"
          >
            <Button 
              className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg rounded-md"
              onClick={() => navigate('/landing')}
            >
              {t('welcome.get_started') || 'Get Started'}
            </Button>
          </motion.div>
        </div>

        {/* Terms of Service */}
        <div className="mt-8 mb-4 text-sm text-[#2c3e50]">
          <p>
            {t('welcome.terms_agreement') || 'By continuing, you agree to our'}{' '}
            <Link to="/terms" className="underline">
              {t('welcome.terms') || 'Terms of Service'}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
