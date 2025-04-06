
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

  // Sample data for demonstration
  const stats = [
    { label: t('kabadiwala.weekly_target'), value: '15/50 kg', progress: 30 },
    { label: t('kabadiwala.pickup_completion'), value: '85%', progress: 85 },
    { label: t('kabadiwala.customer_ratings'), value: '4.2/5', progress: 84 },
    { label: t('kabadiwala.verification_status'), value: 'Pending', progress: 50 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('kabadiwala.performance')}</CardTitle>
        <CardDescription>{t('kabadiwala.your_metrics')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-sm">{stat.label}</span>
              <span className="text-sm font-medium">{stat.value}</span>
            </div>
            <Progress value={stat.progress} className="h-2" />
          </div>
        ))}
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
