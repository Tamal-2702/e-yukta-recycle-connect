
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from '@/contexts/types';

interface UserProfileSectionProps {
  currentUser: User | null;
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
  translationFn: (key: string) => string;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ currentUser, role, translationFn }) => {
  return (
    <div className="mb-2 flex flex-col items-center space-y-3 p-4 bg-muted rounded-lg">
      <Avatar className="h-16 w-16">
        <AvatarImage src="/placeholder.svg" alt="Profile" />
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
