
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
import { Progress } from "@/components/ui/progress";
import { 
  ShieldCheck, 
  Upload, 
  FileCheck, 
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

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
        </CardContent>
      </Card>
      
      {/* Document Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Document Checklist</CardTitle>
          <CardDescription>Upload all required documents for verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-gray-400">
                    {doc.status === 'verified' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : doc.status === 'rejected' ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    {doc.expiryDate && (
                      <p className="text-xs text-muted-foreground">Expires on: {doc.expiryDate}</p>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Submit for Verification</Button>
        </CardFooter>
      </Card>
      
      {/* EPR Compliance */}
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
    </div>
  );
};

export default ComplianceDashboard;
