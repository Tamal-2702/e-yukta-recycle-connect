
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  MapPin, 
  Truck, 
  Package, 
  Factory, 
  Recycle, 
  CheckCircle,
  ClipboardCheck
} from 'lucide-react';
import { 
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  TimelineTitle,
  TimelineDescription
} from '@/components/ui/timeline';

const TrackStatus = ({ trackingId }) => {
  // Mock data for a tracking result
  const trackingData = {
    id: trackingId,
    wasteType: 'Electronics (Computers, Phones)',
    quantity: '3.5 kg',
    status: 'In Transit',
    requestDate: '2025-03-20',
    expectedCompletion: '2025-04-15',
    stages: [
      { 
        id: 1, 
        title: 'Request Received', 
        description: 'Your pickup request has been received and confirmed', 
        date: '2025-03-20', 
        time: '10:30 AM', 
        completed: true,
        icon: ClipboardCheck
      },
      { 
        id: 2, 
        title: 'Pickup Complete', 
        description: 'E-waste was collected from your location', 
        date: '2025-03-25', 
        time: '02:15 PM', 
        completed: true,
        icon: Package
      },
      { 
        id: 3, 
        title: 'In Transit to Recycling Center', 
        description: 'Your e-waste is being transported to our recycling center', 
        date: '2025-03-26', 
        time: '09:45 AM', 
        completed: true,
        icon: Truck
      },
      { 
        id: 4, 
        title: 'Arrived at Recycling Center', 
        description: 'Your e-waste has arrived at our sorting facility', 
        date: '2025-03-30', 
        time: '11:20 AM', 
        completed: false,
        icon: Factory
      },
      { 
        id: 5, 
        title: 'Processing & Recycling', 
        description: 'Your e-waste is being processed and recyclable materials extracted', 
        date: 'Estimated: 2025-04-10', 
        time: '', 
        completed: false,
        icon: Recycle
      },
      { 
        id: 6, 
        title: 'Process Complete', 
        description: 'Your e-waste has been successfully recycled', 
        date: 'Estimated: 2025-04-15', 
        time: '', 
        completed: false,
        icon: CheckCircle
      }
    ],
    carbonOffset: '12.8 kg CO2',
    recyclableMaterials: {
      metals: '1.2 kg',
      plastic: '0.8 kg',
      glass: '0.3 kg',
      other: '1.2 kg'
    }
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'In Transit': return 'bg-blue-500';
      case 'Processing': return 'bg-yellow-500';
      case 'Complete': return 'bg-green-500';
      case 'Scheduled': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Tracking Details</CardTitle>
            <CardDescription>Tracking ID: {trackingData.id}</CardDescription>
          </div>
          <Badge className={`${getStatusColor(trackingData.status)} text-white`}>
            {trackingData.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Waste Type</h4>
            <p>{trackingData.wasteType}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Quantity</h4>
            <p>{trackingData.quantity}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Request Date</h4>
            <p>{trackingData.requestDate}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Expected Completion</h4>
            <p>{trackingData.expectedCompletion}</p>
          </div>
        </div>

        <Separator />
        
        <div>
          <h3 className="font-semibold mb-4">Tracking Timeline</h3>
          <Timeline>
            {trackingData.stages.map((stage, index) => (
              <TimelineItem key={stage.id}>
                {index < trackingData.stages.length - 1 && <TimelineConnector />}
                <TimelineHeader>
                  <TimelineIcon className={stage.completed ? "bg-primary" : "bg-muted"}>
                    <stage.icon className="h-4 w-4" />
                  </TimelineIcon>
                  <TimelineTitle>{stage.title}</TimelineTitle>
                </TimelineHeader>
                <TimelineBody>
                  <TimelineDescription>
                    <p>{stage.description}</p>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {stage.date} {stage.time && `• ${stage.time}`}
                    </div>
                  </TimelineDescription>
                </TimelineBody>
              </TimelineItem>
            ))}
          </Timeline>
        </div>

        <Separator />
        
        <div>
          <h3 className="font-semibold mb-3">Environmental Impact</h3>
          <div className="p-4 bg-green-50 rounded-md">
            <div className="font-medium text-green-800 mb-2">
              Carbon Offset: {trackingData.carbonOffset}
            </div>
            <div className="text-sm text-green-700">
              By recycling your e-waste, you've prevented approximately {trackingData.carbonOffset} of CO2 emissions.
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">Recyclable Materials Recovered</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-blue-50 p-3 rounded-md text-center">
              <div className="text-sm text-muted-foreground">Metals</div>
              <div className="font-bold text-blue-700">{trackingData.recyclableMaterials.metals}</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-md text-center">
              <div className="text-sm text-muted-foreground">Plastic</div>
              <div className="font-bold text-orange-700">{trackingData.recyclableMaterials.plastic}</div>
            </div>
            <div className="bg-cyan-50 p-3 rounded-md text-center">
              <div className="text-sm text-muted-foreground">Glass</div>
              <div className="font-bold text-cyan-700">{trackingData.recyclableMaterials.glass}</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-md text-center">
              <div className="text-sm text-muted-foreground">Other</div>
              <div className="font-bold text-purple-700">{trackingData.recyclableMaterials.other}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TrackDisposal: React.FC = () => {
  const { t } = useLanguage();
  const [trackingId, setTrackingId] = useState('');
  const [searched, setSearched] = useState(false);
  const [isValidTracking, setIsValidTracking] = useState(false);

  const handleSearch = () => {
    // In a real app, you would validate the tracking ID against your backend
    // For this demo, we'll just check if it's not empty
    if (trackingId.trim()) {
      setSearched(true);
      setIsValidTracking(true);
    } else {
      setIsValidTracking(false);
    }
  };

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('user.track')}</h1>
          <p className="text-muted-foreground mt-1">Track where your e-waste goes and its recycling journey</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Track Your E-Waste</CardTitle>
            <CardDescription>
              Enter your tracking ID to see the current status of your e-waste disposal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter tracking ID (e.g., EW-12345)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Track
              </Button>
            </div>
          </CardContent>
        </Card>

        {searched && !isValidTracking && (
          <div className="p-4 bg-red-50 rounded-md text-red-800">
            Invalid tracking ID. Please check and try again.
          </div>
        )}

        {searched && isValidTracking && (
          <TrackStatus trackingId={trackingId || 'EW-12345'} />
        )}

        {!searched && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Disposals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                  onClick={() => {
                    setTrackingId('EW-12345');
                    setSearched(true);
                    setIsValidTracking(true);
                  }}
                >
                  <div>
                    <div className="font-medium">Pickup Request #EW-12345</div>
                    <div className="text-sm text-muted-foreground">Electronics - 3.5 kg</div>
                    <div className="text-xs text-muted-foreground mt-1">Requested on: 2025-03-20</div>
                  </div>
                  <Badge className="bg-blue-500">In Transit</Badge>
                </div>
                
                <div className="p-4 border rounded-md hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                  <div>
                    <div className="font-medium">Pickup Request #EW-12242</div>
                    <div className="text-sm text-muted-foreground">Batteries - 1.2 kg</div>
                    <div className="text-xs text-muted-foreground mt-1">Requested on: 2025-02-15</div>
                  </div>
                  <Badge className="bg-green-500">Complete</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TrackDisposal;
