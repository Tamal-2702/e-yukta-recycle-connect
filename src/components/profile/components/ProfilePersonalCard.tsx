
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Save } from 'lucide-react';
import ProfileImageUploader from './ProfileImageUploader';
import ProfileInfoForm from './ProfileInfoForm';

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
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Personal Information</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 
              <><Save className="mr-2 h-4 w-4" /> Save</> : 
              <><Edit className="mr-2 h-4 w-4" /> Edit</>
            }
          </Button>
        </CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>
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
    </Card>
  );
};

export default ProfilePersonalCard;
