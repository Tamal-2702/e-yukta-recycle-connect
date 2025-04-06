
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, RefreshCw } from 'lucide-react';
import GoogleMap from '@/components/maps/GoogleMap';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNearbyPickups, PickupLocation } from '@/hooks/useNearbyPickups';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

const DEFAULT_LOCATION = { lat: 28.6139, lng: 77.2090 }; // New Delhi

const KabadiwalaMap: React.FC = () => {
  const { t } = useLanguage();
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number }>(DEFAULT_LOCATION);
  const [selectedPickup, setSelectedPickup] = useState<PickupLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [mapMarkers, setMapMarkers] = useState<Array<any>>([]);
  
  const { pickupLocations, isLoading, error } = useNearbyPickups(currentLocation);
  
  // Update markers when pickupLocations or currentLocation changes
  useEffect(() => {
    if (pickupLocations.length === 0 && !currentLocation) return;
    
    try {
      // Pickup location markers
      const locationMarkers = pickupLocations.map(pickup => ({
        position: pickup.coordinates,
        title: pickup.address,
      }));

      // Current location marker with SVG icon
      const currentLocationMarker = {
        position: currentLocation,
        title: 'Your location',
        icon: {
          url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMjJDMTcuNTIyOCAyMiAyMiAxNy41MjI4IDIyIDEyQzIyIDYuNDc3MTUgMTcuNTIyOCAyIDEyIDJDNi40NzcxNSAyIDIgNi40NzcxNSAyIDEyQzIgMTcuNTIyOCA2LjQ3NzE1IDIyIDEyIDIyWiIgZmlsbD0iIzRlODFmZCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+',
        }
      };

      // Combine all markers
      setMapMarkers([currentLocationMarker, ...locationMarkers]);
    } catch (err) {
      console.error('Error setting up map markers:', err);
    }
  }, [pickupLocations, currentLocation]);

  // Get user's current location
  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(userLocation);
          setIsLoadingLocation(false);
          toast({
            title: t('kabadiwala.location_updated'),
            description: t('kabadiwala.showing_nearby_pickups') || 'Your location has been updated.',
          });
        },
        (error) => {
          console.error('Error getting current location:', error);
          setLocationError(t('kabadiwala.location_error') || 'Unable to get your location. Please check your browser permissions.');
          setIsLoadingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      setLocationError(t('kabadiwala.geolocation_not_supported') || 'Geolocation is not supported by your browser.');
      setIsLoadingLocation(false);
    }
  };

  // Get current location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    
    const clickedLat = e.latLng.lat();
    const clickedLng = e.latLng.lng();
    
    // Check if a pickup location was clicked
    const clickedPickup = pickupLocations.find(pickup => {
      const lat = pickup.coordinates.lat;
      const lng = pickup.coordinates.lng;
      // Use a small threshold for comparison due to floating point precision
      return Math.abs(lat - clickedLat) < 0.0001 && Math.abs(lng - clickedLng) < 0.0001;
    });
    
    if (clickedPickup) {
      setSelectedPickup(clickedPickup);
    } else {
      setSelectedPickup(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('kabadiwala.nearby_pickups')}</CardTitle>
        <CardDescription>{t('kabadiwala.nearby_description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading || locationError ? (
            <div className="rounded-lg bg-muted h-[300px] flex items-center justify-center">
              {isLoading ? (
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground opacity-50 mx-auto mb-2" />
                  <span className="text-muted-foreground">{t('kabadiwala.loading_map')}</span>
                </div>
              ) : (
                <div className="text-center px-4">
                  <MapPin className="h-8 w-8 text-muted-foreground opacity-50 mx-auto mb-2" />
                  <span className="text-muted-foreground">{locationError}</span>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={getCurrentLocation}
                  >
                    {t('kabadiwala.retry')}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <GoogleMap 
              center={currentLocation}
              markerPositions={mapMarkers}
              height="300px"
              zoom={13}
              onMapClick={handleMapClick}
            />
          )}
          
          {selectedPickup && (
            <Card className="mt-4 border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{selectedPickup.customerName}</h3>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1 text-primary" />
                      {selectedPickup.address}
                    </p>
                    <div className="mt-2">
                      <Badge variant="outline" className="mr-2">{selectedPickup.items}</Badge>
                      <Badge variant="outline">{selectedPickup.scheduledTime}</Badge>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-[#76b947] hover:bg-[#65a736] flex items-center"
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    {t('kabadiwala.navigate')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {!isLoading && pickupLocations.length === 0 && !error && (
            <div className="text-center text-sm text-muted-foreground">
              {t('kabadiwala.no_nearby_pickups')}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={getCurrentLocation}
          disabled={isLoadingLocation}
        >
          {isLoadingLocation ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              {t('kabadiwala.locating')}
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('kabadiwala.refresh_map')}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KabadiwalaMap;
