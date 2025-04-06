
import React, { useState, useRef } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Camera, Upload, AlertCircle, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useVisionApi } from '@/hooks/useVisionApi';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ScanWaste: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('camera');
  const [imageData, setImageData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { analyzeImage, isLoading, error } = useVisionApi();

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setImageData(reader.result as string);
        setScanResult(null);
      };
      
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  // Start camera
  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }
      } else {
        toast({
          title: "Camera Not Available",
          description: "Your device does not support camera access or permission was denied.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  // Capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const capturedImage = canvas.toDataURL('image/jpeg');
        setImageData(capturedImage);
        setScanResult(null);
      }
    }
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setScanResult(null);
    setImageData(null);
    
    if (value === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
  };

  // Analyze image using Vision API
  const handleAnalyzeImage = async () => {
    if (!imageData) {
      toast({
        title: "No Image",
        description: "Please capture or upload an image first.",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    
    try {
      const result = await analyzeImage(imageData);
      setScanResult(result);
      
      if (result.isEWaste) {
        toast({
          title: "E-Waste Detected",
          description: `Confidence level: ${result.eWasteConfidence.toFixed(1)}%`,
          variant: "default",
        });
      } else {
        toast({
          title: "Not E-Waste",
          description: "This doesn't appear to be electronic waste.",
          variant: "default",
        });
      }
    } catch (err) {
      toast({
        title: "Analysis Failed",
        description: error || "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  // Reset scan
  const resetScan = () => {
    setImageData(null);
    setScanResult(null);
    
    if (activeTab === 'camera' && !streamRef.current) {
      startCamera();
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Component cleanup
  React.useEffect(() => {
    // Start camera if on camera tab
    if (activeTab === 'camera') {
      startCamera();
    }
    
    // Clean up on unmount
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('user.scan')}</h1>
          <p className="text-muted-foreground mt-1">Scan your electronic waste to identify and categorize it</p>
        </div>

        <Tabs defaultValue="camera" onValueChange={handleTabChange}>
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
                {!imageData ? (
                  <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden">
                    <video 
                      ref={videoRef}
                      autoPlay 
                      playsInline 
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center border-2 border-gray-300 relative overflow-hidden">
                    <img 
                      src={imageData} 
                      alt="Captured" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                
                {!imageData ? (
                  <Button onClick={captureImage} className="w-full btn-primary">
                    <Camera className="mr-2 h-4 w-4" />
                    Capture Image
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={resetScan} className="flex-1">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      New Capture
                    </Button>
                    <Button 
                      onClick={handleAnalyzeImage} 
                      disabled={isLoading || isScanning}
                      className="flex-1"
                    >
                      {(isLoading || isScanning) ? 'Analyzing...' : 'Analyze'}
                    </Button>
                  </div>
                )}
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
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                
                {!imageData ? (
                  <div 
                    className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="text-center">
                      <Upload size={48} className="mx-auto text-gray-400" />
                      <p className="mt-2 text-muted-foreground">Drag and drop or click to upload</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center border-2 border-gray-300 relative overflow-hidden">
                    <img 
                      src={imageData} 
                      alt="Uploaded" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                
                {!imageData ? (
                  <Button 
                    onClick={() => fileInputRef.current?.click()} 
                    className="w-full btn-primary"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={resetScan} className="flex-1">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      New Image
                    </Button>
                    <Button 
                      onClick={handleAnalyzeImage} 
                      disabled={isLoading || isScanning}
                      className="flex-1"
                    >
                      {(isLoading || isScanning) ? 'Analyzing...' : 'Analyze'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {(isLoading || isScanning) && (
          <Card>
            <CardContent className="py-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Analyzing image...</p>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                </div>
                <Progress value={isLoading ? 75 : 50} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        {scanResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {scanResult.isEWaste ? (
                  <>
                    <CheckCircle2 size={18} className="text-green-500" />
                    E-Waste Detected
                  </>
                ) : (
                  <>
                    <XCircle size={18} className="text-red-500" />
                    Not E-Waste
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {scanResult.isEWaste
                  ? `This appears to be electronic waste with ${scanResult.eWasteConfidence.toFixed(1)}% confidence.`
                  : "This doesn't appear to be electronic waste."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scanResult.labels.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Detected Labels:</h3>
                    <div className="flex flex-wrap gap-2">
                      {scanResult.labels.slice(0, 8).map((label: any, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {label.description} ({label.score}%)
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {scanResult.objects.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Detected Objects:</h3>
                    <div className="flex flex-wrap gap-2">
                      {scanResult.objects.map((obj: any, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {obj.name} ({obj.confidence}%)
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {scanResult.text && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Detected Text:</h3>
                    <p className="text-sm text-muted-foreground bg-gray-50 p-2 rounded">
                      {scanResult.text.substring(0, 100)}
                      {scanResult.text.length > 100 ? '...' : ''}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            {scanResult.isEWaste && (
              <CardFooter className="flex justify-end gap-2">
                <Button variant="default">
                  Schedule Pickup
                </Button>
              </CardFooter>
            )}
          </Card>
        )}

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
              <li>Make sure the entire item is visible in the frame</li>
              <li>If an item isn't recognized properly, try taking a photo from a different angle</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ScanWaste;
