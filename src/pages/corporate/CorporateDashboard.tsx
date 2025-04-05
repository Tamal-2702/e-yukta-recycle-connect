
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart, PieChart, FileCheck, Award, UploadCloud, Bell, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const CorporateDashboard: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: <FileCheck />, label: 'Compliance rate', value: '0%' },
    { icon: <BarChart />, label: 'Total e-waste processed', value: '0 tons' },
    { icon: <Award />, label: 'CSR points', value: '0' },
    { icon: <UploadCloud />, label: 'Data uploads', value: '0' },
  ];

  return (
    <DashboardLayout role="corporate">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('corporate.dashboard')}</h1>
          <p className="text-muted-foreground mt-1">Manage your corporate e-waste compliance and CSR activities</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compliance card */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>E-waste management compliance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Overall Compliance</span>
                  <span className="text-sm font-medium">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Documentation</span>
                  <span className="text-sm font-medium">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Processing Targets</span>
                  <span className="text-sm font-medium">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Compliance Details</Button>
            </CardFooter>
          </Card>

          {/* CSR Impact */}
          <Card>
            <CardHeader>
              <CardTitle>CSR Impact</CardTitle>
              <CardDescription>Environmental impact metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <PieChart size={48} className="mx-auto mb-2" />
                  <p>CSR impact data will appear here</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Generate CSR Report</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Upcoming compliance deadlines */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Important compliance dates</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar size={16} /> Add Reminder
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-gray-200 pl-4 py-2 relative">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-[7px] top-3"></div>
                <div className="text-sm font-medium">No upcoming deadlines</div>
                <div className="text-xs text-muted-foreground mt-1">Add compliance deadlines to track them here</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Updates and alerts</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <Bell size={16} />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="mx-auto mb-2" />
              <p>No new notifications</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CorporateDashboard;
