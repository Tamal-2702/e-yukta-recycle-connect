
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import LanguageToggle from '@/components/LanguageToggle';
import UserProfileSection from './UserProfileSection';
import SidebarNavigation from './SidebarNavigation';
import { User } from '@/contexts/AuthContext';
import { User as UserIcon, LogOut } from 'lucide-react';

interface DesktopSidebarProps {
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
  currentUser: User | null;
  translationFn: (key: string) => string;
  handleNavigateToProfile: () => void;
  handleLogout: () => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  role,
  currentUser,
  translationFn,
  handleNavigateToProfile,
  handleLogout
}) => {
  return (
    <aside className="hidden md:flex md:w-64 p-4 flex-col border-r">
      <div className="flex justify-between items-center mb-6">
        <Logo size="sm" />
      </div>
      
      <UserProfileSection 
        currentUser={currentUser} 
        role={role}
        translationFn={translationFn}
      />
      
      <SidebarNavigation role={role} translationFn={translationFn} />
      
      <Separator className="my-4" />
      
      <div className="space-y-2 mb-4">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2"
          onClick={handleNavigateToProfile}
        >
          <UserIcon size={18} />
          <span>{translationFn('common.profile')}</span>
        </Button>
        
        <Button 
          variant="destructive" 
          className="w-full justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>{translationFn('common.logout')}</span>
        </Button>
      </div>
      
      <div className="flex justify-between items-center">
        <LanguageToggle />
      </div>
    </aside>
  );
};

export default DesktopSidebar;
