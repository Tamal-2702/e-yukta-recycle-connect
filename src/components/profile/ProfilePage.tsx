
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Save, User, Bell, Shield, Award, Camera, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { storage } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

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
  
  const form = useForm({
    defaultValues: {
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
    }
  });
  
  // Placeholder for profile stats and activity
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

  // Define role-specific avatar images for better visual representation
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
      // Create a reference to 'profile_images/USER_ID/profile.jpg'
      const storageRef = ref(storage, `profile_images/${currentUser.uid}/profile.jpg`);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Update the user's profile with the new photo URL
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
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const getAvatarSrc = () => {
    // Use user's photoURL if available, otherwise use role-specific image
    return currentUser?.photoURL || roleImages[role];
  };

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t(`${role}.profile`)}</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
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
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={getAvatarSrc()} />
                      <AvatarFallback>{displayName.charAt(0) || role.charAt(0).toUpperCase()}</AvatarFallback>
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
                    onClick={handleChangePhotoClick}
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
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Display Name</label>
                      <Input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        value={currentUser?.email || ''}
                        disabled
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recycling Stats</CardTitle>
                <CardDescription>Your contribution to a greener planet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {userStats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent interactions with the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">
                          {activity.type === 'pickup' && 'E-waste Pickup'}
                          {activity.type === 'purchase' && `Purchased ${activity.item}`}
                          {activity.type === 'recycling' && `Recycled ${activity.item}`}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge variant="secondary">+{activity.points} points</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Activity</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="rewards" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>Badges earned through your e-waste recycling journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {userBadges.map((badge, index) => (
                    <div key={index} className={`p-4 border rounded-lg ${badge.earned ? 'border-primary' : 'border-muted opacity-60'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${badge.earned ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <Award />
                        </div>
                        <div>
                          <div className="font-medium">{badge.name}</div>
                          <div className="text-sm text-muted-foreground">{badge.description}</div>
                        </div>
                      </div>
                      {!badge.earned && (
                        <div className="mt-2 text-xs text-muted-foreground">Not yet earned</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Reward Points</CardTitle>
                <CardDescription>You have 85 points to redeem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-medium mb-2">Available Rewards</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-background rounded border">
                        <span>₹100 discount on next purchase</span>
                        <Button size="sm" variant="outline">Redeem (80 points)</Button>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-background rounded border">
                        <span>Free e-waste pickup</span>
                        <Button size="sm" variant="outline">Redeem (50 points)</Button>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-background rounded border">
                        <span>Plant a tree in your name</span>
                        <Button size="sm" variant="outline">Redeem (100 points)</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">Notification settings will be added in a future update</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Manage your privacy preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">Privacy settings will be added in a future update</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
