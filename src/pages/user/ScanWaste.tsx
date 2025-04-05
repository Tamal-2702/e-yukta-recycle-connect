
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Camera, Upload, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ScanWaste: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('camera');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('user.scan')}</h1>
          <p className="text-muted-foreground mt-1">Scan your electronic waste to identify and categorize it</p>
        </div>

        <Tabs defaultValue="camera" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="camera">Camera</TabsTrigger>
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
          </TabsList>
          
          <TabsContent value="camera" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Scan using camera</CardTitle>
                <CardDescription>Point your camera at the e-waste item to identify it</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-gray-300">
                  {isScanning ? (
                    <div className="text-center">
                      <div className="animate-pulse">
                        <Camera size={48} className="mx-auto text-gray-400" />
                      </div>
                      <p className="mt-2 text-muted-foreground">Scanning...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera size={48} className="mx-auto text-gray-400" />
                      <p className="mt-2 text-muted-foreground">Camera preview will appear here</p>
                    </div>
                  )}
                </div>
                <Button onClick={handleScan} disabled={isScanning} className="w-full btn-primary">
                  {isScanning ? 'Scanning...' : 'Start Scanning'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upload" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload an image</CardTitle>
                <CardDescription>Upload a clear photo of your e-waste item</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Upload size={48} className="mx-auto text-gray-400" />
                    <p className="mt-2 text-muted-foreground">Drag and drop or click to upload</p>
                  </div>
                </div>
                <Button className="w-full btn-primary">Upload Image</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle size={18} />
              Tips for better scanning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Ensure good lighting when scanning your e-waste items</li>
              <li>Place the item against a plain background for better detection</li>
              <li>If scanning doesn't work, try taking a photo and uploading it</li>
              <li>Make sure the entire item is visible in the frame</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ScanWaste;
