
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Truck, 
  Clock, 
  PackageOpen, 
  MapPin, 
  ArrowUpDown,
  Check,
  X
} from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const InboundPickupList: React.FC = () => {
  const { t } = useLanguage();
  
  // Sample data - would come from an API in a real implementation
  const inboundPickups = [
    // Empty array to show empty state
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Inbound Pickups</h2>
          <p className="text-muted-foreground">Manage incoming e-waste collections</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort
          </Button>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </div>
      </div>
      
      {inboundPickups.length > 0 ? (
        <Card>
          <CardContent className="p-0 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pickup ID</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Expected Arrival</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inboundPickups.map((pickup, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">PIC-{100 + index}</TableCell>
                    <TableCell>Kabadiwala</TableCell>
                    <TableCell>Mixed E-Waste</TableCell>
                    <TableCell>5 kg</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-muted-foreground" />
                        Today, 2:30 PM
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge>En Route</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Truck className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg mb-2">No inbound pickups</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              There are currently no inbound pickups scheduled. New pickups will appear here when Kavadiwalas or Corporates schedule them.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InboundPickupList;
