
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ComplianceStatusCardProps {
  complianceStatus: {
    isVerified: boolean;
    lastUpdated: string;
  };
}

const ComplianceStatusCard: React.FC<ComplianceStatusCardProps> = ({ complianceStatus }) => {
  return (
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
  );
};

export default ComplianceStatusCard;
