
import { useState } from 'react';

export const useVisionApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Using the provided API key directly
  const apiKey = 'AIzaSyBDDkFAAnnAnHZ16AHS6Z8DRBX5dNswBw0';
  
  const analyzeImage = async (imageData: string): Promise<any> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if we should use real API or mock
      const useMockData = true; // Set to false to use the real API when billing is enabled
      
      if (useMockData) {
        // Return mock data after a short delay to simulate API call
        return await mockVisionApiCall(imageData);
      }
      
      // Below is the real API call code
      // Remove the data:image prefix for the API request
      const base64Image = imageData.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, '');
      
      const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                {
                  type: 'LABEL_DETECTION',
                  maxResults: 10,
                },
                {
                  type: 'OBJECT_LOCALIZATION',
                  maxResults: 5,
                },
                {
                  type: 'TEXT_DETECTION',
                  maxResults: 5,
                }
              ],
            },
          ],
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Vision API error:', errorData);
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      return processVisionResponse(data);
    } catch (error) {
      console.error('Error calling Vision API:', error);
      setError('Failed to analyze image. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Simulate a Vision API call with mock data
  const mockVisionApiCall = async (imageData: string): Promise<any> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a random ID based on the image data to get consistent results for the same image
    const imageHash = imageData.length.toString().substring(0, 5);
    const isEwasteRandomized = Number(imageHash) % 10 > 3; // 70% chance of e-waste for demo purposes
    
    // Generate mock vision API response
    const mockResponse = {
      responses: [{
        labelAnnotations: [
          { description: "Electronic device", score: isEwasteRandomized ? 0.92 : 0.3 },
          { description: "Computer hardware", score: isEwasteRandomized ? 0.87 : 0.2 },
          { description: "Technology", score: isEwasteRandomized ? 0.85 : 0.45 },
          { description: "Plastic", score: 0.82 },
          { description: "Metal", score: 0.78 },
          { description: "Circuit", score: isEwasteRandomized ? 0.75 : 0.15 },
          { description: "Wire", score: isEwasteRandomized ? 0.72 : 0.2 }
        ],
        localizedObjectAnnotations: [
          { name: isEwasteRandomized ? "Electronic device" : "Object", score: 0.93 },
          { name: isEwasteRandomized ? "Circuit board" : "Item", score: 0.85 }
        ],
        textAnnotations: [
          { description: isEwasteRandomized ? "Model A123\nRecycle E-waste" : "Made in China" }
        ]
      }]
    };
    
    return processVisionResponse(mockResponse);
  };
  
  const processVisionResponse = (response: any) => {
    // Extract relevant information from the Vision API response
    const result = response.responses[0];
    
    // Extract labels
    const labels = result.labelAnnotations?.map((label: any) => ({
      description: label.description,
      score: (label.score * 100).toFixed(1),
    })) || [];
    
    // Extract objects
    const objects = result.localizedObjectAnnotations?.map((obj: any) => ({
      name: obj.name,
      confidence: (obj.score * 100).toFixed(1),
    })) || [];
    
    // Extract text
    const text = result.textAnnotations?.[0]?.description || '';
    
    // Determine if electronic waste
    const isEWaste = determineIfEWaste(labels, objects, text);
    
    return {
      isEWaste,
      eWasteConfidence: isEWaste ? calculateEWasteConfidence(labels, objects) : 0,
      labels,
      objects,
      text,
      rawResponse: response,
    };
  };
  
  // Helper function to determine if the image contains e-waste
  const determineIfEWaste = (labels: any[], objects: any[], text: string) => {
    const eWasteKeywords = [
      'electronic', 'computer', 'device', 'circuit', 'phone', 'laptop', 'battery',
      'cable', 'charger', 'adapter', 'television', 'monitor', 'screen', 'keyboard',
      'mouse', 'printer', 'camera', 'appliance', 'gadget', 'microchip', 'pcb',
      'motherboard', 'processor', 'hard drive', 'ssd', 'ram', 'memory'
    ];
    
    // Check labels
    for (const label of labels) {
      if (eWasteKeywords.some(keyword => 
          label.description.toLowerCase().includes(keyword))) {
        return true;
      }
    }
    
    // Check objects
    for (const object of objects) {
      if (eWasteKeywords.some(keyword => 
          object.name.toLowerCase().includes(keyword))) {
        return true;
      }
    }
    
    // Check text
    if (eWasteKeywords.some(keyword => 
        text.toLowerCase().includes(keyword))) {
      return true;
    }
    
    return false;
  };
  
  // Calculate the confidence level that the image contains e-waste
  const calculateEWasteConfidence = (labels: any[], objects: any[]) => {
    const relevantLabels = labels.filter(label => 
      label.description.toLowerCase().includes('electronic') ||
      label.description.toLowerCase().includes('device') ||
      label.description.toLowerCase().includes('computer') ||
      label.description.toLowerCase().includes('circuit')
    );
    
    if (relevantLabels.length === 0) return 70; // Default confidence
    
    // Calculate average confidence of relevant labels
    const totalConfidence = relevantLabels.reduce(
      (sum, label) => sum + parseFloat(label.score), 0
    );
    
    return Math.min(totalConfidence / relevantLabels.length, 95);
  };
  
  return {
    analyzeImage,
    isLoading,
    error,
  };
};
