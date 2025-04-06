
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileCheck } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
} from "@/components/ui/card";

const EPRTrackingCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>EPR Tracking</CardTitle>
        <CardDescription>Extended Producer Responsibility compliance</CardDescription>
      </CardHeader>
      <CardContent className="text-center py-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <FileCheck className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-lg mb-2">EPR Tracking Not Started</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
          Set up your EPR tracking to monitor your compliance with Extended Producer Responsibility regulations.
        </p>
        <Button>Set Up EPR Tracking</Button>
      </CardContent>
    </Card>
  );
};

export default EPRTrackingCard;
