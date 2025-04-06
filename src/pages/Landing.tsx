
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Logo from '@/components/Logo';
import RoleCard from '@/components/RoleCard';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, UserPlus, MessageCircle } from 'lucide-react';
import EcoBotWrapper from '@/components/EcoBot';

type UserRole = 'user' | 'kabadiwala' | 'recycler' | 'corporate';

const Landing: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showEcoBot, setShowEcoBot] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { currentUser } = useAuth();

  const handleRoleSelect = (role: UserRole) => {
    console.log(`Selected role: ${role}`);
    setSelectedRole(role);
    setShowEcoBot(true);
  };

  const handleGetStarted = () => {
    if (selectedRole) {
      if (currentUser) {
        navigate(`/${selectedRole}`);
      } else {
        navigate(`/auth?role=${selectedRole}`);
      }
    }
  };

  // Ensure we have role descriptions even if translations are missing
  const roleDescriptions = {
    user: t('landing.user_description') || 'Dispose your e-waste responsibly and track the entire lifecycle.',
    kabadiwala: t('landing.kabadiwala_description') || 'Collect e-waste from users and earn through the E-Yukta platform.',
    recycler: t('landing.recycler_description') || 'Process e-waste in compliance with regulations and improve efficiency.',
    corporate: t('landing.corporate_description') || 'Manage corporate e-waste compliance and reporting in one place.'
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#eef7e9] to-white">
      <header className="p-4 flex justify-between items-center">
        <Logo size="md" />
        <div className="flex items-center gap-2">
          <LanguageToggle />
          {currentUser ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/user')}
            >
              Dashboard
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/auth')}
              >
                <LogIn className="h-4 w-4 mr-1" />
                Sign In
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-[#76b947] hover:bg-[#65a736]"
                onClick={() => {
                  navigate('/auth?tab=signup');
                }}
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-3xl w-full text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('landing.heading') || 'E-Waste Management Platform'}</h1>
          <p className="text-muted-foreground">{t('landing.subheading') || 'Select your role to get started'}</p>
        </div>

        <div className="w-full max-w-3xl">
          <h2 className="text-xl font-medium mb-4 text-center">{t('landing.select_role') || 'Select Your Role'}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <RoleCard 
              role="user" 
              selected={selectedRole === 'user'} 
              onClick={() => handleRoleSelect('user')} 
            />
            <RoleCard 
              role="kabadiwala" 
              selected={selectedRole === 'kabadiwala'} 
              onClick={() => handleRoleSelect('kabadiwala')} 
            />
            <RoleCard 
              role="recycler" 
              selected={selectedRole === 'recycler'} 
              onClick={() => handleRoleSelect('recycler')} 
            />
            <RoleCard 
              role="corporate" 
              selected={selectedRole === 'corporate'} 
              onClick={() => handleRoleSelect('corporate')} 
            />
          </div>
          
          {selectedRole && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
              <p>{roleDescriptions[selectedRole]}</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <Button 
            onClick={handleGetStarted} 
            disabled={!selectedRole}
            size="lg"
            className="bg-[#76b947] hover:bg-[#65a736]"
          >
            {t('landing.get_started') || 'Get Started'}
          </Button>
          
          {showEcoBot && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => document.getElementById('ecobot-trigger')?.click()}
            >
              <MessageCircle className="h-4 w-4" />
              Chat with EcoBot
            </Button>
          )}
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground">
        <p>{t('app.subtitle') || 'E-Yukta - Responsible E-Waste Management'}</p>
      </footer>
      
      {showEcoBot && <EcoBotWrapper initialState={true} />}
    </div>
  );
};

export default Landing;
