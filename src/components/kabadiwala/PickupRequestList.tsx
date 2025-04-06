
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  PackageOpen, 
  Phone, 
  Navigation, 
  ArrowRight 
} from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const PickupRequestList: React.FC = () => {
  const { t } = useLanguage();
  
  // Sample data - would come from an API in a real implementation
  const pickupRequests = [
    // This array is empty to show the empty state initially
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{t('kabadiwala.pickup_requests')}</h2>
          <p className="text-muted-foreground">{t('kabadiwala.available_pickups')}</p>
        </div>
        <Button variant="outline" size="sm">
          {t('kabadiwala.refresh')}
        </Button>
      </div>
      
      {pickupRequests.length > 0 ? (
        <div className="space-y-4">
          {pickupRequests.map((request, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-muted-foreground" />
                      <span className="font-medium">Address here</span>
                      <Badge variant="outline">2.3 km</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-muted-foreground" />
                      <span>Preferred time: Today, 2-5 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PackageOpen size={16} className="text-muted-foreground" />
                      <span>Old laptop, 2 mobile phones</span>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone size={14} className="mr-1" />
                      {t('kabadiwala.call')}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Navigation size={14} className="mr-1" />
                      {t('kabadiwala.navigate')}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0 border-t mt-4">
                <span className="text-sm text-muted-foreground">
                  {t('kabadiwala.estimated_earning')}: ₹120-150
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    {t('kabadiwala.reject')}
                  </Button>
                  <Button size="sm" className="bg-[#76b947] hover:bg-[#65a736]">
                    {t('kabadiwala.accept')}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <PackageOpen className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg mb-2">{t('kabadiwala.no_pickups_available')}</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              {t('kabadiwala.no_pickups_message')}
            </p>
            <Button variant="outline" className="mt-6">
              {t('kabadiwala.expand_service_area')} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PickupRequestList;
