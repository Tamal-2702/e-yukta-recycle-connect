
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from '@/contexts/types';

interface UserProfileSectionProps {
  currentUser: User | null;
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
  translationFn: (key: string) => string;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ currentUser, role, translationFn }) => {
  // Define role-specific avatar images for better visual representation
  const roleImages = {
    user: '/lovable-uploads/b319afd6-7a92-46cf-a3a1-08caf101948d.png',
    kabadiwala: '/lovable-uploads/ad37866a-bb12-4f90-8389-235693887537.png',
    recycler: '/lovable-uploads/162243fe-9ce2-492a-83ea-4b066e448d30.png',
    corporate: '/lovable-uploads/6c0b683d-5c5c-4be1-b8cd-0c241bd420f2.png',
  };

  return (
    <div className="mb-2 flex flex-col items-center space-y-3 p-4 bg-muted rounded-lg">
      <Avatar className="h-16 w-16">
        <AvatarImage src={roleImages[role]} alt="Profile" />
        <AvatarFallback>
          {currentUser?.displayName?.charAt(0) || role.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="text-center">
        <h3 className="font-medium">{currentUser?.displayName || translationFn(`${role}.profile_title`)}</h3>
        <p className="text-sm text-muted-foreground">{currentUser?.email || translationFn(`${role}.profile_subtitle`)}</p>
      </div>
    </div>
  );
};

export default UserProfileSection;
