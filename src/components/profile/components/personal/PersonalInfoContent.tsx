
import React from 'react';
import { CardContent } from '@/components/ui/card';
import ProfileImageUploader from '../ProfileImageUploader';
import ProfileInfoForm from '../ProfileInfoForm';

interface PersonalInfoContentProps {
  displayName: string;
  setDisplayName: (name: string) => void;
  email: string | null;
  isEditing: boolean;
  isUploading: boolean;
  avatarSrc: string;
  avatarFallback: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePhotoClick: () => void;
  handleSaveProfile: () => Promise<void>;
}

const PersonalInfoContent: React.FC<PersonalInfoContentProps> = ({
  displayName,
  setDisplayName,
  email,
  isEditing,
  isUploading,
  avatarSrc,
  avatarFallback,
  fileInputRef,
  handleFileChange,
  handleChangePhotoClick,
  handleSaveProfile
}) => {
  return (
    <CardContent className="flex flex-col md:flex-row gap-6">
      <ProfileImageUploader
        src={avatarSrc}
        fallback={avatarFallback}
        isUploading={isUploading}
        onChangePhotoClick={handleChangePhotoClick}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />
      <ProfileInfoForm
        displayName={displayName}
        setDisplayName={setDisplayName}
        email={email}
        isEditing={isEditing}
        onSave={handleSaveProfile}
      />
    </CardContent>
  );
};

export default PersonalInfoContent;
