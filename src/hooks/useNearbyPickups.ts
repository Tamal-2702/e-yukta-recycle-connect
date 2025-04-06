
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
  const { geocodeAddress } = useMapsApi();

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
          },
          {
            id: 'pickup-002',
            address: 'C-45, Greater Kailash Part 1, New Delhi',
            customerName: 'Priya Patel',
            items: 'Refrigerator, microwave',
            scheduledTime: 'Tomorrow, 10 AM-1 PM',
            estimatedEarning: '₹350-400',
          },
          {
            id: 'pickup-003',
            address: '243, Vasant Kunj, New Delhi',
            customerName: 'Amit Singh',
            items: '3 smartphones, tablet',
            scheduledTime: 'Today, 4-7 PM',
            estimatedEarning: '₹150-200',
          }
        ];
        
        // Convert addresses to coordinates - in a real app, coordinates would come from the backend
        const pickupsWithCoordinates = await Promise.all(
          mockPickups.map(async (pickup) => {
            try {
              const geocodedResult = await geocodeAddress(pickup.address);
              return {
                ...pickup,
                coordinates: {
                  lat: geocodedResult.lat,
                  lng: geocodedResult.lng,
                },
              };
            } catch (error) {
              console.error(`Error geocoding address ${pickup.address}:`, error);
              // Default coordinates (New Delhi) if geocoding fails
              return {
                ...pickup,
                coordinates: {
                  lat: 28.6139 + (Math.random() * 0.05 - 0.025),
                  lng: 77.2090 + (Math.random() * 0.05 - 0.025)
                },
              };
            }
          })
        );
        
        setPickupLocations(pickupsWithCoordinates);
      } catch (error) {
        console.error('Error fetching nearby pickups:', error);
        setError('Failed to load nearby pickups. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNearbyPickups();
  }, [currentLocation, geocodeAddress]);

  return {
    pickupLocations,
    isLoading,
    error,
  };
};
