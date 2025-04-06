
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import ProfileContent from './components/ProfileContent';
import { useProfileData } from './hooks/useProfileData';

interface ProfilePageProps {
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
}

const ProfilePage: React.FC<ProfilePageProps> = ({ role }) => {
  const { currentUser } = useAuth();
  
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
      <ProfileContent
        role={role}
        displayName={displayName}
        setDisplayName={setDisplayName}
        email={currentUser?.email}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isUploading={isUploading}
        fileInputRef={fileInputRef}
        userAddress={userAddress}
        userStats={userStats}
        recentActivity={recentActivity}
        userBadges={userBadges}
        rewardItems={rewardItems}
        handleSaveProfile={handleSaveProfile}
        handleChangePhotoClick={handleChangePhotoClick}
        handleFileChange={handleFileChange}
        getAvatarSrc={getAvatarSrc}
        handleAddressUpdate={handleAddressUpdate}
        avatarFallback={avatarFallback}
      />
    </DashboardLayout>
  );
};

export default ProfilePage;
