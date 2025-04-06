
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '@/components/Logo';
import LanguageToggle from '@/components/LanguageToggle';

const Auth: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') === 'signup' ? 'signup' : 'signin';
  const userRole = queryParams.get('role') || '';
  
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const { currentUser } = useAuth();

  // Redirect if user is already authenticated
  if (currentUser) {
    // Redirect to the appropriate dashboard based on user role
    // For now, we'll just redirect to /user as we don't have role-based redirection logic yet
    return <Navigate to={`/${userRole || 'user'}`} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#eef7e9] to-white">
      <header className="p-4 flex justify-between items-center">
        <Logo size="md" />
        <LanguageToggle />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SignInForm userRole={userRole} />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm userRole={userRole} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground">
        <p>ई-Yukta - Your E-Waste, our responsibility</p>
      </footer>
    </div>
  );
};

export default Auth;
