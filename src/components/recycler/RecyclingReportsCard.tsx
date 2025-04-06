
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from 'lucide-react';

const RecyclingReportsCard: React.FC = () => {
  return (
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
  );
};

export default RecyclingReportsCard;
