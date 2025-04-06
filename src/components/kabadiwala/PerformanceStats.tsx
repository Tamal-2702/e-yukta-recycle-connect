
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

const PerformanceStats: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('kabadiwala.performance')}</CardTitle>
        <CardDescription>{t('kabadiwala.your_metrics')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">{t('kabadiwala.weekly_target')}</span>
            <span className="text-sm font-medium">0/50 kg</span>
          </div>
          <Progress value={0} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">{t('kabadiwala.pickup_completion')}</span>
            <span className="text-sm font-medium">0%</span>
          </div>
          <Progress value={0} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">{t('kabadiwala.customer_ratings')}</span>
            <span className="text-sm font-medium">N/A</span>
          </div>
          <Progress value={0} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">{t('kabadiwala.verification_status')}</span>
            <span className="text-sm font-medium">Pending</span>
          </div>
          <Progress value={30} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          {t('kabadiwala.view_full_analytics')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PerformanceStats;
