
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Camera, Scan, UploadCloud, RefreshCw, AlertTriangle, Check, PlusCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface AIWasteAnalyzerProps {
  onAnalysisComplete?: (result: any) => void;
}

const AIWasteAnalyzer: React.FC<AIWasteAnalyzerProps> = ({ onAnalysisComplete }) => {
  const { toast } = useToast();
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null); // Clear previous results
      };
      
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCameraCapture = () => {
    toast({
      title: "Camera Access",
      description: "Camera access for waste scanning will be implemented in the next update.",
    });
  };

  const handleAnalyzeImage = () => {
    if (!image) {
      toast({
        title: "No Image",
        description: "Please upload an image to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate AI analysis with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          completeAnalysis();
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };

  const completeAnalysis = () => {
    // Simulate analysis results
    setTimeout(() => {
      const mockResult = {
        wasteType: 'Electronic Waste',
        category: 'Category III (IT and Telecom Equipment)',
        components: [
          { name: 'Circuit Boards', hazardous: true, recyclable: true, material: 'Mixed Metals', percentage: 40 },
          { name: 'Plastic Casing', hazardous: false, recyclable: true, material: 'ABS Plastic', percentage: 35 },
          { name: 'Display Screen', hazardous: true, recyclable: false, material: 'LCD/Glass', percentage: 15 },
          { name: 'Battery', hazardous: true, recyclable: true, material: 'Lithium-Ion', percentage: 10 }
        ],
        hazardousRating: 'Medium',
        recyclabilityScore: 75,
        disposalInstructions: 'This device contains hazardous materials and must be processed by certified e-waste recyclers. The battery must be removed and processed separately.',
        processingFacilities: ['GreenTech Recyclers', 'EcoWaste Solutions']
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
      
      if (onAnalysisComplete) {
        onAnalysisComplete(mockResult);
      }
      
      toast({
        title: "Analysis Complete",
        description: "AI waste analysis has been completed successfully.",
      });
    }, 1000);
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Waste Analyzer</CardTitle>
        <CardDescription>
          Upload an image to identify e-waste components and processing requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {!image ? (
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <UploadCloud className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload E-Waste Image</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload a clear image of the e-waste item for AI analysis
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  onClick={triggerFileInput}
                  variant="outline"
                  className="gap-2"
                >
                  <UploadCloud size={16} />
                  Upload Image
                </Button>
                
                <Button
                  onClick={handleCameraCapture}
                  variant="outline"
                  className="gap-2"
                >
                  <Camera size={16} />
                  Use Camera
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image preview */}
              <div className="relative border rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt="E-waste item" 
                  className="w-full h-auto max-h-64 object-contain mx-auto"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleReset}
                >
                  Change Image
                </Button>
              </div>

              {isAnalyzing ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <RefreshCw size={16} className="animate-spin" />
                    AI Analysis in Progress
                  </div>
                  <div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Analyzing image...</span>
                      <span>{progress}%</span>
                    </div>
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {result.wasteType}
                    </Badge>
                    <Badge variant="outline" className="bg-muted">
                      {result.category}
                    </Badge>
                    <Badge variant="outline" className={
                      result.hazardousRating === 'High' ? 'bg-red-100 text-red-800' :
                      result.hazardousRating === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      Hazardous: {result.hazardousRating}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      Recyclability: {result.recyclabilityScore}%
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Detected Components</h4>
                    <div className="space-y-2">
                      {result.components.map((component: any, index: number) => (
                        <div key={index} className="flex items-center justify-between text-sm border-b pb-2">
                          <div className="flex items-center gap-2">
                            {component.hazardous ? (
                              <AlertTriangle size={14} className="text-yellow-500" />
                            ) : (
                              <Check size={14} className="text-green-500" />
                            )}
                            <span>{component.name} ({component.material})</span>
                          </div>
                          <span className="text-muted-foreground">{component.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Disposal Instructions</h4>
                    <p className="text-sm text-muted-foreground">
                      {result.disposalInstructions}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recommended Processing Facilities</h4>
                    <div className="space-y-1">
                      {result.processingFacilities.map((facility: string, index: number) => (
                        <div key={index} className="text-sm flex items-center gap-2">
                          <PlusCircle size={14} className="text-primary" />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <Button onClick={handleAnalyzeImage} className="gap-2">
                    <Scan size={16} />
                    Analyze with AI
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      {result && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Analyze New Item
          </Button>
          <Button>
            Add to Inventory
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AIWasteAnalyzer;
