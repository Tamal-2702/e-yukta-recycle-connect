
import React from 'react';
import { Card } from '@/components/ui/card';
import { PersonalInfoHeader, PersonalInfoContent } from './personal';

interface ProfilePersonalCardProps {
  displayName: string;
  setDisplayName: (name: string) => void;
  email: string | null;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isUploading: boolean;
  avatarSrc: string;
  avatarFallback: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePhotoClick: () => void;
  handleSaveProfile: () => Promise<void>;
}

const ProfilePersonalCard: React.FC<ProfilePersonalCardProps> = ({
  displayName,
  setDisplayName,
  email,
  isEditing,
  setIsEditing,
  isUploading,
  avatarSrc,
  avatarFallback,
  fileInputRef,
  handleFileChange,
  handleChangePhotoClick,
  handleSaveProfile
}) => {
  return (
    <Card>
      <PersonalInfoHeader 
        isEditing={isEditing} 
        setIsEditing={setIsEditing} 
      />
      <PersonalInfoContent
        displayName={displayName}
        setDisplayName={setDisplayName}
        email={email}
        isEditing={isEditing}
        isUploading={isUploading}
        avatarSrc={avatarSrc}
        avatarFallback={avatarFallback}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        handleChangePhotoClick={handleChangePhotoClick}
        handleSaveProfile={handleSaveProfile}
      />
    </Card>
  );
};

export default ProfilePersonalCard;
