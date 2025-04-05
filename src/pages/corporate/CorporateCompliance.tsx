
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileCheck, Upload, Download, BookOpen, Clock, Bell, CheckCircle, AlertTriangle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CorporateCompliance: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('documentation');
  
  // Mock compliance data
  const complianceDocuments = [
    {
      id: '1',
      name: 'Annual E-Waste Declaration',
      status: 'pending',
      dueDate: '2025-06-30',
      category: 'mandatory'
    },
    {
      id: '2',
      name: 'Producer Responsibility Report',
      status: 'approved',
      dueDate: '2025-04-15',
      category: 'mandatory'
    },
    {
      id: '3',
      name: 'E-Waste Processing Certification',
      status: 'pending',
      dueDate: '2025-05-20',
      category: 'certification'
    },
    {
      id: '4',
      name: 'Environmental Compliance Report',
      status: 'rejected',
      dueDate: '2025-03-10',
      category: 'report'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDocuments = complianceDocuments.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUploadDocument = () => {
    toast({
      title: "Upload Document",
      description: "Document upload feature will be implemented in the next update.",
    });
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Download Template",
      description: "Template download feature will be implemented in the next update.",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "AI Report Generation",
      description: "AI-powered report generation initiated. This feature will be fully implemented in the next update.",
    });
  };

  return (
    <DashboardLayout role="corporate">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t('corporate.compliance')}</h1>
            <p className="text-muted-foreground mt-1">Manage your e-waste compliance requirements</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleUploadDocument} className="gap-2">
              <Upload size={16} />
              Upload Document
            </Button>
            <Button variant="outline" onClick={handleDownloadTemplate} className="gap-2">
              <Download size={16} />
              Templates
            </Button>
          </div>
        </div>

        {/* Compliance status cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold">75%</div>
                  <p className="text-muted-foreground text-sm">Overall Compliance</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-muted-foreground text-sm">Pending Submissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-2 rounded-full text-red-600">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-muted-foreground text-sm">Compliance Issues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Dashboard Tabs */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>Compliance Management</CardTitle>
              <div className="w-full md:w-auto">
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-[250px]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="documentation" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="targets">Processing Targets</TabsTrigger>
                <TabsTrigger value="regulations">Regulations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documentation" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No documents found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.name}</TableCell>
                          <TableCell className="capitalize">{doc.category}</TableCell>
                          <TableCell>{new Date(doc.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(doc.status)}>
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Search size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="targets" className="mt-0">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Total E-Waste Processing Target</span>
                      <span className="text-sm font-medium">75% (750kg / 1000kg)</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Category A (IT Equipment)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>60%</span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Processed: 300kg / Target: 500kg
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Category B (Consumer Electronics)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>90%</span>
                            </div>
                            <Progress value={90} className="h-2" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Processed: 450kg / Target: 500kg
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="regulations" className="mt-0">
                <div className="space-y-6">
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-4">
                      Below are the key regulations that apply to your organization under the
                      E-Waste Management Rules, 2022:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="border-l-2 border-primary pl-4 py-2">
                        <p className="font-medium">Extended Producer Responsibility (EPR)</p>
                        <p className="text-sm mt-1">
                          Producers must collect and channel e-waste generated from their products
                          to authorized dismantlers or recyclers.
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-primary pl-4 py-2">
                        <p className="font-medium">Collection Targets</p>
                        <p className="text-sm mt-1">
                          Producers must collect 60% of the e-waste generated by their products
                          by 2025, increasing to 70% by 2026 and 80% by 2027.
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-primary pl-4 py-2">
                        <p className="font-medium">Annual Returns</p>
                        <p className="text-sm mt-1">
                          Submit annual returns in Form-3 to the Central Pollution Control Board
                          on or before June 30th following the financial year.
                        </p>
                      </div>
                      
                      <div className="border-l-2 border-primary pl-4 py-2">
                        <p className="font-medium">Consumer Awareness</p>
                        <p className="text-sm mt-1">
                          Organizations must provide information on hazardous constituents in their
                          products and instructions for handling and disposal.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline" className="gap-2">
                      <BookOpen size={16} />
                      View Full Regulations
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* AI-Powered Compliance Assistant */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">AI Compliance Assistant</CardTitle>
            <CardDescription>Generate reports and get compliance recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Generate Compliance Report</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI can analyze your e-waste data and generate a comprehensive compliance report 
                  with recommendations for improvement.
                </p>
                <Button onClick={handleGenerateReport} className="w-full md:w-auto">
                  Generate AI Report
                </Button>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Recent AI Insights</h4>
                <div className="border rounded-md p-3 bg-background">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Category A Processing Gap</p>
                      <p className="text-xs text-muted-foreground">
                        Your IT equipment processing is behind target by 40%. Consider scheduling
                        additional collection drives to meet compliance targets.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border rounded-md p-3 bg-background">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Category B On Track</p>
                      <p className="text-xs text-muted-foreground">
                        Your consumer electronics processing is on track to meet the annual target,
                        with 90% completion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Calendar</CardTitle>
            <CardDescription>Upcoming deadlines and regulatory dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-red-400 pl-4 py-2 relative">
                <div className="absolute w-3 h-3 bg-red-400 rounded-full -left-[7px] top-3"></div>
                <div className="text-sm font-medium">Annual E-Waste Declaration</div>
                <div className="text-xs text-muted-foreground mt-1">Due by June 30, 2025 (In 86 days)</div>
              </div>
              
              <div className="border-l-2 border-yellow-400 pl-4 py-2 relative">
                <div className="absolute w-3 h-3 bg-yellow-400 rounded-full -left-[7px] top-3"></div>
                <div className="text-sm font-medium">Quarterly Processing Report</div>
                <div className="text-xs text-muted-foreground mt-1">Due by April 15, 2025 (In 10 days)</div>
              </div>
              
              <div className="border-l-2 border-gray-200 pl-4 py-2 relative">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full -left-[7px] top-3"></div>
                <div className="text-sm font-medium">E-Waste Management Committee Meeting</div>
                <div className="text-xs text-muted-foreground mt-1">Scheduled for April 20, 2025 (In 15 days)</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Full Calendar</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CorporateCompliance;
