
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface StatItem {
  label: string;
  value: string;
}

interface ProfileStatsCardProps {
  stats: StatItem[];
}

const ProfileStatsCard: React.FC<ProfileStatsCardProps> = ({ stats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recycling Stats</CardTitle>
        <CardDescription>Your contribution to a greener planet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileStatsCard;
