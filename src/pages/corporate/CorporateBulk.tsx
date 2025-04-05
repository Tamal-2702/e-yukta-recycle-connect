
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, FileText, FilePlus, FileCheck, AlertTriangle, Info, ArrowRight, RefreshCw, CheckCircle, XCircle, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UploadRecord {
  id: string;
  fileName: string;
  uploadDate: string;
  status: 'processing' | 'validated' | 'error' | 'success';
  records: number;
  errors?: number;
  fileSize: string;
}

const CorporateBulk: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationProgress, setValidationProgress] = useState<number>(0);

  // Mock upload history data
  const [uploadHistory, setUploadHistory] = useState<UploadRecord[]>([
    {
      id: '1',
      fileName: 'q1_ewaste_inventory.csv',
      uploadDate: '2025-03-15',
      status: 'success',
      records: 156,
      errors: 0,
      fileSize: '24.5 KB'
    },
    {
      id: '2',
      fileName: 'office_equipment_disposal.xlsx',
      uploadDate: '2025-02-28',
      status: 'error',
      records: 87,
      errors: 12,
      fileSize: '18.3 KB'
    },
    {
      id: '3',
      fileName: 'branch_collection_data.csv',
      uploadDate: '2025-02-10',
      status: 'validated',
      records: 203,
      errors: 8,
      fileSize: '32.7 KB'
    }
  ]);

  const getStatusColor = (status: UploadRecord['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'validated':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: UploadRecord['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} />;
      case 'processing':
        return <RefreshCw size={16} />;
      case 'validated':
        return <FileCheck size={16} />;
      case 'error':
        return <XCircle size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setValidationProgress(0);

    // Simulate validation process
    const interval = setInterval(() => {
      setValidationProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          simulateAIProcessing();
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const simulateAIProcessing = () => {
    // Simulate AI processing completion after a delay
    setTimeout(() => {
      setIsProcessing(false);
      
      // Add new record to history
      const newRecord: UploadRecord = {
        id: (uploadHistory.length + 1).toString(),
        fileName: selectedFile?.name || 'unknown_file.csv',
        uploadDate: new Date().toISOString().split('T')[0],
        status: Math.random() > 0.3 ? 'validated' : 'error', // Randomly choose status for demo
        records: Math.floor(Math.random() * 200) + 50,
        errors: Math.floor(Math.random() * 15),
        fileSize: `${(selectedFile?.size ? selectedFile.size / 1024 : 20).toFixed(1)} KB`
      };
      
      setUploadHistory(prev => [newRecord, ...prev]);
      
      // Show success toast
      toast({
        title: "File Processed",
        description: newRecord.status === 'validated' 
          ? `File validated with ${newRecord.errors} errors. Ready for import.` 
          : `File contains ${newRecord.errors} critical errors that need attention.`,
        variant: newRecord.status === 'validated' ? "default" : "destructive",
      });
      
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }, 1500);
  };

  const handleProcessFile = (id: string) => {
    // Find the file record
    const record = uploadHistory.find(r => r.id === id);
    
    if (record && record.status === 'validated') {
      // Update status to processing
      setUploadHistory(prev => 
        prev.map(r => r.id === id ? { ...r, status: 'processing' as const } : r)
      );
      
      // Simulate processing
      setTimeout(() => {
        setUploadHistory(prev => 
          prev.map(r => r.id === id ? { ...r, status: 'success' as const } : r)
        );
        
        toast({
          title: "Import Successful",
          description: `${record.fileName} has been successfully imported with ${record.records} records.`,
        });
      }, 2000);
    }
  };

  const templateFiles = [
    { name: 'E-Waste Inventory Template', description: 'For uploading device inventory data', type: 'CSV' },
    { name: 'Collection Drive Template', description: 'For uploading collection event data', type: 'XLSX' },
    { name: 'Disposal Record Template', description: 'For uploading disposal and recycling records', type: 'CSV' }
  ];

  return (
    <DashboardLayout role="corporate">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t('corporate.bulk_upload')}</h1>
            <p className="text-muted-foreground mt-1">Upload and manage bulk e-waste data</p>
          </div>
        </div>

        {/* Bulk Upload Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle>Data Import System</CardTitle>
            <CardDescription>Upload, validate, and process e-waste inventory data</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upload" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="upload">Upload Data</TabsTrigger>
                <TabsTrigger value="history">Upload History</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-0">
                <div className="space-y-6">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload E-Waste Data File</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop your CSV or Excel file here, or click to browse
                    </p>
                    
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileChange}
                    />
                    
                    <div className="flex flex-col items-center gap-4">
                      <Button
                        onClick={() => document.getElementById('file-upload')?.click()}
                        variant="outline"
                        className="gap-2"
                      >
                        <FilePlus size={16} />
                        Select File
                      </Button>
                      
                      {selectedFile && (
                        <div className="border rounded-md p-3 bg-muted/30 text-left w-full max-w-md">
                          <div className="flex items-center gap-2">
                            <FileText size={18} className="text-muted-foreground" />
                            <div className="flex-1 truncate">
                              <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(selectedFile.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              onClick={() => setSelectedFile(null)}
                            >
                              <XCircle size={16} />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedFile && !isProcessing && (
                    <div className="flex justify-center">
                      <Button onClick={handleUpload} className="gap-2">
                        <Upload size={16} />
                        Upload and Validate
                      </Button>
                    </div>
                  )}

                  {isProcessing && (
                    <Card className="border border-blue-200 bg-blue-50">
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                          <RefreshCw size={18} className="animate-spin" />
                          AI Processing Your File
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Our AI is analyzing your file for data quality and consistency
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Validation progress</span>
                            <span>{validationProgress}%</span>
                          </div>
                          <Progress value={validationProgress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Info size={16} className="text-blue-500" />
                      File Requirements
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                      <li>File formats: CSV, Excel (.xlsx, .xls)</li>
                      <li>Maximum file size: 10MB</li>
                      <li>Must include required headers (see templates)</li>
                      <li>Date format: YYYY-MM-DD</li>
                      <li>Weight measurements in kilograms (kg)</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Records</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadHistory.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No upload history found
                        </TableCell>
                      </TableRow>
                    ) : (
                      uploadHistory.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.fileName}</TableCell>
                          <TableCell>{record.uploadDate}</TableCell>
                          <TableCell>{record.fileSize}</TableCell>
                          <TableCell>
                            {record.records}
                            {record.errors ? (
                              <span className="text-red-500 ml-1">
                                ({record.errors} errors)
                              </span>
                            ) : null}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(record.status)}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(record.status)}
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              </span>
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {record.status === 'validated' && (
                              <Button 
                                size="sm" 
                                onClick={() => handleProcessFile(record.id)}
                                className="gap-1"
                              >
                                Process
                                <ArrowRight size={14} />
                              </Button>
                            )}
                            {record.status === 'error' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-1"
                              >
                                View Errors
                              </Button>
                            )}
                            {record.status === 'success' && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="gap-1"
                              >
                                View Details
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="templates" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templateFiles.map((template, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="bg-primary/10 p-3 rounded-full text-primary">
                            <FileText size={20} />
                          </div>
                          <Badge>{template.type}</Badge>
                        </div>
                        <h3 className="text-lg font-medium mt-4">{template.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-4">
                          {template.description}
                        </p>
                        <Button variant="outline" className="w-full gap-2">
                          <Download size={16} />
                          Download Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 p-4 border rounded-md bg-yellow-50 border-yellow-200">
                  <div className="flex gap-3">
                    <AlertTriangle size={20} className="text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Important Note About Templates</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Do not change the column headers or structure of the template files.
                        Our AI data validation system requires the exact format to properly
                        process your data. If you need a custom template, please contact support.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* AI Data Processing Features */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>AI-Powered Data Processing</CardTitle>
            <CardDescription>Benefits of our intelligent data system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center text-primary">
                  <CheckCircle size={20} />
                </div>
                <h3 className="font-medium">Data Validation</h3>
                <p className="text-sm text-muted-foreground">
                  AI automatically validates data quality, formats, and consistency
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center text-primary">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="font-medium">Error Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Identifies and highlights errors, duplicates, and anomalies
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center text-primary">
                  <RefreshCw size={20} />
                </div>
                <h3 className="font-medium">Auto Correction</h3>
                <p className="text-sm text-muted-foreground">
                  Suggests fixes for common data issues and formatting problems
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center text-primary">
                  <FileCheck size={20} />
                </div>
                <h3 className="font-medium">Compliance Check</h3>
                <p className="text-sm text-muted-foreground">
                  Ensures data meets regulatory requirements and standards
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use the Bulk Upload System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center text-primary font-bold">1</div>
                <div>
                  <h4 className="font-medium">Download the appropriate template</h4>
                  <p className="text-sm text-muted-foreground">
                    Select and download the template that matches your data type
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-3">
                <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center text-primary font-bold">2</div>
                <div>
                  <h4 className="font-medium">Fill in your data following the format</h4>
                  <p className="text-sm text-muted-foreground">
                    Enter your e-waste data carefully following the required format
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-3">
                <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center text-primary font-bold">3</div>
                <div>
                  <h4 className="font-medium">Upload and validate your file</h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI will check your data for errors and inconsistencies
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-3">
                <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center text-primary font-bold">4</div>
                <div>
                  <h4 className="font-medium">Process the validated data</h4>
                  <p className="text-sm text-muted-foreground">
                    Once validation is complete, process the file to import the data
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CorporateBulk;
