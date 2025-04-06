
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';

interface BadgeItem {
  name: string;
  description: string;
  earned: boolean;
}

interface ProfileBadgesCardProps {
  badges: BadgeItem[];
}

const ProfileBadgesCard: React.FC<ProfileBadgesCardProps> = ({ badges }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Badges</CardTitle>
        <CardDescription>Badges earned through your e-waste recycling journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {badges.map((badge, index) => (
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
  );
};

export default ProfileBadgesCard;
