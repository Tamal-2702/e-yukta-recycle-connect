
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import VerificationStatusSection from './VerificationStatusSection';
import DocumentChecklist from './DocumentChecklist';
import EPRTrackingCard from './EPRTrackingCard';

const ComplianceDashboard: React.FC = () => {
  const { t } = useLanguage();
  
  // Sample data - would come from an API in a real implementation
  const documents = [
    { name: 'E-Waste Recycler Certificate', status: 'missing', expiryDate: null },
    { name: 'EPR Authorization', status: 'missing', expiryDate: null },
    { name: 'GST Registration', status: 'missing', expiryDate: null },
    { name: 'Pollution Control Board Certification', status: 'missing', expiryDate: null },
    { name: 'PAN & Company Registration', status: 'missing', expiryDate: null },
  ];

  const complianceMetrics = [
    { label: 'Document Completion', value: 0 },
    { label: 'Verification Progress', value: 0 },
    { label: 'EPR Compliance', value: 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Compliance Dashboard</h2>
        <p className="text-muted-foreground">Monitor your certification and regulatory compliance</p>
      </div>
      
      {/* Compliance Status Card */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <VerificationStatusSection complianceMetrics={complianceMetrics} />
        </CardContent>
      </Card>
      
      {/* Document Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Document Checklist</CardTitle>
          <CardDescription>Upload all required documents for verification</CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentChecklist documents={documents} />
        </CardContent>
        <CardFooter>
          <Button className="w-full">Submit for Verification</Button>
        </CardFooter>
      </Card>
      
      {/* EPR Compliance */}
      <EPRTrackingCard />
    </div>
  );
};

export default ComplianceDashboard;
