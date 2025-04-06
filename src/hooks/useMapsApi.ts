
import { useState } from 'react';
import { mapsConfig } from '@/lib/googleApiConfig';

interface GeocodingResult {
  lat: number;
  lng: number;
  formattedAddress: string;
}

interface DistanceResult {
  distance: {
    text: string;
    value: number; // meters
  };
  duration: {
    text: string;
    value: number; // seconds
  };
}

interface DirectionsResult {
  routes: any[];
  waypoints: any[];
  distance: string;
  duration: string;
}

export const useMapsApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Geocoding API - Convert address to coordinates
  const geocodeAddress = async (address: string): Promise<GeocodingResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${mapsConfig.apiKey}&region=${mapsConfig.region}`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding request failed');
      }
      
      const data = await response.json();
      
      if (data.status !== 'OK') {
        throw new Error(`Geocoding error: ${data.status}`);
      }
      
      const result = data.results[0];
      return {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        formattedAddress: result.formatted_address
      };
    } catch (error) {
      console.error('Geocoding error:', error);
      setError('Failed to geocode address');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Distance Matrix API - Calculate distance and time between origins and destinations
  const getDistance = async (origin: string, destination: string): Promise<DistanceResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${mapsConfig.apiKey}&region=${mapsConfig.region}`
      );
      
      if (!response.ok) {
        throw new Error('Distance Matrix request failed');
      }
      
      const data = await response.json();
      
      if (data.status !== 'OK') {
        throw new Error(`Distance Matrix error: ${data.status}`);
      }
      
      const element = data.rows[0].elements[0];
      
      if (element.status !== 'OK') {
        throw new Error(`Route calculation failed: ${element.status}`);
      }
      
      return {
        distance: element.distance,
        duration: element.duration
      };
    } catch (error) {
      console.error('Distance Matrix error:', error);
      setError('Failed to calculate distance');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Directions API - Get directions between two points
  const getDirections = async (origin: string, destination: string, waypoints: string[] = []): Promise<DirectionsResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      let waypointsParam = '';
      if (waypoints.length > 0) {
        waypointsParam = `&waypoints=${waypoints.map(wp => encodeURIComponent(wp)).join('|')}`;
      }
      
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}${waypointsParam}&key=${mapsConfig.apiKey}&region=${mapsConfig.region}`
      );
      
      if (!response.ok) {
        throw new Error('Directions request failed');
      }
      
      const data = await response.json();
      
      if (data.status !== 'OK') {
        throw new Error(`Directions error: ${data.status}`);
      }
      
      // Simplify the response for easier consumption
      const route = data.routes[0];
      const leg = route.legs[0];
      
      return {
        routes: data.routes,
        waypoints: data.geocoded_waypoints,
        distance: leg.distance.text,
        duration: leg.duration.text
      };
    } catch (error) {
      console.error('Directions error:', error);
      setError('Failed to get directions');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get nearby places
  const getNearbyPlaces = async (lat: number, lng: number, type: string, radius: number = 5000): Promise<any[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${mapsConfig.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error('Nearby search request failed');
      }
      
      const data = await response.json();
      
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Nearby search error: ${data.status}`);
      }
      
      return data.results || [];
    } catch (error) {
      console.error('Nearby places error:', error);
      setError('Failed to get nearby places');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    geocodeAddress,
    getDistance,
    getDirections,
    getNearbyPlaces,
    isLoading,
    error
  };
};
