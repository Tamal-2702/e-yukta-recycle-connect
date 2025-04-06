
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Camera, Upload, AlertCircle, CheckCircle2, XCircle, RefreshCw, 
  Recycle, Heart, Tool, CalendarClock, ChevronRight, MapPin
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useVisionApi } from '@/hooks/useVisionApi';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';

// Define the stages of the scanning flow
enum ScanStage {
  UPLOAD = 'upload',
  ANALYZING = 'analyzing',
  RESULTS = 'results',
  SUGGESTIONS = 'suggestions',
  CENTER_SELECTION = 'centerSelection',
  SCHEDULE_PICKUP = 'schedulePickup',
  CONFIRMATION = 'confirmation'
}

const ScanWaste: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('camera');
  const [imageData, setImageData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [stage, setStage] = useState<ScanStage>(ScanStage.UPLOAD);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedCenter, setSelectedCenter] = useState<string>('');
  
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
        setStage(ScanStage.UPLOAD);
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
        setStage(ScanStage.UPLOAD);
      }
    }
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setScanResult(null);
    setImageData(null);
    setStage(ScanStage.UPLOAD);
    
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
    setStage(ScanStage.ANALYZING);
    
    try {
      const result = await analyzeImage(imageData);
      setScanResult(result);
      setStage(ScanStage.RESULTS);
      
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
      setStage(ScanStage.UPLOAD);
    } finally {
      setIsScanning(false);
    }
  };

  // Handle suggestion selection
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setStage(ScanStage.CENTER_SELECTION);
  };

  // Handle center selection
  const handleSelectCenter = (center: string) => {
    setSelectedCenter(center);
    setStage(ScanStage.SCHEDULE_PICKUP);
  };

  // Handle scheduling and navigate to the schedule page
  const handleSchedulePickup = () => {
    toast({
      title: "Pickup Request Created",
      description: "You'll be redirected to complete scheduling details.",
    });
    
    // Navigate to schedule page with pre-filled information
    navigate('/user/schedule', { 
      state: { 
        fromScan: true,
        deviceInfo: scanResult?.deviceInfo,
        disposalOption: selectedOption,
        center: selectedCenter
      } 
    });
  };

  // Reset scan
  const resetScan = () => {
    setImageData(null);
    setScanResult(null);
    setStage(ScanStage.UPLOAD);
    setSelectedOption('');
    setSelectedCenter('');
    
    if (activeTab === 'camera' && !streamRef.current) {
      startCamera();
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Get appropriate icon component for a suggestion
  const getSuggestionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Recycle': return <Recycle className="h-5 w-5" />;
      case 'Heart': return <Heart className="h-5 w-5" />;
      case 'Tool': return <Tool className="h-5 w-5" />;
      default: return <Recycle className="h-5 w-5" />;
    }
  };

  // Mock centers based on selected disposal option
  const getCentersByOption = (option: string) => {
    switch (option) {
      case 'Recycle':
        return [
          { id: 'rec1', name: 'GreenTech Recycling Center', distance: '2.3 km' },
          { id: 'rec2', name: 'EcoWaste Solutions', distance: '4.6 km' },
          { id: 'rec3', name: 'City E-Waste Facility', distance: '6.1 km' },
        ];
      case 'Refurbish':
        return [
          { id: 'ref1', name: 'TechRenew Workshop', distance: '3.5 km' },
          { id: 'ref2', name: 'ElectroFix Center', distance: '5.2 km' },
        ];
      case 'Donate':
        return [
          { id: 'don1', name: 'Digital Bridge Foundation', distance: '4.0 km' },
          { id: 'don2', name: 'Community Tech Center', distance: '2.8 km' },
          { id: 'don3', name: 'Schools Technology Program', distance: '7.2 km' },
        ];
      default:
        return [];
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

  // Render content based on current stage
  const renderStageContent = () => {
    switch (stage) {
      case ScanStage.UPLOAD:
        return (
          <>
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
          </>
        );
        
      case ScanStage.ANALYZING:
        return (
          <Card>
            <CardContent className="py-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Analyzing your device...</p>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                </div>
                <Progress value={75} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  <p>Identifying device type, brand, model and condition...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case ScanStage.RESULTS:
        return (
          <>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {scanResult?.isEWaste ? (
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
                  {scanResult?.isEWaste
                    ? `This appears to be electronic waste with ${scanResult.eWasteConfidence.toFixed(1)}% confidence.`
                    : "This doesn't appear to be electronic waste."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {scanResult?.deviceInfo && (
                  <div className="space-y-4 mb-4">
                    <h3 className="text-sm font-medium">Device Information:</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <span className="text-muted-foreground">Type:</span>
                        <div className="font-medium">{scanResult.deviceInfo.type}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <span className="text-muted-foreground">Brand:</span>
                        <div className="font-medium">{scanResult.deviceInfo.brand}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <span className="text-muted-foreground">Model:</span>
                        <div className="font-medium">{scanResult.deviceInfo.model}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <span className="text-muted-foreground">Age:</span>
                        <div className="font-medium">{scanResult.deviceInfo.age}</div>
                      </div>
                      <div className="col-span-2 bg-gray-50 p-3 rounded-md">
                        <span className="text-muted-foreground">Condition:</span>
                        <div className="font-medium">{scanResult.deviceInfo.condition}</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  {scanResult?.labels.length > 0 && (
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
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full">
                  {scanResult?.isEWaste && scanResult?.suggestions && (
                    <Button 
                      onClick={() => setStage(ScanStage.SUGGESTIONS)} 
                      className="w-full"
                    >
                      View Suggestions
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
            
            <Button variant="outline" onClick={resetScan} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Scan Another Item
            </Button>
          </>
        );
        
      case ScanStage.SUGGESTIONS:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Recommended Options</CardTitle>
              <CardDescription>
                Based on the device's condition, here are our suggested disposal options:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scanResult?.suggestions.map((suggestion: any, index: number) => (
                  <div 
                    key={index} 
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleSelectOption(suggestion.action)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`rounded-full p-2 ${
                        suggestion.action === 'Recycle' ? 'bg-green-100 text-green-600' :
                        suggestion.action === 'Refurbish' ? 'bg-blue-100 text-blue-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {getSuggestionIcon(suggestion.icon)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{suggestion.action}</h3>
                        <p className="text-sm text-muted-foreground">
                          {suggestion.description}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => setStage(ScanStage.RESULTS)} className="w-full">
                Back to Results
              </Button>
            </CardFooter>
          </Card>
        );
        
      case ScanStage.CENTER_SELECTION:
        const centers = getCentersByOption(selectedOption);
        return (
          <Card>
            <CardHeader>
              <CardTitle>Select a {selectedOption} Center</CardTitle>
              <CardDescription>
                Choose from these nearby centers for your {selectedOption.toLowerCase()} request:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {centers.map((center) => (
                  <div 
                    key={center.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleSelectCenter(center.name)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{center.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{center.distance} away</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => setStage(ScanStage.SUGGESTIONS)} className="w-full">
                Back to Options
              </Button>
            </CardFooter>
          </Card>
        );
        
      case ScanStage.SCHEDULE_PICKUP:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Schedule Pickup</CardTitle>
              <CardDescription>
                Your {selectedOption.toLowerCase()} request for {scanResult?.deviceInfo.type} at {selectedCenter}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium mb-2">Request Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Device:</span>
                      <span>{scanResult?.deviceInfo.brand} {scanResult?.deviceInfo.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Action:</span>
                      <span>{selectedOption}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Center:</span>
                      <span>{selectedCenter}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center py-3">
                  <Button onClick={handleSchedulePickup} className="gap-2">
                    <CalendarClock className="h-4 w-4" />
                    Continue to Schedule Pickup
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => setStage(ScanStage.CENTER_SELECTION)} className="w-full">
                Back to Center Selection
              </Button>
            </CardFooter>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('user.scan')}</h1>
          <p className="text-muted-foreground mt-1">Scan your electronic waste to identify, categorize, and process it</p>
        </div>

        {renderStageContent()}

        {/* Tips Card - always visible */}
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
