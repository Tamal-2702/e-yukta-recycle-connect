
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
    {
      id: 'PIC-101',
      origin: 'Kabadiwala',
      originName: 'Raj Kumar',
      type: 'Mixed E-Waste',
      quantity: '5 kg',
      arrival: 'Today, 2:30 PM',
      status: 'En Route'
    },
    {
      id: 'PIC-102',
      origin: 'Corporate',
      originName: 'TechSolutions Ltd',
      type: 'Computers',
      quantity: '12 kg',
      arrival: 'Today, 4:45 PM',
      status: 'Scheduled'
    },
    {
      id: 'PIC-103',
      origin: 'Kabadiwala',
      originName: 'Sunita Devi',
      type: 'Batteries',
      quantity: '3 kg',
      arrival: 'Tomorrow, 10:00 AM',
      status: 'Processing'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{t('recycler.inbound_pickups')}</h2>
          <p className="text-muted-foreground">{t('recycler.manage_collections')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            {t('common.sort')}
          </Button>
          <Button variant="outline" size="sm">
            {t('common.filter')}
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
                {inboundPickups.map((pickup) => (
                  <TableRow key={pickup.id}>
                    <TableCell className="font-medium">{pickup.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{pickup.origin}</span>
                        <span className="text-xs text-muted-foreground">{pickup.originName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{pickup.type}</TableCell>
                    <TableCell>{pickup.quantity}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-muted-foreground" />
                        {pickup.arrival}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          pickup.status === 'En Route' ? 'default' : 
                          pickup.status === 'Scheduled' ? 'outline' : 
                          'secondary'
                        }
                      >
                        {pickup.status}
                      </Badge>
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
            <h3 className="font-medium text-lg mb-2">{t('recycler.no_inbound')}</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              {t('recycler.no_inbound_desc')}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InboundPickupList;
