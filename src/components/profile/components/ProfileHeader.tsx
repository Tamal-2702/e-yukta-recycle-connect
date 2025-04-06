
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ProfileHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  title, 
  description, 
  action 
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
  );
};

export default ProfileHeader;
