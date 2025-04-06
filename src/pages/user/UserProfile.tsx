
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Save, User, Bell, Shield, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const UserProfile: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);
  
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

  const handleSaveProfile = () => {
    // In a real implementation, this would update the user profile in Firebase
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
    setIsEditing(false);
  };

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('user.profile')}</h1>
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
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/lovable-uploads/b319afd6-7a92-46cf-a3a1-08caf101948d.png" />
                    <AvatarFallback>{displayName.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" size="sm">Change Photo</Button>
                  )}
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

export default UserProfile;
