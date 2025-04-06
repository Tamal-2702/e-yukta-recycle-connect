
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ActivityItem {
  type: string;
  date: string;
  status?: string;
  item?: string;
  weight?: string;
  points: number;
}

interface ProfileActivityCardProps {
  activities: ActivityItem[];
}

const ProfileActivityCard: React.FC<ProfileActivityCardProps> = ({ activities }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your recent interactions with the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
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
  );
};

export default ProfileActivityCard;
