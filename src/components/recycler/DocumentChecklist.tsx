
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

interface Document {
  name: string;
  status: 'verified' | 'rejected' | 'missing' | string;
  expiryDate: string | null;
}

interface DocumentChecklistProps {
  documents: Document[];
}

const DocumentChecklist: React.FC<DocumentChecklistProps> = ({ documents }) => {
  return (
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
  );
};

export default DocumentChecklist;
