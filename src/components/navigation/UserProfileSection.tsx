
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from '@/contexts/types';

interface UserProfileSectionProps {
  currentUser: User | null;
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
  translationFn: (key: string) => string;
  onProfileClick?: () => void;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ 
  currentUser, 
  role, 
  translationFn,
  onProfileClick 
}) => {
  // Define role-specific avatar images for better visual representation
  const roleImages = {
    user: '/lovable-uploads/919a083d-573b-4b27-86cb-284efa585daf.png', // Updated user image
    kabadiwala: '/lovable-uploads/80b5a02d-30c5-4cf2-937d-c6da8b8a2f6c.png', // Updated kabadiwala image
    recycler: '/lovable-uploads/58502304-f6e3-40e3-a36a-0fac81447383.png', // Updated recycler image
    corporate: '/lovable-uploads/8c2db26f-3113-47c7-b0f0-9c683f334100.png', // Updated corporate building image
  };

  return (
    <div 
      className="mb-2 flex flex-col items-center space-y-3 p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
      onClick={onProfileClick}
    >
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
