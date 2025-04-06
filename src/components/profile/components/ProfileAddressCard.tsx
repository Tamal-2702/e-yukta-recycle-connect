
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AddressDisplay, AddressForm, useAddressValidation } from './address';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface ProfileAddressCardProps {
  address: Address;
  onAddressUpdate: (address: Address) => Promise<void>;
}

const ProfileAddressCard: React.FC<ProfileAddressCardProps> = ({
  address: initialAddress,
  onAddressUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState<Address>(initialAddress);
  const { isValidating, validateAddress } = useAddressValidation();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const isValid = await validateAddress(address);
    
    if (isValid) {
      try {
        await onAddressUpdate(address);
        
        toast({
          title: "Address updated",
          description: "Your address has been successfully updated",
        });
        
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating address:", error);
        
        toast({
          title: "Update failed",
          description: "There was an error updating your address",
          variant: "destructive"
        });
      }
    }
  };

  const formattedAddress = `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Address Information</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 
              <><Save className="mr-2 h-4 w-4" /> Save</> : 
              <><Edit className="mr-2 h-4 w-4" /> Edit</>
            }
          </Button>
        </CardTitle>
        <CardDescription>Manage your address details</CardDescription>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <AddressDisplay formattedAddress={formattedAddress} />
        ) : (
          <AddressForm 
            address={address}
            handleChange={handleChange}
            handleSave={handleSave}
            handleCancel={() => setIsEditing(false)}
            isValidating={isValidating}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileAddressCard;
