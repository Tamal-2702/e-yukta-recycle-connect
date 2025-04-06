
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/Logo';
import LanguageToggle from '@/components/LanguageToggle';
import UserProfileSection from './UserProfileSection';
import SidebarNavigation from './SidebarNavigation';
import { User } from '@/contexts/AuthContext';
import { User as UserIcon, LogOut } from 'lucide-react';

interface MobileSidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
  currentUser: User | null;
  translationFn: (key: string) => string;
  handleNavigateToProfile: () => void;
  handleLogout: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  sidebarOpen,
  toggleSidebar,
  role,
  currentUser,
  translationFn,
  handleNavigateToProfile,
  handleLogout
}) => {
  if (!sidebarOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar}>
      <div 
        className="absolute top-0 left-0 w-64 h-full bg-white p-4" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <Logo size="sm" />
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <X size={24} />
          </Button>
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
      </div>
    </div>
  );
};

export default MobileSidebar;
