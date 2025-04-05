
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarRange, PlusCircle, Globe, Users, Share2, Calendar, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type CampaignStatus = 'active' | 'scheduled' | 'completed' | 'draft';

interface Campaign {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  participants: number;
  target: number;
  wasteCollected: number;
  targetWaste: number;
}

const CorporateCampaigns: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock campaigns data
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Office E-Waste Drive 2025',
      description: 'Collect unused electronics from all office branches',
      startDate: '2025-05-15',
      endDate: '2025-06-15',
      status: 'scheduled',
      participants: 0,
      target: 500,
      wasteCollected: 0,
      targetWaste: 1000
    },
    {
      id: '2',
      title: 'Tech Refresh Program',
      description: 'Responsibly dispose of old company laptops and phones',
      startDate: '2025-04-10',
      endDate: '2025-07-10',
      status: 'active',
      participants: 120,
      target: 300,
      wasteCollected: 350,
      targetWaste: 700
    },
    {
      id: '3',
      title: 'Community Cleanup Initiative',
      description: 'Partner with local communities for e-waste awareness',
      startDate: '2025-01-01',
      endDate: '2025-03-31',
      status: 'completed',
      participants: 750,
      target: 500,
      wasteCollected: 1200,
      targetWaste: 1000
    },
    {
      id: '4',
      title: 'Summer Sustainability Drive',
      description: 'Draft campaign for upcoming summer initiative',
      startDate: '',
      endDate: '',
      status: 'draft',
      participants: 0,
      target: 200,
      wasteCollected: 0,
      targetWaste: 500
    }
  ]);

  const getStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleCreateCampaign = () => {
    toast({
      title: "Create Campaign",
      description: "Campaign creation form will be implemented in the next update.",
    });
  };

  const handleEditCampaign = (id: string) => {
    toast({
      title: "Edit Campaign",
      description: `Editing campaign ${id} will be available in the next update.`,
    });
  };

  const handleDeleteCampaign = (id: string) => {
    toast({
      title: "Delete Campaign",
      description: `Campaign ${id} would be deleted. This feature will be fully implemented in the next update.`,
      variant: "destructive",
    });
  };

  const handleViewCampaign = (id: string) => {
    toast({
      title: "View Campaign",
      description: `Detailed view for campaign ${id} will be available in the next update.`,
    });
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    // Filter by tab
    if (activeTab !== 'all' && campaign.status !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !campaign.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <DashboardLayout role="corporate">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t('corporate.campaigns')}</h1>
            <p className="text-muted-foreground mt-1">Plan and manage your e-waste awareness campaigns</p>
          </div>
          <Button onClick={handleCreateCampaign} className="gap-2">
            <PlusCircle size={16} />
            Create Campaign
          </Button>
        </div>

        {/* Campaign stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <CalendarRange size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold">{campaigns.length}</div>
                  <p className="text-muted-foreground text-sm">Total Campaigns</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <Globe size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {campaigns.filter(c => c.status === 'active').length}
                  </div>
                  <p className="text-muted-foreground text-sm">Active Campaigns</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <Users size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((total, campaign) => total + campaign.participants, 0)}
                  </div>
                  <p className="text-muted-foreground text-sm">Total Participants</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="bg-accent/10 p-2 rounded-full text-accent">
                  <Share2 size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((total, campaign) => total + campaign.wasteCollected, 0)}kg
                  </div>
                  <p className="text-muted-foreground text-sm">E-Waste Collected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Management */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>Campaign Management</CardTitle>
              <div className="w-full md:w-auto">
                <Input
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-[250px]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                {filteredCampaigns.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <Calendar className="mx-auto mb-2" />
                    <p>No campaigns found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCampaigns.map((campaign) => (
                      <Card key={campaign.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row p-4 gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{campaign.title}</h3>
                              <Badge className={getStatusColor(campaign.status)}>
                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{campaign.description}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar size={14} className="text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  {campaign.status === 'draft' 
                                    ? 'Not scheduled' 
                                    : `${formatDate(campaign.startDate)} - ${formatDate(campaign.endDate)}`}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users size={14} className="text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  {campaign.participants} / {campaign.target} participants
                                </span>
                              </div>
                            </div>
                            
                            {campaign.status !== 'draft' && (
                              <div className="mt-3">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Progress: {campaign.wasteCollected}kg collected</span>
                                  <span>{Math.round((campaign.wasteCollected / campaign.targetWaste) * 100)}%</span>
                                </div>
                                <Progress 
                                  value={(campaign.wasteCollected / campaign.targetWaste) * 100} 
                                  className="h-2" 
                                />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex md:flex-col gap-2 justify-end">
                            <Button variant="outline" size="sm" onClick={() => handleViewCampaign(campaign.id)}>
                              <Eye size={16} className="mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditCampaign(campaign.id)}>
                              <Edit size={16} className="mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeleteCampaign(campaign.id)}>
                              <Trash2 size={16} className="mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Campaign Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Calendar</CardTitle>
            <CardDescription>View all your scheduled campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Calendar size={48} className="mx-auto mb-2" />
                <p>Calendar view will be implemented in the next update</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Tips */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Campaign Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-primary/20 h-8 w-8 rounded-full flex items-center justify-center text-primary font-bold">1</div>
                <div>
                  <h4 className="font-medium">Define Clear Goals</h4>
                  <p className="text-sm text-muted-foreground">Set specific targets for e-waste collection and participant engagement.</p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-3">
                <div className="bg-primary/20 h-8 w-8 rounded-full flex items-center justify-center text-primary font-bold">2</div>
                <div>
                  <h4 className="font-medium">Engage Key Stakeholders</h4>
                  <p className="text-sm text-muted-foreground">Involve employees, community members, and recycling partners from the start.</p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-3">
                <div className="bg-primary/20 h-8 w-8 rounded-full flex items-center justify-center text-primary font-bold">3</div>
                <div>
                  <h4 className="font-medium">Promote Educational Content</h4>
                  <p className="text-sm text-muted-foreground">Share information about the importance of responsible e-waste management.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CorporateCampaigns;
