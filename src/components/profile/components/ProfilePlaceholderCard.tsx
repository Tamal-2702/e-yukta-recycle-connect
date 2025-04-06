
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface ProfilePlaceholderCardProps {
  title: string;
  description: string;
}

const ProfilePlaceholderCard: React.FC<ProfilePlaceholderCardProps> = ({ title, description }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-8 text-muted-foreground">{title} will be added in a future update</p>
      </CardContent>
    </Card>
  );
};

export default ProfilePlaceholderCard;
