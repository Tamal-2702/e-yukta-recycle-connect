
import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { ProfileHeader } from './index';
import { ProfileTabsList, ProfileTabsContent } from './tabs';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileContentProps {
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
  displayName: string;
  setDisplayName: (name: string) => void;
  email: string | null;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  isUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  userAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  userStats: Array<{ label: string; value: string }>;
  recentActivity: Array<{
    type: string;
    date: string;
    status?: string;
    item?: string;
    weight?: string;
    points: number;
  }>;
  userBadges: Array<{
    name: string;
    description: string;
    earned: boolean;
  }>;
  rewardItems: Array<{
    name: string;
    points: number;
  }>;
  handleSaveProfile: () => Promise<void>;
  handleChangePhotoClick: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getAvatarSrc: () => string;
  handleAddressUpdate: (address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }) => Promise<void>;
  avatarFallback: string;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  role,
  displayName,
  setDisplayName,
  email,
  isEditing,
  setIsEditing,
  isUploading,
  fileInputRef,
  userAddress,
  userStats,
  recentActivity,
  userBadges,
  rewardItems,
  handleSaveProfile,
  handleChangePhotoClick,
  handleFileChange,
  getAvatarSrc,
  handleAddressUpdate,
  avatarFallback
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 p-6">
      <ProfileHeader 
        title={t(`${role}.profile`)}
        description="Manage your profile and preferences"
      />

      <Tabs defaultValue="profile" className="w-full">
        <ProfileTabsList />
        
        <ProfileTabsContent
          displayName={displayName}
          setDisplayName={setDisplayName}
          email={email}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isUploading={isUploading}
          avatarSrc={getAvatarSrc()}
          avatarFallback={avatarFallback}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          handleChangePhotoClick={handleChangePhotoClick}
          handleSaveProfile={handleSaveProfile}
          userStats={userStats}
          recentActivity={recentActivity}
          userBadges={userBadges}
          rewardItems={rewardItems}
          address={userAddress}
          handleAddressUpdate={handleAddressUpdate}
        />
      </Tabs>
    </div>
  );
};

export default ProfileContent;
