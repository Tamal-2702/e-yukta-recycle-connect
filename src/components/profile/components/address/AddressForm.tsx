
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface AddressFormProps {
  address: Address;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  isValidating: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  handleChange,
  handleSave,
  handleCancel,
  isValidating
}) => {
  return (
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
          onClick={handleCancel}
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
  );
};

export default AddressForm;
