
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Save, MapPin } from 'lucide-react';
import { useMapsApi } from '@/hooks/useMapsApi';
import { useToast } from '@/hooks/use-toast';

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
  const [isValidating, setIsValidating] = useState(false);
  const { geocodeAddress } = useMapsApi();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateAddress = async () => {
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

  const handleSave = async () => {
    const isValid = await validateAddress();
    
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
          <div className="space-y-2">
            <MapPin className="h-5 w-5 text-muted-foreground mb-2" />
            <p className="text-sm">{formattedAddress}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  name="street"
                  value={address.street}
                  onChange={handleChange}
                  placeholder="123 Main St"
                  leftElement={<MapPin className="h-4 w-4" />}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode">Zip/Postal Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={address.zipCode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={address.country}
                    onChange={handleChange}
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={isValidating}
              >
                {isValidating ? "Validating..." : "Save Address"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileAddressCard;
