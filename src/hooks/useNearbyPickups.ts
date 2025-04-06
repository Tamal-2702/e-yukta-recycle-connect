
import { useState, useEffect } from 'react';
import { useMapsApi } from './useMapsApi';

export interface PickupLocation {
  id: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  customerName: string;
  items: string;
  scheduledTime: string;
  distance?: string;
  estimatedEarning: string;
}

export const useNearbyPickups = (currentLocation?: { lat: number; lng: number }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pickupLocations, setPickupLocations] = useState<PickupLocation[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchNearbyPickups = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Mock data - in a real app, this would come from your backend/API
        const mockPickups = [
          {
            id: 'pickup-001',
            address: 'A-21, Sector 16, Noida, Uttar Pradesh',
            customerName: 'Rahul Sharma',
            items: 'Old laptop, CRT monitor',
            scheduledTime: 'Today, 2-5 PM',
            estimatedEarning: '₹200-250',
            // Pre-defined coordinates instead of geocoding
            coordinates: {
              lat: 28.5983 + (Math.random() * 0.01 - 0.005),
              lng: 77.3180 + (Math.random() * 0.01 - 0.005)
            }
          },
          {
            id: 'pickup-002',
            address: 'C-45, Greater Kailash Part 1, New Delhi',
            customerName: 'Priya Patel',
            items: 'Refrigerator, microwave',
            scheduledTime: 'Tomorrow, 10 AM-1 PM',
            estimatedEarning: '₹350-400',
            // Pre-defined coordinates instead of geocoding
            coordinates: {
              lat: 28.5480 + (Math.random() * 0.01 - 0.005),
              lng: 77.2350 + (Math.random() * 0.01 - 0.005)
            }
          },
          {
            id: 'pickup-003',
            address: '243, Vasant Kunj, New Delhi',
            customerName: 'Amit Singh',
            items: '3 smartphones, tablet',
            scheduledTime: 'Today, 4-7 PM',
            estimatedEarning: '₹150-200',
            // Pre-defined coordinates instead of geocoding
            coordinates: {
              lat: 28.5270 + (Math.random() * 0.01 - 0.005),
              lng: 77.1560 + (Math.random() * 0.01 - 0.005)
            }
          }
        ];
        
        setPickupLocations(mockPickups);
      } catch (error) {
        console.error('Error fetching nearby pickups:', error);
        setError('Failed to load nearby pickups. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNearbyPickups();
  }, [currentLocation]);

  return {
    pickupLocations,
    isLoading,
    error,
  };
};
