
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { File } from 'lucide-react';

interface VerificationStatusCardProps {
  complianceStatus: {
    isVerified: boolean;
    missingDocuments: string[];
    lastUpdated: string;
  };
}

const VerificationStatusCard: React.FC<VerificationStatusCardProps> = ({ complianceStatus }) => {
  return (
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
  );
};

export default VerificationStatusCard;
