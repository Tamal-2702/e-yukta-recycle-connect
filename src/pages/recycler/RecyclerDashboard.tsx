
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Recycle, 
  BarChart, 
  Truck, 
  FileCheck, 
  Package, 
  Clock, 
  ShieldCheck,
  ArrowUpDown,
  Map,
  File
} from 'lucide-react';

const RecyclerDashboard: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: <Recycle />, label: 'Total processed', value: '0 tons' },
    { icon: <Package />, label: 'Current inventory', value: '0 kg' },
    { icon: <Truck />, label: 'Pending pickups', value: '0' },
    { icon: <ShieldCheck />, label: 'Compliance rate', value: '0%' },
  ];

  const inboundPickups = [
    // Empty for now - will be populated from API
  ];

  const complianceStatus = {
    isVerified: false,
    missingDocuments: ['E-Waste Recycler Certificate', 'EPR Authorization', 'Pollution Control Board Certification'],
    lastUpdated: 'Never'
  };

  return (
    <DashboardLayout role="recycler">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('recycler.dashboard')}</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage your recycling operations</p>
        </div>

        {/* Verification Status */}
        {!complianceStatus.isVerified && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                  <File />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-1">Complete your verification</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Upload the required documents to get verified as a certified recycler on ई-Yukta.
                  </p>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium mb-2">Missing documents:</h4>
                    <div className="flex flex-wrap gap-2">
                      {complianceStatus.missingDocuments.map((doc, index) => (
                        <Badge key={index} variant="outline" className="bg-white">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button>Complete Verification</Button>
                </div>
                <div className="hidden md:block">
                  <img 
                    src="/lovable-uploads/58502304-f6e3-40e3-a36a-0fac81447383.png" 
                    alt="Recycler" 
                    className="h-32 w-32 object-contain"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
          {/* Inbound Pickups */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Inbound Pickups</CardTitle>
                <CardDescription>Upcoming waste collections to receive</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Truck size={16} /> View All
              </Button>
            </CardHeader>
            <CardContent>
              {inboundPickups.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pickup ID</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inboundPickups.map((pickup, index) => (
                      <TableRow key={index}>
                        <TableCell>ID-{index}</TableCell>
                        <TableCell>Origin</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>0 kg</TableCell>
                        <TableCell>
                          <Badge>Pending</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Truck size={48} className="mx-auto mb-2" />
                  <p>No inbound pickups scheduled</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Pickups</Button>
            </CardFooter>
          </Card>

          {/* Compliance Status */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>Documentation and certification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Verification Status</span>
                    <Badge variant={complianceStatus.isVerified ? "default" : "outline"}>
                      {complianceStatus.isVerified ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last updated: {complianceStatus.lastUpdated}
                  </div>
                </div>
                
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">EPR Status</span>
                    <Badge variant="outline">Not Configured</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Set up EPR to track your compliance
                  </div>
                </div>

                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Data Destruction</span>
                    <Badge variant="outline">Not Configured</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Set up protocols for secure data handling
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Manage Compliance</Button>
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
