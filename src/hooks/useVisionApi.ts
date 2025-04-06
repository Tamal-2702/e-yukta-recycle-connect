import { useState } from 'react';
import { visionApiConfig } from '@/lib/googleApiConfig';

export const useVisionApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Using the API key from centralized config
  const apiKey = visionApiConfig.apiKey;
  
  const analyzeImage = async (imageData: string): Promise<any> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if we should use real API or mock
      const useMockData = false; // Set to false to use the real API with our new key
      
      if (useMockData) {
        // Return mock data after a short delay to simulate API call
        return await mockVisionApiCall(imageData);
      }
      
      // Below is the real API call code
      // Remove the data:image prefix for the API request
      const base64Image = imageData.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, '');
      
      const response = await fetch(`${visionApiConfig.baseUrl}${visionApiConfig.endpoints.annotate}?key=${apiKey}`, {
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
                  maxResults: visionApiConfig.maxResults,
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
  
  const mockVisionApiCall = async (imageData: string): Promise<any> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a random ID based on the image data to get consistent results for the same image
    const imageHash = imageData.length.toString().substring(0, 5);
    const isEwasteRandomized = Number(imageHash) % 10 > 3; // 70% chance of e-waste for demo purposes
    
    // Generate mock vision API response with enhanced device details
    const mockResponse = {
      responses: [{
        labelAnnotations: [
          { description: "Electronic device", score: isEwasteRandomized ? 0.92 : 0.3 },
          { description: "Computer hardware", score: isEwasteRandomized ? 0.87 : 0.2 },
          { description: "Technology", score: isEwasteRandomized ? 0.85 : 0.45 },
          { description: "Plastic", score: 0.82 },
          { description: "Metal", score: 0.78 },
          { description: "Circuit", score: isEwasteRandomized ? 0.75 : 0.15 },
          { description: "Wire", score: isEwasteRandomized ? 0.72 : 0.2 },
          { description: "Smartphone", score: isEwasteRandomized ? 0.68 : 0.1 },
          { description: "Laptop", score: isEwasteRandomized ? 0.64 : 0.05 }
        ],
        localizedObjectAnnotations: [
          { name: isEwasteRandomized ? "Electronic device" : "Object", score: 0.93 },
          { name: isEwasteRandomized ? "Circuit board" : "Item", score: 0.85 }
        ],
        textAnnotations: [
          { description: isEwasteRandomized ? "Model A123\nRecycle E-waste\nSamsung\n2019" : "Made in China" }
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
    
    // Detect device information from the analysis results
    const deviceInfo = detectDeviceInfo(labels, objects, text);
    
    // Generate suggestions based on the device condition
    const suggestions = generateSuggestions(deviceInfo, labels);
    
    return {
      isEWaste,
      eWasteConfidence: isEWaste ? calculateEWasteConfidence(labels, objects) : 0,
      labels,
      objects,
      text,
      deviceInfo,
      suggestions,
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
  
  // Detect device information from the analysis results
  const detectDeviceInfo = (labels: any[], objects: any[], text: string) => {
    // Default values
    let deviceType = "Unknown Device";
    let brand = "Unknown";
    let model = "Unknown";
    let age = "Unknown";
    let condition = "Unknown";
    
    // Detect device type
    const deviceTypeKeywords = {
      "smartphone": ["phone", "smartphone", "mobile", "iphone", "android"],
      "laptop": ["laptop", "notebook", "macbook", "chromebook"],
      "desktop": ["desktop", "pc", "computer", "tower"],
      "tablet": ["tablet", "ipad"],
      "monitor": ["monitor", "display", "screen"],
      "printer": ["printer", "scanner"],
      "camera": ["camera", "dslr", "digital camera"],
      "television": ["tv", "television", "smart tv"],
      "audio": ["speaker", "headphone", "earphone", "headset", "earbud"],
      "appliance": ["refrigerator", "microwave", "washing machine", "dryer"]
    };
    
    // Find best matching device type from labels
    for (const label of labels) {
      const description = label.description.toLowerCase();
      for (const [type, keywords] of Object.entries(deviceTypeKeywords)) {
        if (keywords.some(keyword => description.includes(keyword))) {
          deviceType = type.charAt(0).toUpperCase() + type.slice(1);
          break;
        }
      }
    }
    
    // Extract brand from text
    const commonBrands = ["Apple", "Samsung", "Dell", "HP", "Lenovo", "Asus", "Acer", 
                          "LG", "Sony", "Microsoft", "Google", "Huawei", "Xiaomi"];
    
    for (const potentialBrand of commonBrands) {
      if (text.includes(potentialBrand)) {
        brand = potentialBrand;
        break;
      }
    }
    
    // Extract model from text
    const modelRegex = /[A-Z][A-Z0-9]+-?[A-Z0-9]+|[A-Z][a-z]* ?[0-9]{1,4}|Model [A-Z0-9]+/g;
    const modelMatches = text.match(modelRegex);
    if (modelMatches && modelMatches.length > 0) {
      model = modelMatches[0];
    }
    
    // Extract potential age (year)
    const yearRegex = /(19|20)\d{2}/g;
    const yearMatches = text.match(yearRegex);
    if (yearMatches && yearMatches.length > 0) {
      const year = parseInt(yearMatches[0]);
      const currentYear = new Date().getFullYear();
      const deviceAge = currentYear - year;
      
      if (deviceAge >= 0 && deviceAge <= 20) {
        age = `${deviceAge} years (${yearMatches[0]})`;
      }
    }
    
    // Determine condition based on age and other factors
    if (age !== "Unknown" && age.includes("years")) {
      const yearsMatch = age.match(/\d+/);
      if (yearsMatch) {
        const years = parseInt(yearsMatch[0]);
        if (years <= 2) condition = "Excellent";
        else if (years <= 4) condition = "Good";
        else if (years <= 6) condition = "Fair";
        else condition = "Poor";
      }
    } else {
      // Fallback: determine based on labels
      const conditionKeywords = {
        "broken": ["broken", "damaged", "cracked"],
        "scratched": ["scratched", "worn", "used"],
        "mint": ["new", "mint", "perfect"]
      };
      
      for (const label of labels) {
        const description = label.description.toLowerCase();
        if (conditionKeywords.broken.some(keyword => description.includes(keyword))) {
          condition = "Poor";
          break;
        } else if (conditionKeywords.scratched.some(keyword => description.includes(keyword))) {
          condition = "Fair";
          break;
        } else if (conditionKeywords.mint.some(keyword => description.includes(keyword))) {
          condition = "Excellent";
          break;
        }
      }
    }
    
    return {
      type: deviceType,
      brand: brand,
      model: model,
      age: age,
      condition: condition
    };
  };
  
  // Generate suggestions based on device info
  const generateSuggestions = (deviceInfo: any, labels: any[]) => {
    const suggestions = [];
    const { condition, age } = deviceInfo;
    
    // Always add recycle option
    suggestions.push({
      action: "Recycle",
      description: "Environmentally responsible disposal with material recovery.",
      icon: "Recycle",
      priority: condition === "Poor" ? "high" : "medium",
      centers: [
        { id: 'rec1', name: 'GreenTech Recycling Center', distance: '2.3 km' },
        { id: 'rec2', name: 'EcoWaste Solutions', distance: '4.6 km' },
        { id: 'rec3', name: 'City E-Waste Facility', distance: '6.1 km' },
      ]
    });
    
    // Add refurbish option for devices in fair or better condition
    if (condition === "Excellent" || condition === "Good" || condition === "Fair") {
      suggestions.push({
        action: "Refurbish",
        description: "Repair and upgrade for continued use or resale.",
        icon: "Tool",
        priority: condition === "Good" || condition === "Excellent" ? "high" : "medium",
        centers: [
          { id: 'ref1', name: 'TechRenew Workshop', distance: '3.5 km' },
          { id: 'ref2', name: 'ElectroFix Center', distance: '5.2 km' },
        ]
      });
    }
    
    // Add donate option for devices in good or excellent condition
    if (condition === "Excellent" || condition === "Good") {
      suggestions.push({
        action: "Donate",
        description: "Give to those in need - your device can help others.",
        icon: "Heart",
        priority: "medium",
        centers: [
          { id: 'don1', name: 'Digital Bridge Foundation', distance: '4.0 km' },
          { id: 'don2', name: 'Community Tech Center', distance: '2.8 km' },
          { id: 'don3', name: 'Schools Technology Program', distance: '7.2 km' },
        ]
      });
    }
    
    // Sort suggestions by priority
    return suggestions.sort((a, b) => {
      const priorityValue = { high: 3, medium: 2, low: 1 };
      return priorityValue[b.priority] - priorityValue[a.priority];
    });
  };
  
  return {
    analyzeImage,
    isLoading,
    error,
  };
};
