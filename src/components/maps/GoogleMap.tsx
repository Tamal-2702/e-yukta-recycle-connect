
import React, { useRef, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button } from '@/components/ui/button';
import { mapsConfig } from '@/lib/googleApiConfig';

// Ensure we define the proper interface for marker positions
interface MarkerPosition {
  position: { lat: number; lng: number };
  title?: string;
  icon?: string | { url: string } | any; // Simplified icon type
}

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markerPositions?: MarkerPosition[];
  height?: string;
  width?: string;
  onMapClick?: (e: google.maps.MapMouseEvent) => void;
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  center = { lat: 28.6139, lng: 77.2090 }, // Default to New Delhi
  zoom = 12,
  markerPositions = [],
  height = '100%',
  width = '100%',
  onMapClick,
  className = '',
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapLoadError, setMapLoadError] = useState<string | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    // Initialize Google Maps
    const loader = new Loader({
      apiKey: mapsConfig.apiKey,
      version: 'weekly',
      libraries: ['places'],
    });

    loader
      .load()
      .then(() => {
        if (mapRef.current) {
          // Create the map instance
          const mapInstance = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
              },
            ],
          });

          mapInstanceRef.current = mapInstance;

          // Add click event listener if provided
          if (onMapClick) {
            mapInstance.addListener('click', onMapClick);
          }

          setMapLoaded(true);
        }
      })
      .catch((error) => {
        console.error('Error loading Google Maps:', error);
        setMapLoadError('Failed to load Google Maps. Please try again later.');
      });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current && onMapClick) {
        // @ts-ignore - google.maps.MapsEventListener
        google.maps.event.clearListeners(mapInstanceRef.current, 'click');
      }
      
      // Clear markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [center, zoom, onMapClick]);

  // Add markers when map is loaded and marker positions change
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    // Center the map
    mapInstanceRef.current.setCenter(center);
    
    // Add new markers
    if (markerPositions && markerPositions.length > 0) {
      const newMarkers = markerPositions.map(markerInfo => {
        return new google.maps.Marker({
          position: markerInfo.position,
          map: mapInstanceRef.current,
          title: markerInfo.title || '',
          icon: markerInfo.icon,
          animation: google.maps.Animation.DROP,
        });
      });
      
      markersRef.current = newMarkers;
    }
  }, [mapLoaded, markerPositions, center]);

  return (
    <div className={`relative ${className}`} style={{ height, width }}>
      {mapLoadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg">
          <div className="text-center p-4">
            <p className="text-destructive mb-2">{mapLoadError}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg shadow-sm"
      />
    </div>
  );
};

export default GoogleMap;
