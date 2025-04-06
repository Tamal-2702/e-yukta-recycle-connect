
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from '@/contexts/types';
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface UserProfileSectionProps {
  currentUser: User | null;
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
  translationFn: (key: string) => string;
  onProfileClick?: () => void;
  onProfileImageChange?: (file: File) => Promise<void>;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ 
  currentUser, 
  role, 
  translationFn,
  onProfileClick,
  onProfileImageChange
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Define role-specific avatar images for better visual representation
  const roleImages = {
    user: '/lovable-uploads/919a083d-573b-4b27-86cb-284efa585daf.png', // Updated user image
    kabadiwala: '/lovable-uploads/80b5a02d-30c5-4cf2-937d-c6da8b8a2f6c.png', // Updated kabadiwala image
    recycler: '/lovable-uploads/58502304-f6e3-40e3-a36a-0fac81447383.png', // Updated recycler image
    corporate: '/lovable-uploads/8c2db26f-3113-47c7-b0f0-9c683f334100.png', // Updated corporate building image
  };

  // Get the appropriate avatar image source
  const getAvatarSrc = () => {
    // Use user's photoURL if available, otherwise use role-specific image
    return currentUser?.photoURL || roleImages[role];
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onProfileImageChange) {
      await onProfileImageChange(files[0]);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleChangePhotoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    fileInputRef.current?.click();
  };

  return (
    <div 
      className="mb-2 flex flex-col items-center space-y-3 p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
      onClick={onProfileClick}
    >
      <div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Avatar className="h-16 w-16">
          <AvatarImage src={getAvatarSrc()} alt="Profile" />
          <AvatarFallback>
            {currentUser?.displayName?.charAt(0) || role.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {isHovering && onProfileImageChange && (
          <div 
            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60"
            onClick={handleChangePhotoClick}
          >
            <Camera className="h-6 w-6 text-white" />
          </div>
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="text-center">
        <h3 className="font-medium">{currentUser?.displayName || translationFn(`${role}.profile_title`)}</h3>
        <p className="text-sm text-muted-foreground">{currentUser?.email || translationFn(`${role}.profile_subtitle`)}</p>
      </div>
    </div>
  );
};

export default UserProfileSection;
