
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart, PieChart, FileCheck, Award, UploadCloud, Bell, Calendar, BookOpen, Search, ArrowRight, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIWasteAnalyzer from '@/components/corporate/AIWasteAnalyzer';
import AIComplianceAssistant from '@/components/corporate/AIComplianceAssistant';

const CorporateDashboard: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: <FileCheck />, label: 'Compliance rate', value: '75%', link: '/corporate/compliance' },
    { icon: <BarChart />, label: 'Total e-waste processed', value: '750 kg', link: '/corporate/compliance' },
    { icon: <Award />, label: 'CSR points', value: '420', link: '/corporate/campaigns' },
    { icon: <UploadCloud />, label: 'Data uploads', value: '3', link: '/corporate/bulk' },
  ];

  const upcomingDeadlines = [
    { title: 'Quarterly Processing Report', dueDate: '2025-04-15', type: 'urgent' },
    { title: 'E-Waste Management Committee Meeting', dueDate: '2025-04-20', type: 'normal' },
    { title: 'Annual E-Waste Declaration', dueDate: '2025-06-30', type: 'normal' }
  ];

  const notifications = [
    { title: 'New regulation update', description: 'E-Waste Management Rules update effective from May 1, 2025', date: '2025-04-01', type: 'info' },
    { title: 'Collection target at risk', description: 'Current collection rate is 25% below quarterly target', date: '2025-03-28', type: 'warning' }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
            <Link key={index} to={stat.link}>
              <Card className="hover:shadow-md transition-shadow">
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
            </Link>
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
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Documentation</span>
                  <span className="text-sm font-medium">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Processing Targets</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/corporate/compliance" className="w-full">
                <Button variant="outline" className="w-full">
                  View Compliance Details
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* CSR Impact */}
          <Card>
            <CardHeader>
              <CardTitle>CSR Impact</CardTitle>
              <CardDescription>Environmental impact metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-700">750 kg</div>
                    <p className="text-xs text-green-600">E-Waste Collected</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-700">1,250 kg</div>
                    <p className="text-xs text-blue-600">CO₂ Emissions Avoided</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-700">325</div>
                    <p className="text-xs text-purple-600">Trees Equivalent Saved</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-700">42</div>
                    <p className="text-xs text-amber-600">Participants Engaged</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to="/corporate/campaigns" className="w-full">
                <Button variant="outline" className="w-full">Generate CSR Report</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* AI Tools Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">AI-Powered Tools</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Tabs defaultValue="waste-analyzer" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="waste-analyzer">Waste Analyzer</TabsTrigger>
                <TabsTrigger value="compliance-assistant">Compliance Assistant</TabsTrigger>
              </TabsList>
              <TabsContent value="waste-analyzer" className="mt-4">
                <AIWasteAnalyzer />
              </TabsContent>
              <TabsContent value="compliance-assistant" className="mt-4">
                <AIComplianceAssistant />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/corporate/compliance">
                <Button variant="outline" className="w-full h-auto py-6 flex flex-col gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span>View Compliance Dashboard</span>
                </Button>
              </Link>
              
              <Link to="/corporate/campaigns">
                <Button variant="outline" className="w-full h-auto py-6 flex flex-col gap-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  <span>Manage Campaigns</span>
                </Button>
              </Link>
              
              <Link to="/corporate/bulk">
                <Button variant="outline" className="w-full h-auto py-6 flex flex-col gap-2">
                  <UploadCloud className="h-6 w-6 text-primary" />
                  <span>Upload Bulk Data</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

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
              {upcomingDeadlines.length === 0 ? (
                <div className="border-l-2 border-gray-200 pl-4 py-2 relative">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-[7px] top-3"></div>
                  <div className="text-sm font-medium">No upcoming deadlines</div>
                  <div className="text-xs text-muted-foreground mt-1">Add compliance deadlines to track them here</div>
                </div>
              ) : (
                upcomingDeadlines.map((deadline, index) => (
                  <div 
                    key={index} 
                    className={`border-l-2 ${
                      deadline.type === 'urgent' ? 'border-red-400' : 'border-gray-200'
                    } pl-4 py-2 relative`}
                  >
                    <div 
                      className={`absolute w-3 h-3 ${
                        deadline.type === 'urgent' ? 'bg-red-400' : 'bg-gray-200'
                      } rounded-full -left-[7px] top-3`}
                    ></div>
                    <div className="text-sm font-medium">{deadline.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Due by {formatDate(deadline.dueDate)} 
                      (In {getDaysRemaining(deadline.dueDate)} days)
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/corporate/compliance" className="w-full">
              <Button variant="outline" className="w-full">View All Deadlines</Button>
            </Link>
          </CardFooter>
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
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="mx-auto mb-2" />
                <p>No new notifications</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 p-1.5 rounded-full ${
                        notification.type === 'warning' 
                          ? 'bg-yellow-100 text-yellow-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {notification.type === 'warning' ? (
                          <Bell size={14} />
                        ) : (
                          <Info size={14} />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{notification.title}</div>
                        <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                          <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CorporateDashboard;
