
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Shield, Award, MapPin } from 'lucide-react';

const ProfileTabsList: React.FC = () => {
  return (
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
  );
};

export default ProfileTabsList;
