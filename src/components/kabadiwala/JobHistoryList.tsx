
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, PackageOpen, Check, ArrowUpDown } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const JobHistoryList: React.FC = () => {
  const { t } = useLanguage();
  
  // Sample data - would come from an API in a real implementation
  const completedJobs = [
    // Empty array to show empty state
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{t('kabadiwala.job_history')}</h2>
          <p className="text-muted-foreground">{t('kabadiwala.completed_pickups')}</p>
        </div>
        <Button variant="outline" size="sm">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          {t('kabadiwala.sort')}
        </Button>
      </div>
      
      {completedJobs.length > 0 ? (
        <div className="space-y-4">
          {completedJobs.map((job, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-muted-foreground" />
                      <span className="font-medium">Address here</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-muted-foreground" />
                      <span>Completed on: April 4, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PackageOpen size={16} className="text-muted-foreground" />
                      <span>Old laptop, 2 mobile phones</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <Check size={12} className="mr-1" />
                      {t('kabadiwala.completed')}
                    </Badge>
                    <div className="mt-2 text-right">
                      <span className="text-sm text-muted-foreground">{t('kabadiwala.earned')}: </span>
                      <span className="font-medium">₹150</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 border-t mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  {t('kabadiwala.view_details')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg mb-2">{t('kabadiwala.no_job_history')}</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              {t('kabadiwala.job_history_message')}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobHistoryList;
