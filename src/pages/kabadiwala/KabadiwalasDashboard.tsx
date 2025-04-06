
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { Package, TrendingUp, MapPin, Clock, Check, Star, Truck, User, List, Home } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import PickupRequestList from '@/components/kabadiwala/PickupRequestList';
import PerformanceStats from '@/components/kabadiwala/PerformanceStats';
import JobHistoryList from '@/components/kabadiwala/JobHistoryList';
import KabadiwalaMap from '@/components/kabadiwala/KabadiwalaMap';

const KabadiwalasDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState("home");

  const stats = [
    { icon: <Package className="h-5 w-5" />, label: t('kabadiwala.total_collections'), value: '0 kg' },
    { icon: <Truck className="h-5 w-5" />, label: t('kabadiwala.pickups_completed'), value: '0' },
    { icon: <TrendingUp className="h-5 w-5" />, label: t('kabadiwala.monthly_earnings'), value: '₹0' },
    { icon: <Star className="h-5 w-5" />, label: t('kabadiwala.rating'), value: '0/5' },
  ];

  return (
    <DashboardLayout role="kabadiwala">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('kabadiwala.dashboard')}</h1>
          <p className="text-muted-foreground mt-1">{t('kabadiwala.manage_operations')}</p>
        </div>

        {/* Welcome card for new users */}
        <Card className="bg-gradient-to-r from-[#eef7e9] to-white">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium mb-2">{t('kabadiwala.welcome')}</h3>
                <p className="text-muted-foreground">{t('kabadiwala.complete_profile')}</p>
                <Button className="mt-4 bg-[#76b947] hover:bg-[#65a736]">
                  {t('kabadiwala.complete_verification')}
                </Button>
              </div>
              <div className="hidden md:block">
                <img 
                  src="/lovable-uploads/8ddd718f-818c-4433-bb43-fd8a216fd7ee.png" 
                  alt="Kabadiwala" 
                  className="h-32 w-32 object-contain"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="home" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="home">
              <Home className="h-4 w-4 mr-2" />
              {t('kabadiwala.home')}
            </TabsTrigger>
            <TabsTrigger value="pickup_requests">
              <List className="h-4 w-4 mr-2" />
              {t('kabadiwala.pickup_requests')}
            </TabsTrigger>
            <TabsTrigger value="history">
              <Clock className="h-4 w-4 mr-2" />
              {t('kabadiwala.job_history')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="home" className="space-y-6 mt-6">
            {/* Google Maps integration replacing the placeholder */}
            <KabadiwalaMap />
            
            {/* Performance card */}
            <PerformanceStats />
            
            {/* Incentives and Leaderboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('kabadiwala.incentives')}</CardTitle>
                  <CardDescription>{t('kabadiwala.incentives_description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>{t('kabadiwala.weekly_target')}</span>
                      <Badge variant="outline">0/5 {t('kabadiwala.pickups')}</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {t('kabadiwala.complete_pickups_for_bonus')}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t('kabadiwala.leaderboard')}</CardTitle>
                  <CardDescription>{t('kabadiwala.leaderboard_description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-6">
                      <User className="mx-auto h-8 w-8 text-muted-foreground opacity-50 mb-2" />
                      <p className="text-muted-foreground">
                        {t('kabadiwala.complete_profile_for_leaderboard')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="pickup_requests" className="mt-6">
            <PickupRequestList />
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <JobHistoryList />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default KabadiwalasDashboard;
