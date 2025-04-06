
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPin, Check, Calendar as CalendarIcon2, Info } from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface PickupFormValues {
  wasteType: string;
  quantity: string;
  address: string;
  date: Date;
  timeSlot: string;
  pickupType: 'home' | 'dropoff';
  notes: string;
  deviceDetails?: string;
  center?: string;
}

const SchedulePickup: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const location = useLocation();
  const [fromScan, setFromScan] = useState(false);
  const [scanData, setScanData] = useState<any>(null);
  
  // Initialize form with default values
  const form = useForm<PickupFormValues>({
    defaultValues: {
      wasteType: '',
      quantity: '',
      address: '',
      pickupType: 'home',
      notes: '',
      timeSlot: '',
      deviceDetails: '',
      center: '',
    },
  });

  // Check if we're coming from the scan flow and pre-fill form values
  useEffect(() => {
    if (location.state) {
      const state = location.state as any;
      if (state.fromScan && state.deviceInfo) {
        setFromScan(true);
        setScanData({
          deviceInfo: state.deviceInfo,
          disposalOption: state.disposalOption,
          center: state.center
        });
        
        // Set form values based on scan data
        form.setValue('wasteType', mapDeviceTypeToWasteType(state.deviceInfo.type));
        form.setValue('deviceDetails', `${state.deviceInfo.brand} ${state.deviceInfo.model} - ${state.deviceInfo.condition} condition`);
        
        if (state.center) {
          form.setValue('center', state.center);
        }
        
        // Add disposal option and device details to notes
        const noteText = `Disposal option: ${state.disposalOption}\nDevice details: ${state.deviceInfo.brand} ${state.deviceInfo.type} ${state.deviceInfo.model} (${state.deviceInfo.condition} condition)`;
        form.setValue('notes', noteText);
      }
    }
  }, [location.state, form]);

  // Map device type to waste type select options
  const mapDeviceTypeToWasteType = (deviceType: string): string => {
    const typeMap: { [key: string]: string } = {
      'Smartphone': 'electronics',
      'Laptop': 'electronics',
      'Desktop': 'electronics',
      'Tablet': 'electronics',
      'Monitor': 'electronics',
      'Television': 'electronics',
      'Printer': 'electronics',
      'Camera': 'electronics',
      'Audio': 'electronics',
      'Appliance': 'appliances',
    };
    
    return typeMap[deviceType] || 'other';
  };

  const onSubmit = (data: PickupFormValues) => {
    console.log('Form submitted:', data);
    
    toast({
      title: "Pickup scheduled!",
      description: `Your pickup has been scheduled for ${format(data.date, 'PPP')} during the ${data.timeSlot} time slot.`,
    });
  };

  const wasteTypes = [
    { value: 'electronics', label: 'Electronics (Computers, Phones)' },
    { value: 'batteries', label: 'Batteries' },
    { value: 'appliances', label: 'Home Appliances' },
    { value: 'cables', label: 'Cables & Wires' },
    { value: 'lights', label: 'Light Fixtures & Bulbs' },
    { value: 'other', label: 'Other E-Waste' },
  ];

  const timeSlots = [
    { value: 'morning', label: 'Morning (8 AM - 12 PM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 4 PM)' },
    { value: 'evening', label: 'Evening (4 PM - 8 PM)' },
  ];

  return (
    <DashboardLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t('user.schedule')}</h1>
          <p className="text-muted-foreground mt-1">Schedule a pickup or drop-off for your e-waste</p>
        </div>

        {/* Display info banner when coming from scan */}
        {fromScan && scanData && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800">Continuing from Scan</h3>
              <p className="text-sm text-blue-700 mt-1">
                We've prefilled some details based on your scan results. You can review and complete the scheduling below.
              </p>
              {scanData.disposalOption && (
                <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {scanData.disposalOption} request
                </Badge>
              )}
            </div>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Schedule a Pickup or Drop-off</CardTitle>
            <CardDescription>
              Fill out the form below to schedule a pickup for your e-waste or arrange a drop-off
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="wasteType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of E-Waste</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select waste type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {wasteTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Device details field shows only when coming from scan */}
                {fromScan && (
                  <FormField
                    control={form.control}
                    name="deviceDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Device Details</FormLabel>
                        <FormControl>
                          <Input readOnly {...field} />
                        </FormControl>
                        <FormDescription>
                          Details from your device scan
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Center field shows only when coming from scan with center selection */}
                {fromScan && scanData?.center && (
                  <FormField
                    control={form.control}
                    name="center"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selected Center</FormLabel>
                        <FormControl>
                          <Input readOnly {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Quantity (in kg or items)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 5 kg or 3 items" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pickupType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Pickup Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="home" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Home Pickup
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="dropoff" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Drop-off at Collection Center
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch('pickupType') === 'home' && (
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your full address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Pickup Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setDate(date);
                            }}
                            disabled={(date) => {
                              // Disable dates in the past
                              return date < new Date(new Date().setHours(0, 0, 0, 0));
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeSlot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Time Slot</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot.value} value={slot.value}>
                              {slot.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any special instructions or details about your e-waste" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Please mention any specific requirements for pickup
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">Schedule Pickup</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SchedulePickup;
