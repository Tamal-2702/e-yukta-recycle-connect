
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import {
  ProfilePersonalCard,
  ProfileStatsCard,
  ProfileActivityCard,
  ProfileBadgesCard,
  ProfileRewardsCard,
  ProfilePlaceholderCard,
  ProfileAddressCard
} from '@/components/profile/components';

interface ProfileTabsContentProps {
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
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  handleAddressUpdate: (address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }) => Promise<void>;
}

const ProfileTabsContent: React.FC<ProfileTabsContentProps> = ({
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
  handleSaveProfile,
  userStats,
  recentActivity,
  userBadges,
  rewardItems,
  address,
  handleAddressUpdate
}) => {
  return (
    <>
      <TabsContent value="profile" className="space-y-4">
        <ProfilePersonalCard
          displayName={displayName}
          setDisplayName={setDisplayName}
          email={email}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isUploading={isUploading}
          avatarSrc={avatarSrc}
          avatarFallback={avatarFallback}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          handleChangePhotoClick={handleChangePhotoClick}
          handleSaveProfile={handleSaveProfile}
        />
        
        <ProfileStatsCard stats={userStats} />
        
        <ProfileActivityCard activities={recentActivity} />
      </TabsContent>
      
      <TabsContent value="location" className="space-y-4">
        <ProfileAddressCard 
          address={address}
          onAddressUpdate={handleAddressUpdate}
        />
      </TabsContent>
      
      <TabsContent value="rewards" className="space-y-4">
        <ProfileBadgesCard badges={userBadges} />
        <ProfileRewardsCard availablePoints={85} rewards={rewardItems} />
      </TabsContent>
      
      <TabsContent value="notifications">
        <ProfilePlaceholderCard 
          title="Notification Preferences" 
          description="Manage how you receive notifications" 
        />
      </TabsContent>
      
      <TabsContent value="privacy">
        <ProfilePlaceholderCard 
          title="Privacy Settings" 
          description="Manage your privacy preferences" 
        />
      </TabsContent>
    </>
  );
};

export default ProfileTabsContent;
