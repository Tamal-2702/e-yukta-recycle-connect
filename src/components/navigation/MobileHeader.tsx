
import React from 'react';
import { Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

interface MobileHeaderProps {
  toggleSidebar: () => void;
  handleNavigateToProfile: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSidebar, handleNavigateToProfile }) => {
  return (
    <header className="p-4 flex justify-between items-center md:hidden">
      <Logo size="sm" />
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" onClick={handleNavigateToProfile}>
          <User size={24} />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu size={24} />
        </Button>
      </div>
    </header>
  );
};

export default MobileHeader;
