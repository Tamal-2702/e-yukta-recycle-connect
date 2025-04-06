import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Shield, Award, MapPin } from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';

import {
  ProfileHeader,
  ProfilePersonalCard,
  ProfileStatsCard,
  ProfileActivityCard,
  ProfileBadgesCard,
  ProfileRewardsCard,
  ProfilePlaceholderCard,
  ProfileAddressCard
} from './components';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

interface ProfilePageProps {
  role: 'user' | 'kabadiwala' | 'recycler' | 'corporate';
}

const ProfilePage: React.FC<ProfilePageProps> = ({ role }) => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [userAddress, setUserAddress] = useState({
    street: '123 Green Street',
    city: 'Eco City',
    state: 'Green State',
    zipCode: '12345',
    country: 'India'
  });
  
  const form = useForm({
    defaultValues: {
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
    }
  });
  
  const userStats = [
    { label: 'E-waste recycled', value: '12 kg' },
    { label: 'Total pickups', value: '3' },
    { label: 'Reward points', value: '85' },
    { label: 'Carbon offset', value: '5.2 kg' },
  ];
  
  const recentActivity = [
    { type: 'pickup', date: '2025-04-03', status: 'completed', points: 25 },
    { type: 'purchase', date: '2025-03-28', item: 'Refurbished Tablet', points: 15 },
    { type: 'recycling', date: '2025-03-15', item: 'Old Laptop', weight: '2.3kg', points: 45 },
  ];
  
  const userBadges = [
    { name: 'Recycling Novice', description: 'Recycled your first e-waste', earned: true },
    { name: 'Consistent Contributor', description: 'Recycled e-waste for 3 consecutive months', earned: true },
    { name: 'Green Shopper', description: 'Purchased your first refurbished device', earned: true },
    { name: 'Recycling Expert', description: 'Recycled over 20kg of e-waste', earned: false },
    { name: 'Eco Influencer', description: 'Referred 5 friends to the platform', earned: false },
  ];

  const rewardItems = [
    { name: '₹100 discount on next purchase', points: 80 },
    { name: 'Free e-waste pickup', points: 50 },
    { name: 'Plant a tree in your name', points: 100 },
  ];

  const roleImages = {
    user: '/lovable-uploads/919a083d-573b-4b27-86cb-284efa585daf.png',
    kabadiwala: '/lovable-uploads/80b5a02d-30c5-4cf2-937d-c6da8b8a2f6c.png',
    recycler: '/lovable-uploads/58502304-f6e3-40e3-a36a-0fac81447383.png',
    corporate: '/lovable-uploads/8c2db26f-3113-47c7-b0f0-9c683f334100.png',
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;
    
    try {
      await updateProfile(currentUser, {
        displayName: displayName
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating your profile",
        variant: "destructive"
      });
    }
  };

  const handleProfileImageChange = async (file: File) => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to change your profile picture",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const storageRef = ref(storage, `profile_images/${currentUser.uid}/profile.jpg`);
      
      const snapshot = await uploadBytes(storageRef, file);
      
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      await updateProfile(currentUser, {
        photoURL: downloadURL
      });
      
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been successfully updated",
      });
    } catch (error) {
      console.error("Error uploading profile image:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your profile picture",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleChangePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleProfileImageChange(files[0]);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const getAvatarSrc = () => {
    return currentUser?.photoURL || roleImages[role];
  };

  const handleAddressUpdate = async (address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }) => {
    try {
      setUserAddress(address);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating address:", error);
      return Promise.reject(error);
    }
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6 p-6">
        <ProfileHeader 
          title={t(`${role}.profile`)}
          description="Manage your profile and preferences"
        />

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="location">
              <MapPin className="mr-2 h-4 w-4" />
              Location
            </TabsTrigger>
            <TabsTrigger value="rewards">
              <Award className="mr-2 h-4 w-4" />
              Rewards & Badges
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="mr-2 h-4 w-4" />
              Privacy
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <ProfilePersonalCard
              displayName={displayName}
              setDisplayName={setDisplayName}
              email={currentUser?.email}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isUploading={isUploading}
              avatarSrc={getAvatarSrc()}
              avatarFallback={displayName.charAt(0) || role.charAt(0).toUpperCase()}
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
              address={userAddress}
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
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
