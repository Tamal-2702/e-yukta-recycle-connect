
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, MapPin, Package, TrendingUp, Clock, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const KabadiwalasDashboard: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: <Package />, label: 'Total collections', value: '0 kg' },
    { icon: <Calendar />, label: 'Pickups completed', value: '0' },
    { icon: <TrendingUp />, label: 'Monthly earnings', value: '₹0' },
    { icon: <Check />, label: 'Verification rate', value: '0%' },
  ];

  const upcomingPickups = [
    { id: 1, address: '123 Example St, City', time: 'Today, 3:00 PM', items: 2, status: 'Pending' },
    { id: 2, address: '456 Sample Ave, Town', time: 'Tomorrow, 10:00 AM', items: 5, status: 'Confirmed' },
  ];

  return (
    <DashboardLayout role="kabadiwala">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('kabadiwala.dashboard')}</h1>
          <p className="text-muted-foreground mt-1">Manage your e-waste collection operations</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming pickups */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Pickups</CardTitle>
              <CardDescription>Your scheduled e-waste collections</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingPickups.length > 0 ? (
                <div className="space-y-4">
                  {upcomingPickups.map((pickup) => (
                    <Card key={pickup.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-muted-foreground" />
                              <span className="font-medium">{pickup.address}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock size={16} className="text-muted-foreground" />
                              <span>{pickup.time}</span>
                            </div>
                            <div className="mt-2 text-sm">
                              {pickup.items} items to be collected
                            </div>
                          </div>
                          <div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              pickup.status === 'Confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {pickup.status}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="default" size="sm" className="bg-primary">Start Navigation</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="mx-auto mb-2" />
                  <p>No upcoming pickups</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Pickups</Button>
            </CardFooter>
          </Card>

          {/* Performance card */}
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Your collection metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Weekly Target</span>
                  <span className="text-sm font-medium">0/50 kg</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Pickup Completion</span>
                  <span className="text-sm font-medium">0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Customer Ratings</span>
                  <span className="text-sm font-medium">N/A</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Full Analytics</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KabadiwalasDashboard;
