
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export const useProfileData = (role: 'user' | 'kabadiwala' | 'recycler' | 'corporate') => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
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

  return {
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
  };
};
