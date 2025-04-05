
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Recycle, BarChart, Truck, FileCheck, Package, Clock } from 'lucide-react';

const RecyclerDashboard: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: <Recycle />, label: 'Total processed', value: '0 tons' },
    { icon: <Package />, label: 'Current inventory', value: '0 kg' },
    { icon: <Truck />, label: 'Pending pickups', value: '0' },
    { icon: <FileCheck />, label: 'Compliance rate', value: '0%' },
  ];

  const inventoryItems = [
    { id: 1, category: 'Smartphones', quantity: '0 kg', status: 'In Storage' },
    { id: 2, category: 'Computers', quantity: '0 kg', status: 'Processing' },
    { id: 3, category: 'Household Appliances', quantity: '0 kg', status: 'In Storage' },
  ];

  return (
    <DashboardLayout role="recycler">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('recycler.dashboard')}</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage your recycling operations</p>
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
          {/* Inventory status */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>Current e-waste in your facility</CardDescription>
              </div>
              <Button variant="outline" size="sm">Add New</Button>
            </CardHeader>
            <CardContent>
              {inventoryItems.length > 0 ? (
                <div className="space-y-4">
                  {inventoryItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{item.category}</div>
                            <div className="text-sm text-muted-foreground">{item.quantity}</div>
                          </div>
                          <div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              item.status === 'Processing' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="mx-auto mb-2" />
                  <p>No inventory items</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Full Inventory</Button>
            </CardFooter>
          </Card>

          {/* Recent activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest processing events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-gray-200 pl-4 py-2 relative">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-[7px] top-3"></div>
                  <div className="text-sm font-medium">No recent activity</div>
                  <div className="text-xs text-muted-foreground flex items-center mt-1">
                    <Clock size={12} className="mr-1" /> Just now
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Activity</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Reporting card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recycling Reports</CardTitle>
              <CardDescription>Monitor your environmental impact</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <BarChart size={16} /> Generate Report
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart size={48} className="mx-auto mb-2" />
                <p>Processing data will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RecyclerDashboard;
