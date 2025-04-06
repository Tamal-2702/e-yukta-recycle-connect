
import React, { useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera, Loader2 } from 'lucide-react';

interface ProfileImageUploaderProps {
  src: string;
  fallback: string;
  isUploading: boolean;
  onChangePhotoClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  src,
  fallback,
  isUploading,
  onChangePhotoClick,
  fileInputRef,
  handleFileChange
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={src} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
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
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onChangePhotoClick}
        disabled={isUploading}
      >
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Camera className="mr-2 h-4 w-4" />
            Change Photo
          </>
        )}
      </Button>
    </div>
  );
};

export default ProfileImageUploader;
