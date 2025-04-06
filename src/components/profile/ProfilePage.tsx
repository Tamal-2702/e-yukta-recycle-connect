
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs } from '@/components/ui/tabs';
import { ProfileHeader } from './components';
import { ProfileTabsList, ProfileTabsContent } from './components/tabs';
import { useProfileData } from './hooks/useProfileData';

interface ProfilePageProps {
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
}

const ProfilePage: React.FC<ProfilePageProps> = ({ role }) => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const {
    displayName,
    setDisplayName,
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
    handleAddressUpdate
  } = useProfileData(role);

  const avatarFallback = displayName.charAt(0) || role.charAt(0).toUpperCase();

  return (
    <DashboardLayout role={role}>
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
            email={currentUser?.email}
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
    </DashboardLayout>
  );
};

export default ProfilePage;
