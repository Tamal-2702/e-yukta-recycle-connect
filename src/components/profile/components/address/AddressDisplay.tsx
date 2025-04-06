
import React from 'react';
import { MapPin } from 'lucide-react';

interface AddressDisplayProps {
  formattedAddress: string;
}

const AddressDisplay: React.FC<AddressDisplayProps> = ({ formattedAddress }) => {
  return (
    <div className="space-y-2">
      <MapPin className="h-5 w-5 text-muted-foreground mb-2" />
      <p className="text-sm">{formattedAddress}</p>
    </div>
  );
};

export default AddressDisplay;
