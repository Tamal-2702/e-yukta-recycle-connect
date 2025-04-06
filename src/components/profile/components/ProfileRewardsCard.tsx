
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RewardItem {
  name: string;
  points: number;
}

interface ProfileRewardsCardProps {
  availablePoints: number;
  rewards: RewardItem[];
}

const ProfileRewardsCard: React.FC<ProfileRewardsCardProps> = ({ availablePoints, rewards }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reward Points</CardTitle>
        <CardDescription>You have {availablePoints} points to redeem</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="text-sm font-medium mb-2">Available Rewards</div>
            <div className="space-y-2">
              {rewards.map((reward, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-background rounded border">
                  <span>{reward.name}</span>
                  <Button size="sm" variant="outline">Redeem ({reward.points} points)</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileRewardsCard;
