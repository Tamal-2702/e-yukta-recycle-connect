
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Logo from '@/components/Logo';
import RoleCard from '@/components/RoleCard';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';

type UserRole = 'user' | 'kabadiwala' | 'recycler' | 'corporate';

const Landing: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleGetStarted = () => {
    if (selectedRole) {
      navigate(`/${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <Logo size="md" />
        <LanguageToggle />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-3xl w-full text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('landing.heading')}</h1>
          <p className="text-muted-foreground">{t('landing.subheading')}</p>
        </div>

        <div className="w-full max-w-3xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl font-medium mb-4 text-center">{t('landing.select_role')}</h2>
          
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
        </div>

        <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            onClick={handleGetStarted} 
            disabled={!selectedRole}
            size="lg"
            className="btn-primary"
          >
            {t('landing.get_started')}
          </Button>
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground">
        <p>{t('app.subtitle')}</p>
      </footer>
    </div>
  );
};

export default Landing;
