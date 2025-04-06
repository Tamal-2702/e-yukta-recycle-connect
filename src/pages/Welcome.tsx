
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Logo from '@/components/Logo';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#eef7e9] to-white">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Logo size="lg" variant="full" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {t('welcome.heading') || 'Welcome to ई-Yukta'}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg text-muted-foreground mb-8 max-w-md"
        >
          {t('welcome.description') || 'The intelligent e-waste management platform connecting users, collectors, and recyclers.'}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-full max-w-xs"
        >
          <Button 
            className="w-full bg-[#76b947] hover:bg-[#65a736] text-white py-6 text-lg"
            onClick={() => navigate('/landing')}
          >
            {t('welcome.get_started') || 'Get Started'} <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground">
        <p>{t('app.subtitle') || 'ई-Yukta - Your E-Waste, our responsibility'}</p>
      </footer>
    </div>
  );
};

export default Welcome;
