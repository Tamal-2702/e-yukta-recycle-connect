
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck } from 'lucide-react';

const InboundPickupsCard: React.FC = () => {
  const inboundPickups = [
    // Empty for now - will be populated from API
  ];

  return (
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
  );
};

export default InboundPickupsCard;
