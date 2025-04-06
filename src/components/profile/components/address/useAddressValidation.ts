
import { useState } from 'react';
import { useMapsApi } from '@/hooks/useMapsApi';
import { useToast } from '@/hooks/use-toast';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export const useAddressValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const { geocodeAddress } = useMapsApi();
  const { toast } = useToast();

  const validateAddress = async (address: Address): Promise<boolean> => {
    try {
      setIsValidating(true);
      
      const addressString = `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
      
      await geocodeAddress(addressString);
      
      toast({
        title: "Address validated",
        description: "The address is valid",
      });
      
      return true;
    } catch (error) {
      console.error("Error validating address:", error);
      
      toast({
        title: "Address validation failed",
        description: "Please check your address information",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  return {
    isValidating,
    validateAddress
  };
};
