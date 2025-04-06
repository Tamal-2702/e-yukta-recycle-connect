
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ComplianceMetric {
  label: string;
  value: number;
}

interface VerificationStatusSectionProps {
  complianceMetrics: ComplianceMetric[];
}

const VerificationStatusSection: React.FC<VerificationStatusSectionProps> = ({ complianceMetrics }) => {
  return (
    <div className="bg-muted/30 p-6 rounded-lg border">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="p-3 rounded-full bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Verification Status</h3>
            <p className="text-muted-foreground">Pending verification</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-white px-3 py-1">
          Not Verified
        </Badge>
      </div>
      
      <div className="space-y-4">
        {complianceMetrics.map((metric, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{metric.label}</span>
              <span className="text-sm font-medium">{metric.value}%</span>
            </div>
            <Progress value={metric.value} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationStatusSection;
